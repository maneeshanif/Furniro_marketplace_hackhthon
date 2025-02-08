

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "next-sanity";
import jwt from "jsonwebtoken";
import Sharp from "sharp";

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-02-02",
  useCdn: false,
});

async function processImage(file: File) {
  try {
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Process image with Sharp
    const optimizedBuffer = await Sharp(buffer)
      .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();

    const filename = `profile-${Date.now()}.jpg`;

    // Upload to Sanity
    const asset = await client.assets.upload("image", optimizedBuffer, {
      filename,
      contentType: "image/jpeg",
    });

    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error("Image processing failed:", error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    // Authentication check
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    // JWT verification
    const verifiedTokenValues = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;

    // Parse form data
    const formData = await req.formData();
    
    // Handle image upload
    let imageReference = null;
    const imageFile = formData.get("image") as File | null;
    if (imageFile) {
      try {
        imageReference = await processImage(imageFile);
      } catch (error) {
        console.error("Image upload failed:", error);
        return NextResponse.json(
          { message: "Failed to process image" },
          { status: 500 }
        );
      }
    }

    // Prepare update data
    const updateData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") ? Number(formData.get("phone")) : undefined,
      address: formData.get("address") as string | undefined,
      state: formData.get("state") as string | undefined,
      city: formData.get("city") as string | undefined,
      zipCode: formData.get("zipCode") ? Number(formData.get("zipCode")) : undefined,
      ...(imageReference && { image: imageReference }),
    };

    // Update Sanity document
    const response = await client
      .patch(verifiedTokenValues._id)
      .set(updateData)
      .commit();

    return NextResponse.json({
      message: "Profile updated successfully",
      data: response,
    });
  } catch (error) {
    console.error("Profile update failed:", error);
    return NextResponse.json(
      {
        message: "Failed to update profile",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
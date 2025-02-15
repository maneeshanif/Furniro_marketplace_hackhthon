import { NextResponse, type NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { client } from "@/sanity/lib/client";

export const POST = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
        }

        let verifiedTokenData: JwtPayload;
        try {
            verifiedTokenData = jwt.verify(token, String(process.env.JWT_SECRET)) as JwtPayload;
        }catch (error) {
            console.error('Error verifying token:', error);
            return NextResponse.json({ message: "Invalid or Expired Token" }, { status: 401 });
        }

        const query = `
            *[_type == "user" && _id == $userId][0]{
                _id,
                name,
                role,
                image,
                email,
                phone,
                address,
                 zipCode,
  city,
  state,
  bio
            
            }
        `;

        const data = await client.fetch(query, { userId: verifiedTokenData._id });

        // console.log(data)

        if (!data) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
     

        return NextResponse.json(data);
        
    } catch (error) {
        console.error("Error in authentication:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

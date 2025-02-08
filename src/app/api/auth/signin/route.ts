import { NextResponse, NextRequest } from "next/server";
import { client } from "@/sanity/lib/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { logInSchema } from "@/validation/signinvaldation";

const query = `
*[_type == "user"] {
    _id,
    email,
    password
}
`;

interface queryType {
    _id: string;
    email: string;
    password: string;
}

export const POST = async (request: NextRequest) => {
    try {
        const data = await request.json();
        // console.log(data)

        // Validate request data
        const schemaResponse = await logInSchema.safeParseAsync(data);
        if (!schemaResponse.success) {
            return NextResponse.json({ error: schemaResponse.error }, { status: 400 });
        }

        // Fetch user data from Sanity
        const sanityData: queryType[] = await client.fetch(query);
        const user = sanityData.find((item: queryType) => item.email === data.email);

        if (!user) {
            return NextResponse.json({ message: "Invalid Email" }, { status: 400 });
        }

        // Compare password
        const passwordComparison = await bcrypt.compare(data.password, user.password);
        if (!passwordComparison) {
            return NextResponse.json({ message: "Invalid password" }, { status: 400 });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, String(process.env.JWT_SECRET), { expiresIn: "2d" });

        // Create response and set cookie
        const response = NextResponse.json({ message: "Login successful" });
        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: 2 * 24 * 60 * 60, // 2 days in seconds
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

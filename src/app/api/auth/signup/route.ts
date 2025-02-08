import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { createClient } from "next-sanity";
import { signUpSchema } from "@/validation/signupvaldation";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    useCdn: false
});

interface userEmails {
    email: string;
}

export const POST = async (request: NextRequest) => {
    try {
        const query = `
        *[_type == "user"] {
            email
        }
        `;

        const data = await request.json();

        // Validate request data
        const schemaResponse = await signUpSchema.safeParseAsync(data);
        if (!schemaResponse.success) {
            return NextResponse.json({ error: schemaResponse.error }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(data.password, 11);

        // Check if email already exists
        const emailExists = await client.fetch(query).then((data: userEmails[]) =>
            data.find((item: userEmails) => item.email === schemaResponse.data.email)
        );

        if (emailExists) {
            return NextResponse.json({ message: "Email already exists" }, { status: 400 });
        }

        // Creating user and storing the user credentials
        const response = await client.create({
            _type: "user",
            name: schemaResponse.data.name,
            email: schemaResponse.data.email,
            password: hashedPassword,
            role: "user"
        });

        return NextResponse.json({ message: "User successfully created", response }, { status: 200 });
    } catch (error) {
        console.error("Error in user signup:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

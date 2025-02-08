import {  NextResponse } from "next/server"

export const GET = async () => {
    const response = NextResponse.json({message: "logout successful"})
    response.cookies.delete("token")

    return response
}
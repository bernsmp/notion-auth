import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { logLogin } from "@/lib/airtable";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    // Verify password
    if (password !== process.env.PORTAL_PASSWORD) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    // Set session
    const session = await getSession();
    session.isLoggedIn = true;
    session.username = "user";
    await session.save();

    // Log to Airtable (optional)
    try {
      await logLogin();
    } catch (error) {
      // Silently fail if Airtable logging fails
      console.error("Airtable logging failed:", error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 }
    );
  }
}

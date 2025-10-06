import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "./lib/session";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  try {
    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions
    );

    // Check if user is authenticated
    if (!session.isLoggedIn) {
      // Redirect to login page
      return NextResponse.redirect(new URL("/", request.url));
    }

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/view/:path*"],
};

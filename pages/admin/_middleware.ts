// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret });

  const allowedId = ["2259633694", "2283035576", "2255707346"];

  if (!allowedId.includes(session.uid?.toString())) {
    console.log("hello");
    return NextResponse.redirect(new URL("/about", req.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};

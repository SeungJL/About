// middleware.ts
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret });

  const allowedId = [
    "2259633694",
    "2283035576",
    "2282184929",
    "2753657224",
    "2769380662",
  ];

  if (!allowedId.includes(session.uid?.toString())) {
    return NextResponse.redirect(new URL("/about", req.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};

// // middleware.ts
// import { getToken } from "next-auth/jwt";
// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// const secret = process.env.NEXTAUTH_SECRET;

// // This function can be marked `async` if using `await` inside
// export async function middleware(req: NextRequest) {
// const session = await getToken({ req, secret });

// const allowedId = [
// "2259633694",
// "2542567004",
// "2282184929",
// "2753657224",
// "3185336288",
// ];

// if (!allowedId.includes(session.uid?.toString())) {
// return NextResponse.redirect(new URL("/home", req.url));
// }
// }

// // See "Matching Paths" below to learn more
// export const config = {
// matcher: "/admin/:path\*",
// };

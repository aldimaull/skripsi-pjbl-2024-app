import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/sign-up") {
    return NextResponse.next();
  }

  const token = await getToken({ req: request });

  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  // Check the role and redirect based on the role
  switch (token.role) {
    case "ADMIN":
      if (!request.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      break;
    case "SISWA":
      if (
        !request.nextUrl.pathname.startsWith("/user") &&
        !request.nextUrl.pathname.startsWith("/assessment") &&
        !request.nextUrl.pathname.startsWith("/materi") &&
        !request.nextUrl.pathname.startsWith("/project")
      ) {
        return NextResponse.redirect(new URL("/user", request.url));
      }
      break;
    case "GURU":
      if (!request.nextUrl.pathname.startsWith("/guru")) {
        return NextResponse.redirect(new URL("/guru", request.url));
      }
      break;
    default:
      return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
  matcher: [
    "/((?!api|.*\\..*|_next/static|_next/image|sw.js|manifest.json|favicon.ico|login).*)",
  ],
};

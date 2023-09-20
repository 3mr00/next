// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("token: ", req.nextUrl.pathname.startsWith("/dashboard"));

    if (
      req.nextUrl.pathname.startsWith("/dashboard") &&
      req.nextauth.token.user.isAdmin === false
    ) {
      console.log(
        "yessssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
      );
      const loginPageUrl = new URL(
        "/login?message=You Are Not Authorized!",
        req.url
      );

      return NextResponse.redirect(loginPageUrl);
    }

    // if (req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.role !== "user")
    //   return NextResponse.rewrite(
    //     new URL("/auth/login?message=You Are Not Authorized!", req.url)
    //   );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = {
  matcher: ["/dashboard/:path*", "/protectedpage/:path*"],
};

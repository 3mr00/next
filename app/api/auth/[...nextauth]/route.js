import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          "https://e-learning-back-jmydev.onrender.com/login",
          {
            method: "POST",
            body: JSON.stringify({
              loginId: credentials.username,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();
        // If no error and we have user data, return it
        if (res.ok && data) {
          return data;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger && trigger === "update") {
        token.user.level = session?.name;

        const res = await fetch(
          `https://e-learning-back-jmydev.onrender.com/api/user/${token.user._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token.token,
            },
            body: JSON.stringify({ level: session?.name }),
          }
        );
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: "lsdkmlskdmflksdkskmsdnkj",
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

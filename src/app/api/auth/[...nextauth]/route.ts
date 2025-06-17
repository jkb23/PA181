import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
// You can import other providers here

// Define your authentication options
export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // Add more providers here if needed
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // Optionally customize callbacks, pages, etc.
};

// Create and export handlers for GET and POST
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

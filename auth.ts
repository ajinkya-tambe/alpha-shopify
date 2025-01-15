import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { AUTHOR_BY_GOOGLE_QUERY } from "./sanity/lib/queries";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, profile }) {
      try {
        // console.log("Google OAuth Profile:", profile); // Debugging log

        // Extract necessary fields from the profile
        const { email, name, picture, sub } = profile;

        if (!email) {
          // console.error("No email returned from Google profile");
          return false; // Prevent sign-in without an email
        }

        // Fetch the existing user from Sanity
        const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GOOGLE_QUERY, { googleId: sub });

        // If the user doesn't exist, create a new one
        if (!existingUser) {
          const baseUsername = name ? name.replace(/\s+/g, "").toLowerCase() : "user";
          const randomSuffix = Math.floor(Math.random() * 1000); // Add a random number to ensure uniqueness
          const username = `${baseUsername}${randomSuffix}`;

          const bios = [
            "A passionate developer who loves to build amazing apps.",
            "Tech enthusiast and lifelong learner.",
            "Building the future, one project at a time.",
            "Exploring the world of technology and creativity.",
            "Coding my way through life, one line at a time.",
            "Innovator, creator, and technology lover.",
            "Always seeking new challenges and learning opportunities.",
            "A dreamer who believes in the power of technology."
          ];
        
          // Select a random bio from the list
          const bio = bios[Math.floor(Math.random() * bios.length)];


          await writeClient.create({
            _type: "author",
            id: sub, // Use `sub` as the unique identifier for Google users
            username,
            name: name || "Anonymous",
            email,
            image: picture || "", // Optional: use a default image if `picture` is missing
            bio, // You can customize the bio if needed
          });
        }

        return true; // Allow the sign-in
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Fail gracefully
      }
    },

    async jwt({ token, profile }) {
      if (profile) {
        const { sub } = profile;
    
        // Fetch the user to get their unique ID
        const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GOOGLE_QUERY, { googleId: sub });
    
        // console.log("User fetched in JWT callback:", user);
    
        if (user) {
          token.id = user._id; // Attach the Sanity ID to the token
        } else {
          token.id = sub; // Fallback to using sub if user is not found in the database
        }
      }
    
      // console.log("JWT Token:", token);  // Debugging token
    
      return token;
    },

    async session({ session, token }) {
      // console.log("Token in Session callback:", token); // Debugging token
      if (token?.id) {
        session.id = token.id; // Attach the user ID to the session
      }
      else {
        session.id = token?.sub; // Fallback to using sub if id is not available
      }
      return session;
    }
  },

  session: {
    jwt: true, // Enable JWT for session management
  },

  cookies: {
    sessionToken: {
      name: "trying", // Customize your session cookie name
      options: {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "lax",
      },
    },
  },

});

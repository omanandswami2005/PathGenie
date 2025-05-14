import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import config from '../config/config.js';
import dotenv from 'dotenv';
import { ObjectId } from 'bson';

dotenv.config();
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(config.db.uri);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  user: {
    additionalFields: {
      profileId: {
        type: "ObjectId",
        required: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Optional: Modify user data before creation
          return { data: { ...user } };
        },
        after: async (user) => {
          // console.log("User created:", user);
          // Create a profile document in the profiles collection
          try {
            const profileResult = await db.collection("profiles").insertOne({
              userId:  new ObjectId(user.id), // Reference to the user
              bio: "", // Default empty bio
              avatar: "", // Default empty avatar
              createdAt: new Date(), // Timestamp
            });
            const profileId = profileResult.insertedId;
            // console.log("Profile created with ID:", profileId);
             // Update the User document with the profileId
          await db.collection("user").updateOne(
            { _id: new ObjectId(user.id) },
            { $set: { profileId } }
          );
          } catch (error) {
            console.error("Error creating profile document:", error);
            throw error;
          }

          

         
        },
      },
    },
  },
  trustedOrigins: [
    "http://localhost:5173",
  ],

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
});

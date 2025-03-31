"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const oneWeek = 60 * 60 * 24 * 7;

// ========================= Create New Account =======================
export const signUP = async (params: SignUpParams) => {
  const { uid, name, email } = params;
  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please Sign In instead.",
      };
    }

    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in",
    };
  } catch (e: any) {
    console.log(`Error creating a user ${e}`);

    if (e.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This Email already in use",
      };
    }

    return {
      success: false,
      message: "Failed to Create an account",
    };
  }
};

// =========================== Logged into Existing Account========================
export const signIN = async (params: SignInParams) => {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User does not exists. Create an account instead",
      };
    }

    await setSessionCookie(idToken);
  } catch (e) {
    console.log(e);

    return {
      success: false,
      meassage: "Failed to log into an Account.",
    };
  }
};

// ===================== Set the Session Cookie ============================
export const setSessionCookie = async (idToken: string) => {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: oneWeek * 1000,
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: oneWeek,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
};

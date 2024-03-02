"use client";

import { config } from "../config";

type SignupCredentialType = {
  name: string;
  email: string;
  password: string;
  confirm_password?: string | undefined;
};

type CredentialType = {
  email: string;
  password: string;
};

export async function createAccountWithEmailPassword(
  credential: SignupCredentialType
) {
  try {
    const response = await fetch(`${config.API}/auth/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });

    const data = await response.json();
    return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function loginWithEmailPassword(credential: CredentialType) {
  try {
    const response = await fetch(`${config.API}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });

    const data = await response.json();
    console.log({ data });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
}

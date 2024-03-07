"use client";

import { config } from "@/config";
import useSWR from "swr";

const fetcher = async (arg: string) => {
  return fetch(arg, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export function useAuth() {
  const auth = useSWR(`${config.API}/auth/me`, fetcher);
  return auth;
}

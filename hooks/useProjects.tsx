"use client";

import { config } from "@/config";
import useSWR from "swr";

// fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

function useProjects(queryParams: string | undefined = "") {
  const swr = useSWR(`${config.API}/projects${queryParams}`, fetcher);
  return swr;
}

export default useProjects;

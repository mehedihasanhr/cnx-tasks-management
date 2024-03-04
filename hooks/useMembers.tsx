import { config } from "@/config";
import useSWR from "swr";

// fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

function useMembers() {
  const res = useSWR(`${config.API}/users`, fetcher);
  return res;
}

export default useMembers;

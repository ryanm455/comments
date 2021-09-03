import useSWR, { SWRResponse } from "swr";

import type { User } from "@prisma/client";

import { USER_QUERY } from "./gqlRequests";

type U = User & {
  downvotedIds: string[];
  upvotedIds: string[];
};

type Res = SWRResponse<U, Error>;
type Return = [U | undefined, { mutate: Res["mutate"]; loading: boolean }];

let firstRun = true; // for some reason swr is not set on first render kicking out of first load auth requiring pages.
export const useUser = (initialUser?: U): Return => {
  // @ts-ignore
  const { data, mutate }: Res = useSWR(USER_QUERY, {
    initialData: initialUser || undefined,
  });

  const d = !data && firstRun ? initialUser : data;

  firstRun = false;

  return [d, { mutate, loading: !data }];
};

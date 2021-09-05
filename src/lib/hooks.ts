import useSWR, { SWRResponse } from "swr";

import type { User } from "@prisma/client";

import { USER_QUERY } from "./gqlRequests";

type U = User & {
  downvotedIds: string[];
  upvotedIds: string[];
};

type Res = SWRResponse<U, Error>;
type Return = [U | undefined, { mutate: Res["mutate"]; loading: boolean }];

export const useUser = (initialUser?: U): Return => {
  // @ts-ignore
  const { data, mutate }: Res = useSWR(USER_QUERY, {
    fallbackData: initialUser || undefined,
  });

  return [data, { mutate, loading: !data }];
};

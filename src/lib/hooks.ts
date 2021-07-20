import useSWR, { SWRResponse } from "swr";
import type { IUser } from "types/db";

type Res = SWRResponse<{ user: IUser }, Error>;
type Return = [IUser | undefined, { mutate: Res["mutate"]; loading: boolean }];

export const fetcher = (url: string) => fetch(url).then(r => r.json());

export const useUser = (initialUser?: IUser): Return => {
  const { data, mutate }: Res = useSWR("/api/auth/user", fetcher, {
    initialData: initialUser ? { user: initialUser } : undefined,
  });
  // if data is not defined, the query has not completed
  const user = data?.user;
  return [user, { mutate, loading: !data }];
};

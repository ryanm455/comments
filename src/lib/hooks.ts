import useSWR, { SWRResponse } from "swr";
import type { IUser } from "types/db";

type Res = SWRResponse<{ user: IUser }, Error>;

export const fetcher = (url: string) => fetch(url).then(r => r.json());

export const useUser = (
  initialData?: IUser
): [IUser | undefined, { mutate: Res["mutate"]; loading: boolean }] => {
  const { data, mutate }: Res = useSWR("/api/auth/user", fetcher, {
    initialData,
  });
  // if data is not defined, the query has not completed
  const user = data?.user;
  return [user, { mutate, loading: !data }];
};

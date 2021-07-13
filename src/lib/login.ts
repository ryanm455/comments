import { Provider } from "types/db";
import { fetcher } from "./hooks";

export const socialAuth = (prov: Provider, update: (u: any) => void) => {
  if (prov === Provider.Local)
    throw new Error("TODO! Local is not implemented!");

  // @ts-ignore
  window.loginRef = async () => {
    update(await fetcher("/api/auth/user"));
  };

  window.open(
    `/api/auth/${prov}`,
    "",
    "scrollbars=yes,menubar=no,resizable=yes,toolbar=no,location=no,status=no,height=700,width=500"
  );
};

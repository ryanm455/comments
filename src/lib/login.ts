import { Provider } from "types/db";
import { fetcher } from "./hooks";

type LoginRef = () => Promise<void>;

declare const window: {
  loginRef: LoginRef;
  opener: { loginRef?: LoginRef };
} & Window;

export const socialAuth = (prov: Provider, update: (u: any) => void) => {
  const url = prov === Provider.Local ? "/login" : `/api/auth/${prov}`;

  window.loginRef = async () => {
    update(await fetcher("/api/auth/user"));
  };

  window.open(
    url,
    "",
    "scrollbars=yes,menubar=no,resizable=yes,toolbar=no,location=no,status=no,height=700,width=500"
  );
};

export const checkIfPopUp = () => {
  if (window.opener) {
    window.opener.focus();
    window.opener.loginRef?.();
    window.close();
  }
};

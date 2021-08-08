import { gqlQuery } from "utils";

import { Provider } from "@prisma/client";

import { USER_QUERY } from "./gqlRequests";

type LoginRef = () => Promise<void>;

declare const window: {
  loginRef: LoginRef;
  opener: { loginRef?: LoginRef };
} & Window;

export const socialAuth = (prov: Provider, update: (u: any) => void) => {
  const url =
    prov === Provider.LOCAL ? "/login" : `/api/auth/${prov.toLowerCase()}`;

  window.loginRef = async () => {
    update(await gqlQuery(USER_QUERY));
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

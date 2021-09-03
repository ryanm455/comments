import type { Provider } from "@prisma/client";

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const gql = String.raw;

export const gqlQuery = (query: string, variables: object = {}) =>
  fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then(res => res.json())
    .then(res => Object.values(res.data)[0]);

export const providerReadable = (p: Provider) => capitalize(p.toLowerCase());

export const embedListener = (e: any) => {
  if (e.data == "height") {
    const [body, html] = [document.body, document.documentElement];

    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    e.source.postMessage({ height }, "*");

    new ResizeObserver(entries =>
      e.source.postMessage({ height: entries[0].target.clientHeight }, "*")
    ).observe(document.body);
  }
};

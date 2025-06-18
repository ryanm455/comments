import type { Provider } from "@prisma/client";

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const providerReadable = (p: Provider) => capitalize(p.toLowerCase());

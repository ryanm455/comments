import type { User as U } from "@prisma/client";

declare global {
  namespace Express {
    interface User extends U {}
  }
}

type Page = (page: React.ReactNode, props: object) => JSX.Element;

declare module "react" {
  interface FunctionComponent<P = {}> {
    getLayout?: Layout;
  }

  interface ExoticComponent<P = {}> {
    getLayout?: Layout;
  }

  namespace Component {
    const getLayout: Layout;
  }

  interface ComponentClass {
    getLayout?: Layout;
  }
}

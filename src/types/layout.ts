export enum Layout {
  Embed = "Embed",
  Default = "Default",
}

declare module "react" {
  interface FunctionComponent<P = {}> {
    layout?: Layout;
  }

  interface ExoticComponent<P = {}> {
    layout?: Layout;
  }

  namespace Component {
    const layout: Layout;
  }

  interface ComponentClass {
    layout?: Layout;
  }
}

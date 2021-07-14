import {
  ChakraProvider,
  extendTheme,
  withDefaultProps,
} from "@chakra-ui/react";

import Footer from "./Footer";
import Meta from "./Meta";
import Navbar from "./Navbar";

const theme = extendTheme(
  // @ts-ignore Type instantiation is excessively deep and possibly infinite.ts(2589)
  withDefaultProps({
    defaultProps: {
      maxW: "4xl",
      p: 0,
    },
    components: ["Container"],
  }),
  {
    styles: {
      global: () => ({
        "body::-webkit-scrollbar": {
          width: 3,
        },
        "body::-webkit-scrollbar-thumb": {
          backgroundColor: "#272727",
          outline: "1px solid #212222",
        },
        "::selection": {
          backgroundColor: "#2563eb",
          color: "#fefefe",
        },
      }),
    },
  }
);

const Layout: React.FC = ({ children }) => (
  <ChakraProvider theme={theme}>
    <Meta />
    <Navbar />
    {children}
    <Footer />
  </ChakraProvider>
);

export default Layout;

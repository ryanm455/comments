import Footer from "./Footer";
import Meta from "./Meta";
import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => (
  <>
    <Meta />
    <Navbar />
    {children}
    <Footer />
  </>
);

export default Layout;

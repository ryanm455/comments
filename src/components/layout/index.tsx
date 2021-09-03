import { memo, useState } from "react";

import { Alert } from "components/ui/Alert";

import Footer from "./Footer";
import Navbar from "./Navbar";

const Notice = memo(() => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <Alert
      type="info"
      className="rounded-none"
      onClose={() => setShow(false)}
      rounded={false}
    >
      Note this is not a legit company don&apos;t use this service it&apos;s
      just an experiment.
    </Alert>
  );
});

const Layout: React.FC = ({ children }) => (
  <>
    <Notice />
    <Navbar />
    {children}
    <Footer />
  </>
);

export default Layout;

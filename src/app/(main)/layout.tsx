import "global.css";

import Footer from "components/mainLayout/Footer";
import Navbar from "components/mainLayout/Navbar";
import Notice from "components/mainLayout/Notice";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Notice />
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
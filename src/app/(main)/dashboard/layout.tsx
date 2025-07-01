import React from "react";

import { SideNav } from "../../../components/dashboard/SideNav";

const DashLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col md:flex-row min-h-[100vh]">
    <SideNav />
    <div className="w-full overflow-auto container px-4 mx-auto mb-7 max-w-5xl">
      {children}
    </div>
  </div>
);

export default DashLayout;
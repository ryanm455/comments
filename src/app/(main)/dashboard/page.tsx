import { Suspense } from "react";

import SiteListServer from "components/dashboard/SiteListServer";
import { LoadingGrid } from "components/ui/Grid";
import { auth } from "lib/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<LoadingGrid />}>
        <SiteListServer />
      </Suspense>
    </div>
  );
};

export default DashboardPage;

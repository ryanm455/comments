import ClientGrid from "components/dashboard/ClientGrid";
import { auth } from "lib/auth";
import prisma from "lib/prisma";

const SiteListServer = async () => {
  const session = await auth();
  if (!session?.user?.id) return null;

  const sites = await prisma.site.findMany({
    where: { authorId: session.user.id },
  });

  const gridItems = sites.map(site => ({
    id: site.id,
    name: site.name,
    href: `/dashboard/site/${site.id}`,
  }));

  return <ClientGrid gridItems={gridItems} />;
};

export default SiteListServer;

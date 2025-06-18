import Comment from "components/embed/Comment";
import { auth } from "lib/auth";
import prisma from "lib/prisma";
import { redirect } from "next/navigation";

const getUser = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/auth/login");

  return session.user!
}

const fetchUserDownvotes = async (userId: string) => {
  const comments = await prisma.downvote.findMany({
    where: { userId },
    include: { comment: { include: { author: true } } }
  });

  return comments.map(c => c.comment);

}

const settings = { timestamps: true, ratings: false };

const Downvotes = async () => {
  const user = await getUser();
  const downvotes = await fetchUserDownvotes(user.id!);
  return (
    <>
      <h1 className="text-3xl mb-4 font-semibold">Downvoted Comments</h1>
      {downvotes.length ? (
        downvotes.map(c => (
          <Comment comment={c} key={c.id} settings={settings} />
        ))
      ) : (
        <p className="text-gray-900 dark:text-gray-200 mb-4">
          You have not downvoted any comments.
        </p>
      )}
    </>
  );
};

export default Downvotes;

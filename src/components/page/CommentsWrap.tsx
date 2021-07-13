import CommentThread from "components/embed/CommentThread";
import { fetcher } from "pages/embed/[page]";
import { FC } from "react";
import useSWR from "swr";

import type { ISettings } from "types/embed";
import type { IComment } from "types/db";

const CommentsWrap: FC<{
  pageId: string;
  comments: IComment[];
  settings: ISettings;
}> = ({ pageId, comments, settings }) => {
  const { data } = useSWR<IComment[]>(`/api/comment/${pageId}`, fetcher, {
    initialData: comments,
  });

  return (
    <CommentThread
      comments={data || []}
      settings={settings}
      add={async () => {}}
    />
  );
};

export default CommentsWrap;

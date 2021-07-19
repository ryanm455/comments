import classNames from "classnames";
import Icon from "components/Icon";
import { FC, memo } from "react";
import { FaPlus } from "react-icons/fa";

import LinkWrap from "./LinkWrap";

type IData = {
  _id: string;
  name: string;
  primaryColor?: string;
};

const Boxes: FC<{
  data: IData[];
  name: string;
  header: string;
  refId?: string;
  headCenter?: boolean;
  boxColor?: string;
}> = memo(({ data, name, header, refId, headCenter, boxColor }) => (
  <>
    <h1
      className={classNames("text-3xl mb-4 font-semibold", {
        "text-center": headCenter,
      })}
    >
      {header}
    </h1>
    <div className="flex gap-3 flex-wrap justify-around">
      {data.map(e => (
        <LinkWrap
          key={e._id}
          href={`/${name}/${e._id}`}
          className="inline-flex items-center justify-center w-64 h-32 rounded font-semibold text-white"
          style={{
            backgroundColor:
              boxColor || e.primaryColor || "var(--chakra-colors-blue-500)",
          }}
        >
          {e.name}
        </LinkWrap>
      ))}
      <LinkWrap
        className="inline-flex items-center justify-center w-64 h-32 rounded text-white bg-gray-600"
        href={{
          pathname: `/${name}/new`,
          query: refId ? { ref: refId } : undefined,
        }}
      >
        <Icon as={FaPlus} className="w-7 h-7" />
      </LinkWrap>
    </div>
  </>
));

export default Boxes;

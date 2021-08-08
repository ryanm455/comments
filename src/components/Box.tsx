import { FC, memo } from "react";

import { FaPlus } from "react-icons/fa";

import { Button } from "@windmill/react-ui";

import LinkWrap from "./LinkWrap";

type IData = {
  id: string;
  name: string;
};

const Boxes: FC<{
  data: IData[];
  name: string;
  header: string;
  add?: () => any;
}> = memo(({ data, name, header, add }) => (
  <>
    <h1 className="text-3xl mb-4 font-semibold">{header}</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {data.map(e => (
        <Button
          key={e.id}
          block
          tag={LinkWrap}
          href={`/dashboard/${name}/${e.id}`}
          className="h-32"
          layout="outline"
          size="larger"
        >
          {e.name}
        </Button>
      ))}
      <Button
        className="h-32"
        block
        onClick={add}
        layout="outline"
        icon={FaPlus}
        size="larger"
      />
    </div>
  </>
));

export default Boxes;

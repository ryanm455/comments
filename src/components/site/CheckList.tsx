import {
  FC,
  memo,
} from "react";

import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";

import type { Site } from "@prisma/client";

export type ICheckList = {
  label: string;
  c: keyof Site;
  defaultValue?: boolean;
};

const Mapped: FC<ICheckList> = ({ label, c, defaultValue = false }) => {
  return (
    <div>
      <Label check>
        <Input
          type="checkbox"
          name={c}
          defaultChecked={defaultValue}
        />
        <span className="ml-2">{label}</span>
      </Label>
    </div>
  );
};

const CheckList: FC<{
  list: ICheckList[];
}> = memo(({ list }) => (
  <>
    {list.map(e => (
      <Mapped key={e.label} {...e} />
    ))}
  </>
));

export default CheckList;

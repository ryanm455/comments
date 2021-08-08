import { FC, memo } from "react";

import { useField } from "hooked-form";

import type { Site } from "@prisma/client";
import { Input, Label } from "@windmill/react-ui";

export type ICheckList = {
  label: string;
  c: keyof Site;
};

const Mapped: FC<ICheckList> = ({ label, c }) => {
  const [{ onChange }, { value }] = useField<boolean>(c);

  return (
    <div>
      <Label check>
        <Input
          type="checkbox"
          checked={value}
          onChange={e => onChange(e.target.checked)}
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

import { FC, memo } from "react";

import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { useField } from "hooked-form";

import type { Site } from "@prisma/client";

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

import { useField } from "hooked-form";
import { FC, memo } from "react";

import { Checkbox } from "@chakra-ui/react";

import type { ISite } from "types/db";

export type ICheckList = {
  label: string;
  c: keyof ISite;
};

const Mapped: FC<ICheckList> = ({ label, c }) => {
  const [{ onChange }, { value }] = useField<boolean>(c);

  return (
    <div>
      <Checkbox isChecked={value} onChange={e => onChange(e.target.checked)}>
        {label}
      </Checkbox>
    </div>
  );
};

const CheckList: FC<{
  list: ICheckList[];
}> = memo(function CheckList({ list }) {
  return (
    <>
      {list.map(e => (
        <Mapped key={e.label} {...e} />
      ))}
    </>
  );
});

export default CheckList;

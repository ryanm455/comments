import { useField } from "hooked-form";
import dynamic from "next/dynamic";
import { memo, Fragment, FC } from "react";
import classNames from "classnames";

import { colors } from "./utils";

import type { ISite } from "types/db";

const CustomColor = dynamic(() => import("./CustomColor"), { ssr: false });

const ThemeSelect: FC<{
  name: string;
  edit: keyof ISite;
}> = memo(({ name, edit }) => {
  const [{ onChange }, { value }] = useField<string>(edit);

  return (
    <Fragment key={edit}>
      <h2 className="font-semibold text-2xl my-4">{name}</h2>
      <div className="flex flex-wrap gap-3">
        {colors.map(e => (
          <div
            className={classNames("w-6 h-6 rounded-md", {
              ring: e === value,
            })}
            style={{ backgroundColor: e }}
            key={e}
            onClick={() => onChange(e)}
          />
        ))}
        <CustomColor
          value={value}
          onChange={onChange}
          selected={!colors.includes(value)}
        />
      </div>
    </Fragment>
  );
});

export default ThemeSelect;

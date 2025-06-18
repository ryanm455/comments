import {
  memo,
  useState,
} from "react";

import { Select } from "components/ui/Select";
import { providerReadable } from "lib/utils";

import { Provider } from "@prisma/client";

type Props = {
  name: string;
  defaultValue?: Provider[];
}

const OptionSelect = memo(({ name, defaultValue = [] }: Props) => {
  const [value, onChange] = useState<Provider[]>(defaultValue);

  return (
    <label className="block">
      <p className="text-base leading-4 my-3 font-medium">
        Select Auth Providers
      </p>
      <input hidden name={name} value={value} readOnly />
      <Select
        multiple
        onChange={e =>
          onChange(
            Array.from(e.currentTarget.selectedOptions).map(
              e => e.value as Provider
            )
          )
        }
      >
        {Object.entries(Provider).map(([label, v]) => (
          <option value={v} key={v} selected={value.includes(v)}>
            {providerReadable(label as Provider)}
          </option>
        ))}
      </Select>
    </label>
  );
});

export default OptionSelect;

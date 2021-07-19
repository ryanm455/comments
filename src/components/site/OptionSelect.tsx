import { useField } from "hooked-form";
import { memo } from "react";
import { Provider } from "types/db";
import { Select } from "@windmill/react-ui";

const OptionSelect = memo(() => {
  const [{ onChange }, { value }] = useField<Provider[]>("providers");

  return (
    <label className="block">
      <p className="text-base leading-4 my-3 font-medium">
        Select Auth Providers
      </p>
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
            {label}
          </option>
        ))}
      </Select>
    </label>
  );
});

export default OptionSelect;

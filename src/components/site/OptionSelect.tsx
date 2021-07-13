import { useField } from "hooked-form";
import { findKey } from "lodash-es";
import dynamic from "next/dynamic";
import { Provider } from "types/db";

import { selectOptions } from "./utils";

// @ts-ignore
const AutoComplete = dynamic(() =>
  import("chakra-ui-autocomplete").then(e => e.CUIAutoComplete)
);

export interface IItem {
  label: string;
  value: string;
}

const OptionSelect = () => {
  const [{ onChange }, { value }] = useField<Provider[]>("providers");

  const selectedItems = value.map((val: Provider) => ({
    label: findKey(Provider, v => v === val) as string,
    value: val,
  }));

  const handleSelectedItemsChange = (
    s?: IItem[] // set as somehow duplicates some if added more than once. wtf?!?
  ) => s && onChange(Array.from(new Set(s.map(e => e.value as Provider))));

  return (
    <AutoComplete // @ts-ignore why error wtf i was just following the docs i cba to investigate.
      label="Select providers"
      placeholder="Type a provider"
      inputStyleProps={{ mt: "-0.5rem" }}
      toggleButtonStyleProps={{ mt: "-0.5rem !important" }}
      labelStyleProps={{ m: 0, mt: 4 }}
      tagStyleProps={{ mb: "0.5rem !important" }}
      items={selectOptions}
      selectedItems={selectedItems}
      disableCreateItem
      onSelectedItemsChange={(changes: { selectedItems: IItem[] }) =>
        handleSelectedItemsChange(changes.selectedItems)
      }
    />
  );
};

export default OptionSelect;

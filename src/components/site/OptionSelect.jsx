import { useField } from "hooked-form";
import { findKey } from "lodash-es";
import dynamic from "next/dynamic";
import { memo } from "react";
import { Provider } from "types/db";

import { selectOptions } from "./utils";

const AutoComplete = dynamic(() =>
  import("chakra-ui-autocomplete").then(e => e.CUIAutoComplete)
);

const OptionSelect = memo(() => {
  const [{ onChange }, { value }] = useField("providers");

  const selectedItems = value.map(val => ({
    label: findKey(Provider, v => v === val),
    value: val,
  }));

  const handleSelectedItemsChange = s =>
    s && onChange(Array.from(new Set(s.map(e => e.value)))); // items duplicate ??

  return (
    <AutoComplete
      label="Select providers"
      placeholder="Type a provider"
      inputStyleProps={{ mt: "-0.5rem" }}
      toggleButtonStyleProps={{ mt: "-0.5rem !important" }}
      labelStyleProps={{ m: 0, mt: 4 }}
      tagStyleProps={{ mb: "0.5rem !important" }}
      items={selectOptions}
      selectedItems={selectedItems}
      disableCreateItem
      onSelectedItemsChange={changes =>
        handleSelectedItemsChange(changes.selectedItems)
      }
    />
  );
});

export default OptionSelect;

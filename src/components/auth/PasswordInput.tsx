import {
  ComponentProps,
  useReducer,
} from "react";

import { Input } from "components/ui/Input";

const PasswordInput = (props: ComponentProps<typeof Input>) => {
  const [show, toggleShow] = useReducer(s => !s, false);

  return (
    <Input className="pr-16" type={show ? "text" : "password"} {...props} />
  );
};

export default PasswordInput;

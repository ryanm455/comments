import { useState, FC, ComponentProps } from "react";
import { Input } from "@windmill/react-ui";

const PasswordInput: FC<ComponentProps<typeof Input>> = props => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Input className="pr-16" type={show ? "text" : "password"} {...props} />
  );
};

export default PasswordInput;

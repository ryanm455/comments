import { memo } from "react";

const BoldText = memo(props => (
  <span
    className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-green-500 via-purple-500 to-blue-500"
    {...props}
  />
));

export default BoldText;

import { memo } from "react";

import Markdown from "markdown-to-jsx";

const ChakraMarkdown = memo(props => <Markdown {...props} />);

export default ChakraMarkdown;

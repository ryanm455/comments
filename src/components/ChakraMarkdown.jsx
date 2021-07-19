import Markdown from "markdown-to-jsx";
import { memo } from "react";

const ChakraMarkdown = memo(props => (
  <Markdown
    // options={{
    //   overrides: {
    //     a: props => <Link color="blue.400" {...props} />,
    //     blockquote: props => <Code p={1} {...props} />,
    //     code: props => <Code p={1} {...props} />,
    //     em: props => <em {...props} />,
    //     h1: props => <h1 className="text-2xl" {...props} />,
    //     h2: props => <h2 className="text-xl" {...props} />,
    //     h3: props => <h3 className="text-lg" {...props} />,
    //     h4: props => <h4 className="text-md" {...props} />,
    //     h5: props => <h5 className="text-sm" {...props} />,
    //     h6: props => <h6 className="text-xs" {...props} />,
    //     p: props => <p className="my-3" {...props} />,
    //     table: Table,
    //     tbody: Tbody,
    //     td: Td,
    //     th: Th,
    //     thead: Thead,
    //     tr: Tr,
    //   },
    // }}
    {...props}
  />
));

export default ChakraMarkdown;

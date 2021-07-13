import { memo, FC } from "react";
import { FaPlus } from "react-icons/fa";

import { Box, Flex, Heading, Icon } from "@chakra-ui/react";

import LinkWrap from "./LinkWrap";

type IData = {
  _id: string;
  name: string;
  primaryColor?: string;
};

const Boxes: FC<{
  data: IData[];
  name: string;
  header: string;
  refId?: string;
  headCenter?: boolean;
  boxColor?: string;
}> = memo(function Boxes({ data, name, header, refId, headCenter, boxColor }) {
  return (
    <>
      <Heading mb={4} textAlign={headCenter ? "center" : undefined}>
        {header}
      </Heading>
      <Flex gridGap={3} flexWrap="wrap" justifyContent="space-around">
        {data.map(e => (
          <Box
            as={LinkWrap}
            key={e._id}
            href={`/${name}/${e._id}`}
            d="inline-flex"
            alignItems="center"
            justifyContent="center"
            w={64}
            h={32}
            rounded="md"
            textColor="white"
            fontWeight="semibold"
            bg={boxColor || e.primaryColor || "blue.500"}
          >
            {/* values.primaryColor */}
            {e.name}
          </Box>
        ))}
        <Box
          as={LinkWrap}
          d="inline-flex"
          alignItems="center"
          justifyContent="center"
          w={64}
          h={32}
          rounded="md"
          textColor="white"
          bg="gray.600"
          href={{
            pathname: `/${name}/new`,
            query: refId ? { ref: refId } : undefined,
          }}
        >
          <Icon as={FaPlus} w={7} h={7} />
        </Box>
      </Flex>
    </>
  );
});

export default Boxes;

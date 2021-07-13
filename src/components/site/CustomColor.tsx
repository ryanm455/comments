import { FaPaintBrush } from "react-icons/fa";
import { HexColorPicker } from "react-colorful";
import { Popover } from "react-tiny-popover";
import { useState } from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";

const CustomColor: React.FC<{
  value: string;
  onChange: (c: string) => void;
  selected: boolean;
}> = ({ value, onChange, selected }) => {
  const [isPopoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [color, setColor] = useState(value);
  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["top", "bottom", "left", "right"]} // preferred positions by priority
      padding={10}
      content={<HexColorPicker color={color} onChange={setColor} />}
      onClickOutside={() => (setPopoverOpen(false), onChange(color))}
    >
      <Box
        w={6}
        h={6}
        rounded="md"
        pos="relative"
        boxShadow={
          selected
            ? "0 0 0 0px #fff, 0 0 0 calc(3px + 0px) rgba(96, 165, 250, 0.5), 0 0 transparent"
            : undefined
        }
        style={{ backgroundColor: color }}
        onClick={() => setPopoverOpen(i => !i)}
      >
        <Flex
          pos="absolute"
          top={0}
          left={0}
          justifyContent="center"
          alignItems="center"
          w="full"
          h="full"
          pointerEvents="none"
        >
          <Icon as={FaPaintBrush} style={{ color }} filter="invert(100%)" />
        </Flex>
      </Box>
    </Popover>
  );
};

export default CustomColor;

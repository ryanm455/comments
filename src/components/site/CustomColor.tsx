"use client"
import { useState } from "react";

import Icon from "components/ui/Icon";
import { HexColorPicker } from "react-colorful";
import { Popover } from "react-tiny-popover";

import { FaPaintBrush } from "@react-icons/all-files/fa/FaPaintBrush";

type Props = {
  value: string;
  onChange: (c: string) => void;
  selected: boolean;
}

const CustomColor = ({ value, onChange, selected }: Props) => {
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
      <div
        className="w-6 h-6 rounded-md relative ring"
        style={{ backgroundColor: color }}
        onClick={() => setPopoverOpen(i => !i)}
      >
        <div className="flex absolute top-0 left-0 justify-center items-center w-full h-full pointer-events-none">
          <Icon as={FaPaintBrush} style={{ color }} className="invert" />
        </div>
      </div>
    </Popover>
  );
};

export default CustomColor;

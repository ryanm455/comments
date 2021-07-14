import { useField } from "hooked-form";
import dynamic from "next/dynamic";
import { memo, Fragment, FC } from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

import { colors } from "./utils";

import type { ISite } from "types/db";

const CustomColor = dynamic(() => import("./CustomColor"), { ssr: false });

const ThemeSelect: FC<{
  name: string;
  edit: keyof ISite;
}> = memo(({ name, edit }) => {
  const [{ onChange }, { value }] = useField<string>(edit);

  return (
    <Fragment key={edit}>
      <Heading size="md" className="font-semibold text-2xl my-4" my={4}>
        {name}
      </Heading>
      <Flex flexWrap="wrap" gridGap={3}>
        {colors.map(e => (
          <Box
            w={6}
            h={6}
            rounded="md"
            boxShadow={
              e === value
                ? "0 0 0 0px #fff, 0 0 0 calc(3px + 0px) rgba(96, 165, 250, 0.5), 0 0 transparent"
                : undefined
            }
            bg={e}
            key={e}
            onClick={() => onChange(e)}
          />
        ))}
        <CustomColor
          value={value}
          onChange={onChange}
          selected={!colors.includes(value)}
        />
      </Flex>
    </Fragment>
  );
});

export default ThemeSelect;

import { useMemo } from "react";

import { shadeColor } from "./utils";

type Props = {
    primaryColor: string;
    errorColor: string;
};

const EmbedThemeStyling = ({
    primaryColor,
    errorColor,
}: Props) => {
    const primary600 = useMemo(
        () => shadeColor(primaryColor, -20),
        [primaryColor]
    );

    const primary700 = useMemo(
        () => shadeColor(primaryColor, -40),
        [primaryColor]
    );


    return (<style>{`
        :root {
          --color-primary-500: ${primaryColor};
          --color-primary-600: ${primary600};
          --color-primary-700: ${primary700};
          --color-error: ${errorColor};
        }
      `}</style>)
}

export default EmbedThemeStyling;
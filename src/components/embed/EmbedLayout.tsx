import { useMemo } from "react";

import { shadeColor } from "./utils";

import type { ISettings } from "types/embed";

const EmbedLayout: React.FC<{ settings: ISettings }> = ({
  children,
  settings: { primaryColor, errorColor },
}) => {
  const primary600 = useMemo(
    () => shadeColor(primaryColor, -20),
    [primaryColor]
  );

  const primary700 = useMemo(
    () => shadeColor(primaryColor, -40),
    [primaryColor]
  );

  return (
    <>
      {children}
      <style jsx global>{`
        :root {
          --primary-500: ${primaryColor};
          --primary-600: ${primary600};
          --primary-700: ${primary700};
          --error-color: ${errorColor};
        }

        body::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default EmbedLayout;

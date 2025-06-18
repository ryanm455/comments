import { useState } from "react";

import classNames from "classnames";

import { FaStar } from "@react-icons/all-files/fa/FaStar";

const ModifyableRatingField = ({
  defaultRating = 0,
  name,
}: {
  defaultRating?: number;
  name: string;
}) => {
  const [selected, setSelected] = useState(defaultRating);

  return (
    <div className="flex gap-2 items-center my-2">
      <p className="text-base leading-4 font-medium">Rating</p>
      <p className="text-xs ml-[calc(var(--spacing)*-1.5)]">
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <FaStar
              className={classNames(
                "ml-1.5 w-4 h-4 inline-block leading-4 flex-shrink-0",
                {
                  "text-yellow-400": selected >= idx + 1,
                }
              )}
              size="13px"
              key={`f-${idx}`}
              onClick={() => setSelected(idx + 1)}
            />
          ))}
        <input value={selected} name={name} readOnly hidden />
      </p>
    </div>
  );
};

export default ModifyableRatingField;

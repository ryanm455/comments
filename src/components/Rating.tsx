import classNames from "classnames";

import { FaStar } from "@react-icons/all-files/fa/FaStar";

const Rating = ({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) => (
  <p
    className={classNames(
      "mb-2 text-xs ml-[calc(var(--spacing)*-1.5)]",
      className
    )}
  >
    {Array(rating)
      .fill(0)
      .map((_, idx) => (
        <FaStar
          className="ml-1.5 w-4 h-4 inline-block leading-4 flex-shrink-0 text-yellow-400"
          size="13px"
          key={`f-${idx}`}
        />
      ))}
    {Array(5 - rating)
      .fill(0)
      .map((_, idx) => (
        <FaStar
          className="ml-1.5 w-4 h-4 inline-block leading-4 flex-shrink-0"
          size="13px"
          key={`u-${idx}`}
        />
      ))}
  </p>
);

export default Rating;

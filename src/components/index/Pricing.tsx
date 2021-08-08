import B from "components/BoldText";
import LinkWrap from "components/LinkWrap";

import { Button, Card, CardBody } from "@windmill/react-ui";

const Pricing = () => (
  <div className="flex w-full py-4 items-center justify-center">
    <Card className="max-w-7xl px-4 py-20 mx-auto w-full md:w-[60%] text-left md:text-center">
      <CardBody>
        <p className="mb-2 text-5xl font-bold md:font-extrabold leading-tight">
          $9
          <span className="text-2xl font-medium text-gray-600 dark:text-gray-400">
            {" "}
            per <B>month</B> for businesses
          </span>
        </p>
        <p className="mb-6 text-sm sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Otherwise completely <B>free</B> for hobbyists and students.
        </p>
        <div className="flex items-center gap-2 justify-center flex-col md:flex-row">
          <Button layout="blue" tag={LinkWrap} href="/signup">
            Get started
          </Button>
          <Button>Contact Us</Button>
        </div>
      </CardBody>
    </Card>
  </div>
);

export default Pricing;

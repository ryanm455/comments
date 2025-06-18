import B from "components/ui/BoldText";
import { Button } from "components/ui/Button";
import { Card } from "components/ui/Card";
import LinkWrap from "components/ui/LinkWrap";

const Pricing = () => (
  <div className="flex w-full py-4 items-center justify-center">
    <Card className="max-w-7xl px-4 py-20 mx-auto w-full md:w-[60%] text-left md:text-center">
      <p className="mb-2 text-5xl font-bold md:font-extrabold leading-tight">
        $0
        <span className="text-2xl font-medium text-gray-600 dark:text-gray-400">
          {" "}
          per <B>month</B> for everyone
        </span>
      </p>
      <p className="mb-6 text-sm sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">
        Yeah... <B>free</B> for everyone as this ain&quot;t a legit thing but I mean it works though :/
      </p>
      <div className="flex items-center gap-2 justify-center flex-col md:flex-row">
        <Button layout="blue" tag={LinkWrap} href="/auth/signup">
          Get started
        </Button>
        <Button>Contact Us</Button>
      </div>
    </Card>
  </div>
);

export default Pricing;

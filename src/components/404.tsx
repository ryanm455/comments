import Image from "next/image";

import image404 from "../../public/undraw_not_found_60pq.svg";

const Custom404 = () => (
  <div className="screen-nav grid place-items-center">
    <div className="text-center max-w-full w-80">
      <div className="relative">
        <Image src={image404} alt="404 image" className="dark:invert" />
        <h1 className="absolute inset-0 text-8xl font-semibold">404</h1>
      </div>

      <p className="mt-3">Page Not Found</p>
    </div>
  </div>
);

export default Custom404;

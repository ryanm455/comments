import Embed from "components/index/Embed";
import Header from "components/index/Header";
import Pricing from "components/index/Pricing";

const Home = () => (
  <>
    <div className="container px-4 max-w-5xl mx-auto">
      <Header />
      <Pricing />
      <Embed />
    </div>
  </>
);

export default Home;

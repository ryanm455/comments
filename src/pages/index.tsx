import Embed from "components/index/Embed";
import Header from "components/index/Header";
import Pricing from "components/index/Pricing";

import { Container } from "@chakra-ui/layout";

const Home = () => (
  <>
    <Container maxW="5xl">
      <Header />
    </Container>
    <Pricing />
    <Embed />
  </>
);

export default Home;

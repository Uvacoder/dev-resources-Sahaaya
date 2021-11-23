import { chakra, Button, Heading, Container } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <Container maxW="container.md">
      <chakra.div pt="32">
        <Heading size="4xl" my={4}>
          Lumberg
        </Heading>
        <chakra.p color="gray.500" pb="4">
          Resources for Javascript Developers
        </chakra.p>
        <Button
          rightIcon={<ArrowForwardIcon />}
          onClick={() => router.push("/resources")}>
          abcResources
        </Button>
      </chakra.div>
    </Container>
  );
};

export default Home;

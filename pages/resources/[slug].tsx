import {
  GetStaticPaths,
  GetStaticProps,
} from "next";
import React from "react";
import {
  getAllResources,
  getResourcesBySlug,
} from "utils/mdx";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Alert, chakra, Flex } from "@chakra-ui/react";
import Head from "next/head";
import {
  ExternalLink,
  H1,
  H2,
  Sidebar,
  MDXListItem,
  Quotes,
} from "components/mdxComponents";

const components = {
  a: ExternalLink,
  h1: H1,
  h2: H2,
  li: MDXListItem,
  Head,
  blockquote: Quotes,
};

const ContentDisplay = ({
  source,
  frontMatter,
  resources,
}: any) => {
  return (
    <Flex>
      <chakra.div
        pos="sticky"
        top="4rem"
        h="90vh"
        paddingRight="6"
        borderRightWidth="thin"
        borderRightColor="inherit"
        width={["0", "0", "20%"]}
        display={["none", "none", "block"]}
      >
        <Sidebar
          variant="left"
          resources={resources}
        />
      </chakra.div>
      <chakra.div
        p="6"
        fontSize="sm"
        fontFamily="serif"
        width={["100%"]}
      >
        <MDXRemote
          {...source}
          components={components}
        />
      </chakra.div>
      <chakra.div
        pos="sticky"
        top="4rem"
        h="85vh"
        width={["0", "0", "30%"]}
        display={["none", "none", "block"]}
      >
        <Sidebar
          variant="right"
          sections={frontMatter.sections}
        />
      </chakra.div>
    </Flex>
  );
};

export const getStaticProps: GetStaticProps =
  async ({ params }: any) => {
    const resource = getResourcesBySlug(
      params.slug
    );
    const resources = getAllResources();
    const { content, data } = resource;
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
      scope: data,
    });

    return {
      props: {
        source: mdxSource,
        frontMatter: data,
        resources,
      },
    };
  };

export const getStaticPaths: GetStaticPaths =
  () => {
    const resources = getAllResources();

    return {
      paths: resources.map((resource) => {
        return {
          params: {
            slug: resource.data.slug,
          },
        };
      }),
      fallback: false,
    };
  };

export default ContentDisplay;

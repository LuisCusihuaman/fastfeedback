import Head from 'next/head';
import { Button, Code, Flex, Text } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { FastFeedbackIcon } from 'public/icons';

export default function Home() {
  const auth = useAuth();

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <FastFeedbackIcon boxSize="64px" />
      <Text>
        Current user: <Code>{auth.user ? auth.user.email : 'None'}</Code>
      </Text>
      {auth.user ? (
        <Button mt={4} onClick={(e) => auth.signout()}>
          Sign Out
        </Button>
      ) : (
        <Button mt={4} onClick={(e) => auth.signinWithGitHub()}>
          Sign In
        </Button>
      )}
    </Flex>
  );
}

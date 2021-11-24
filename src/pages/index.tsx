import React from 'react'
import Head from 'next/head'
import { VStack, Heading, HStack } from '@chakra-ui/react'

import { UsersList } from 'components/users-list'
import { AddUserModal } from 'components/add-user-modal'

export default function Home() {
  return (
    <>
      <Head>
        <title>Listagem de usuários</title>

        <meta
          name="description"
          content="Aplicacão simples de cadastro/lsitagem de usuários "
        />
      </Head>

      <VStack
        as="main"
        w="full"
        maxW={1200}
        mx="auto"
        mt="20"
        px="6"
        spacing="16"
        borderRadius="lg"
      >
        <HStack w="full" justify="space-between" align="center">
          <Heading as="h1" size="xl">
            Usuários
          </Heading>

          <AddUserModal />
        </HStack>

        <UsersList />
      </VStack>
    </>
  )
}

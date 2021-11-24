import React from 'react'
import { Heading, VStack } from '@chakra-ui/react'

import { AddUserModal } from './add-user-modal'

export function UsersEmptyState() {
  return (
    <VStack
      width="full"
      borderRadius="8px"
      p={4}
      mt={28}
      justify="center"
      align="center"
    >
      <Heading textAlign="center" size="lg" mb={3}>
        Não possui nenhum usuário cadastro.
      </Heading>

      <AddUserModal>Adicionar primeiro usuário</AddUserModal>
    </VStack>
  )
}

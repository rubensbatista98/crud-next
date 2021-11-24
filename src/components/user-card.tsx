import { VStack, Heading, HStack, Box, Text } from '@chakra-ui/react'

import type { User } from 'types/users'

import { EditUserModal } from './edit-user-modal'
import { DeleteUserButton } from './delete-user-button'

type Props = {
  user: User
}

export function UserCard({ user }: Props) {
  const { name, email, phone, cpf } = user

  return (
    <Box borderRadius="lg" w="100%" p="5" bg="gray.700">
      <VStack align="flex-start" justify="space-around" spacing="3" h="full">
        <Heading size="lg">{name}</Heading>

        <HStack justify="space-between" w="full">
          <VStack align="flex-start" spacing="1">
            <Text>{email}</Text>
            <Text>{cpf}</Text>
            <Text>{phone}</Text>
          </VStack>

          <HStack spacing="2" alignSelf="flex-end">
            <EditUserModal user={user} />
            <DeleteUserButton userId={user.id} />
          </HStack>
        </HStack>
      </VStack>
    </Box>
  )
}

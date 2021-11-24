import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Button,
  Icon,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { FaTrashAlt } from 'react-icons/fa'

import { useUsers } from 'contexts/users'

export function DeleteUserButton({ userId }: { userId: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef<HTMLButtonElement>()

  const { deleteUser } = useUsers()

  const handleDelete = () => {
    deleteUser(userId)
  }

  return (
    <>
      <IconButton
        colorScheme="red"
        aria-label="Deletar usuário"
        onClick={onOpen}
        isRound
        icon={<Icon as={FaTrashAlt} boxSize={4} />}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Deletar Usuário
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text mb="2">
              Tem certeza ? Esta operação não pode ser desfeita.
            </Text>

            <Text fontWeight="bold">
              Os dados do usuário serão excluidos permanentemente.
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>

            <Button
              fontWeight="bold"
              colorScheme="red"
              ml={3}
              onClick={handleDelete}
            >
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

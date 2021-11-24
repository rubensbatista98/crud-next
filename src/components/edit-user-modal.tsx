import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  IconButton,
  Icon,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { BiEdit } from 'react-icons/bi'
import { useForm, SubmitHandler } from 'react-hook-form'

import { useUsers } from 'contexts/users'
import type { User } from 'types/users'

import { ChakraInputMask } from './chakra-input-mask'

type FormData = {
  name: string
  email: string
  phone: string
}

type Props = {
  user: User
}

export function EditUserModal({ user }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, formState, handleSubmit, reset } = useForm()
  const toast = useToast()

  const { updateUser } = useUsers()

  const { errors } = formState

  const onSubmit: SubmitHandler<FormData> = (values) => {
    try {
      updateUser(user.id, values)
      handleClose()

      toast({
        description: 'Os dados do usuário foram atualizados com sucesso!',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true
      })
    } catch (error) {
      toast({
        description:
          'Houve um erro ao tentar atualizar os dados do usuário. Tente novamente!',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true
      })
    }
  }

  const handleClose = () => {
    onClose()
    reset()
  }

  return (
    <>
      <IconButton
        colorScheme="purple"
        aria-label="Atualizar dados do usuário"
        isRound
        icon={<Icon as={BiEdit} boxSize={6} />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={handleClose} motionPreset="slideInBottom">
        <ModalOverlay />

        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader fontWeight="bold">Editar Usuário</ModalHeader>

          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl isInvalid={!!errors?.name}>
              <FormLabel>Nome</FormLabel>

              <Input
                id="name"
                defaultValue={user.name}
                name="name"
                {...register('name', {
                  required: 'Nome obrigátorio.',
                  minLength: {
                    value: 3,
                    message: 'O nome deve conter pelo menos duas letras.'
                  }
                })}
              />

              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={!!errors?.email}>
              <FormLabel>E-mail</FormLabel>

              <Input
                id="email"
                defaultValue={user.email}
                name="email"
                {...register('email', {
                  required: 'Email obrigátorio ',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Informe um e-mail válido.'
                  }
                })}
              />

              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={!!errors?.phone}>
              <FormLabel>Telefone</FormLabel>

              <ChakraInputMask
                name="phone"
                defaultValue={user.phone}
                mask="(99) 99999-9999"
                {...register('phone', {
                  required: 'Telefone obrigátorio',
                  minLength: {
                    value: 14,
                    message: 'Informe o telefone completo'
                  }
                })}
              />

              <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isDisabled>
              <FormLabel>CPF</FormLabel>
              <Input id="cpf" name="cpf" defaultValue={user.cpf} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              fontWeight="medium"
              colorScheme="red"
              onClick={handleClose}
            >
              Cancelar
            </Button>

            <Button colorScheme="green" fontWeight="medium" type="submit">
              Editar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

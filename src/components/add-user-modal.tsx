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
  Button,
  Icon,
  FormErrorMessage,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { RiAddFill } from 'react-icons/ri'

import { useUsers } from 'contexts/users'

import { ChakraInputMask } from './chakra-input-mask'

type FormData = {
  name: string
  email: string
  phone: string
  cpf: string
}

type Props = {
  children?: React.ReactNode
}

export function AddUserModal({ children = 'Novo usuário' }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, formState, handleSubmit, reset } = useForm()
  const toast = useToast()

  const { createUser } = useUsers()

  const { errors } = formState

  const onSubmit: SubmitHandler<FormData> = (values) => {
    try {
      createUser(values)
      handleClose()

      toast({
        description: 'Usuário adicionado!',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true
      })
    } catch (error) {
      toast({
        description:
          'Houve um erro ao tentar adicionar o usuário. Tente novamente',
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
      <Button
        size="sm"
        colorScheme="pink"
        cursor="pointer"
        onClick={onOpen}
        iconSpacing="1"
        leftIcon={<Icon as={RiAddFill} boxSize={6} />}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose} motionPreset="scale">
        <ModalOverlay />

        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader fontWeight="bold">Novo Usuário</ModalHeader>

          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl isInvalid={!!errors?.name}>
              <FormLabel>Nome</FormLabel>

              <Input
                id="name"
                placeholder="Nome"
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
                placeholder="example@gmail.com"
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
                placeholder="(99) 99999-9999"
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

            <FormControl mt={4} isInvalid={!!errors?.cpf}>
              <FormLabel>CPF</FormLabel>

              <ChakraInputMask
                name="cpf"
                placeholder="999.999.999-99"
                mask="999.999.999-99"
                {...register('cpf', {
                  required: 'CPF obrigátorio',
                  minLength: {
                    value: 14,
                    message: 'Informe o CPF completo'
                  }
                })}
              />

              <FormErrorMessage>{errors.cpf?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} fontWeight="medium" onClick={handleClose}>
              Fechar
            </Button>

            <Button colorScheme="green" fontWeight="medium" type="submit">
              Criar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

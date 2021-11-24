import React from 'react'
import { Input as ChakraInput, InputProps } from '@chakra-ui/react'
import InputMask, { Props as InputMaskProps } from 'react-input-mask'

type Props = InputMaskProps & InputProps

export const ChakraInputMask = React.forwardRef<HTMLInputElement, Props>(
  function Input(props, ref) {
    return <ChakraInput ref={ref} as={InputMask} {...props} />
  }
)

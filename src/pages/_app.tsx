import { ChakraProvider } from '@chakra-ui/react'

import UsersProvider from 'contexts/users'
import theme from 'styles/theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <UsersProvider>
        <Component {...pageProps} />
      </UsersProvider>
    </ChakraProvider>
  )
}

export default MyApp

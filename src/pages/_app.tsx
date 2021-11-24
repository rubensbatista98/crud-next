import { ChakraProvider } from '@chakra-ui/react'

import UsersProvider from 'contexts/users'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <UsersProvider>
        <Component {...pageProps} />
      </UsersProvider>
    </ChakraProvider>
  )
}

export default MyApp

import { Grid, Box, VStack, Skeleton } from '@chakra-ui/react'

function UserSkeleton() {
  return (
    <Box borderRadius="lg" w="full" p="5" bg="gray.700">
      <VStack
        w="80%"
        align="stretch"
        justify="space-around"
        spacing="4"
        h="full"
      >
        <Skeleton height="30px" speed={1.5} />

        <VStack align="stretch" w="60%" spacing="1.5">
          <Skeleton height="20px" speed={1.5} />
          <Skeleton height="20px" speed={1.5} />
        </VStack>
      </VStack>
    </Box>
  )
}

export function UsersListSkeleton() {
  return (
    <Grid
      w="full"
      gap="6"
      px="3"
      justifyContent="center"
      templateColumns="repeat(auto-fill, minmax(310px, 360px))"
    >
      <UserSkeleton />
      <UserSkeleton />
      <UserSkeleton />
      <UserSkeleton />
      <UserSkeleton />
    </Grid>
  )
}

import { Grid } from '@chakra-ui/react'

import { useUsers } from 'contexts/users'

import { UserCard } from './user-card'
import { UsersEmptyState } from './users-empty-state'
import { UsersListSkeleton } from './users-list-skeleton'

export function UsersList() {
  const { users } = useUsers()

  if (!users) {
    return <UsersListSkeleton />
  }

  if (!users.length) {
    return <UsersEmptyState />
  }

  return (
    <Grid
      w="full"
      gap="6"
      px="3"
      justifyContent="center"
      templateColumns="repeat(auto-fill, minmax(310px, 360px))"
    >
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </Grid>
  )
}

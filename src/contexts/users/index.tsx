import React from 'react'
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore'

import firebase from 'lib/firebase'
import type { User } from 'types/users'

type Context = {
  users: User[]
  deleteUser: (id: string) => void
  createUser: (data: Omit<User, 'id' | 'createdAt'>) => Promise<void>
  updateUser: (
    userId: string,
    newValues: Omit<User, 'id' | 'createdAt' | 'cpf'>
  ) => Promise<void>
}

type Props = {
  children: React.ReactNode
}

const UsersContext = React.createContext<Context>(null)

const db = getFirestore(firebase)
const usersRef = collection(db, 'users')

export default function Provider({ children }: Props) {
  const [users, setUsers] = React.useState(null)

  React.useEffect(() => {
    const q = query(usersRef, orderBy('createdAt', 'asc'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as User[]

      setUsers(users)
    })

    return unsubscribe
  }, [])

  const createUser = React.useCallback<Context['createUser']>(async (data) => {
    await addDoc(usersRef, {
      ...data,
      createdAt: Date.now()
    })
  }, [])

  const deleteUser = React.useCallback<Context['deleteUser']>(
    async (id: string) => {
      const docRef = doc(usersRef, id)

      await deleteDoc(docRef)
    },
    []
  )

  const updateUser = React.useCallback<Context['updateUser']>(
    async (userId, newValues) => {
      const docRef = doc(usersRef, userId)

      await updateDoc(docRef, {
        ...newValues
      })
    },
    []
  )

  return (
    <UsersContext.Provider
      value={{ users, createUser, deleteUser, updateUser }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export function useUsers() {
  const context = React.useContext(UsersContext)

  if (context == null) {
    throw new Error('useUsers must be use within UsersProvider')
  }

  return context
}

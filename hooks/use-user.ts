import { User } from '@prisma/client'
import { create } from 'zustand'

type Store = {
  user: User|null
  setUser: (data:User) => void,
  isLoading :boolean,
  setIsloading :(data:boolean)=>void
}
export const useUser = create<Store>()((set) => ({
  user: null,
  setUser: (data:User|null) => set(() => ({ user: data})),
  isLoading: true,
  setIsloading: (data:boolean) => set(() => ({isLoading: data }))
}))
import { PublicUser } from "@/lib/actions/actions";
import { create } from "zustand";



type Store = {
    users: PublicUser[]
    setUsers: (data:PublicUser[]) => void,
    isLoading :boolean,
    setIsloading :(data:boolean)=>void
  }
export const useUserSearch = create<Store>((set)=>({
    users: [],
    setUsers: (data:PublicUser[]) => set(() => ({ users: data})),
    isLoading :false,
    setIsloading :(data:boolean)=> set(() => ({isLoading: data }))
}))
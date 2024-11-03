import { UserDetails } from "@/type/user";
import { User } from "@prisma/client";
import { useUser } from "./use-user";

export const useOtherUser = (users:User[]|UserDetails[])=>{
    const {user } = useUser()
    const otherusers = users.filter((u)=>u.email!==user?.email);
    return otherusers
}
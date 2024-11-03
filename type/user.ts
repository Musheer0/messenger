import { Message, Prisma } from "@prisma/client";

export interface UserDetails {
    image: string | null;
    name: string | null;
    email: string | null;
}
export type UserDetailsSelect = Prisma.UserGetPayload<{
    select:{
        image: true,
        name: true,
        email: true
    }
}>

export interface ConversationType {
    id: string;
    createdAt: string;
    lastMessage: string | null;
    isSeenLastMsg: boolean;
    lastMessageAt: string;
    name: string | null;
    isGroup: boolean;
    users: { user: UserDetails }[];
    messages:Message[]
}

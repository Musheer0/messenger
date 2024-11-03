import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export function AvatarIcon({url, fallback}:{url:string,fallback?:string}) {
    return (
      <Avatar className="bg-muted-foreground/15 p-1 border border-foreground/40">
        <AvatarImage className="object-cover" src={url} alt="@shadcn" />
        <AvatarFallback>{fallback?.slice(0,2)}</AvatarFallback>
      </Avatar>
    )
  }
  
import { auth } from "@/auth";
import { pusherServer } from "@/lib/pusher/pusher";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request,res:NextApiResponse) {
    const body = await req.text(); // Read the body as text
    const arrayform = body.split('&').map((e)=> e.split('=')[1])
    console.log('Received body:', arrayform); // Log the raw body
    
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const authResponse = pusherServer.authorizeChannel(
        arrayform[0],
            arrayform[0],
            { user_id: session.user.id! }
        );
        console.log(authResponse, 'eeeeeee')
        return res.send(authResponse)
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
}

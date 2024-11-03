import PusherServer from 'pusher'
import PusherClient from 'pusher-js'
export const pusherServer = new PusherServer({
    appId : "yourid",
key :"yourid",
secret :"yourid",
cluster : "eu",
useTLS: true
});
export const pusherClient = new PusherClient(
    "yourid",
    {
     cluster: 'eu',
     channelAuthorization:{
        endpoint: '/api/pusher',
        transport: 'ajax'
     },
     
})
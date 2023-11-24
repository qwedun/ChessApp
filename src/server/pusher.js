import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new PusherServer({
    appId: process.env.app_id,
    key: process.env.key,
    secret: process.env.secret,
    cluster: process.env.cluster,
    useTLS: true,
    encrypted: false,
})

export const pusherClient = new PusherClient(process.env.key, {
    cluster: process.env.cluster,
})
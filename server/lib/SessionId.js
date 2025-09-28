import { v4 as uuidv4 } from 'uuid';

const sessions = new Map()

// Creating session token for user
export function createSession (userId) {
    const token = uuidv4()
    sessions.set(token, {userId, createdAt: Date.now()})
    return token
}

//Getting session data via token
export function getToken (token){
    return sessions.get(token);

} 

//deleting session data via token (logout)

export function destroyToken(token){
    return sessions.delete(token)
}
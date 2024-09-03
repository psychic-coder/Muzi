"use client"
import { useSession } from 'next-auth/react'

import StreamView from '@/app/components/StreamView'
import useRedirect from '@/app/hooks/useRedirect';

export default function Component() {
    const session = useSession();
    const redirect = useRedirect();
    const user=session.data?.user;
    console.log(session);
    
    try {
        if (!user) {
            return (
                <h1>Please Log in....</h1>
            )
        }
     return <StreamView creatorId={session.data?.user?.email} playVideo={true} />
       
    } catch(e) {
        return null
    }
}

export const dynamic = 'auto'
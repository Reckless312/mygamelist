'use client'

import { useAuthentication } from '@/components/AuthenticationContext'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ServerDownGuard() {
    const { isServerDown } = useAuthentication()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (isServerDown && pathname !== '/server-down') {
            router.push('/server-down')
        }
    }, [isServerDown, pathname, router])

    return null
}

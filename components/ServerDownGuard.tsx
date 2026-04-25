'use client'

import { useAuthentication } from '@/components/AuthenticationContext'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ServerDownGuard() {
    const { isServerDown, isAuthenticated } = useAuthentication()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (isServerDown && pathname !== '/server-down') {
            router.push('/server-down')
        }

        if (!isServerDown && isAuthenticated !== undefined && pathname === '/server-down') {
            router.push('/')
        }
    }, [isServerDown, isAuthenticated, pathname, router])

    return null
}

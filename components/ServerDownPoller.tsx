'use client'

import { useEffect, useRef } from 'react'
import { routes } from '@/lib/apiRequest'

export default function ServerDownPoller() {
    const delayRef = useRef(10000)

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>

        const poll = async () => {
            try {
                const response = await fetch(routes.auth.hq, { credentials: 'include' })

                if (response.ok || response.status === 401) {
                    window.location.href = '/'
                    return
                }
            } catch {
            }

            delayRef.current = Math.min(delayRef.current * 2, 60000)
            timeout = setTimeout(poll, delayRef.current)
        }

        timeout = setTimeout(poll, delayRef.current)

        return () => clearTimeout(timeout)
    }, [])

    return null
}

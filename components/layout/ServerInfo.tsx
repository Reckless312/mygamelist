'use client'

import { useEffect, useState } from 'react'

export default function ServerInfo() {
    const [info, setInfo] = useState<{ hostname: string; ip: string } | null>(null)

    useEffect(() => {
        const base = `${window.location.protocol}//${window.location.hostname}:${window.location.protocol === 'https:' ? '8443' : '8080'}`
        fetch(`${base}/api/ip`)
            .then(r => r.json())
            .then(setInfo)
            .catch(() => null)
    }, [])

    if (!info) {
        return null
    }

    return (
        <span className="text-xs text-black/50 font-mono">
            {info.hostname} · {info.ip}
        </span>
    )
}

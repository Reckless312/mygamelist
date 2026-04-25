'use client'

import Image from "next/image"
import { useAuthentication } from "@/components/AuthenticationContext"

export default function Avatar({ username }: { username: string }) {
    const { username: loggedInUsername, avatarUrl } = useAuthentication()

    const src = username === loggedInUsername && avatarUrl ? avatarUrl : "/profile.png"

    return (
        <Image
            src={src}
            alt="profile"
            width={288}
            height={288}
            className="rounded"
        />
    )
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'shared.cloudflare.steamstatic.com',
                port: '',
                pathname: '/store_item_assets/**', // allow all images under this path
            },
            {
                protocol: 'https',
                hostname: 'shared.steamstatic.com',
                port: '',
                pathname: '/store_item_assets/**', // allow all images under this path
            },
        ],
    },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'shared.cloudflare.steamstatic.com',
                port: '',
                pathname: '/store_item_assets/**',
            },
            {
                protocol: 'https',
                hostname: 'shared.steamstatic.com',
                port: '',
                pathname: '/store_item_assets/**',
            },
            {
                protocol: 'https',
                hostname: 'shared.fastly.steamstatic.com',
                port: '',
                pathname: '/store_item_assets/**',
            },
        ],
    },
};

export default nextConfig;

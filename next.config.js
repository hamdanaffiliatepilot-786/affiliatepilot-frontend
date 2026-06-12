/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.cjdropshipping.com',
            },
            {
                protocol: 'https',
                hostname: 'z-cdn-media.chatglm.cn',
            },
        ],
    }
}
module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.cjdropshipping.com', // Yeh sabhi CJ subdomains allow karega
            },
            {
                protocol: 'https',
                hostname: 'z-cdn-media.chatglm.cn', // Tumhara logo
            },
        ],
    }
};
export default nextConfig;
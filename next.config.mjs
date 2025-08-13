/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // enables static HTML export
    images: { unoptimized: true }, // if you use next/image
    // basePath: '', // e.g. '/portfolio'
    // assetPrefix: '/YOUR_REPO_NAME/',
    reactStrictMode: true,
};

export default nextConfig;

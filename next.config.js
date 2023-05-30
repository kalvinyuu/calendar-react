/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
	appDir: true,
	serverActions: true
    },
};

module.exports = {
    images: {
	dangerouslyAllowSVG: true,
	contentDispositionType: 'attachment',
	domains: ['nitter.net'],
    },
};

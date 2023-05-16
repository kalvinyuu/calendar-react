/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
	appDir: true,
    },
};

module.exports = {
    images: {
	dangerouslyAllowSVG: true,
	contentDispositionType: 'attachment'
    },
};

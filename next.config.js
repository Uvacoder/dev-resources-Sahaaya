/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER, phase } = require('next/constants')


const isprod = phase === PHASE_DEVELOPMENT_SERVER
module.exports = {
  eslint: {
    dirs: ['pages', 'components', 'utils', 'types'],
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    BASE_URL: isprod ? "https://dev-resources-sahaaya.vercel.app": "http://localhost:8000",
    CLOUDINARY_URL: 'https://res.cloudinary.com/devsahaaya/image/upload/v1630381180/images'
  }
}

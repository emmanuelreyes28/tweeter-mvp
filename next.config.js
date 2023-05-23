/** @type {import('next').NextConfig} */
const nextConfig = {
  api: {
    bodyParse: {
      sizeLimit: "1mb", //set max size limit for the request body in API to prevent server from being overwhelmed by excessively large requests
    },
  },
};

module.exports = nextConfig;

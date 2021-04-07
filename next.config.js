const withPWA = require("next-pwa");

module.exports = withPWA({
  env: {
    GRAPHQL_URL: "https://graphql-pokeapi.vercel.app/api/graphql",
  },
  pwa: {
    dest: "public",
    register: false,
  },
  images: {
    domains: ["raw.githubusercontent.com"],
  },
});

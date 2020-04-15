const proxy = require('http-proxy-middleware');

module.exports = {
  developMiddleware: (app) => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      }),
    );
  },
  siteMetadata: {
    title: 'delvify-dashboard-app',
    description: 'A starter kit for TypeScript-based Gatsby projects with sensible defaults.',
    keywords: 'gatsbyjs, gatsby, javascript, sample, something',
    viewport: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no',
    author: {
      name: 'Delvify Dashboard Reporting Application',
      url: 'https://theprotoshop.co',
      email: 'protoshoppers@gmail.com',
    },
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Open+Sans:300,400,600,700', // you can also specify font weights and styles
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: {
        prefixes: ['/dashboard/*'],
      },
    },
  ],
};

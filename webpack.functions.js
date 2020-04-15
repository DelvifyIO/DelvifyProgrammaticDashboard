const Dotenv = require('dotenv-webpack');

// @see https://github.com/netlify/netlify-lambda/issues/118
module.exports = {
  optimization: { minimize: false },
  plugins: [new Dotenv()],
};

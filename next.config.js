require('dotenv').config()
const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  cssModules: false, 
  env: {
  	API_URL: process.env.API_URL
  }
})
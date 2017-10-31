import App from './app'

const port = 5001

App.serve({port, env: process.env.NODE_ENV})

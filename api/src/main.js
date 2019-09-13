import server from './config/server'
import mongoose from './config/mongoose'

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

mongoose.connect()

server.start().then(() => console.log('Server running on %s', server.info.uri))

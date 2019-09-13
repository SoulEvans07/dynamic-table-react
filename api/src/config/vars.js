import path from 'path'
import dotenv from 'dotenv-safe'

dotenv.config({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
  allowEmptyValues: true
});

export const env = process.env.NODE_ENV
export const port = process.env.PORT
export const host = process.env.NODE_ENV === 'dev' ? process.env.HOST || 'http://localhost' : process.env.HOST
export const mongo = {
  uri: process.env.MONGO_URI
}
export const logs = process.env.NODE_ENV === 'production' ? 'combined' : 'dev'

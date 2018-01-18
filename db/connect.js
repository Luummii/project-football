import url from 'url'

const env = process.env.NODE_ENV === 'production'
const params = env ? url.parse(process.env.DATABASE_URL) : ''
const auth = env ? params.auth.split(':') : ''

export default {
  db: {
    client: 'pg',
    host: env ? params.hostname : 'ec2-54-217-245-9.eu-west-1.compute.amazonaws.com',
    database: env ? params.pathname.split('/')[1] : 'd7bjfuqukkcjhg',
    user: env ? auth[0] : 'xonxduusxclrft',
    password: env ? auth[1] : 'bdf44c4c5b821cd514fced09c5cbafdf0d4a209c8cf18a44c40154cc7d7f816d', 
    port: env ? params.port : 5432
  }
}

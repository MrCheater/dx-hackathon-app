export default {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  protocol: process.env.PROTOCOL || 'http',
  secret: process.env.JWT_SECRET || 'test-jwt-secret'
}
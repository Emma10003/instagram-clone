export const API_BASE_URL = process.env.NODE_ENV === 'production'
? 'http://16.176.28.202:9000'  // AWS
: 'http://localhost:3000'
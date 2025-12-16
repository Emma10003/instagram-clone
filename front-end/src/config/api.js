export const API_BASE_URL = process.env.NODE_ENV === 'production'
? ''  // AWS
: 'http://localhost:3000'
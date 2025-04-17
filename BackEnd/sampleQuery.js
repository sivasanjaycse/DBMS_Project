// sampleQuery.js
const sql = require('./dbconnect')

async function fetchFaculty() {
  try {
    const result = await sql`SELECT * FROM faculty`
    console.log('Faculty data:', result)
  } catch (err) {
    console.error('Database query failed:', err)
  }
}

fetchFaculty()

// dbconnect.js
const postgres = require('postgres')

const connectionString = 'postgresql://postgres.lgaqcvjdgfkrnbmatzyi:Yajnas_Avis2005@aws-0-ap-south-1.pooler.supabase.com:5432/postgres'
const sql = postgres(connectionString, { ssl: 'require' })

module.exports = sql

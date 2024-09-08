import postgres from "postgres"

const sql = postgres(process.env.DATABASE_CONNECTION_STRING || "")

export default sql

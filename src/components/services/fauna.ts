import { Client } from 'faunadb'

//this will be our Serverless database, FAUNADB

export const fauna = new Client ({
    secret: process.env.FAUNADB_KEY
})
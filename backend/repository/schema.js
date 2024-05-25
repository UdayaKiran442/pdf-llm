const {pgTable, serial, varchar, timestamp} = require('drizzle-orm/pg-core')

const users = pgTable('users',{
    id: serial('id').primaryKey(),
    userId: varchar('userId').notNull(),
    email: varchar('email',{length: 256}).notNull().unique(),
    password: varchar('password',{length: 256}).notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow()
})

module.exports = {users: users};
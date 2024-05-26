const { sql } = require('drizzle-orm');
const {pgTable, serial, varchar, timestamp, text, uniqueIndex} = require('drizzle-orm/pg-core')

const users = pgTable('users',{
    id: serial('id').primaryKey(),
    userId: varchar('userId').notNull(),
    email: varchar('email',{length: 256}).notNull().unique(),
    password: varchar('password',{length: 256}).notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow()
})

const projects = pgTable('projects',{
    id: serial('id').primaryKey(),
    projectId: varchar('projectId',{length: 256}).notNull(),
    userId: varchar('userId',{length: 256}).notNull(),
    title: varchar('title',{length: 256}).notNull(),
    description: varchar('description',{length: 256}).notNull(),
    pdfURL: varchar('pdfURL',{length: 256}).notNull(),
    vectorEmbeddings: text('vectorEmbeddings')
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow()
},(projects) => ({
    projectIdIndex: uniqueIndex('projects_projectId').on(projects.projectId),
}))

module.exports = {users: users, projects: projects};
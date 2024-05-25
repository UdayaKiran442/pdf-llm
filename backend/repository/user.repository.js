
const {v4} = require('uuid')
const {users} = require('./schema')
const {eq} = require('drizzle-orm')
const db = require('./db')

exports.createUserInDb = async (payload) => {
    try {
        const newUserId = v4()
        const insertPayload = {
            userId: newUserId,
            email: payload.email,
            password: payload.password,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await db.insert(users).values(insertPayload);
        return insertPayload;
    } catch (error) {
        return error;
    }
}

exports.findUserByEmailFromDb = async (email) => {
  try {
      const user = await db.select().from(users).where(eq(users.email, email));
      return user[0];
  } catch (error) {
    return error
  }
}

exports.findUserByIdFromDb = async(userId) => {
    try {
        const user = await db.select().from(users).where(eq(users.userId, userId));
        return user[0]
    } catch (error) {
        return error;
    }
}
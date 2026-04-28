import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export const userService = {
  async getAllUsers() {
    return await db.query.users.findMany({
      columns: { password: false }
    });
  },

  async getUserById(id: string) {
    return await db.query.users.findFirst({
      where: eq(users.id, id),
      columns: { password: false }
    });
  },

  async getUserByEmail(email: string) {
    return await db.query.users.findFirst({
      where: eq(users.email, email),
    });
  },

  async createUser(data: typeof users.$inferInsert) {
    await db.insert(users).values(data);
    const { password, ...userWithoutPassword } = data;
    return userWithoutPassword;
  }
};

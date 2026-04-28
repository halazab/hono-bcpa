import { db } from '../db';
import { posts } from '../db/schema';
import { eq } from 'drizzle-orm';

export const postService = {
  async getAllPosts() {
    return await db.query.posts.findMany();
  },

  async getPostById(id: string) {
    return await db.query.posts.findFirst({
      where: eq(posts.id, id),
    });
  },

  async getPostsByUserId(userId: string) {
    return await db.query.posts.findMany({
      where: eq(posts.userId, userId),
    });
  },

  async createPost(data: typeof posts.$inferInsert) {
    await db.insert(posts).values(data);
    return data;
  }
};

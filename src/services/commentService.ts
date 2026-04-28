import { db } from '../db';
import { comments } from '../db/schema';
import { eq } from 'drizzle-orm';

export const commentService = {
  async getAllComments() {
    return await db.query.comments.findMany();
  },

  async getCommentsByPostId(postId: string) {
    return await db.query.comments.findMany({
      where: eq(comments.postId, postId),
    });
  },

  async createComment(data: typeof comments.$inferInsert) {
    await db.insert(comments).values(data);
    return data;
  }
};

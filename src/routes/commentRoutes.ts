import { Hono } from 'hono';
import { commentService } from '../services/commentService';

const commentRoutes = new Hono();

commentRoutes.get('/', async (c) => {
  const comments = await commentService.getAllComments();
  return c.json(comments);
});

commentRoutes.get('/post/:postId', async (c) => {
  const postId = c.req.param('postId');
  const comments = await commentService.getCommentsByPostId(postId);
  return c.json(comments);
});

commentRoutes.post('/', async (c) => {
  const { text, postId, userId } = await c.req.json();
  const newComment = await commentService.createComment({
    id: crypto.randomUUID(),
    text,
    postId,
    userId,
  });
  return c.json(newComment, 201);
});

export default commentRoutes;

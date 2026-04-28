import { Hono } from 'hono';
import { postService } from '../services/postService';

const postRoutes = new Hono();

postRoutes.get('/', async (c) => {
  const posts = await postService.getAllPosts();
  return c.json(posts);
});

postRoutes.get('/:id', async (c) => {
  const id = c.req.param('id');
  const post = await postService.getPostById(id);
  if (!post) return c.json({ error: 'Post not found' }, 404);
  return c.json(post);
});

postRoutes.get('/user/:userId', async (c) => {
  const userId = c.req.param('userId');
  const posts = await postService.getPostsByUserId(userId);
  return c.json(posts);
});

postRoutes.post('/', async (c) => {
  const { title, content, userId } = await c.req.json();
  const newPost = await postService.createPost({
    id: crypto.randomUUID(),
    title,
    content,
    userId,
  });
  return c.json(newPost, 201);
});

export default postRoutes;

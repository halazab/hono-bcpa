import { Hono } from 'hono';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';

const app = new Hono();

app.route('/users', userRoutes);
app.route('/posts', postRoutes);
app.route('/comments', commentRoutes);

// Compatibility for original endpoints if needed, but userRoutes handles /signup and /signin
// Since app.route('/users', userRoutes) mounts to /users, /users/signup would be the path.
// The PDF says "Creating and retrieving users", "Creating and retrieving posts", etc.
// Usually these are prefixed.
// Let's adjust userRoutes to handle top level if needed, or just mount them as they are.

// Actually, let's mount signup/signin at the root for compatibility with previous version
app.post('/signup', async (c) => userRoutes.fetch(c.req.raw));
app.post('/signin', async (c) => userRoutes.fetch(c.req.raw));

export default app;

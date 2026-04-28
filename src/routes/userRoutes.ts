import { Hono } from 'hono';
import { userService } from '../services/userService';

const userRoutes = new Hono();

userRoutes.get('/', async (c) => {
  const users = await userService.getAllUsers();
  return c.json(users);
});

userRoutes.get('/:id', async (c) => {
  const id = c.req.param('id');
  const user = await userService.getUserById(id);
  if (!user) return c.json({ error: 'User not found' }, 404);
  return c.json(user);
});

userRoutes.post('/signup', async (c) => {
  const { name, email, password } = await c.req.json();
  const existingUser = await userService.getUserByEmail(email);
  if (existingUser) return c.json({ error: 'Email already exists' }, 400);

  const newUser = await userService.createUser({
    id: crypto.randomUUID(),
    name,
    email,
    password,
  });

  return c.json(newUser, 201);
});

userRoutes.post('/signin', async (c) => {
  const { email, password } = await c.req.json();
  const user = await userService.getUserByEmail(email);
  if (!user || user.password !== password) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  const { password: _, ...userWithoutPassword } = user;
  return c.json({ message: 'Login successful', user: userWithoutPassword });
});

export default userRoutes;

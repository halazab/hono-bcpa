import { Hono } from 'hono'

const app = new Hono()

// In-Memory User Store
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
}

const users: User[] = []

// get all users
app.get('/users', (c) => {
  return c.json(users)
})

// get user by id
app.get('/users/:id', (c) => {
  const id = c.req.param('id')
  const user = users.find(u => u.id === id)
  if (!user) return c.json({ error: 'User not found' }, 404)
  return c.json(user)
})

// signup
app.post('/signup', async (c) => {
  const { name, email, password } = await c.req.json()
  if (users.some(u => u.email === email)) return c.json({ error: 'Email already exists' }, 400)
  
  const newUser: User = { id: crypto.randomUUID(), name, email, password }
  users.push(newUser)
  
  const { password: _, ...userWithoutPassword } = newUser
  return c.json(userWithoutPassword, 201)
})

// signin
app.post('/signin', async (c) => {
  const { email, password } = await c.req.json()
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) return c.json({ error: 'Invalid credentials' }, 401)
  
  const { password: _, ...userWithoutPassword } = user
  return c.json({ message: 'Login successful', user: userWithoutPassword })
})

export default app

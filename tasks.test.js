const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

let tasks = [{ id: 1, title: "Sample Task", completed: false }];

app.get('/tasks', (req, res) => res.json(tasks));

app.post('/tasks', (req, res) => {
  const newTask = { id: tasks.length + 1, title: req.body.title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

describe('Tasks API', () => {
  it('GET /tasks returns tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('POST /tasks creates task', async () => {
    const res = await request(app).post('/tasks').send({ title: 'New Task' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('New Task');
  });
});

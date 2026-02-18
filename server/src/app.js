import express from 'express'
import cors from 'cors'
import { initMongoDb } from './db/connect.js';
import complainsRouter from './routes/complaints.routes.js';
import jwt from 'jsonwebtoken'

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/complaints', complainsRouter)

app.post('/login', (req, res) => {
    const inPassword = '123456';
    const { password } = req.body;
    if (password !== inPassword) return res.status(403).send('Un athoraith!!')
    const payloud = { password, username: 'admin' };
    const token = jwt.sign(payloud, 'secret', { expiresIn: '1h' })
    console.log('token: ', token);
    res.json({ token })
})

app.listen(port, async () => {
    await initMongoDb()
    console.log(`Server is running on http://localhost:${port} `)
})

export function verify(req, res, next) {
    const { token } = req.headers;
    const result = jwt.verify(token, 'secret')
    console.log(result);
    next()

}
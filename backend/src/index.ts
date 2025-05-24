import express, { Request, Response } from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import { formRouter } from './routes/form';

connectDB();

const app = express();
const PORT = process.env['PORT'] || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/forms', formRouter);

app.get('/', (_req, res) => {
	res.json({ message: 'API funcionando!' });
});

app.use((err: Error, _req: Request, res: Response) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: 'Erro interno do servidor',
	});
});

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;

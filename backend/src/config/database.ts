import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/myapp';
export const JWT_SECRET = process.env['JWT_SECRET'] || 'seu_jwt_secret';

export const connectDB = async (): Promise<void> => {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log('MongoDB conectado com sucesso');
	} catch (error) {
		console.error('Erro ao conectar ao MongoDB:', error);
		process.exit(1);
	}
};

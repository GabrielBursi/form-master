import express from 'express';
import { authenticate } from '../middlewares/auth';
import { questionnaireSchema, updateQuestionnaireSchema } from '../schemas/form';
import { createQuestionnaire, deleteQuestionnaire, getQuestionnaireById, getQuestionnaires, updateQuestionnaire } from '../controllers/form';
import { validate } from '../middlewares/validate';

export const formRouter = express.Router();

formRouter.use(authenticate as express.RequestHandler);

formRouter.post(
	'/',
	validate(questionnaireSchema) as express.RequestHandler,
	createQuestionnaire
);

formRouter.get('/', getQuestionnaires);

formRouter.get('/:id', getQuestionnaireById);

formRouter.put(
	'/:id',
	validate(updateQuestionnaireSchema) as express.RequestHandler,
	updateQuestionnaire
);

formRouter.delete('/:id', deleteQuestionnaire);

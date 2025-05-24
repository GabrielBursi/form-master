import mongoose, { Document, Schema } from "mongoose";
import { Alternative, Question } from "../schemas/form";

export interface IQuestionnaire extends Document {
	title: string;
	description?: string;
	questions: Question[];
	userId: mongoose.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

const AlternativeSchema = new Schema<Alternative>({
	text: {
		type: String,
		required: true,
		trim: true,
	},
	isCorrect: {
		type: Boolean,
		default: false,
	},
}, { _id: false });

const QuestionSchema = new Schema<Question>({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
	},
	type: {
		type: String,
		enum: ['multiple_choice', 'open_ended', 'scale', 'boolean'],
		required: true,
	},
	required: {
		type: Boolean,
		default: true,
	},
	alternatives: [AlternativeSchema],
	minValue: {
		type: Number,
	},
	maxValue: {
		type: Number,
	},
}, { _id: false });

const QuestionnaireSchema = new Schema<IQuestionnaire>(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
		},
		description: {
			type: String,
			trim: true,
		},
		questions: {
			type: [QuestionSchema],
			required: true,
			validate: {
				validator: function (v: Question[]) {
					return v && v.length > 0;
				},
				message: 'O questionário deve ter pelo menos uma questão',
			},
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

QuestionnaireSchema.index({ userId: 1 });

export const Questionnaire = mongoose.model<IQuestionnaire>('Questionnaire', QuestionnaireSchema);


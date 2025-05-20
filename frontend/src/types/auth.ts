export type User = {
	id: string;
	name: string;
	email: string;
	phone: string;
	profession: string;
};

export type AuthResponse = {
	success: boolean;
	message: string;
	token: string;
	user: User;
};

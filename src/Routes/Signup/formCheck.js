export const isEmail = email => {
	const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

	return emailRegex.test(email);
};

export function isPassword(password) {
	const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/;

	return passwordRegex.test(password);
}

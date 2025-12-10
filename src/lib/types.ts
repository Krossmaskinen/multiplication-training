export interface MultiplicationProblem {
	num1: number;
	num2: number;
	answer: number;
	userAnswer?: number;
	isCorrect?: boolean;
	timestamp: number;
}

export function generateMultiplication(max: number = 10): MultiplicationProblem {
	const num1 = Math.floor(Math.random() * max) + 1;
	const num2 = Math.floor(Math.random() * max) + 1;
	return {
		num1,
		num2,
		answer: num1 * num2,
		timestamp: Date.now()
	};
}


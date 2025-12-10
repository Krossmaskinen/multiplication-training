import type { IProblemGenerator } from './IProblemGenerator';
import type { MultiplicationProblem } from '../types';

export class ProblemGenerator implements IProblemGenerator {
	generate(max: number = 10): MultiplicationProblem {
		const num1 = Math.floor(Math.random() * max) + 1;
		const num2 = Math.floor(Math.random() * max) + 1;
		return {
			num1,
			num2,
			answer: num1 * num2,
			timestamp: Date.now()
		};
	}

	generateForTable(table: number, max: number = 10): MultiplicationProblem {
		const num2 = Math.floor(Math.random() * max) + 1;
		return {
			num1: table,
			num2,
			answer: table * num2,
			timestamp: Date.now()
		};
	}
}


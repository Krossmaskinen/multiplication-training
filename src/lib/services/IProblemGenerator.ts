import type { MultiplicationProblem } from '../types';

export interface IProblemGenerator {
	generate(max?: number): MultiplicationProblem;
	generateForTable(table: number, max?: number): MultiplicationProblem;
}


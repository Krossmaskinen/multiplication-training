import type { MultiplicationProblem } from '../types';

export interface IHistoryStorage {
	save(problem: MultiplicationProblem): void;
	getAll(): MultiplicationProblem[];
	clear(): void;
	getFailed(): MultiplicationProblem[];
}


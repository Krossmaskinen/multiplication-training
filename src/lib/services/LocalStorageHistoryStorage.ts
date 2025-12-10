import type { IHistoryStorage } from './IHistoryStorage';
import type { MultiplicationProblem } from '../types';

export class LocalStorageHistoryStorage implements IHistoryStorage {
	private readonly storageKey: string;

	constructor(storageKey: string = 'multiplication-history') {
		this.storageKey = storageKey;
	}

	save(problem: MultiplicationProblem): void {
		if (typeof window === 'undefined') return;

		try {
			const history = this.getAll();
			history.push(problem);
			localStorage.setItem(this.storageKey, JSON.stringify(history));
		} catch (e) {
			console.error('Failed to save history to localStorage', e);
		}
	}

	getAll(): MultiplicationProblem[] {
		if (typeof window === 'undefined') return [];

		try {
			const stored = localStorage.getItem(this.storageKey);
			if (stored) {
				return JSON.parse(stored);
			}
		} catch (e) {
			console.error('Failed to load history from localStorage', e);
		}

		return [];
	}

	clear(): void {
		if (typeof window === 'undefined') return;

		try {
			localStorage.removeItem(this.storageKey);
		} catch (e) {
			console.error('Failed to clear history from localStorage', e);
		}
	}

	getFailed(): MultiplicationProblem[] {
		return this.getAll().filter((p) => p.isCorrect === false);
	}
}


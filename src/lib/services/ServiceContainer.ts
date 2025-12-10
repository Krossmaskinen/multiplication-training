import type { IProblemGenerator } from './IProblemGenerator';
import type { IHistoryStorage } from './IHistoryStorage';
import { ProblemGenerator } from './ProblemGenerator';
import { LocalStorageHistoryStorage } from './LocalStorageHistoryStorage';

class ServiceContainer {
	private problemGenerator: IProblemGenerator | null = null;
	private historyStorage: IHistoryStorage | null = null;

	getProblemGenerator(): IProblemGenerator {
		if (!this.problemGenerator) {
			this.problemGenerator = new ProblemGenerator();
		}
		return this.problemGenerator;
	}

	getHistoryStorage(): IHistoryStorage {
		if (!this.historyStorage) {
			this.historyStorage = new LocalStorageHistoryStorage();
		}
		return this.historyStorage;
	}

	setProblemGenerator(generator: IProblemGenerator): void {
		this.problemGenerator = generator;
	}

	setHistoryStorage(storage: IHistoryStorage): void {
		this.historyStorage = storage;
	}
}

export const serviceContainer = new ServiceContainer();


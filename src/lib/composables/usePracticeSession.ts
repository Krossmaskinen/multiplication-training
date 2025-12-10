import type { IProblemGenerator } from '../services/IProblemGenerator';
import type { IHistoryStorage } from '../services/IHistoryStorage';
import type { MultiplicationProblem } from '../types';

export class PracticeSession {
	private problemGenerator: IProblemGenerator;
	private historyStorage: IHistoryStorage;
	private currentProblem: MultiplicationProblem;
	private selectedTable: number | null = null;
	private practiceFailedOnly: boolean = false;

	constructor(
		problemGenerator: IProblemGenerator,
		historyStorage: IHistoryStorage,
		initialProblem: MultiplicationProblem
	) {
		this.problemGenerator = problemGenerator;
		this.historyStorage = historyStorage;
		this.currentProblem = initialProblem;
	}

	getCurrentProblem(): MultiplicationProblem {
		return this.currentProblem;
	}

	getSelectedTable(): number | null {
		return this.selectedTable;
	}

	setSelectedTable(table: number | null): void {
		this.selectedTable = table;
		this.generateNextProblem();
	}

	getPracticeFailedOnly(): boolean {
		return this.practiceFailedOnly;
	}

	setPracticeFailedOnly(value: boolean): void {
		this.practiceFailedOnly = value;
	}

	generateNextProblem(): void {
		const failedProblems = this.historyStorage.getFailed();

		if (this.practiceFailedOnly && failedProblems.length > 0) {
			const randomFailed =
				failedProblems[Math.floor(Math.random() * failedProblems.length)];
			this.currentProblem = {
				num1: randomFailed.num1,
				num2: randomFailed.num2,
				answer: randomFailed.answer,
				timestamp: Date.now()
			};
		} else if (this.selectedTable !== null) {
			this.currentProblem = this.problemGenerator.generateForTable(
				this.selectedTable,
				10
			);
		} else {
			this.currentProblem = this.problemGenerator.generate(10);
		}
	}

	checkAnswer(userAnswer: number): MultiplicationProblem {
		const problem: MultiplicationProblem = {
			...this.currentProblem,
			userAnswer,
			isCorrect: userAnswer === this.currentProblem.answer
		};

		this.historyStorage.save(problem);
		return problem;
	}
}


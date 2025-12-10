<script lang="ts">
	import { onMount } from 'svelte';
	import { serviceContainer } from '$lib/services/ServiceContainer';
	import { PracticeSession } from '$lib/composables/usePracticeSession';
	import { selectedTableStore } from '$lib/stores/selectedTableStore';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import TableSelector from '$lib/components/TableSelector.svelte';
	import PracticeFailedToggle from '$lib/components/PracticeFailedToggle.svelte';
	import ProblemDisplay from '$lib/components/ProblemDisplay.svelte';
	import AnswerInput from '$lib/components/AnswerInput.svelte';
	import ResultAlert from '$lib/components/ResultAlert.svelte';
	import ActionButton from '$lib/components/ActionButton.svelte';
	import HistorySection from '$lib/components/HistorySection.svelte';
	import type { MultiplicationProblem } from '$lib/types';

	const problemGenerator = serviceContainer.getProblemGenerator();
	const historyStorage = serviceContainer.getHistoryStorage();
	
	let storedTable = $state<number | null>(null);
	const session = new PracticeSession(
		problemGenerator,
		historyStorage,
		problemGenerator.generate(10)
	);

	let currentProblem = $state(session.getCurrentProblem());
	let userAnswer = $state('');
	let history = $state<MultiplicationProblem[]>([]);
	let showResultBanner = $state(false);
	let isChecking = $state(false);
	let selectedTable = $state<number | null>(null);
	let practiceFailedOnly = $state(session.getPracticeFailedOnly());

	let failedProblems = $derived(historyStorage.getFailed());
	let lastResult = $derived(
		history.length > 0 ? history[history.length - 1] : null
	);
	let showingResult = $derived(isChecking && lastResult !== null);

	onMount(() => {
		history = historyStorage.getAll();
		storedTable = selectedTableStore.load();
		if (storedTable !== null) {
			selectedTable = storedTable;
			session.setSelectedTable(storedTable);
			currentProblem = session.getCurrentProblem();
		}
	});

	function handleTableChange(table: number | null) {
		selectedTable = table;
		selectedTableStore.set(table);
		session.setSelectedTable(table);
		currentProblem = session.getCurrentProblem();
		userAnswer = '';
		isChecking = false;
		showResultBanner = false;
	}

	function handlePracticeFailedChange(checked: boolean) {
		practiceFailedOnly = checked;
		session.setPracticeFailedOnly(checked);
		session.generateNextProblem();
		currentProblem = session.getCurrentProblem();
		userAnswer = '';
		isChecking = false;
		showResultBanner = false;
		history = historyStorage.getAll();
	}

	function checkAnswer() {
		const answer = parseInt(userAnswer);
		if (isNaN(answer) || isChecking) return;

		isChecking = true;
		const problem = session.checkAnswer(answer);

		showResultBanner = true;

		history = [...history, problem];
		history = historyStorage.getAll();

		if (problem.isCorrect) {
			setTimeout(() => {
				nextProblem();
				showResultBanner = false;
			}, 2000);
		}
	}

	function nextProblem() {
		userAnswer = '';
		isChecking = false;
		session.generateNextProblem();
		currentProblem = session.getCurrentProblem();
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' && !showingResult) {
			checkAnswer();
		}
	}

	function handleClearHistory() {
		historyStorage.clear();
		history = [];
	}
</script>

<div class="min-h-screen bg-base-200 p-4 pb-8">
	<div class="max-w-2xl mx-auto">
		<div class="card bg-base-100 shadow-xl mb-4">
			<div class="card-body">
				<PageHeader title="Öva multiplikation" />

				<TableSelector selectedTable={selectedTable} onTableChange={handleTableChange} />

				<PracticeFailedToggle
					checked={practiceFailedOnly}
					disabled={failedProblems.length === 0}
					onChange={handlePracticeFailedChange}
				/>

				<div class="text-center py-4 md:py-8">
					<ProblemDisplay problem={currentProblem} />

					<AnswerInput
						value={userAnswer}
						disabled={showingResult}
						onInput={(value) => (userAnswer = value)}
						onKeyPress={handleKeyPress}
					/>

					<div class="mt-6">
						{#if showingResult && lastResult}
							<ResultAlert result={lastResult} showResultBanner={showResultBanner} />
							{#if lastResult.isCorrect === false}
								<ActionButton
									label="Nästa"
									onClick={nextProblem}
									size="lg"
									class="mt-4"
								/>
							{/if}
						{:else}
							<ActionButton
								label="Kontrollera"
								onClick={checkAnswer}
								disabled={isChecking || showingResult}
								size="lg"
							/>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<HistorySection history={history} onClear={handleClearHistory} />
			</div>
		</div>
	</div>
</div>

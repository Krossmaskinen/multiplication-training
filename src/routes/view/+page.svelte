<script lang="ts">
	import { onMount } from 'svelte';
	import { serviceContainer } from '$lib/services/ServiceContainer';
	import { PracticeSession } from '$lib/composables/usePracticeSession';
	import { selectedTableStore } from '$lib/stores/selectedTableStore';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import TableSelector from '$lib/components/TableSelector.svelte';
	import ProblemDisplay from '$lib/components/ProblemDisplay.svelte';
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
	let history = $state<MultiplicationProblem[]>([]);
	let selectedTable = $state<number | null>(null);

	onMount(() => {
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
	}

	function nextProblem() {
		history = [...history, currentProblem];
		session.generateNextProblem();
		currentProblem = session.getCurrentProblem();
	}
</script>

<div class="min-h-screen bg-base-200 p-4 pb-8">
	<div class="max-w-2xl mx-auto">
		<div class="card bg-base-100 shadow-xl mb-4">
			<div class="card-body">
				<PageHeader title="Visa multiplikation" />

				<TableSelector selectedTable={selectedTable} onTableChange={handleTableChange} />

				<div class="text-center py-4 md:py-8">
					<ProblemDisplay problem={currentProblem} showAnswer={true} />

					<ActionButton label="Nästa" onClick={nextProblem} size="lg" />
				</div>
			</div>
		</div>

		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<HistorySection history={history} showAnswer={true} />
			</div>
		</div>
	</div>
</div>

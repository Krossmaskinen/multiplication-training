<script lang="ts">
	import { generateMultiplication, generateMultiplicationForTable, type MultiplicationProblem } from '$lib/types';

	let currentProblem = $state(generateMultiplication(10));
	let history = $state<MultiplicationProblem[]>([]);
	let showHistory = $state(false);
	let selectedTable = $state<number | null>(null);

	function nextProblem() {
		history = [...history, currentProblem];
		if (selectedTable !== null) {
			currentProblem = generateMultiplicationForTable(selectedTable, 10);
		} else {
			currentProblem = generateMultiplication(10);
		}
	}
</script>

<div class="min-h-screen bg-base-200 p-4 pb-8">
	<div class="max-w-2xl mx-auto">
		<div class="card bg-base-100 shadow-xl mb-4">
			<div class="card-body">
				<div class="flex justify-between items-center mb-4">
					<h1 class="card-title text-2xl">Visa multiplikation</h1>
					<a href="/" class="btn btn-sm btn-ghost">Hem</a>
				</div>

				<div class="form-control mb-4">
					<label class="label">
						<span class="label-text font-semibold">Öva tabell</span>
					</label>
					<select
						class="select select-bordered w-full"
						value={selectedTable?.toString() ?? ''}
						onchange={(e) => {
							const value = (e.currentTarget as HTMLSelectElement).value;
							if (value === '') {
								selectedTable = null;
							} else {
								selectedTable = parseInt(value);
							}
							if (selectedTable !== null) {
								currentProblem = generateMultiplicationForTable(selectedTable, 10);
							} else {
								currentProblem = generateMultiplication(10);
							}
						}}
					>
						<option value="">Alla tabeller</option>
						{#each Array(10) as _, i}
							<option value={(i + 1).toString()}>{i + 1}:an tabellen</option>
						{/each}
					</select>
				</div>

				<div class="text-center py-4 md:py-8">
					<div class="text-4xl md:text-6xl font-bold mb-6 md:mb-8">
						{currentProblem.num1} × {currentProblem.num2} = {currentProblem.answer}
					</div>

					<button class="btn bg-blue-600 hover:bg-blue-700 text-white btn-lg" onclick={nextProblem}>
						Nästa
					</button>
				</div>
			</div>
		</div>

		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<button
					class="btn btn-ghost justify-between w-full"
					onclick={() => (showHistory = !showHistory)}
				>
					<span class="font-bold">Historik ({history.length})</span>
					<svg
						class="w-5 h-5 transition-transform {showHistory ? 'rotate-180' : ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>

				{#if showHistory}
					<div class="divider"></div>
					<div class="space-y-2 max-h-96 overflow-y-auto">
						{#each history.toReversed() as problem}
							<div class="flex justify-between items-center p-3 rounded-lg bg-base-200">
								<div class="font-semibold text-lg">
									{problem.num1} × {problem.num2} = {problem.answer}
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>


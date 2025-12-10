<script lang="ts">
	import type { MultiplicationProblem } from '../types';

	interface Props {
		history: MultiplicationProblem[];
		showAnswer?: boolean;
		onClear?: () => void;
	}

	let { history, showAnswer = false, onClear }: Props = $props();
	let showHistory = $state(false);
</script>

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
	{#if history.length > 0 && onClear}
		<div class="mb-3 flex justify-end">
			<button
				class="btn btn-sm btn-error btn-outline"
				onclick={() => {
					if (confirm('Är du säker på att du vill radera all historik?')) {
						onClear();
					}
				}}
			>
				Rensa historik
			</button>
		</div>
	{/if}
	<div class="space-y-2 max-h-96 overflow-y-auto">
		{#if history.length === 0}
			<div class="text-center text-sm sm:text-base text-base-content/60 py-4">
				Ingen historik ännu
			</div>
		{:else}
			{#each history.toReversed() as problem}
				<div
					class="flex justify-between items-center p-3 rounded-lg {showAnswer
						? 'bg-base-200'
						: problem.isCorrect
							? 'bg-success/20'
							: 'bg-error/20'}"
				>
					<div class="flex-1 {showAnswer ? 'font-semibold text-lg' : 'text-sm sm:text-base'}">
						<span class="font-semibold">
							{problem.num1} × {problem.num2} =
						</span>
						{#if showAnswer}
							<span class="ml-2">{problem.answer}</span>
						{:else}
							<span
								class="ml-2 {problem.isCorrect ? 'text-success' : 'text-error'}"
							>
								{problem.userAnswer}
							</span>
							{#if !problem.isCorrect}
								<span class="ml-2 text-error">(Rätt: {problem.answer})</span>
							{/if}
						{/if}
					</div>
					{#if !showAnswer}
						<div>
							{#if problem.isCorrect}
								<svg
									class="w-6 h-6 text-success"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							{:else}
								<svg
									class="w-6 h-6 text-error"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		{/if}
	</div>
{/if}


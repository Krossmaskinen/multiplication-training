<script lang="ts">
	import type { MultiplicationProblem } from '../types';

	interface Props {
		result: MultiplicationProblem;
		showSuccessBanner?: boolean;
	}

	let { result, showSuccessBanner = false }: Props = $props();
</script>

{#if result.isCorrect === true && showSuccessBanner}
	<div class="alert alert-success">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="stroke-current shrink-0 h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
		<span>Rätt!</span>
	</div>
{:else if result.isCorrect === false}
	<div class="alert alert-error">
		<span class="text-xl">
			Fel! Rätt svar är <strong class="text-red-600">{result.answer}</strong>
		</span>
	</div>
{/if}


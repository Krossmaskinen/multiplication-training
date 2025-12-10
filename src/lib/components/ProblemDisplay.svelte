<script lang="ts">
	import type { MultiplicationProblem } from '../types';

	interface Props {
		problem: MultiplicationProblem;
		showAnswer?: boolean;
	}

	let { problem, showAnswer = false }: Props = $props();
</script>

<div class="text-4xl md:text-6xl font-bold mb-6 md:mb-8">
	{problem.num1} × {problem.num2} {#if showAnswer}= {problem.answer}{:else}= ?{/if}
</div>


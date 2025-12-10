<script lang="ts">
	import type { MultiplicationProblem } from '../types';

	interface Props {
		result: MultiplicationProblem;
		showResultBanner?: boolean;
	}

	let { result, showResultBanner = false }: Props = $props();

	const cuteCatImages = [
		'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop',
		'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=100&h=100&fit=crop',
		'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=100&h=100&fit=crop',
		'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=100&h=100&fit=crop',
		'https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=100&h=100&fit=crop',
		'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=100&h=100&fit=crop'
	];

	const randomCatImage = cuteCatImages[Math.floor(Math.random() * cuteCatImages.length)];
</script>

{#if result.isCorrect === true && showResultBanner}
	<div class="alert alert-success">
		<img
			src={randomCatImage}
			alt="Cute cat"
			class="w-12 h-12 rounded-full object-cover shrink-0"
		/>
		<span>Rätt!</span>
	</div>
{:else if result.isCorrect === false && showResultBanner}
	<div class="alert alert-error">
		<span class="text-xl">
			Fel! Rätt svar är <strong class="text-red-600">{result.answer}</strong>
		</span>
	</div>
{/if}


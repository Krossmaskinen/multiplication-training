<script lang="ts">
	import { generateMultiplication, type MultiplicationProblem } from '$lib/types';

	let currentProblem = $state(generateMultiplication(10));
	let userAnswer = $state('');
	let history = $state<MultiplicationProblem[]>([]);
	let showSuccessBanner = $state(false);
	let showHistory = $state(false);
	let practiceFailedOnly = $state(false);
	let isChecking = $state(false);
	let inputElement: HTMLInputElement | null = $state(null);
	let failedProblems = $derived(
		history.filter((p) => p.isCorrect === false)
	);
	let lastResult = $derived(
		history.length > 0 ? history[history.length - 1] : null
	);
	let showingResult = $derived(isChecking && lastResult !== null);

	function checkAnswer() {
		const answer = parseInt(userAnswer);
		if (isNaN(answer) || isChecking) return;

		isChecking = true;
		const problem: MultiplicationProblem = {
			...currentProblem,
			userAnswer: answer,
			isCorrect: answer === currentProblem.answer
		};

		if (problem.isCorrect) {
			showSuccessBanner = true;
		}

		history = [...history, problem];

		if (problem.isCorrect) {
			setTimeout(() => {
				nextProblem();
				showSuccessBanner = false;
			}, 2000);
		}
	}

	function nextProblem() {
		userAnswer = '';
		isChecking = false;
		if (practiceFailedOnly && failedProblems.length > 0) {
			const randomFailed = failedProblems[Math.floor(Math.random() * failedProblems.length)];
			currentProblem = {
				num1: randomFailed.num1,
				num2: randomFailed.num2,
				answer: randomFailed.answer,
				timestamp: Date.now()
			};
		} else {
			currentProblem = generateMultiplication(10);
		}
		setTimeout(() => {
			inputElement?.focus();
		}, 100);
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' && !showingResult) {
			checkAnswer();
		}
	}
</script>

<div class="min-h-screen bg-base-200 p-4 pb-8">
	<div class="max-w-2xl mx-auto">
		<div class="card bg-base-100 shadow-xl mb-4">
			<div class="card-body">
				<div class="flex justify-between items-center mb-4">
					<h1 class="card-title text-2xl">Öva multiplikation</h1>
					<a href="/" class="btn btn-sm btn-ghost">Hem</a>
				</div>

				<div class="form-control mb-4">
					<label class="label cursor-pointer justify-start gap-4">
						<span class="label-text">Öva endast felaktiga</span>
						<input
							type="checkbox"
							class="toggle bg-blue-500 checked:bg-blue-600"
							bind:checked={practiceFailedOnly}
							disabled={failedProblems.length === 0}
						/>
					</label>
				</div>

				<div class="text-center py-4 md:py-8">
					<div class="text-4xl md:text-6xl font-bold mb-6 md:mb-8">
						{currentProblem.num1} × {currentProblem.num2} = ?
					</div>

					<div class="form-control w-full max-w-xs mx-auto">
						<input
							type="number"
							placeholder="Ditt svar"
							class="input input-bordered input-lg text-center text-xl md:text-2xl"
							bind:value={userAnswer}
							bind:this={inputElement}
							onkeypress={handleKeyPress}
							disabled={showingResult}
							autofocus
						/>
					</div>

					<div class="mt-6">
						{#if lastResult}
							{#if lastResult.isCorrect === true && showSuccessBanner}
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
							{:else if lastResult.isCorrect === false}
								<div class="alert alert-error">
									<span class="text-xl">
										Fel! Rätt svar är <strong class="text-red-600">{lastResult.answer}</strong>
									</span>
								</div>
								<button class="btn bg-blue-600 hover:bg-blue-700 text-white border-0 btn-lg mt-4" onclick={nextProblem}>
									Nästa
								</button>
							{/if}
						{:else}
							<button class="btn bg-blue-600 hover:bg-blue-700 text-white border-0 btn-lg disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:opacity-50" onclick={checkAnswer} disabled={isChecking}>
								Kontrollera
							</button>
						{/if}
					</div>
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
							<div
								class="flex justify-between items-center p-3 rounded-lg {problem.isCorrect
									? 'bg-success/20'
									: 'bg-error/20'}"
							>
								<div class="flex-1">
									<span class="font-semibold">
										{problem.num1} × {problem.num2} =
									</span>
									<span
										class="ml-2 {problem.isCorrect ? 'text-success' : 'text-error'}"
									>
										{problem.userAnswer}
									</span>
									{#if !problem.isCorrect}
										<span class="ml-2 text-error">(Rätt: {problem.answer})</span>
									{/if}
								</div>
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
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>


<script lang="ts">
	interface Props {
		value: string;
		disabled?: boolean;
		onInput: (value: string) => void;
		onKeyPress?: (event: KeyboardEvent) => void;
	}

	let { value, disabled = false, onInput, onKeyPress }: Props = $props();
	let inputElement: HTMLInputElement | null = $state(null);
	let localValue = $state(value);

	$effect(() => {
		localValue = value;
	});

	$effect(() => {
		if (inputElement && !disabled && localValue === '') {
			setTimeout(() => {
				inputElement?.focus();
			}, 100);
		}
	});
</script>

<div class="form-control w-full max-w-xs mx-auto">
	<input
		type="number"
		placeholder="Ditt svar"
		class="input input-bordered input-lg text-center text-xl md:text-2xl"
		bind:value={localValue}
		bind:this={inputElement}
		onkeypress={onKeyPress}
		{disabled}
		autofocus
		oninput={(e) => {
			const newValue = (e.currentTarget as HTMLInputElement).value;
			localValue = newValue;
			onInput(newValue);
		}}
	/>
</div>


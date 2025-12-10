<script lang="ts">
	interface Props {
		checked: boolean;
		disabled: boolean;
		onChange: (checked: boolean) => void;
	}

	let { checked, disabled, onChange }: Props = $props();
</script>

<div class="form-control mb-4">
	<label class="label cursor-pointer justify-start gap-4">
		<span class="label-text">Öva endast felaktiga</span>
		<input
			type="checkbox"
			class="toggle bg-blue-500 checked:bg-blue-600"
			checked={checked}
			{disabled}
			onchange={(e) => onChange((e.currentTarget as HTMLInputElement).checked)}
		/>
	</label>
</div>


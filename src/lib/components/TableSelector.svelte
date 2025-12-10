<script lang="ts">
	interface Props {
		selectedTable: number | null;
		onTableChange: (table: number | null) => void;
	}

	let { selectedTable, onTableChange }: Props = $props();
</script>

<div class="form-control">
	<label class="label">
		<span class="label-text font-semibold">Öva tabell</span>
	</label>
	<select
		class="select select-bordered w-full"
		value={selectedTable?.toString() ?? ''}
		onchange={(e) => {
			const value = (e.currentTarget as HTMLSelectElement).value;
			onTableChange(value === '' ? null : parseInt(value));
		}}
	>
		<option value="">Alla tabeller</option>
		{#each Array(10) as _, i}
			<option value={(i + 1).toString()}>{i + 1}:an tabellen</option>
		{/each}
	</select>
</div>


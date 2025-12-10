<script lang="ts">
	interface Props {
		title: string;
	}

	let { title }: Props = $props();
</script>

<div class="flex justify-between items-center mb-4">
	<h1 class="card-title text-2xl">{title}</h1>
	<a href="/" class="btn btn-sm btn-ghost">Hem</a>
</div>


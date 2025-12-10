<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
	<div class="card bg-base-100 shadow-xl w-full max-w-md">
		<div class="card-body">
			<h1 class="card-title text-3xl justify-center mb-4">Multiplikationsträning</h1>
			<div class="flex flex-col gap-4">
				<button class="btn btn-primary btn-lg" onclick={() => goto('/practice')}>
					Öva med svar
				</button>
				<button class="btn btn-secondary btn-lg" onclick={() => goto('/view')}>
					Visa svar
				</button>
			</div>
		</div>
	</div>
</div>

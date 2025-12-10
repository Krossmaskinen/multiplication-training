<script lang="ts">
	import { onMount } from 'svelte';
	import ActionButton from './ActionButton.svelte';

	interface BeforeInstallPromptEvent extends Event {
		prompt: () => Promise<void>;
		userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
	}

	let deferredPrompt: BeforeInstallPromptEvent | null = $state(null);
	let showPrompt = $state(false);

	onMount(() => {
		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			deferredPrompt = e as BeforeInstallPromptEvent;
			showPrompt = true;
		};

		const handleAppInstalled = () => {
			showPrompt = false;
			deferredPrompt = null;
		};

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		window.addEventListener('appinstalled', handleAppInstalled);

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
			window.removeEventListener('appinstalled', handleAppInstalled);
		};
	});

	async function handleInstall() {
		if (!deferredPrompt) return;

		deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;

		if (outcome === 'accepted') {
			showPrompt = false;
		}

		deferredPrompt = null;
	}
</script>

{#if showPrompt && deferredPrompt}
	<div class="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-50">
		<div class="card bg-base-100 shadow-xl border-2 border-blue-500">
			<div class="card-body p-4">
				<h3 class="card-title text-lg mb-2">Installera appen</h3>
				<p class="text-sm mb-4">Installera Multiplikationsträning på din enhet för snabbare åtkomst!</p>
				<div class="flex gap-2">
					<ActionButton label="Installera" onClick={handleInstall} size="sm" />
					<button
						class="btn btn-ghost btn-sm"
						onclick={() => {
							showPrompt = false;
						}}
					>
						Inte nu
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}


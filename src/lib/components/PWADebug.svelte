<script lang="ts">
	import { onMount } from 'svelte';

	let swStatus = $state('Checking...');
	let manifestStatus = $state('Checking...');
	let installable = $state(false);

	onMount(async () => {
		if ('serviceWorker' in navigator) {
			const registration = await navigator.serviceWorker.getRegistration();
			if (registration) {
				swStatus = `Registered: ${registration.scope}`;
			} else {
				swStatus = 'Not registered';
			}
		} else {
			swStatus = 'Not supported';
		}

		try {
			const response = await fetch('/manifest.webmanifest');
			if (response.ok) {
				const manifest = await response.json();
				manifestStatus = `OK: ${manifest.name}`;
				installable = true;
			} else {
				manifestStatus = `Error: ${response.status}`;
			}
		} catch (error) {
			manifestStatus = `Error: ${error}`;
		}

		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.addEventListener('controllerchange', () => {
				swStatus = 'Controller changed';
			});
		}
	});
</script>

<div class="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-40 bg-base-200 p-4 rounded-lg text-xs">
	<div class="font-bold mb-2">PWA Debug Info</div>
	<div>SW: {swStatus}</div>
	<div>Manifest: {manifestStatus}</div>
	<div>Installable: {installable ? 'Yes' : 'No'}</div>
</div>


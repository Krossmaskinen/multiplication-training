<script lang="ts">
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { registerSW } from 'virtual:pwa-register';
	import favicon from '$lib/assets/favicon.svg';
	import InstallPrompt from '$lib/components/InstallPrompt.svelte';
	import PWADebug from '$lib/components/PWADebug.svelte';
	import '../app.css';

	let { children } = $props();

	onMount(() => {
		registerSW({
			immediate: true,
			onRegisteredSW(swUrl, registration) {
				console.log('Service Worker registered:', swUrl, registration);
			},
			onRegisterError(error) {
				console.error('Service Worker registration error:', error);
			},
			onNeedRefresh() {
				console.log('Service Worker needs refresh');
			},
			onOfflineReady() {
				console.log('App ready to work offline');
			}
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
<InstallPrompt />
{#if dev}
	<PWADebug />
{/if}

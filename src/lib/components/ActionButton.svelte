<script lang="ts">
	interface Props {
		label: string;
		onClick: () => void;
		disabled?: boolean;
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	}

	let {
		label,
		onClick,
		disabled = false,
		size = 'md',
		class: className = ''
	}: Props = $props();

	const sizeClasses = {
		sm: 'btn-sm',
		md: '',
		lg: 'btn-lg'
	};
</script>

<button
	class="btn bg-blue-600 hover:bg-blue-700 text-white {sizeClasses[size]} disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:opacity-50 {className}"
	onclick={onClick}
	{disabled}
>
	{label}
</button>


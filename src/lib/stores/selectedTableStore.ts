import { writable } from 'svelte/store';

const STORAGE_KEY = 'selected-table';

function createSelectedTableStore() {
	const { subscribe, set, update } = writable<number | null>(null);

	return {
		subscribe,
		set: (value: number | null) => {
			set(value);
			if (typeof window !== 'undefined') {
				if (value === null) {
					sessionStorage.removeItem(STORAGE_KEY);
				} else {
					sessionStorage.setItem(STORAGE_KEY, value.toString());
				}
			}
		},
		load: () => {
			if (typeof window !== 'undefined') {
				const stored = sessionStorage.getItem(STORAGE_KEY);
				if (stored) {
					const value = parseInt(stored);
					if (!isNaN(value)) {
						set(value);
						return value;
					}
				}
			}
			return null;
		},
		clear: () => {
			set(null);
			if (typeof window !== 'undefined') {
				sessionStorage.removeItem(STORAGE_KEY);
			}
		}
	};
}

export const selectedTableStore = createSelectedTableStore();


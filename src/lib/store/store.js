import { writable } from 'svelte/store';

export const screenType = writable(null);
export const iframe = writable(true);
export const isLoaded = writable(false);

export const darkMode = writable(true);
export const show3d = writable(true);

export const mouseOnLink = writable(false);
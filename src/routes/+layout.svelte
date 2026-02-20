<script>
	import './app.css';
	import { onMount, onDestroy } from 'svelte';
	import { screenType, iframe, isLoaded } from '$lib/store/store';
	import { createExperience } from '$lib/three-d/Experience.js';

	let canvas;
	let experience;
	let loadProgress = 0;

	onMount(async () => {
		// Set viewport height CSS variable
		const setVh = () => {
			document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
		};
		setVh();
		window.addEventListener('resize', setVh);

		// Detect screen type
		const ua = navigator.userAgent;
		let screenTypeENUM;
		
		if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
			screenTypeENUM = 1; // phone
		} else if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			screenTypeENUM = 2; // tablet
		} else {
			screenTypeENUM = 3; // desktop
		}
		screenType.set(screenTypeENUM);

		// Check iframe
		if (window.location !== window.parent.location) {
			iframe.set(true);
		}

		// Initialize Three.js experience
		const isMobile = screenTypeENUM !== 3;
		experience = createExperience(canvas, isMobile);
		
		await experience.init((progress) => {
			loadProgress = progress;
		});
		
		// Small delay to ensure smooth transition
		await new Promise(r => setTimeout(r, 100));
		isLoaded.set(true);

		return () => {
			window.removeEventListener('resize', setVh);
		};
	});

	onDestroy(() => {
		experience?.destroy();
	});
</script>

<canvas bind:this={canvas} class="webgl"></canvas>

{#if !$isLoaded}
	<div class="loader">
		<div class="loader-content">
			<div class="loader-text">BUSINESS LOADING</div>
			<div class="loader-bar">
				<div class="loader-fill" style="width: {loadProgress * 100}%"></div>
			</div>
		</div>
	</div>
{/if}

<div class="app" class:visible={$isLoaded}>
	{#if $screenType && $isLoaded}
		<main>
			<slot />
		</main>
	{/if}
</div>

<style>
	.webgl {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -10;
		width: 100%;
		height: 100%;
		height: calc(var(--vh, 1vh) * 100);
	}

	.app {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100%;
		height: calc(var(--vh, 1vh) * 100);
		overflow: hidden;
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	.app.visible {
		opacity: 1;
	}

	main {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}

	.loader {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100%;
		height: calc(var(--vh, 1vh) * 100);
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--background);
		z-index: 100;
	}

	.loader-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
	}

	.loader-text {
		font-family: untitled, sans-serif;
		font-size: 12px;
		letter-spacing: 3px;
		color: var(--primary);
	}

	.loader-bar {
		width: 120px;
		height: 2px;
		background: var(--primary-50);
		overflow: hidden;
	}

	.loader-fill {
		height: 100%;
		background: var(--primary);
		transition: width 0.2s ease-out;
	}
</style>
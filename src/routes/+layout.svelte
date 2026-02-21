<script>
	import './app.css';
	import { onMount, onDestroy } from 'svelte';
	import { screenType, iframe, isLoaded } from '$lib/store/store';
	import { createExperience } from '$lib/three-d/Experience.js';

	let canvas;
	let experience;
	let loadProgress = 0;

	// Preload a random headshot
	function preloadHeadshot() {
		return new Promise((resolve) => {
			const index = Math.floor(Math.random() * 3) + 1;
			const img = new Image();
			img.onload = () => resolve(index);
			img.onerror = () => resolve(index);
			img.src = `/images/${index}.png`;
		});
	}

	onMount(async () => {
		const setVh = () => {
			document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
		};
		setVh();
		window.addEventListener('resize', setVh);

		const ua = navigator.userAgent;
		let screenTypeENUM;
		
		if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
			screenTypeENUM = 1;
		} else if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			screenTypeENUM = 2;
		} else {
			screenTypeENUM = 3;
		}
		screenType.set(screenTypeENUM);

		if (window.location !== window.parent.location) {
			iframe.set(true);
		}

		const isMobile = screenTypeENUM !== 3;
		experience = createExperience(canvas, isMobile);
		
		// Load 3D models AND headshot in parallel
		const [headshotIndex] = await Promise.all([
			preloadHeadshot(),
			experience.init((progress) => {
				loadProgress = progress;
			})
		]);
		
		// Store which headshot to use
		window.__headshotIndex = headshotIndex;
		
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

<svelte:head>
	<title>Garrett Musar</title>
	<meta name="description" content="Freelance Copywriter. I have a degree from an accredited business school." />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="keywords" content="freelance copywriter, brand copywriter, creative copywriter, web copywriter, advertising copywriter, content writer, brand voice, marketing copy, freelance writer for hire" />	

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://garrettmusar.work/" />
	<meta property="og:title" content="Garrett Musar" />
	<meta property="og:description" content="Freelance Copywriter. I have a degree from an accredited business school." />
	<meta property="og:image" content="https://www.garrettmusar.work/images/2.png" />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@LL_Croix" />
	<meta name="twitter:title" content="Garrett Musar | Freelance Copywriter" />
	<meta name="twitter:description" content="Freelance copywriter specializing in brand voice, web copy, and creative campaigns." />
	<meta name="twitter:image" content="https://garrettmusar.work/images/2.png" />

	<!-- Canonical -->
	<link rel="canonical" href="https://garrettmusar.work/" />
	
	<!-- Fonts -->
	<link
		rel="preload"
		as="font"
		href="/fonts/test-financier-display-semibold.woff2"
		type="font/woff2"
		crossorigin="anonymous"
	/>
</svelte:head>

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
		font-family: var(--font-sans);
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
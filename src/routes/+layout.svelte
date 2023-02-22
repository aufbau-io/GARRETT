<script>
	import './app.css';

	import { onMount } from 'svelte';
	import { screenType, iframe } from '$lib/store/store';

	import Experience from '$lib/three-d/Experience.js'

	onMount(async () => {

		// ---------------------------------------------------------------------------
		// HEIGHT
		// ---------------------------------------------------------------------------

		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		window.addEventListener('resize', () => {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		});

		const experience = new Experience(document.querySelector('canvas.webgl'))

		// ---------------------------------------------------------------------------
		// SCREEN
		// ---------------------------------------------------------------------------
		const ua = navigator.userAgent;
		if (
			/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)
		) {
			// phone
			screenType.set(1);
		} else if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			// tablet
			screenType.set(2);
		} else {
			//laptop
			screenType.set(3);
		}

		if (window.location !== window.parent.location) {
			// The page is in an iframe
			iframe.set(true);
		}
	});
</script>

<canvas class="webgl"></canvas>

<div class="app">
	{#key $screenType}
	{#if $screenType}
	<!-- <header>
		<Header />
	</header> -->

	<main>
		<slot />
	</main>

	<!-- <footer>
		<Footer />
	</footer> -->
	{/if}
	{/key}
</div>


<style>
	.app {
		display: flex;
		overflow: hidden;
		align-items: center;
		justify-content: center;

		width: 100%;
		height: 100%;
		height: calc(var(--vh, 1vh) * 100);
		overflow: hidden;

		width: 100vw;
	}

	.webgl {
		position: absolute;
		z-index: -10;

		width: 100%;

		height: 100%;
		height: calc(var(--vh, 1vh) * 100);
		overflow: hidden;
	}

	main {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

</style>

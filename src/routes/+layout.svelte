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

		// ---------------------------------------------------------------------------
		// SCREEN
		// ---------------------------------------------------------------------------
		const ua = navigator.userAgent;
		let screenTypeENUM;
		if (
			/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)
		) {
			// phone
			screenTypeENUM = 1;
			screenType.set(screenTypeENUM);
		} else if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			// tablet
			screenTypeENUM = 2;
			screenType.set(screenTypeENUM);
		} else {
			//laptop
			screenTypeENUM = 3;
			screenType.set(screenTypeENUM);
		}

		if (window.location !== window.parent.location) {
			// The page is in an iframe
			iframe.set(true);
		}

		const experience = new Experience(document.querySelector('canvas.webgl'), screenTypeENUM)
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
		
		/* opacity: 0;
		animation: fadein 0s 1s ease;
		animation-fill-mode: forwards; */
	}

	.webgl {
		position: absolute;
		z-index: -10;

		width: 100%;

		height: 100%;
		height: calc(var(--vh, 1vh) * 100);
		overflow: hidden;
	
		/* opacity: 0;
		animation: fadein 1s 1s ease;
		animation-fill-mode: forwards; */
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

<script>
	import './app.css';

	import { onMount } from 'svelte';
	import { screenType, iframe } from '$lib/store/store';

	import Header from '$lib/components/header/header.svelte';
	import Footer from '$lib/components/footer/footer.svelte';
	import Experience from '$lib/three-d/Experience.js'

	let experience;
	onMount(async () => {

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
		flex-direction: column;
		min-height: 100vh;
	}

	.webgl {
		position: absolute;
		z-index: -1;
	}

	header {
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 10;
	}

	footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		z-index: 10;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: calc(4 * var(--margin)) 0;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

</style>

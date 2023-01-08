<script>	
	import { darkMode } from '$lib/store/store';
	import headshot from '$lib/images/headshot.webp';
	import headshot_fallback from '$lib/images/headshot.jpg';
	
	import casual from '$lib/images/casual2.webp';
	import casual_fallback from '$lib/images/casual2.jpg';
	
</script>

<svelte:head>
	<title>Garrett “All Business” Musar</title>
	<meta name="description" content="I have a degree from an accredited business school." />

	<link rel="preload" href={headshot} as="image/webp" />
	<link rel="preload" href={casual} as="image/webp" />

	<link
		rel="preload"
		as="font"
		href="/fonts/NB-Architekt-Pro-Bold.woff"
		type="font/woff"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		as="font"
		href="/fonts/NB-Architekt-Pro-Regular.woff"
		type="font/woff"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		as="font"
		href="/fonts/NB-Architekt-Pro-Light.woff"
		type="font/woff"
		crossorigin="anonymous"
	/>
</svelte:head>

<section>
	{#if $darkMode}
	<picture>
		<source srcset={headshot} type="image/webp" />
		<img src={headshot_fallback} alt="Headshot" class="headshot" />
	</picture>
	{:else }

	<picture>
		<source srcset={casual} type="image/webp"  />
		<img src={casual_fallback} alt="Headshot" class="casual" />
	</picture>
	{/if}



</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: .6;
	
	}

	picture {
		min-height: 60vh;
		padding: calc(2 * var(--margin));
		border: solid 1px var(--primary);
	}

	 img {
		height: 60vh;
		width: 60vh;
		margin: auto;
		object-fit: cover;
		border: solid 1px var(--primary);
	}

	img.headshot {
		object-position: 0% 30%;
	}

	img.casual {
		object-position: 0% 10%;
	}

	h1 {
		width: 100%;
		color: var(--primary);
		font-family: var(--font-header);
	}

@media (max-width: 760px) {
		picture {
		min-width: none;
		min-height: 80vw;
		padding: calc(1 * var(--margin));
	}

	 img {
		height: 80vw;
		width: 80vw;
	}
}

</style>

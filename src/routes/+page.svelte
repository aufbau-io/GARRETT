<script>	
	import { darkMode } from '$lib/store/store';
	import headshot from '$lib/images/headshot.webp';
	import headshot_fallback from '$lib/images/headshot.jpg';
	
	import casual from '$lib/images/casual.webp';
	import casual_fallback from '$lib/images/casual.jpg';
	
</script>

<svelte:head>
	<title>Garrett “All Business” Musar</title>
	<meta name="description" content="Freelance Copywriter. I have a degree from an accredited business school." />

	<!-- <link rel="preload" href={headshot} as="image/webp" />
	<link rel="preload" href={casual} as="image/webp" />

	<link rel="preload" href={headshot_fallback} as="image/jpg" />
	<link rel="preload" href={casual_fallback} as="image/jpg" /> -->

</svelte:head>

<section>

	<picture>
		<h1>BUSINESS IN THE FRONT</h1>
		<source srcset={casual} type="image/webp"  />
		<img src={casual_fallback} alt="Headshot" />
	</picture>


	<div class="entry">
		<h2>COME ON BACK</h2>
	</div>

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	
		width: 100%;
		height: 100%;
	}

	picture {
		/* min-height: 60vh; */
		/* background: var(--white);
		padding: calc(2 * var(--margin));
		border: solid 1px var(--primary); */
		position: relative;
	}

	 img {
		height: 60vh;
		width: 60vh;
		margin: auto;
		object-fit: cover;
		border: solid 2px var(--primary);

		object-position: 0% 22.5%;
		box-shadow: 0 0 10px var(--primary);
	}
	
	h1 {
		min-width: 80vw;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		z-index: 10;



		width: 100%;

		font-size: 100px;
		color: var(--background);
		-webkit-text-stroke: 2px;
		-webkit-text-stroke-color: var(--primary);
		letter-spacing: 6px;

		text-shadow: 0 0 10px var(--primary);
	}

	.entry {
		width: 60vh;
		margin-top: 3vh;
		height: 8vh;
		background: var(--primary);
		border: solid 2px var(--background);

		display: flex;
		align-items: center;
		justify-content: center;

		color: var(--background);
		cursor: pointer;
		box-shadow: 0 0 10px var(--primary);
	}

	.entry:hover {
		background-color: var(--background);
		border-color: var(--primary);
		color: var(--primary)
	}

	.entry:active {
		box-shadow: 0 0 10px var(--white);
		color: var(--white);
	}

	h2 {
		font-size: 24px;
		font-weight: 600;
		color: inherit;
		letter-spacing: 3px;
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

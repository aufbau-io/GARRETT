<script>	
	import { darkMode } from '$lib/store/store';
	import headshot from '$lib/images/headshot.webp';
	import headshot_fallback from '$lib/images/headshot.jpg';
	
	// import casual from '$lib/images/casual.png';
	import casual from '$lib/images/casual-removebg.png';
	
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

	<!-- <div class="square">

		</div> -->

	<picture>
		<h1>Business&nbsp;In&nbsp;The&nbsp;Front</h1>
		<!-- <source srcset={casual} type="image/webp"  /> -->
		<img src={casual} alt="Headshot" />
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

	.square {
		width: 50vh;
		height: 50vh;
		background: none;
		border: solid 2px var(--primary);
		position: relative;
	}

	picture {
		/* min-height: 60vh; */
		/* background: var(--white);
		padding: calc(2 * var(--margin));
		border: solid 1px var(--primary); */
		position: relative;
	}

	 img {
		height: 50vh;
		width: 50vh;
		margin: auto;
		object-fit: cover;
		border: double 6px var(--primary);

		object-position: 0% 22.5%;
		/* box-shadow: 0 0 10px var(--primary); */
	}
	
	h1 {
		/* height: 50vh;
		width: 50vh; */
		background: var(--primary);
		border: double 6px var(--background);
		
		min-width: 60vh;
		height: 75px;
		line-height: 65px;
		
		position: absolute;
		bottom: 10%;
		left: 50%;
		transform: translate(-50%, 0%);

		z-index: 10;



		width: 100%;

		font-size: 32px;
		color: var(--background);
		/* -webkit-text-stroke:1px; */
		/* -webkit-text-stroke-color: var(--background); */
		letter-spacing: 1px;

		/* text-shadow: 2px 2px 0px var(--background); */
	}

	.entry {
		width: 50vh;
		margin-top: 2vh;
		height: 6vh;
		background: var(--background);
		border: double 6px var(--primary);

		display: flex;
		align-items: center;
		justify-content: center;

		color: var(--primary);
		cursor: pointer;
		/* box-shadow: 0 0 10px var(--primary); */
	}

	.entry:hover {
		background-color: var(--primary);
		color: var(--background)
	}

	.entry:active {
		background: var(--background);
		color: var(--primary);
		border-color: var(--primary);
	}

	h2 {
		font-size: 16px;
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

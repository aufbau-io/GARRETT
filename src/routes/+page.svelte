<script>	
	// import { darkMode } from '$lib/store/store';
	// import headshot from '$lib/images/headshot.webp';
	// import headshot_fallback from '$lib/images/headshot.jpg';
	
	// import casual from '$lib/images/casual.png';
	import casual from '$lib/images/casual-removebg.png';

	import instagram from '$lib/images/icons/Instagram.svg';
	import linkedin from '$lib/images/icons/LinkedIn.svg';
	import mail from '$lib/images/icons/Mail.svg';
	import twitter from '$lib/images/icons/Twitter.svg';
	
</script>

<svelte:head>
	<title>Garrett “All Business” Musar</title>
	<meta name="description" content="Freelance Copywriter. I have a degree from an accredited business school." />

	<link rel="preload" href="{casual}" as="image/jpg" />

	<link
	rel="preload"
	as="font"
	href="/fonts/test-financier-display-medium.woff2"
	type="font/woff2"
	crossorigin="anonymous"
	/>

	<link
	rel="preload"
	as="font"
	href="/fonts/test-untitled-sans-regular.woff2"
	type="font/woff2"
	crossorigin="anonymous"
	/>

</svelte:head>

<section>


			<!-- <h2 class="fade-a">GARRETT MUSAR</h2> -->


		<!-- <div class="square">

		</div> -->
		<header >
			<h2>GARRETT MUSAR</h2>
			<div class="icons tmp">
				<img src={instagram} alt="instagram" class="icon" />
				<img src={linkedin} alt="linkedin" class="icon" />
				<img src={mail} alt="mail" class="icon" />
				<img src={twitter} alt="twitter" class="icon" />
			</div>
		</header>
	<picture>
		<div class="main">
			<h1 class="fade"><span>Business&nbsp;In&nbsp;The&nbsp;Front</span></h1>
		</div>
		<!-- <source srcset={casual} type="image/webp"  /> -->
		<img src={casual} alt="Headshot" class="headshot fade-a" />
	</picture>

	<div class="entry button fase-a">
		<h2>COME ON BACK</h2>
	</div>



</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	
		width: 48vh;
		height: 100%;
		/* opacity: 0; */
	}

	.square {
		width: 100%;
		height: 100%;
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
		background: var(--background);
		border: double 6px var(--primary);

		margin-bottom: 1.1rem;

		
	}

	header {
		width: 100%;
		height: 30px;
		margin-bottom: .25rem;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		color: var(--accent);

	}

	.icons {
		display: flex;
		gap: 4px;
		justify-content: space-evenly;
	}

	.icon {
		height: 30px;
		width: 30px;
	}

	.headshot {
		height: 46vh;
		width: 48vh;
		margin: auto;
		object-fit: cover;
		object-position: 0% 25%;
		/* box-shadow: 0 0 10px var(--primary); */
		

		/* opacity: 0;
		animation: fadein 1s 1s ease;
		animation-fill-mode: forwards; */
	}

	.entry, .main {
		min-width: 120%;
		height: 72px;
		line-height: 0;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		text-transform: uppercase;
	}

	.main {
		position: absolute;
		bottom: 10%;
		left: -10%;

		background: var(--primary);
		border: double 6px var(--background);
		color: var(--background);

		z-index: 10;

		/* opacity: 0;
		animation: fadein 0s 1s ease;
		animation-fill-mode: forwards; */
	}

	.entry {
		height: 56px;

		cursor: pointer;
		min-width: 80%;
		transition: transform ease .1s, box-shadow ease .1s;
	
		background: var(--background);
		border: double 6px var(--primary);
		color: var(--primary);

		opacity: 0;
		animation: fadein 1s 2s ease;
		animation-fill-mode: forwards;
	}
	
	h1 {
		z-index: 10;
		color: var(--background);
		width: 100%;
		font-size: 26px;
		letter-spacing: 3px;
	}

	.entry:hover {
		background-color: var(--background);
		color: var(--primary);
		border-color: var(--primary);

		box-shadow: 5px 5px var(--primary) ;
		transform: translate(-5px, -5px);
	}

	.entry:active {
		box-shadow: none;
		transform: translateY(0px);
	}

	h2 {
		font-size: 18px;
		color: inherit;
		letter-spacing: 3px;
		font-family: untitled, sans-serif;
		font-weight: 400;
	}

.arrow {
		font-family: financier, serif;
		font-size: 30px;
		color: var(--primary);
	}

.entry:hover .arrow {
		color: var(--background);
	}


@media (max-width: 760px) {
	section {
		width: 80vw;
	}
	
.headshot {
		height: 76vw;
	}

	.icon {
		height: 25px;
		width: 25px;
	}

	picture, .square {
		margin: 0 !important;
		padding: 0 !important;
		background: var(--background-50);
	}

	h1 {
		/* height: 70px; */
		/* line-height: 58px; */
		font-size: 20px;
	}

	h2, .entry:hover:before {
		font-size: 14px;
	}

	.entry {
		height: 8.5vh;
		margin-top: 2vh;

	}

	.entry:active {
		background-color: var(--background);
		color: var(--primary);
		border-color: var(--primary);
	}

	header {
		margin-bottom: .4vh;;
	}

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

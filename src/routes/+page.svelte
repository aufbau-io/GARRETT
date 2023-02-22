<script>	
	import { darkMode } from '$lib/store/store';
	import headshot from '$lib/images/headshot.webp';
	import headshot_fallback from '$lib/images/headshot.jpg';
	
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

	<link rel="preload" href={casual} as="image/jpg" />

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

		<header >
			<h2 class="fade-a">GARRETT MUSAR</h2>
		<div class="icons ">
			<img src={instagram} alt="instagram" class="icon fade-a" />
			<img src={linkedin} alt="linkedin" class="icon fade-a" />
			<img src={mail} alt="mail" class="icon fade-a" />
			<img src={twitter} alt="twitter" class="icon fade-a" />
		</div>
	</header>
		<!-- <div class="square">

		</div> -->
	<picture>
		<h1 class="fade">Business&nbsp;In&nbsp;The&nbsp;Front</h1>
		<!-- <source srcset={casual} type="image/webp"  /> -->
		<img src={casual} alt="Headshot" class="headshot fade-a" />
	</picture>


	<div class="entry fase-a">
		<!-- <h2 class="arrow">▢</h2> -->
		<h2 class="fade-a">COME ON BACK</h2>
		<!-- <h2 class="arrow">▢</h2> -->
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
		border: double 6px var(--primary)
	}

	header {
		width: 100%;
		height: 30px;
		padding-bottom: 3px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--accent);
	}

	.icons {
		display: flex;
		gap: 4px;
	}

	.icon {
		height: 25px;
		width: 25px;
	}

	.headshot {
		height: 48vh;
		width: 48vh;
		margin: auto;
		object-fit: cover;
		object-position: 0% 22.5%;
		/* box-shadow: 0 0 10px var(--primary); */
	}
	
	h1 {
		/* height: 50vh;
		width: 50vh; */
		background: var(--primary);
		border: double 6px var(--background);
		
		min-width: 120%;
		height: 75px;
		line-height: 63px;
		
		position: absolute;
		bottom: 10%;
		left: 50%;
		transform: translate(-50%, 0%);
		text-transform: uppercase;

		z-index: 10;



		width: 100%;

		font-size: 26px;
		color: var(--background);
		letter-spacing: 3px;
	}

	.entry {
		width: 100%;
		margin-top: 1.25vh;
		height: 5.5vh;
		background: var(--background);
		border: double 6px var(--primary);

		margin-bottom: 30px;


		display: flex;
		align-items: center;
		justify-content: space-around;

		color: var(--background);
		cursor: pointer;
		/* box-shadow: 0 0 10px var(--primary); */

	}

	.entry:hover {
		background-color: var(--primary);
		color: var(--background);
		border-color: var(--background);
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

	@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
	}

	/* Firefox < 16 */
	@-moz-keyframes fadein {
			from { opacity: 0; }
			to   { opacity: 1; }
	}

	/* Safari, Chrome and Opera > 12.1 */
	@-webkit-keyframes fadein {
			from { opacity: 0; }
			to   { opacity: 1; }
	}

	/* Internet Explorer */
	@-ms-keyframes fadein {
			from { opacity: 0; }
			to   { opacity: 1; }
	}

	/* Opera < 12.1 */
	@-o-keyframes fadein {
			from { opacity: 0; }
			to   { opacity: 1; }
	}


@media (max-width: 760px) {
	section {
		width: 80vw;
	}
	
	picture, .square, .headshot {
		height: 72vw;
	}

	h1 {
		font-size: 23px;
	}

	h2 {
		font-size: 14px;
	}

	.entry {
		height: 7vh;
		margin-top: 2vh;;
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

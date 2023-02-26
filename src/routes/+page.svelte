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
			<!-- <h2 class="fade-a">GARRETT MUSAR</h2> -->

	</header>
		<!-- <div class="square">

		</div> -->
	<picture>
		<div class="entry">
			<h1 class="fade"><span>Business&nbsp;In&nbsp;The&nbsp;Front</span></h1>
		</div>
		<!-- <source srcset={casual} type="image/webp"  /> -->
		<img src={casual} alt="Headshot" class="headshot fade-a" />
	</picture>

	<h2 class="tmp">GARRETT MUSAR</h2>
	<div class="icons tmp">
		<img src={instagram} alt="instagram" class="icon fade-a" />
		<img src={linkedin} alt="linkedin" class="icon fade-a" />
		<img src={mail} alt="mail" class="icon fade-a" />
		<img src={twitter} alt="twitter" class="icon fade-a" />
	</div>



	<!-- <div class="entry fase-a">
	</div> -->



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
		padding-bottom: 1rem;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		color: var(--accent);
	}

	.tmp {
		padding-top: .6rem;
	}

	.icons {
		padding-top: .2rem;
		display: flex;
		width: 30%;
		gap: 4px;
		justify-content: space-evenly;
	}

	.icon {
		height: 30px;
		width: 30px;
	}

	.headshot {
		height: 48vh;
		width: 48vh;
		margin: auto;
		object-fit: cover;
		object-position: 0% 22.5%;
		/* box-shadow: 0 0 10px var(--primary); */
	}

	.entry {
		/* height: 50vh;
		width: 50vh; */
		background: var(--primary);
		border: double 6px var(--background);
		
		min-width: 120%;
		height: 80px;
		line-height: 0;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

				
		position: absolute;
		bottom: 10%;
		left: 50%;
		transform: translate(-50%, 0%);
		text-transform: uppercase;
		color: var(--background);
		cursor: pointer;


	}
	
	h1 {

		z-index: 10;
		color: var(--background);
		width: 100%;
		font-size: 26px;
		letter-spacing: 3px;
	}

.entry:hover span {
  display: none
}

.entry:hover:before {
	color: var(--primary);
  content: "COME ON BACK";
	position: absolute;

	font-size: 18px;
		color: inherit;
		letter-spacing: 3px;
		font-family: untitled, sans-serif;
		font-weight: 400;

}

	.entry h2 {
		opacity: 0;
		animation: fadein .4s 2.6s ease-out;
		animation-fill-mode: forwards;
	}

	/* .entry {
		width: 100%;
		margin-top: 1.25vh;
		height: 6vh;
		background: var(--background);
		border: double 6px var(--primary);

		margin-bottom: 30px;


		display: flex;
		align-items: center;
		justify-content: space-around;

		color: var(--primary);
		cursor: pointer;
	} */

	.entry:hover {
		background-color: var(--background);
		color: var(--primary);
		border-color: var(--primary);
	}

	.entry:active {
		background: var(--primary);
		color: var(--background);
		border-color: var(--background);

		
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
	
.headshot {
		height: 76vw;
	}

	picture, .square {
		margin: 0 !important;
		padding: 0 !important;
		background: var(--background-50);
	}

	h1 {
		/* height: 70px; */
		/* line-height: 58px; */
		font-size: 22px;
	}

	h2 {
		font-size: 14px;
	}

	.entry {
		height: 10vh;
		margin-top: 2vh;

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

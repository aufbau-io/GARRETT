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
	href="/fonts/test-heldance-display.bold.woff2"
	type="font/woff2"
	crossorigin="anonymous"
/>

</svelte:head>

<section>



		<header >
			<h2 class="fade-2">GARRETT MUSAR</h2>
		<div class="icons ">
			<img src={instagram} alt="instagram" class="icon fade-3a" />
			<img src={linkedin} alt="linkedin" class="icon fade-3b" />
			<img src={mail} alt="mail" class="icon fade-3c" />
			<img src={twitter} alt="twitter" class="icon fade-3d" />
		</div>
	</header>
		<!-- <div class="square">

		</div> -->
	<picture>
		<h1 class="fade">Business&nbsp;In&nbsp;The&nbsp;Front</h1>
		<!-- <source srcset={casual} type="image/webp"  /> -->
		<img src={casual} alt="Headshot" class="headshot fade-1" />
	</picture>


	<div class="entry color-change">
		<!-- <h2 class="arrow">$</h2> -->
		<h2 class="fade-5">COME ON BACK</h2>
		<!-- <h2 class="arrow">$</h2> -->
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
		width: 48vh;
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
		background: var(--background);
	}

	header {
		width: 48vh;
		height: 30px;
		padding-bottom: 3px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	header h6 {
		font-size: 16px;
		letter-spacing: 2px;
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
		border: double 6px var(--primary);

		object-position: 0% 22.5%;
		/* box-shadow: 0 0 10px var(--primary); */
	}
	
	h1 {
		/* height: 50vh;
		width: 50vh; */
		background: var(--primary);
		border: double 6px var(--background);
		
		min-width: 54vh;
		height: 75px;
		line-height: 65px;
		
		position: absolute;
		bottom: 10%;
		left: 50%;
		transform: translate(-50%, 0%);
		text-transform: uppercase;

		z-index: 10;



		width: 100%;

		font-size: 24px;
		color: var(--background);
		/* -webkit-text-stroke:1px; */
		/* -webkit-text-stroke-color: var(--background); */
		letter-spacing: 2px;

		/* text-shadow: 2px 2px 0px var(--background); */
	}

	.entry {
		width: 48vh;
		margin-top: 1vh;
		height: 6vh;
		background: var(--primary);
		border: double 6px var(--background);

		margin-bottom: 30px;


		display: flex;
		align-items: center;
		justify-content: space-around;

		color: var(--background);
		cursor: pointer;
		/* box-shadow: 0 0 10px var(--primary); */

	}

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
		font-size: 15px;
		color: inherit;
		letter-spacing: 3px;
		font-weight: 600;
	}

.arrow {
		font-family: heldane, serif;
		font-size: 30px;
		color: var(--primary);
	}

.entry:hover .arrow {
		color: var(--background);
	}


	.fade-1 {
		opacity: 0;
		-webkit-animation: fadein 0s ease-out .2s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 0s ease-out .2s; /* Firefox < 16 */
        -ms-animation: fadein 0s ease-out .2s; /* Internet Explorer */
         -o-animation: fadein 0s ease-out .2s; /* Opera < 12.1 */
            animation: fadein 0s ease-out .2s;
						animation-fill-mode: forwards;
	}

	.fade-2 {
		opacity: 0;
		-webkit-animation: fadein 0s ease-out .3s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 0s ease-out .3s; /* Firefox < 16 */
        -ms-animation: fadein 0s ease-out .3s; /* Internet Explorer */
         -o-animation: fadein 0s ease-out .3s; /* Opera < 12.1 */
            animation: fadein 0s ease-out .3s;
						animation-fill-mode: forwards;
	}

	.fade-3a {
		opacity: 0;
		-webkit-animation: fadein 0s ease-out .4s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 0s ease-out .4s; /* Firefox < 16 */
        -ms-animation: fadein 0s ease-out .4s; /* Internet Explorer */
         -o-animation: fadein 0s ease-out .4s; /* Opera < 12.1 */
            animation: fadein 0s ease-out .4s;
						animation-fill-mode: forwards;
	}

	.fade-3b {
		opacity: 0;
		-webkit-animation: fadein 0s ease-out .433s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 0s ease-out .433s; /* Firefox < 16 */
        -ms-animation: fadein 0s ease-out .433s; /* Internet Explorer */
         -o-animation: fadein 0s ease-out .433s; /* Opera < 12.1 */
            animation: fadein 0s ease-out .433s;
						animation-fill-mode: forwards;
	}

	.fade-3c {
		opacity: 0;
		-webkit-animation: fadein 0s ease-out .5s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 0s ease-out .5s; /* Firefox < 16 */
        -ms-animation: fadein 0s ease-out .5s; /* Internet Explorer */
         -o-animation: fadein 0s ease-out .5s; /* Opera < 12.1 */
            animation: fadein 0s ease-out .5s;
						animation-fill-mode: forwards;
	}

	.fade-3d {
		opacity: 0;
		-webkit-animation: fadein 0s ease-out .65s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 0s ease-out .65s; /* Firefox < 16 */
        -ms-animation: fadein 0s ease-out .65s; /* Internet Explorer */
         -o-animation: fadein 0s ease-out .65s; /* Opera < 12.1 */
            animation: fadein 0s ease-out .65s;
						animation-fill-mode: forwards;
	}

	.fade-4 {
		opacity: 0;
		-webkit-animation: fadein 0s ease-out .5s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 0s ease-out .5s; /* Firefox < 16 */
        -ms-animation: fadein 0s ease-out .5s; /* Internet Explorer */
         -o-animation: fadein 0s ease-out .5s; /* Opera < 12.1 */
            animation: fadein 0s ease-out .5s;
						animation-fill-mode: forwards;
	}

	.color-change {
		opacity: 0;
		-webkit-animation: fadein 0s ease-out .8s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 0s ease-out .8s; /* Firefox < 16 */
        -ms-animation: fadein 0s ease-out .8s; /* Internet Explorer */
         -o-animation: fadein 0s ease-out .8s; /* Opera < 12.1 */
            animation: fadein 0s ease-out .8s;
						animation-fill-mode: forwards;
	}

	.fade-5 {
		opacity: 0;
		-webkit-animation: fadein 0s ease-out 1s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 0s ease-out 1s; /* Firefox < 16 */
        -ms-animation: fadein 0s ease-out 1s; /* Internet Explorer */
         -o-animation: fadein 0s ease-out 1s; /* Opera < 12.1 */
            animation: fadein 0s ease-out 1s;
						animation-fill-mode: forwards;
	}

	@keyframes colorChange {
    from { 
			background: var(--background); 
			border-color: var(--primary);
			color: var(--primary);
		}
    to   { 
			background: var(--primary); 
			border-color: var(--background);
			color: var(--background);
		}
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

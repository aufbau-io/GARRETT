<script>	
	import headshot_1 from '$lib/images/1.png';
	import headshot_2 from '$lib/images/2.png';
	import headshot_3 from '$lib/images/3.png';

	import instagram from '$lib/images/icons/instagram.svg';
	import linkedin from '$lib/images/icons/linkedin.svg';
	import mail from '$lib/images/icons/gmail.svg';
	import twitter from '$lib/images/icons/twitter.svg';
	import music from '$lib/images/icons/music.svg';

	import { screenType } from '$lib/store/store';
	
	let index = Math.floor(Math.random() * 3) +1 ;

	let audio;
	audio = new Audio('/office.mp3');
	audio.loop = true;

	function toggleAudio() {
		audio.mute ? audio.pause() : audio.play();
		audio.mute = !audio.mute;
	}

</script>

<svelte:head>
	<title>GARRETT MUSAR</title>
	<meta name="description" content="Freelance Copywriter. I have a degree from an accredited business school." />

	{#if index == 1}
	<link rel="preload"  href="{headshot_1}" as="image/png" />
	{:else if index == 2}
	<link rel="preload" href="{headshot_2}" as="image/png" />
	{:else if index ==3}
	<link rel="preload" href="{headshot_3}" as="image/png" />
	{/if}

	<link
	rel="preload"
	as="font"
	href="/fonts/test-financier-display-semibold.woff2"
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
			<a href="https://www.linkedin.com/in/garrettallbusinessmusar/" target="_blank" rel="noreferrer">
				<img src={linkedin} alt="linkedin" class="icon" />
			</a>
			<a href="mailto: garyxmustard@gmail.com">
				<img src={mail} alt="mail" class="icon" />
			</a>
			<a href="https://www.instagram.com/garymustard_fanclub/" target="_blank" rel="noreferrer">
				<img src={instagram} alt="instagram" class="icon" />
			</a>
			<a href="https://twitter.com/LL_Croix" target="_blank" rel="noreferrer">
				<img src={twitter} alt="twitter" class="icon" />
			</a>
			<img src={music} alt="linkedin" class="icon" on:click={toggleAudio} on:keydown={toggleAudio} />
			</div>
		</header>

	<picture>
		<div class="main">
			<h1>
				{#if $screenType != 1}
				<span>◎</span>
				{/if}
				<span>Business&nbsp;In&nbsp;The&nbsp;Front</span>
				{#if $screenType != 1}
				<span>◎</span>
				{/if}
			</h1>
		</div>
		<!-- <source srcset={casual} type="image/webp"  /> -->
		{#if index == 1}
		<img src={headshot_1} alt="Headshot" class="headshot fade-a" />
		{:else if index == 2}
		<img src={headshot_2} alt="Headshot" class="headshot fade-a" />
		{:else if index ==3}
		<img src={headshot_3} alt="Headshot" class="headshot fade-a" />
		{/if}

	</picture>

	<a class="entry button fase-a" href="https://work.garrettmusar.work">
		<div >
			<h2>COME ON BACK</h2>
		</div>
	</a>



</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	
		width: 48vh;
		min-width: 500px;
		height: 100%;
		/* opacity: 0; */
	}

	picture {
		/* min-height: 60vh; */
		/* background: var(--white);
		padding: calc(2 * var(--margin));
		border: solid 1px var(--primary); */
		position: relative;
		background: var(--background-50);
		border: double 6px var(--primary);

		margin-bottom: 1.1rem;
		
	}

	header {
		width: 100%;
		height: 30px;
		margin-bottom: .25rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--accent);

	}

	.icons {
		display: flex;
		gap: 10px;
		justify-content: space-evenly;
	}


	.icon {
		height: 24px;
		width: 24px;

		cursor: pointer;
		opacity: 1;
	}

	.icon:hover{
		opacity:.5;
		}

	.headshot {
		height: 46vh;
		width: 48vh;
		min-width: 500px;
		min-height: 500px;

		margin: auto;
		object-fit: cover;
		object-position: 0% 25%;
		/* box-shadow: 0 0 10px var(--primary); */
		

		/* opacity: 0;
		animation: fadein 1s 1s ease;
		animation-fill-mode: forwards; */
	}

.main, .entry {
		min-width: 120%;
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
		left:50%;
		transform: translate(-50%);
		padding: 0 2px;
		
		width: 66%;
		height: 80px;
		max-width: 600px;

		background: var(--primary);
		border: double 6px var(--background);
		color: var(--background);

		z-index: 10;

		/* opacity: 0;
		animation: fadein 0s 1s ease;
		animation-fill-mode: forwards; */
	}

	.entry {
		height: 60px;

		cursor: pointer;
		min-width: 80%;
		transition: transform ease .1s, box-shadow ease .1s;
	
		background: var(--background-50);
		border: double 6px var(--primary);
		color: var(--primary);

		opacity: 0;
		animation: goBlack 2s 2s linear;
		animation-fill-mode: forwards;
		margin-bottom: 1.1rem;
	}
	
	h1 {
		z-index: 10;
		color: var(--background);
		width: 100%;
		font-size: 28px;
		letter-spacing: 4px;

		display: flex;
		justify-content: space-around;
	}

	.entry:hover {
		background: var(--primary) !important;
		color: var(--background) !important;
		border-color: var(--background) !important;
		text-decoration: none;
		/* box-shadow: 5px 5px var(--primary) ;
		transform: translate(-5px, -5px); */
	}

	.entry:active {
		background: var(--background) !important;
		border: double 6px var(--primary) !important;
		color: var(--primary) !important;
		/* box-shadow: none;
		transform: translateY(0px); */
	}

	h2 {
		font-size: 16px;
		color: inherit;
		letter-spacing: 2px;
		font-family: untitled, sans-serif;
		font-weight: 600;
	}

@media (max-width: 760px)  {
	section {
		max-width: 80vw;
		min-width: 0px;
		min-height: 0px;
	}

	.icon {
		height: 20px;
		width: 20px;
	}

	h1 {
		/* height: 70px; */
		/* line-height: 58px; */
		font-size: 5.5vw;
	}

	h2 {
		font-size: 14px;

	}

	.main {
		height: 10vh;
	}

	.entry {
		height: 8vh;
		margin-top: 2vh;
		margin-bottom: 0;

	}


	header {
		margin-bottom: .4vh;;
	}

	picture {
		margin: 0 !important;
		padding: 0 !important;
	
		min-width: none;

		height: calc(var(--vh, 1vh) * 100);
		width: calc(var(--vh, 1vh) * 100);
		max-width: 80vw;
		max-height: 80vw;
		padding: calc(1 * var(--margin));

	}

	.headshot {
		min-width: 0px;
		min-height: 0px;

		max-height: calc(var(--vh, 1vh) * 80 - 12px);

	}

}

@media (max-width: 500px) and (min-height: 600px) {
	.headshot {
		max-height: calc(80vw - 12px);
	}
}

@media (max-width: 350px) {

	h1 {
		font-size: 16px;
	}
	h2 {
		font-size: 10px;
	}
	.icon {
		height: 16px;
		width: 16px;
	}

}


</style>

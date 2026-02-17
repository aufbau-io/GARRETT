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
	
	const headshots = [headshot_1, headshot_2, headshot_3];
	const index = Math.floor(Math.random() * 3);
	const headshot = headshots[index];

	let audio;
	let audioPlaying = false;

	function toggleAudio() {
		if (!audio) {
			audio = new Audio('/office.mp3');
			audio.loop = true;
		}
		
		if (audioPlaying) {
			audio.pause();
		} else {
			audio.play();
		}
		audioPlaying = !audioPlaying;
	}
</script>

<svelte:head>
	<title>GARRETT MUSAR</title>
	<meta name="description" content="Freelance Copywriter. I have a degree from an accredited business school." />

	<link rel="preload" href="{headshot}" as="image" />

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
	<header>
		<h2>GARRETT MUSAR</h2>
		<div class="icons">
			<a href="https://www.linkedin.com/in/garrettallbusinessmusar/" target="_blank" rel="noreferrer">
				<img src={linkedin} alt="linkedin" class="icon" />
			</a>
			<a href="mailto:garyxmustard@gmail.com">
				<img src={mail} alt="mail" class="icon" />
			</a>
			<a href="https://www.instagram.com/garymustard_fanclub/" target="_blank" rel="noreferrer">
				<img src={instagram} alt="instagram" class="icon" />
			</a>
			<a href="https://twitter.com/LL_Croix" target="_blank" rel="noreferrer">
				<img src={twitter} alt="twitter" class="icon" />
			</a>
			<button class="icon-btn" on:click={toggleAudio} aria-label="Toggle music">
				<img src={music} alt="music" class="icon" class:active={audioPlaying} />
			</button>
		</div>
	</header>

	<picture>
		<div class="main">
			<h1>
				{#if $screenType !== 1}
					<span>◎</span>
				{/if}
				<span>Business&nbsp;In&nbsp;The&nbsp;Front</span>
				{#if $screenType !== 1}
					<span>◎</span>
				{/if}
			</h1>
		</div>
		<img src={headshot} alt="Headshot" class="headshot" />
	</picture>

	<a class="entry" href="https://work.garrettmusar.work">
		<h2>COME ON BACK</h2>
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
	}

	picture {
		position: relative;
		background: var(--background-50);
		border: double 6px var(--primary);
		margin-bottom: 1.1rem;
	}

	header {
		width: 100%;
		height: 30px;
		margin-bottom: 0.25rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--accent);
	}

	.icons {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.icon {
		height: 24px;
		width: 24px;
		cursor: pointer;
		opacity: 1;
		transition: opacity 0.15s ease;
	}

	.icon:hover {
		opacity: 0.5;
	}

	.icon.active {
		opacity: 0.5;
	}

	.icon-btn {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	.headshot {
		height: 46vh;
		width: 48vh;
		min-width: 500px;
		min-height: 500px;
		margin: auto;
		object-fit: cover;
		object-position: 0% 25%;
	}

	.main,
	.entry {
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
		left: 50%;
		transform: translateX(-50%);
		padding: 0 2px;
		width: 66%;
		height: 80px;
		max-width: 600px;
		background: var(--primary);
		border: double 6px var(--background);
		color: var(--background);
		z-index: 10;
	}

	.entry {
		height: 60px;
		cursor: pointer;
		min-width: 80%;
		transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
		background: var(--background-50);
		border: double 6px var(--primary);
		color: var(--primary);
		margin-bottom: 1.1rem;
		text-decoration: none;
		animation: goBlack 2s 0.5s linear forwards;
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
		background: var(--primary);
		color: var(--background);
		border-color: var(--background);
		text-decoration: none;
	}

	.entry:active {
		background: var(--background);
		border: double 6px var(--primary);
		color: var(--primary);
	}

	h2 {
		font-size: 16px;
		color: inherit;
		letter-spacing: 2px;
		font-family: untitled, sans-serif;
		font-weight: 600;
	}

	@media (max-width: 760px) {
		section {
			max-width: 80vw;
			min-width: 0;
		}

		.icon {
			height: 20px;
			width: 20px;
		}

		h1 {
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
			margin-bottom: 0.4vh;
		}

		picture {
			margin: 0;
			padding: 0;
			height: calc(var(--vh, 1vh) * 100);
			width: calc(var(--vh, 1vh) * 100);
			max-width: 80vw;
			max-height: 80vw;
		}

		.headshot {
			min-width: 0;
			min-height: 0;
			width: 100%;
			height: 100%;
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
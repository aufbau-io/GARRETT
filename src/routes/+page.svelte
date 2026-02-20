<script>
	import { onMount } from 'svelte';

	import instagram from '$lib/images/icons/instagram.svg';
	import linkedin from '$lib/images/icons/linkedin.svg';
	import mail from '$lib/images/icons/gmail.svg';
	import twitter from '$lib/images/icons/twitter.svg';
	import music from '$lib/images/icons/music.svg';

	let headshot = '';
	let audio;
	let audioPlaying = false;

	onMount(async () => {
		// Dynamically import random headshot
		const headshots = await Promise.all([
			import('/images/1.png'),
			import('/images/2.png'),
			import('/images/3.png')
		]);
		const index = Math.floor(Math.random() * 3);
		headshot = headshots[index].default;
	});

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
	<title>Garrett Musar</title>
	<meta name="description" content="Freelance Copywriter. I have a degree from an accredited business school." />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="keywords" content="freelance copywriter, brand copywriter, creative copywriter, web copywriter, advertising copywriter, content writer, brand voice, marketing copy, freelance writer for hire" />	

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://garrettmusar.work/" />
	<meta property="og:title" content="Garrett Musar" />
	<meta property="og:description" content="Freelance Copywriter. I have a degree from an accredited business school." />
	<meta property="og:image" content="https://garrettmusar.work/images/2.png" />
	
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
		<nav class="icons">
			<a href="https://www.linkedin.com/in/garrettallbusinessmusar/" target="_blank" rel="noreferrer">
				<img src={linkedin} alt="LinkedIn" class="icon" />
			</a>
			<a href="mailto:garyxmustard@gmail.com">
				<img src={mail} alt="Email" class="icon" />
			</a>
			<a href="https://www.instagram.com/garymustard_fanclub/" target="_blank" rel="noreferrer">
				<img src={instagram} alt="Instagram" class="icon" />
			</a>
			<a href="https://twitter.com/LL_Croix" target="_blank" rel="noreferrer">
				<img src={twitter} alt="Twitter" class="icon" />
			</a>
			<button class="icon-btn" on:click={toggleAudio} aria-label="Toggle music">
				<img src={music} alt="Music" class="icon" class:active={audioPlaying} />
			</button>
		</nav>
	</header>

	<div class="card-wrapper">
		<div class="card">
			{#if headshot}
				<img src={headshot} alt="Garrett Musar" class="headshot" />
			{/if}
		</div>
		<div class="banner">
			<h1>
				<span class="dot">◎</span>
				<span>Business&nbsp;In&nbsp;The&nbsp;Front</span>
				<span class="dot">◎</span>
			</h1>
		</div>
	</div>

	<a class="cta" href="https://work.garrettmusar.work">
		<span>COME ON BACK</span>
	</a>
</section>

<style>
	section {
		--card-size: min(500px, 80vw, 70vh);
		
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 1rem;
		width: 100%;
		height: 100%;
	}

	/* Header */
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: var(--card-size);
	}

	header h2 {
		font-family: untitled, sans-serif;
		font-size: clamp(12px, 3vw, 16px);
		font-weight: 600;
		letter-spacing: 2px;
		color: var(--accent);
		margin: 0;
	}

	.icons {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.icon {
		width: clamp(18px, 4vw, 24px);
		height: clamp(18px, 4vw, 24px);
		cursor: pointer;
		transition: opacity 0.15s ease;
	}

	.icon:hover,
	.icon.active {
		opacity: 0.5;
	}

	.icon-btn {
		display: flex;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	/* Card wrapper - positions banner relative to card */
	.card-wrapper {
		position: relative;
		width: var(--card-size);
	}

	/* Card */
	.card {
		width: 100%;
		aspect-ratio: 1;
		background: var(--background-50);
		border: double 6px var(--primary);
	}

	.headshot {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 25%;
	}

	/* Banner - extends 10% beyond card on each side */
	.banner {
		position: absolute;
		bottom: 10%;
		left: -10%;
		width: 120%;
		padding: 1rem 0.5rem;
		background: var(--primary);
		border: double 6px var(--background);
		z-index: 1;
	}

	h1 {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 0;
		font-size: clamp(14px, 4.5vw, 28px);
		letter-spacing: 0.15em;
		color: var(--background);
		text-transform: uppercase;
	}

	.dot {
		font-size: 0.8em;
	}

	/* CTA Button */
	.cta {
		display: flex;
		align-items: center;
		justify-content: center;
		width: calc(var(--card-size) * 0.8);
		padding: 1rem;
		background: var(--background-50);
		border: double 6px var(--primary);
		color: var(--primary);
		font-family: untitled, sans-serif;
		font-size: clamp(12px, 3vw, 16px);
		font-weight: 600;
		letter-spacing: 2px;
		text-decoration: none;
		transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
		animation: flash 2s 0.5s linear forwards;
	}

	.cta:hover {
		background: var(--primary);
		color: var(--background);
		border-color: var(--background);
		text-decoration: none;
	}

	.cta:active {
		background: var(--background);
		color: var(--primary);
		border-color: var(--primary);
	}

	@keyframes flash {
		0%, 20%, 30%, 40%, 50%, 100% {
			background: var(--background-50);
			color: var(--primary);
		}
		25%, 45% {
			background: var(--primary);
			color: var(--background);
		}
	}
</style>
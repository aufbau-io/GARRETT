<script>
	import { darkMode } from '$lib/store/store';
</script>

<footer>
	{#if $darkMode}
	<p>“I have a degree from an accredited business school.”</p>
	{:else}
	<p>Look! That's none of my business”</p>
	{/if}
	<p>~ Garrett “All Business” Musar</p>
</footer>

<style>
	footer {
		width: 100%;
		height: calc(22vh - 2 * var(--margin));
		z-index: 10;
		gap: 10px;

		padding: 10vh 32px;
		background: var(--background-alt);
		border-top: solid 1px var(--accent-50);
		text-transform: none;
		color: var(--accent);

		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: space-around;
	}

	footer a,
	footer p {
		font-size: 14px;

		letter-spacing: 0.15em;
		font-family: nb-architekt;

		text-align: center;
		line-height: 24px;
	}

	@media only screen and (max-width: 768px) {
		footer {
			padding: 20px 24px;
		}
		footer a,
		footer p {
			font-size: 12px;
		}
	}
</style>

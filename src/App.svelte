<script>
	import Infocontainer from './components/InfoContainer.svelte';
	
	import { authenticated, login, logout, checkAuth } from "./auth"
	checkAuth()

	let ticketNumber
</script>

	{#if !($authenticated)}
		<main>
			<span>Velkommen til Phoenix LAN sin innsjekk-side</span>
			<button on:click={login}>Logg Inn</button>
		</main>
	{:else}
		<nav>
			<a href="/">
				<img src="./logo.svg" alt="">
				<span>Phoenix Insjekk</span>
			</a>
			<button on:click={logout}>Logg ut</button>
		</nav>
		<main>
			<input placeholder="Bilett-ID" type="number" min="1" bind:value={ticketNumber}>
			<Infocontainer ticketNumber={ticketNumber}/>
		</main>
	{/if}

<style>
	nav{
		display: flex;
		justify-content: space-between;
		align-items: center;

		width: 100vw;

		box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
	}
	nav > *{
		margin: 5px;
		font-size: 1.5rem;
	}
	nav a {
		display: flex;
		align-items: center;
		height:2rem;
		gap: 5px;
		color: inherit;
		text-decoration: none;
	}
	nav img {
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;
	}
	main {
		margin: 20px;
		text-align: center;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	:global(button){
		cursor:pointer;
		padding: 10px;
		margin-bottom: 0;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
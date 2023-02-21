<script>
	import Infocontainer from './components/InfoContainer.svelte';
	
	import { authenticated, login, logout, checkAuth } from "./auth"
	checkAuth()

	let ticketNumber
</script>

	{#if !($authenticated)}
		<main>
			<img src="./logo.svg" alt="">
			<div class="welcomecontainer">
				<h1>Phoenix Innsjekk</h1>
				<button on:click={login} class="loginbutton"><span>Logg inn</span></button>
			</div>
		</main>
	{:else}
		<nav>
			<a href="/">
				<img src="./logo.svg" alt="">
				<span class="navtitle">Phoenix Innsjekk</span>
			</a>
			<button on:click={logout} class="logoutbutton"><span>Logg ut</span></button>
		</nav>
		<main>
			<input placeholder="Bilett-ID" type="number" inputmode="numeric" min="1" bind:value={ticketNumber}>
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
	nav > * {
		margin: 5px;
	}
	nav .navtitle{
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
		padding: 1rem;
		gap: 1rem;
		text-align: center;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	main img {
		height: 20em;
	}
	main input {
		margin-bottom: 0;
	}

	:global(button){
		position: relative;
		cursor: pointer;
		border: none;
		font-weight: normal;
		font-size: 1rem;
		padding: 0rem 1rem;
		border-radius: 0.25rem;
		height: 3rem;
		color: white;
	}
	.loginbutton {
		background-color: rgb(255, 75, 157);
		min-width: 9.5rem;
		margin: 15px;
	}
	.logoutbutton {
		color: #212529;
		background-color: #f4f4f4;
		border: 1px solid #ccc;
	}
	input {
		padding: 1em;
	}
	.welcomecontainer {
		box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
		border-radius: 0.25rem;
		width: 450px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
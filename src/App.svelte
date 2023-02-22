<script>
	import Infocontainer from './components/InfoContainer.svelte';
	
	import * as auth from "./auth"
	auth.checkAuth()

	let ticketNumber
	function validateInput() {
		let value = document.querySelector("input").value
		if (value === "") {
			return ticketNumber = value
		}
		value = Math.abs(Number.parseInt(value))
		if (isNaN(value)) {
			return console.warn('The input is not a number')
		} else {
			return ticketNumber = value
		}
	}
</script>

	{#if !(auth.authenticated)}
		<main>
			<img src="./logo.svg" alt="">
			<div class="welcomecontainer">
				<h1>Phoenix Innsjekk</h1>
				<button on:click={auth.login} class="loginbutton"><span>Logg inn</span></button>
			</div>
		</main>
	{:else}
		<nav>
			<a href="/">
				<img src="./logo.svg" alt="">
				<span class="navtitle">Phoenix Innsjekk</span>
			</a>
			<button on:click={auth.logout} class="logoutbutton"><span>Logg ut</span></button>
		</nav>
		<main>
			<input placeholder="Billett-ID" type="number" inputmode="numeric" min="1" on:input={validateInput}>
			<Infocontainer ticketNumber={ticketNumber}/>
		</main>
	{/if}

<style>
	nav{
		display: flex;
		justify-content: space-between;
		align-items: center;

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
		text-align: center;
	}
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
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
<script>
	import Infocontainer from './components/InfoContainer.svelte';
	
	//PHOENIX JS
	import { init } from '@phoenixlan/phoenix.js'
	init("https://api.test.phoenixlan.no")
	// AUTH
	import { User } from '@phoenixlan/phoenix.js'
	const baseURL= "http://checkin.dev.phoenixlan.no:8080"
	const client_id= "phoenix-checkin-localdev"
	
	let authenticated = false
	
	const login = () => {
		const authUrl = User.getAuthenticationUrl(baseURL, client_id)
		window.location.href = authUrl
	}
	const logout = async () => {
		window.localStorage.removeItem("auth")
		authenticated = false
	}
	
	const checkAuth = async () => {
		/// Create storage variable with information from local storage.
		const storage = window.localStorage.getItem("auth")
		if(!storage){
			const url = new URL(window.location.href)
			const code = url.searchParams.get("code")
			if (code) {
				try {
					/// Get token, refreshToken and set user based on token & refreshToken.
					await User.Oauth.authenticateByCode(code);
					
					let Token 		 = await User.Oauth.getToken();
					let RefreshToken = await User.Oauth.getRefreshToken();
					
					await User.Oauth.setAuthState(Token, RefreshToken);
					authenticated = true
					
					/// Store user information in the local storage for later use.
					window.localStorage.setItem("auth", JSON.stringify({
						token: 		  Token,
						refreshToken: RefreshToken,
					}));
				}
				catch(e){
					console.error('An error occured, failed to authenticate by token. (Is the token valid?)');
					console.error('[API] ' + e);
				}
			} else {
				/// If there is no "auth" in the local storage, show login page.
				console.warn("Requested information was not found in the local storage.");
			}
		} else {
			/// If storage contains "auth" with correct information.
			let object = JSON.parse(storage);
			if(object.token && object.refreshToken) {
				/// Try to setAuthState with existing token & refreshToken.
				try {
					await User.Oauth.setAuthState(object.token, object.refreshToken);
					authenticated = true
				}
				catch (e) {
					console.error('[API] ' + e);
				}
			} else {
			// Conclude that local storage is corrupted or modified by the user or third-party app, delete the data.
				window.localStorage.removeItem("auth");
			}
		}
	}
	checkAuth()
	
	// TICKET HANDLING
	import { Ticket } from '@phoenixlan/phoenix.js'
	const fetchTicket = async (ticketNum) => {
		const ticket = await Ticket.getTicket(ticketNum)
		console.log(ticket)
		return ticket
	}
	let ticketNum = 1 // TEMP

</script>

<main>

	{#if !authenticated}
		<h1>Velkommen til Pheonix LAN sin innsjekk-side</h1>
		<button on:click={login}>Logg Inn</button>
	{:else}
	
		<nav>
			<span>Phoenix Insjekk</span>
			<button on:click={logout}>Logg Ut</button>
		</nav>
		<div class="formcontainer">
			<label for="ticketNumInput"><b>Bilett Nummer:</b></label>
			<input name="ticketNumInput" type="number" bind:value={ticketNum}>
		</div>
		{#if ticketNum}
			{#await fetchTicket(ticketNum)}
			<i>Henter bilett info...</i>
			{:then ticket}
				<Infocontainer ticket={ticket}/>
			{:catch error}
				<p>Kunne ikke hente bilett data. Er dette ett gyldig bilett nummer?<br><br><i>{error}</i></p>
			{/await}
		{/if}
	{/if}

</main>
<style>
	main{
		gap: 10px;
	}
	nav{
		display: flex;
		justify-content: space-between;
		align-items: center;

		padding: 5px;
		width: 100vw;
	}
	main {
		text-align: center;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.formcontainer{
		display: flex;
		align-items: center;
		gap: 5px;

		padding: 5px;
	}
	.formcontainer input{
		margin-bottom: 0;
	}
	button{
		cursor:pointer;
		padding: 7px;
		margin-bottom: 0;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
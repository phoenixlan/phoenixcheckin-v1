<script>
	
	// AUTH
	import { init } from '@phoenixlan/phoenix.js'
	init("https://api.test.phoenixlan.no")
	
	import { User, Ticket } from '@phoenixlan/phoenix.js'
	const baseURL= "http://checkin.dev.phoenixlan.no:8080"
	const client_id= "phoenix-checkin-localdev"

	const authUrl = User.getAuthenticationUrl(baseURL, client_id)
	
	let authenticated = false

	const login = () => {
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
                } 
                /// Conclude that local storage is corrupted or modified by the user or third-party app, delete the data.
                else {
                    window.localStorage.removeItem("auth");
				}
		}
	}
	checkAuth()
	
	const fetchTicket = async (ticketNum) => {
		const ticket = await Ticket.getTicket(ticketNum)
		console.log(ticket)
		return ticket
	}

	let ticketNum

</script>

<main lang="nb">

	{#if !authenticated}
		<h1>Velkommen til Pheonix LAN sin innsjekk-side</h1>
		<button on:click={login}>Logg Inn</button>
		<!-- <h1><a href="{authUrl}">LOGG INN</a></h1> -->
	{:else}
		<button on:click={logout}>Logg Ut</button>
		<div class="formcontainer">
			<label for="bilettNummerInput">Bilett Nummer:</label>
			<input type="number" bind:value={ticketNum}>
		</div>
		{#if ticketNum}
			{#await fetchTicket(ticketNum)}
			<i>Henter bilett...</i>
			{:then ticket}
			<div class="bilettcontainer">
				<div class="tekstcontainer">
					<h2><span>Bilett ID: </span>{ticket.ticket_id}</h2>
					<h2><span>Navn: </span>{ticket.owner.firstname} {ticket.owner.lastname}</h2>
					<h2><span>Kjønn: </span>{ticket.owner.gender}</h2>
					<h2><span>Brukernavn: </span>{ticket.owner.username}</h2>
					<h2><span>Sjekket inn?: </span>{ticket.checked_in}</h2>
				</div>
				<img src="{ticket.owner.avatar_urls.hd}" alt="Eier avatar" onerror="this.src = './errorimg.png'; console.error('^ Eier bilde ble ikke funnet')">
			</div>
			{:catch error}
				<p>Kunne ikke hente bilett data. Er dette ett gyldig bilett nummer?<br><br><i>{error}</i></p>
			{/await}
		{/if}
	{/if}

</main>
<style>
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

	.bilettcontainer{
		text-align: left;

		border:1px solid black;
		border-radius: 0px;
		box-shadow: 3px 3px 2px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
		padding: 10px;
		margin: auto;

		max-width: 850px;
	}
	.bilettcontainer .tekstcontainer{
		/* display: flex;
		flex-direction: column; */
	}
	.bilettcontainer h2{
		font-weight: normal;
	}
	.bilettcontainer span{
		font-weight: bold;
	}
	.bilettcontainer img {
		border-radius: inherit;
		box-shadow: inherit;
		margin: inherit;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
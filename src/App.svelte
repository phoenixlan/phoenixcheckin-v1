<script>
	// lakjld
	import Infocontainer from './components/InfoContainer.svelte';
	
	//PHOENIX JS
	import { init } from '@phoenixlan/phoenix.js'
	init("https://api.test.phoenixlan.no")
	// AUTH
	let authenticated = false
	import { User } from '@phoenixlan/phoenix.js'
	const baseURL= process.env.BASE_URL ?? "http://checkin.dev.phoenixlan.no:8080"
	const client_id= "phoenix-checkin-localdev"
	
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
	let ticketNum
</script>

<main>

	{#if !authenticated}
		<span>Velkommen til Pheonix LAN sin innsjekk-side</span>
		<button on:click={login}>Logg Inn</button>
	{:else}
		<nav>
			<a href="/">
				<img src="./logo.svg" alt="">
				<span>Phoenix Insjekk</span>
			</a>
			<button on:click={logout}>Logg Ut</button>
		</nav>
		<div class="formcontainer">
			<label for="ticketNumInput"><b>Bilett Nummer:</b></label>
			<input name="ticketNumInput" type="number" bind:value={ticketNum}>
		</div>
		<Infocontainer ticketNumber={ticketNum}/>
	{/if}

</main>
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

		margin: 10px;
	}
	.formcontainer input{
		margin-bottom: 0;
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
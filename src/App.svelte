<script>

	// AUTH
	import { init } from '@phoenixlan/phoenix.js'
	init("https://api.test.phoenixlan.no")
	
	import { User, Ticket } from '@phoenixlan/phoenix.js'
	const baseURL= "http://checkin.dev.phoenixlan.no:8080"
	const client_id= "phoenix-checkin-localdev"

	const authUrl = User.getAuthenticationUrl(baseURL, client_id)

	const url = new URL(window.location.href)
	
	
	const checkAuth = async () => {
		const code = url.searchParams.get("code")
		await User.Oauth.authenticateByCode(code);
                        
		let Token = await User.Oauth.getToken();
		let RefreshToken = await User.Oauth.getRefreshToken();

		await User.Oauth.setAuthState(Token, RefreshToken);
		const authenticatedUser = await User.getAuthenticatedUser();
		User.Oauth.setAuthState(Token, RefreshToken);

		console.log(await Ticket.getTicket(3))
	}
	checkAuth()
	

	// let TICKET_NUMBER = 3
    // const fetchTicket = (async () => {
    //     const ticket = await (await fetch(`https://api.test.phoenixlan.no/ticket/${TICKET_NUMBER}`)).json()
    //     return ticket
    // })()
	// console.log(fetchTicket)

</script>

<main>

	<h1><a href="{authUrl}">LOGG INN</a></h1>

	<!-- {#await fetchTicket}
	<i>Henter agenda</i>
	{:then ticket}
	<h1>Navn: {ticket.name}</h1>
	<h1>Sted: {ticket.location.name} / {ticket.location.address}</h1>
	{:catch error}
	<b>Kunne ikke hente data</b>
	{/await} -->
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		height: 90vh;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
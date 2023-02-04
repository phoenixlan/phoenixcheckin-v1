<script>
	import { User } from "@phoenixlan/phoenix.js";
    export let ticket;

	const fetchTicketOwner = async () => {
		const ticketOwner = await User.getUser(ticket.owner.uuid)
		console.log(ticketOwner)
		return ticketOwner
	}
</script>

<div class="infocontainer">
	<section>
		<h1>Bilett</h1>
		<hr>

		<h2><span>Bilett ID: </span>{ticket.ticket_id}</h2>
		
		<h2><span>Bilett type: </span>{ticket.ticket_type.name}</h2>
		{#if ticket.seat}
			<h2><span>Rad: </span>{ticket.seat.row.row_number} <span>Sete: </span>{ticket.seat.number}</h2>
		{:else}
			<h2><i>Fant ikke seteplass</i></h2>
		{/if}
		<!-- <img src="{ticket.owner.avatar_urls.hd}" alt="Eier avatar" onerror="if(this.src != 'errorimg.png') this.src = 'errorimg.png'; console.error('^ Eier bilde ble ikke funnet')"> -->
	</section>
	<section>
		{#await fetchTicketOwner()}
			<i>Henter bilett eier info...</i>
		{:then ticketOwner} 
			<h1>Eier</h1>
			<hr>
			
			<h2><span>Navn: </span>{User.getFullName(ticketOwner)}</h2>
			<h2><span>Brukernavn: </span>{ticket.owner.username}</h2>
			<h2><span>Kjønn: </span>{ticket.owner.gender}</h2>
			<h2><span>Fødselsdag: </span>{ticketOwner.birthdate}</h2>
			<h2><span>Adresse: </span>{ticketOwner.address}</h2>
		{/await}
	</section>
</div>


<style>
	.infocontainer{
		display: flex;
		gap: 10px;
	}
	
    section{
		text-align: left;
		
		/* background-color: rgb(233, 226, 226); */
		border: 2px solid black;
		border-radius: 5px;
		box-shadow: 2px 2px 1px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
		
		padding: 10px;
		min-width: 350px;
	}
	section h1{
		text-align: center;
	}
	section h2{
		font-weight: normal;
	}
	section span{
		font-weight: bold;
	}
	/* .ticketcontainer img {
		border-radius: inherit;
		box-shadow: inherit;
		margin: inherit;
	} */
</style>
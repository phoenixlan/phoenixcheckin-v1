<script>
    export let ticketNumber;

	import { getCurrentEvent, Ticket, User } from "@phoenixlan/phoenix.js";

	// TICKET HANDLING
	const fetchTicket = async (ticketNum) => {
		const ticket = await Ticket.getTicket(ticketNum)
		console.log(ticket)
		return ticket
	}
	const fetchTicketOwner = async (ticket) => {
		const ticketOwner = await User.getUser(ticket.owner.uuid)
		console.log(ticketOwner)
		return ticketOwner
	}

	const handleCheckinClick = async (ticket_id) => {
		await Ticket.checkInTicket(ticket_id)
		console.log("Ticket checked in")
	}

	const getCheckinTime = (time) => {
		if (time === null)	return "Nei"
		let date = new Date(time * 1000)
		return date.toLocaleString()
	}
</script>

{#if ticketNumber}
	<div class="infocontainer">
		{#await getCurrentEvent()}
			<i>Henter event data</i>
		{:then currentevent}
			{#await fetchTicket(ticketNumber)}
			<i>Henter bilett info...</i>
			{:then ticket}
				{#if currentevent.uuid === ticket.event.uuid}
					<section>
						<h1>Bilett</h1><hr>
						<h2><span>Bilett ID: </span>{ticket.ticket_id}</h2>
						<h2><span>Bilett type: </span>{ticket.ticket_type.name}</h2>

						{#if ticket.seat}
							<h2><span>Rad: </span>{ticket.seat.row.row_number} <span>Sete: </span>{ticket.seat.number}</h2>
						{:else}
							<h2><span>Advarsel: </span><i>Bilett ikke setet, <u>ikke sjekk inn</u></i></h2> 
						{/if}

						<h2><span>Sjekket inn: </span>{getCheckinTime(ticket.checked_in)}</h2>
					</section>
					{#await fetchTicketOwner(ticket)}
					<i>Henter bilett eier info...</i>
					{:then ticketOwner} 
						<section>
							<h1>Eier</h1><hr>
							<h2><span>Navn: </span>{User.getFullName(ticketOwner)}</h2>
							<h2><span>Brukernavn: </span>{ticketOwner.username}</h2>
							<h2><span>E-post: </span>{ticketOwner.email}</h2>
							<h2><span>Kjønn: </span>{#if ticketOwner.gender === "Gender.male"}Gutt{:else if ticketOwner.gender === "Gender.female"}Jente{:else}{ticketOwner.gender}{/if}</h2>
							<h2><span>Fødselsdag: </span>{ticketOwner.birthdate}</h2>
							<h2><span>Adresse: </span>{ticketOwner.address}</h2>
						</section>
					{:catch}
						<i>Kunne ikke hente bilett eier data, er dette en gyldig bilett?</i>
					{/await}
						<!-- Buttons -->
						{#if !ticket.checked_in}
							<button class="{ticket.checked_in ? "not-checked-in":"checked-in"}" on:click|once={handleCheckinClick(ticket.ticket_id)}>Sjekk inn bilett</button>
						{:else if !ticket.ticket_type.seatable}
							<button disabled>Kan ikke sjekke inn</button>
						{:else if ticket.checked_in}
							<button disabled>Biletten er allerede sjekket inn</button>
						{/if}
						
				{:else}
					<i>Denne biletten tilhører ikke pågående event</i>
				{/if}
				{:catch error}
				<p>Kunne ikke hente bilett data. Er dette ett gyldig bilett nummer?<br><br><i>{error}</i></p>
			{/await}
		{/await}
	</div>
{/if}

<style>
	.infocontainer{
		display: grid;
		grid-template-columns: 1fr 1fr; 
		gap: 10px;
		
		min-height: 350px;
	}
	.infocontainer button {
		grid-column-end: span 2;
		max-width: fit-content;
		margin: auto;
	}
    section{
		text-align: left;
		float: left;
		
		background-color: rgb(240, 240, 240);
		border: 2px solid rgb(61, 61, 61);
		border-radius: 2px;
		box-shadow: 2px 2px 1px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
		
		padding: 10px;
		width: 350px;
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

	.checked-in	   {color:white; background-color:rgb(90, 195, 154);}
	.not-checked-in{color:white; background-color:rgb(195, 90, 90);}
</style>
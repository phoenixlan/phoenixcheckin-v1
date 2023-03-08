<script>
	export let ticketNumber

	import { getCurrentEvent, Ticket, User } from "@phoenixlan/phoenix.js"
	
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

	import TicketContainer from "./TicketContainer.svelte";
	import TicketOwnerContainer from "./TicketOwnerContainer.svelte";
	import CheckinButton from "./CheckinButton.svelte";
</script>

{#if ticketNumber}
	{#await getCurrentEvent()}
		<i>Henter event data</i>
	{:then currentevent}
	<div class="infocontainer">
		{#await fetchTicket(ticketNumber)}
			<section><i><p>Henter billett info...</p></i></section>
		{:then ticket}
		{#await fetchTicketOwner(ticket)}
			<section><i><p>Henter billett eier info...</p></i></section>
		{:then ticketOwner} 
			{#if currentevent.uuid === ticket.event.uuid}
				<TicketContainer ticket={ticket}/>
				<TicketOwnerContainer ticketOwner={ticketOwner}/>
				<CheckinButton ticket={ticket} />
			{:else} <!-- Ticket does not belong to current event -->
				<section>
					<i><p><b>Error: </b>Denne billetten tilhører ikke pågående event.</p></i>
					<i><p>Skriv inn en annen billett id.</p></i>
				</section>
			{/if}
		{:catch} <!-- Could not fetch ticketowner data-->
			<section><i><p>Kunne ikke hente billett eier data, er dette en gyldig billett?</p></i></section>
		{/await}
		{:catch error} <!-- Ticket-ID not valid -->
			<section>
				<i><p><b>Error: </b>Kunne ikke hente billett data.</p></i>
				<i><p>Er dette ett gyldig billett nummer?</p></i><br>
				<i><p>{error}</p></i>
			</section>
		{/await}
	</div> <!-- End infocontainer div-->
	{:catch error} <!-- Could not fetch event data -->
		<i><p><b>Error: </b>Kunne ikke hente event data. Kontakt en tech ansvarlig.</p></i>
		<i><p>{error}</p></i>
	{/await}
{/if}

<style>
	.infocontainer{
		display: grid;
		grid-template-columns: 1fr 1fr; 
		gap: 10px;
		
		min-height: 400px;
	}

</style>
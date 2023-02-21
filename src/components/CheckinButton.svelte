<script>
    export let ticket

    import { Ticket } from "@phoenixlan/phoenix.js"

    const handleCheckinClick = async (ticket_id) => {
		await Ticket.checkInTicket(ticket_id)
		console.log("Ticket checked in")
	}
</script>
{#if !ticket.checked_in}
    <button class="{ticket.checked_in ? "not-checked-in":"checked-in"}" on:click|once={handleCheckinClick(ticket.ticket_id)}>Sjekk inn billett</button>
{:else if !ticket.ticket_type.seatable}
    <button disabled>Kan ikke sjekke inn</button>
{:else if ticket.checked_in}
    <button disabled>Billett allerede sjekket inn</button>
{/if}

<style>
    button {
		grid-column-end: span 2;
		max-width: fit-content;
		margin: auto;
	}
    .checked-in	   {color:white; background-color:rgb(90, 195, 154);}
	.not-checked-in{color:white; background-color:rgb(195, 90, 90);}
</style>
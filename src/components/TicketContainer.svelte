<script>
    export let ticket;
</script>

<div class="ticketcontainer">
    <div class="textcontainer">
        <h2><span>Bilett ID: </span>{ticket.ticket_id}</h2>
        <h2><span>Navn: </span>{ticket.owner.firstname} {ticket.owner.lastname}</h2>
        <h2><span>Kjønn: </span>{ticket.owner.gender}</h2>
        <h2><span>Brukernavn: </span>{ticket.owner.username}</h2>
        <h2><span>Sjekket inn?: </span>{ticket.checked_in}</h2>
    </div>
    <img src="{ticket.owner.avatar_urls.hd}" alt="Eier avatar" onerror="if(this.src != 'errorimg.png') this.src = 'errorimg.png'; console.error('^ Eier bilde ble ikke funnet')">
</div>

<style>
    .ticketcontainer{
		text-align: left;

		border:1px solid black;
		border-radius: 0px;
		box-shadow: 3px 3px 2px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
		padding: 10px;
		margin: auto;

		max-width: 850px;
	}
	.ticketcontainer .textcontainer{
		/* display: flex;
		flex-direction: column; */
	}
	.ticketcontainer h2{
		font-weight: normal;
	}
	.ticketcontainer span{
		font-weight: bold;
	}
	.ticketcontainer img {
		border-radius: inherit;
		box-shadow: inherit;
		margin: inherit;
	}
</style>
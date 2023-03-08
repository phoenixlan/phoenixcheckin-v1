<script>
    export let ticket

    const getCheckinTime = (time) => {
		if (time === null)	return "Nei"
		let date = new Date(time * 1000)
		return date.toLocaleString()
	}
</script>

<section>
    <h1>Billett</h1><hr>
    <h2><b>Billett-ID: </b>{ticket.ticket_id}</h2>
    <h2><b>Billett type: </b>{ticket.ticket_type.name}</h2>

    {#if ticket.seat}
        <h2><b>Rad: </b>{ticket.seat.row.row_number} <b>Sete: </b>{ticket.seat.number}</h2>
    {:else}
        <h2><b>Advarsel: </b><i>Billett har ikke sete, <u>ikke sjekk inn</u></i></h2> 
    {/if}

    <h2><b>Sjekket inn: </b>{getCheckinTime(ticket.checked_in)}</h2>
</section>

<style>
	section{
		text-align: left;
		float: left;
		
		background-color: rgba(0, 0, 0, 0.05);
		/* outline: 0.1rem solid rgb(61, 61, 61); */
		border-radius: 0.25rem;
		box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
		
		padding-left: 10px;
		padding-right: 10px;
		width: 400px;
	}
    section h1{
        text-align: center;
    }
    section h2{
		font-weight: normal;
	}
</style>
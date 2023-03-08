<script>
    export let ticketOwner

    import { User } from "@phoenixlan/phoenix.js";
</script>

<section>
    <h1>Eier</h1><hr>
    <h2><b>Navn: </b>{User.getFullName(ticketOwner)}</h2>
    <h2><b>Brukernavn: </b>{ticketOwner.username}</h2>
    <h2><b>E-post: </b>{ticketOwner.email}</h2>
    <h2><b>Kjønn: </b>{#if ticketOwner.gender === "Gender.male"}Gutt{:else if ticketOwner.gender === "Gender.female"}Jente{:else}{ticketOwner.gender}{/if}</h2>
    <h2><b>Fødselsdag: </b>{ticketOwner.birthdate}</h2>
    <h2><b>Adresse: </b>{ticketOwner.address}</h2>
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
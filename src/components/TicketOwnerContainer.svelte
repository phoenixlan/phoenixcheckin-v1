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
    section h1{
        text-align: center;
    }
    section h2{
		font-weight: normal;
	}
</style>
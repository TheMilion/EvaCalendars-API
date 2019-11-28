# Routes

>## Auth
>
>>### Login
>> Effettua il login con il passaggio nel body di un oggetto contente email e password, risponde con l’invio del token e del refreshToken di tipo Bearer che servirà in tutte le chiamate successive .
>>
>>   | Metodo | Rotta | Ruolo|
>>   | :--------: | :-----------: | :-------: |
>>   | `POST` | **/auth/login** | ** * ** |
>>#### Header: 
>>```
>>	Content-Type: "application/json"
>>```
>>#### Body:
>>```
>>{
>>	email: "admin@admin.com",
>>	password: "admin"
>>}
>>```
>>#### Response:
>>```
>>{
>>	type: "bearer",
>>	token: "ey********************************************M",
>>	refreshToken: "0d********************************************N"
>>}
>>```
>
> ------
>
>> ### Refresh token
>>Effettua il refresh del token, il body accetta un oggetto contente refresh token e risponderà con l’invio del nuovo token e del refreshToken di tipo Bearer
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `POST` | **/auth/refresh** | ** * ** |
>>#### Header: 
>>```
>>	 Content-Type: "application/json"
>>```
>>#### Body:
>>```
>>{
>>	refresh_token: "0d********************************************N"
>>}
>>```
>>#### Response:
>>```
>>{
>>	type: "bearer",
>>	token: "ey********************************************M",
>>	refreshToken: "0d********************************************N"
>>}
>>```
>
>---
----
> ## Profilo
> 
>>### Me
>>Restituisce informazioni dell'utente loggato
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/me** | ** * ** |
>>#### Header: 
>>```
>>	 Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>{
>>	id: 1,
>>	id_role: 4,
>>	email: "admin@admin.com",
>>	nome: "Admin",
>>	cognome: "",
>>	reparto: "segreteria"
>>}
>>```
>
> ----
>
>> ### Event
>>Restituisce tutti gli eventi dell'utente loggato
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/me/events** | ** * ** |
>>#### Header: 
>>```
>>	 Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	 [
>>	  {
>>	   title: "Meeting",
>>	   id: 1,
>>	   id_category: 0,
>>	   id_location: 1,
>>	   id_creator: 1,
>>	   date_from: "YYYY-MM-DDTHH:mm:ssZ",
>>	   date_to: "YYYY-MM-DDTHH:mm:ssZ",
>>	   hour_from: "HH:mm:ss",
>>	   hour_to: "HH:mm:ss"
>>	   note: "",
>>	   location: [
>>		{
>>		 id: 1,
>>		 nome: "Sala Meeting",
>>		 indirizzo: "Via Alfredo Nobel, Aversa"
>>		 contatti: "123"
>>		}
>>	   ],
>>	   partecipants: [
>>	    {
>>		 id: 2,
>>		 id_event: 1,
>>		 id_user: 1,
>>		 isOwner: 1,
>>		 nome: "admin",
>>		 cognome: "",
>>		 email: "admin@admin.com",
>>		 stato: 2
>>		},
>>		{
>>		 id: 2,
>>		 id_event: 1,
>>		 id_user: 2,
>>		 isOwner: 0,
>>		 nome: "Woody",
>>		 cognome: "Woodpecker",
>>		 email: "WoodyWP@gmail.com",
>>		 stato: 2
>>		}
>>	   ],
>>	   category: null,
>>	   creator: 1,
>>	   pivot: {
>>	    id_event: 1,
>>		id_user: 1
>>	   }
>>	  }
>>	 ]
>>```
>
>---
>
>>### Categories
>>Restituisce tutte le categorie personali dell'utente loggato
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/me/categories** | ** BASIC / ADMIN ** |
>>#### Header: 
>>```
>>	 Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	{
>>	 personali:[
>>	  {
>>	   id: 4,
>>	   id_user: 1
>>	   nome: "KTM"
>>	  }
>>	 ],
>>	 globali: []
>>	}
>>```
>
>----
>
>>### Locations
>>Restituisce le location che può prenotare l'utente loggato oltre a quelle globali
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/me/locations** | ** BASIC / ADMIN ** |
>>#### Header:
>>```
>>	 Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	[
>>	  {
>>	   id: 1,
>>	   nome: "Sala Meeting",
>>	   indirizzo: "Via Alfredo Nobel, Aversa"
>>	   contatti: "123"
>>	  }
>>	 ]
>>```
>
>----
>
>>### Groups
>>Restituisce i gruppi nei quali è presente l'utente loggato
>>
>>| Metodo    | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/me/groups** | ** BASIC / ADMIN ** |
>>#### Header:
>>```
>>	 Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	[
>>	  {
>>	   id: 1,
>>	   nome: "Coordinatori",
>>	  }
>>	 ]
>>```
>
>---
>
----
> ## Users
>>### All Users
>>Restituisce una lista contente tutti gli utenti
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/users** | ** ADMIN ** |
>>#### Header:
>>```
>>	 Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```
>>	{
>>	 asdf: "yeah"
>>	}
>>```
>>#### Response:
>>```
>>	[
>>	 {
>>	  id: 1,
>>	  id_role: 4,
>>	  email: "admin@admin.com",
>>	  nome: "admin",
>>	  cognome: "",
>>	  reparto: "segreteria"
>>	 },
>>	 {
>>	  id: 2,
>>	  id_role: 2,
>>	  email: "WoodyWP@gmail.com",
>>	  nome: "Woody",
>>	  cognome: "Woodpecker",
>>	  reparto: "it"
>>	 }
>>	]
>>```
>
>-------
>
>>### Create Uers
>>Crea un nuovo utente, nel body
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `POST` | **/users** | ** BASIC / ADMIN ** |
>>#### Header:
>>```
>>	Content-Type: "application/json"
>>	 Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```
>>	{
>>	 id_role: 2,
>>	 email: "RickSanchez@gmail.com",
>>	 password: "ILoveMyMorty",
>>	 nome: "Rick",
>>	 cognome: "Sanchez",
>>	 reaparto: "Sviluppo"
>>	}
>>```
>>#### Response:
>>```
>>	"Utente creato correttamente"
>>```
>
>-----
>
>>### Get User by Id
>>Restituisce informazioni di un utente
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/users/{ id }** | ** BASIC / ADMIN ** |
>>#### Header:
>>```
>>	 Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	{
>>	 id: 2,
>>	 id_role: 2,
>>	 email: "WoodyWP@gmail.com",
>>	 nome: "Woody",
>>	 cognome: "Woodpecker",
>>	 reparto: "it"
>>	}
>>```
>
>-----
>
>>### Get Event of User by Id
>>Restituisce gli eventi di un utente
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/users/{ id }/event** | **BASIC / ADMIN ** |
>>#### Header:
>>```
>>	 Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	[
>>	 {
>>	    title: "Meeting",
>>	    id: 1,
>>	    id_category: 0,
>>	    id_location: 1,
>>	    id_creator: 1,
>>	    date_from: "YYYY-MM-DDTHH:mm:ssZ",
>>	    date_to: "YYYY-MM-DDTHH:mm:ssZ",
>>	    hour_from: "HH:mm:ss",
>>	    hour_to: "HH:mm:ss"
>>	    note: "",
>>	    location: [
>>		 {
>>		  id: 1,
>>		  nome: "Sala Meeting",
>>		  indirizzo: "Via Alfredo Nobel, Aversa"
>>		  contatti: "123"
>>		 }
>>	    ],
>>	    partecipants: [
>>	     {
>>		  id: 2,
>>		  id_event: 1,
>>		  id_user: 1,
>>		  isOwner: 1,
>>		  nome: "admin",
>>		  cognome: "",
>>		  email: "admin@admin.com",
>>		  stato: 2
>>		 },
>>		 {
>>		  id: 2,
>>		  id_event: 1,
>>		  id_user: 2,
>>		  isOwner: 0,
>>		  nome: "Woody",
>>		  cognome: "Woodpecker",
>>		  email: "WoodyWP@gmail.com",
>>		  stato: 2
>>		 }
>>	    ],
>>	    category: null,
>>	    creator: 1,
>>	    pivot: {
>>	     id_event: 1,
>>		 id_user: 1
>>	    }
>>	   }
>>	]
>>```
>
>----
>
>>### Get Categories of User by Id
>>Restituisce le categorie di un utente
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/users/{ id }/categories** | **BASIC / ADMIN ** |
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	[
>>	 {
>>	  id: 4,
>>	  id_user: 1
>>	  nome: "KTM"
>>	 }
>>	]
>>```
>
>----
>
>>### Get Location of User by Id
>>Restituisce le location di un utente
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/users/{ id }/locations** | **BASIC / ADMIN ** |
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	[
>>	 {
>>	  id: id: 1,
>>	  nome: "Sala Meeting",
>>	  indirizzo: "Via Alfredo Nobel, Aversa"
>>	  contatti: "123",
>>	  id_user: 1
>>	  nome: "KTM"
>>	 }
>>	]
>>```
>
>-----
>
>>### Get Groups of User by Id
>>Restituisce i gruppi di un utente
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/users/{ id }/groups** | **BASIC / ADMIN ** |
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	[
>>	 {
>>	  id: id: 1,
>>	  nome: "Sala Meeting",
>>	  indirizzo: "Via Alfredo Nobel, Aversa"
>>	  contatti: "123",
>>	  id_user: 1
>>	  nome: "KTM"
>>	 }
>>	]
>>```
>
>----
>
>>### Update User
>>Aggiorna i valori di un utente
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `PATCH` | **/users/{ id }** | **BASIC / ADMIN ** |
>>#### Header:
>>```
>>	Content-Type: "application/json"
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```
>>	{
>>	 nome: "Bugs"
>>	 cognome: "Bunny"
>>	 email: "BBunnny@gmail.com"
>>	}
>>```
>>#### Response:
>>```
>>	{
>>	 "Utente modificato correttamente"
>>	}
>>```
>
>-----
>
>>### Delete User
>>Aggiorna i valori di un utente
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `DELETE` | **/users/{ id }** | **BASIC / ADMIN ** |
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```
>>	{
>>	 nome: "Bugs"
>>	 cognome: "Bunny"
>>	 email: "BBunnny@gmail.com"
>>	}
>>```
>>#### Response:
>>```
>>	{
>>	 "Utente modificato correttamente"
>>	}
>>```
>
------
>## Categories
>>### Get All Categories
>>Restituisce tutte le categorie
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/users/{ id }** | ** BASIC / ADMIN ** |
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	[
>>	 {
>>	  id: 4,
>>	  id_user: 1
>>	  nome: "KTM"
>>	 }
>>	]
>>```
>
>-----
>
>>### Create Category
>>Crea una categoria
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `POST` | **/categories** | ** BASIC / ADMIN ** |
>>#### Header:
>>```
>>	Content-Type: "application/json"
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```
>>	{
>>	 id_user: 1,
>>	 nome: "RDC"
>>	}
>>```
>>#### Response:
>>```
>>	"Categoria Creato Correttamente"
>>```
>----
>>
>>### Get category by id
>>Restituisce una categoria
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/categories/{ id }** | ** * ** |
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	{
>>	 id: 1,
>>	 id_user: 1,
>>	 nome: "KTM"
>>	}
>>```
>
>-----
>
>>### Delete category
>>Elimina una categoria
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `DELETE` | **/categories/{ id }** | ** BASIC / ADMIN ** |
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	"Categoria cancellata correttamente"
>>```
>
>----
>
>>### Update category
>>Modifica una categoria
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `PATCH` | **/categories/{ id }** | ** BASIC / ADMIN ** |
>>#### Header:
>>```
>>	Content-Type: "application/json"
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```
>>	{
>>	 id_user: 2,
>>	 nome: "ESC"
>>	}
>>```
>
>-----
>
>>### Get event by category
>>Restituisce gli eventi assocciati ad una categoria
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/categories/{ id }/events** | ** ADMIN ** |
>>
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	[
>>	 {
>>	   title: "Meeting",
>>	   id: 1,
>>	   id_category: 0,
>>	   id_location: 1,
>>	   id_creator: 1,
>>	   date_from: "YYYY-MM-DDTHH:mm:ssZ",
>>	   date_to: "YYYY-MM-DDTHH:mm:ssZ",
>>	   hour_from: "HH:mm:ss",
>>	   hour_to: "HH:mm:ss"
>>	   note: "",
>>	   location: [
>>		{
>>		 id: 1,
>>		 nome: "Sala Meeting",
>>		 indirizzo: "Via Alfredo Nobel, Aversa"
>>		 contatti: "123"
>>		}
>>	   ],
>>	   partecipants: [
>>	    {
>>		 id: 2,
>>		 id_event: 1,
>>		 id_user: 1,
>>		 isOwner: 1,
>>		 nome: "admin",
>>		 cognome: "",
>>		 email: "admin@admin.com",
>>		 stato: 2
>>		},
>>		{
>>		 id: 2,
>>		 id_event: 1,
>>		 id_user: 2,
>>		 isOwner: 0,
>>		 nome: "Woody",
>>		 cognome: "Woodpecker",
>>		 email: "WoodyWP@gmail.com",
>>		 stato: 2
>>		}
>>	   ],
>>	   category: null,
>>	   creator: 1,
>>	   pivot: {
>>	    id_event: 1,
>>		id_user: 1
>>	   }
>>	  }
>>	]
>>```
>---
>
-----
>## Roles
>>
>>### Get all roles
>>Restituisce tutte i ruoli
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/roles** | ** ADMIN ** |
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	[
>>	 {
>>	  id: 1,
>>	  nome: "Guest",
>>	  descrizione: "Ha i privilegi solamente di lettura"
>>	 },
>>	 {
>>	  id: 2,
>>	  nome: "Basic",
>>	  descrizione: "Ha i privilegi di creare/eliminare eventi, categorie personali e gli è permesso invitare i gruppi ai propri eventi"
>>	 },
>>	 {
>>	  id: 3,
>>	  nome: "Admin",
>>	  descrizione: "Ha i privilegi per creare: un nuovo utente, nuove location, nuovi gruppi ed assegnare i corrispettivi manager. Può accedere ai singoli utenti e può creare/gestire i loro eventi"
>>	 },
>>	 {
>>	  id: 4,
>>	  nome: "SuperAdmin",
>>	  descrizione: "Ha tutti i privilegi e puo creare/eliminare admin"
>>	 }
>>	]
>>```
>
>-----
>
>>### Create Roles
>>Crea un nuovo ruolo
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `POST` | **/roles** | ** ADMIN ** |
>>#### Header:
>>```
>>	Content-Type: "application/json"
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```
>>	{
>>	 nome: "Entry",
>>	 descrizione: "Accede solo alla demo"
>>	}
>>```
>>#### Response: 
>>```
>>	"Ruolo Creato Correttamente"
>>```
>-------
>>
>>### Get role by id
>>Restituisce un ruolo
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/roles/{ id }** | ** ADMIN ** |
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	{
>>	 id: 1,
>>	 nome: "Guest",
>>	 descrizione: "Ha i privilegi solamente di lettura"
>>	}
>>```
>
>-------
>
>>### Delete role
>>Elimina un ruolo
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `DELETE` | **/roles/{ id }** | ** ADMIN ** |
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	"Ruolo eliminato correttamente"
>>```
------
>Events
>>
>>### Get all events
>>Restituisce tutti gli eventi
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/events** | ** ADMIN ** |
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	[
>>	 {
>>	   title: "Meeting",
>>	   id: 1,
>>	   id_category: 0,
>>	   id_location: 1,
>>	   id_creator: 1,
>>	   date_from: "YYYY-MM-DDTHH:mm:ssZ",
>>	   date_to: "YYYY-MM-DDTHH:mm:ssZ",
>>	   hour_from: "HH:mm:ss",
>>	   hour_to: "HH:mm:ss"
>>	   note: "",
>>	   location: [
>>		{
>>		 id: 1,
>>		 nome: "Sala Meeting",
>>		 indirizzo: "Via Alfredo Nobel, Aversa"
>>		 contatti: "123"
>>		}
>>	   ],
>>	   partecipants: [
>>	    {
>>		 id: 2,
>>		 id_event: 1,
>>		 id_user: 1,
>>		 isOwner: 1,
>>		 nome: "admin",
>>		 cognome: "",
>>		 email: "admin@admin.com",
>>		 stato: 2
>>		},
>>		{
>>		 id: 2,
>>		 id_event: 1,
>>		 id_user: 2,
>>		 isOwner: 0,
>>		 nome: "Woody",
>>		 cognome: "Woodpecker",
>>		 email: "WoodyWP@gmail.com",
>>		 stato: 2
>>		}
>>	   ],
>>	   category: null,
>>	   creator: 1,
>>	   pivot: {
>>	    id_event: 1,
>>		id_user: 1
>>	   }
>>	  }
>>	]
>>```
>
>------
>
>>### Create Event
>>Crea un evento
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `POST` | **/events** | ** ADMIN ** |
>>#### Header:
>>```
>>	Content-Type: application/json,
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```	
>>	{
>>	 title: "Meeting",
>>	 id_category: 2,
>>	 id_location: 2,
>>	 id_creator: 1,
>>	 private: 0,
>>	 date_from: "YYYY-MM-DDTHH:mm:ssZ",
>>	 date_to: "YYYY-MM-DDTHH:mm:ssZ",
>>	 hour_from: "HH:mm:ss",
>>	 hour_to: "HH:mm:ss",
>>	 note: "Lasciare 100€ all'ufficio it"
>>	}
>>```
>>#### Response:
>>```
>>	"Evento creato correttamente"
>>```
>-------
>>
>>### Update Event
>>Modifica di un evento
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `POST` | **/events** | ** ADMIN ** |
>>#### Header:
>>```
>>	Content-Type: application/json,
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```
>>	{
>>	 title: "Meeting",
>>	 id_category: 2,
>>	 id_location: 2,
>>	 id_creator: 1,
>>	 private: 0,
>>	 date_from: "YYYY-MM-DDTHH:mm:ssZ",
>>	 date_to: "YYYY-MM-DDTHH:mm:ssZ",
>>	 hour_from: "HH:mm:ss",
>>	 hour_to: "HH:mm:ss",
>>	 note: "Lasciare 100€ all'ufficio it"
>>	}
>>```
>>#### Response:
>>```
>>	"Evento modificato correttamente"
>>```
>
>-----
>
>>### Add partecipants at event
>>Aggiungi partecipanti ad un evento
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `POST` | **/events/{ id }/partecipants** | ** CREATOR / OWNER / ADMIN ** |
>>#### Header:
>>```
>>	Content-Type: application/json,
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```
>>	{
>>	 "utenti" : [
>>	  {
>>	   "id_user" : "22",
>>	   "isOwner" : 1,
>>	   "stato" : 1
>>	  },
>>	  {
>>	   "nome" : "admina",
>>	   "cognome" : "admina",
>>	   "email" : "admin2asdasd@admin.it",
>>	   "isOwner" : 1,
>>	   "stato" : 1
>>	  }
>>	 ]
>>	}
>>```
>>#### Response:
>>```
>>	"Operazione Effetuata Correttamente"
>>```
>
>------
>
>>### Remove partecipants at event
>>Rimuovi partecipanti ad un evento
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `DELETE` | **/events/{ id }/partecipants** | ** CREATOR / OWNER / ADMIN ** |
>>#### Header:
>>```
>>	Content-Type: application/json,
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```
>>	{
>>	 "utenti" : [
>>	  {
>>	   "id_user" : "22",
>>	   "isOwner" : 1,
>>	   "stato" : 1
>>	  },
>>	  {
>>	   "nome" : "admina",
>>	   "cognome" : "admina",
>>	   "email" : "admin2asdasd@admin.it",
>>	   "isOwner" : 1,
>>	   "stato" : 1
>>	  }
>>	 ]
>>	}
>>```
>>#### Response:
>>```
>>	"Operazione Effetuata Correttamente"
>>```
>
>------
>
>>### Get event by id
>>Restituisce un evento
>>```
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/events/{ id }** | ** BASIC / ADMIN / GUEST(only public events) ** |
>>```
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	[
>>	 {
>>	  "title": "OKOK",
>>	  "id": 4,
>>	  "id_category": 1,
>>	  "id_location": 1,
>>	  "id_creator": 4,
>>	  "private": 1,
>>	  "date_from": "2019-10-31T23:00:00.000Z",
>>	  "date_to": "2019-10-31T23:00:00.000Z",
>>	  "hour_from": "19:30:00",
>>	  "hour_to": "23:00:00",
>>	  "note": null,
>>	  "partecipants": [],
>>	  "category": {
>>	   "id": 1,
>>	   "id_user": null,
>>	   "nome": "Riunione"
>>	  },
>>	  "location": {
>>	   "id": 1,
>>	   "nome": "sala meeting",
>>	   "indirizzo": "Via Alfredo Nobel, Aversa",
>>	   "contatti": "123"
>>	  },
>>	  "creator": {
>>	   "id": 4,
>>	   "id_role": 4,
>>	   "email": "superadmin@eva.it",
>>	   "nome": "SuperAdmin",
>>	   "cognome": "Eva",
>>	   "reparto": "it"
>>	  }
>>	 }
>>	]
>>```
>---
------
>## Groups
>>
>>### Get all Groups
>>Restituisce tutti i gruppi
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/groups** | ** BASIC / ADMIN  ** |
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	[
>>    	{
>>        	"id": 4,
>>        	"nome": "Amministrazione"
>>    	},
>>    	{
>>        	"id": 5,
>>        	"nome": "IT - INFORMATICO"
>>    	}
>>	]
>>```
>
>-----
>
>>### Create group
>>Crea un gruppo
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `POST` | **/groups** | ** ADMIN  ** |
>>#### Header:
>>```
>>	Content-Type: application/json,
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```	
>>	{
>>	 nome: "GDM"
>>	}
>>```
>>#### Response:
>>```
>>	 "Gruppo creato correttamente"
>>```
>
>-------
>
>>### Update group by id
>>Modifica un gruppo
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `PATCH` | **/groups/{ id }** | ** ADMIN  ** |
>>#### Header:
>>```
>>	Content-Type: application/json,
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```
>>	{
>>	 nome: "RDC"
>>	}
>>```
>>#### Response:
>>```
>>	"Gruppo modificato correttamente"
>>```
>
>------
>
>>### Get group by id
>>Restituisce un gruppo
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/groups/{ id }** | ** BASIC / ADMIN  ** |
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	[
>>    	{
>>        	"id": 1,
>>        	"nome": "Amministrazione",
>>        	"partecipants": [
>>            	{
>>                	"id": 120,
>>                	"id_user": 4,
>>                	"id_group": 1,
>>                	"manager": 1,
>>                	"member": {
>>                    	"id": 4,
>>                    	"id_role": 4,
>>                    	"email": "superadmin@eva.it",
>>                    	"nome": "SuperAdmin",
>>                    	"cognome": "Eva",
>>                    	"reparto": "it"
>>                	}
>>            	},
>>            	{
>>                	"id": 139,
>>                	"id_user": 1,
>>                	"id_group": 1,
>>                	"manager": 0,
>>                	"member": {
>>                    	"id": 1,
>>                    	"id_role": 1,
>>                    	"email": "guest@eva.it",
>>                    	"nome": "Guest",
>>                    	"cognome": "Eva",
>>                    	"reparto": "it"
>>                	}
>>            	},
>>            	{
>>                	"id": 140,
>>                	"id_user": 2,
>>                	"id_group": 1,
>>                	"manager": 0,
>>                	"member": {
>>                    	"id": 2,
>>                    	"id_role": 2,
>>                    	"email": "user@eva.it",
>>                    	"nome": "User",
>>                    	"cognome": "Eva",
>>                    	"reparto": "it"
>>                	}
>>            	}
>>        	]
>>    	}
>>	]
>>```
>
>-----
>
>>### Delete groups by id
>>Elimina un gruppo
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `DELETE` | **/groups/{ id }** | ** ADMIN  ** |
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	"Gruppo eliminato"
>>```
>
>------
>
>>### Get member by id
>>Restituisce i membri di un gruppo
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `POST` | **/groups/{ id }/member** | ** BASIC / ADMIN  ** |
>>#### Header:
>>```
>>	Content-Type: "application/json"
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```
>>	{
>>	" utenti": [
>>		{
>>			"id_user": 1
>>		}
>>	 ]
>>	}
>>```
>>#### Response:
>>```
>>	Operazione Effettuata Correttamente
>>```
>
>------
>
>>### Put/Remove Manager Group by id
>>Modifica il manager del gruppo
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `PATCH` | **/groups/{ id }/member** | ** ADMIN  ** |
>>#### Header:
>>```
>>	Content-Type: "application/json",
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```
>>	{
>>	" utenti": [
>>		{
>>			"id_user": 1
>>		}
>>	 ]
>>	}
>>```
>>#### Response:
>>```
>>	"Operazione Effettuata Correttamente"
>>```
>
>-----
>
>>### Delete User inside Group by id
>>Elimina un utente da un gruppo
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `DELETE` | **/groups/{ id }/member** | ** BASIC / ADMIN  ** |
>>#### Header:
>>```
>>	Content-Type: "application/json",
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```
>>	{
>>	" utenti": [
>>		{
>>			"id_user": 1
>>		}
>>	 ]
>>	}
>>```
>>#### Response:
>>```
>>	"Utenti Rimossi Correttamente"
>>```
>-----
------
>## Location
>>
>>### Get All Locations
>>Restitiuisce tutte le location
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/locations** | ** ADMIN  ** |
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```	
>>	[
>>	  {
>>	    "id": 1,
>>	    "nome": "sala meeting",
>>	    "indirizzo": "Via Alfredo Nobel, Aversa",
>>	    "contatti": "123"
>>	  }
>>	]
>>```
>
>------
>
>>### Get Location by id
>>Restituisce una location
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `GET` | **/locations/{ id }** | ** BASIC / ADMIN  ** |
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	[
>>	  {
>>	    "id": 2,
>>	    "nome": "stanza 3",
>>	    "indirizzo": "via Luigi Guardialo",
>>	    "contatti": "39231231211",
>>	    "partecipants": [
>>	      {
>>	        "id": 27,
>>	        "id_location": 2,
>>	        "id_user": 14,
>>	        "member": {
>>	          "id": 14,
>>	          "id_role": 4,
>>	          "email": "admin@admin.it",
>>	          "nome": "admin",
>>	          "cognome": "admin",
>>	          "reparto": "it"
>>	        }
>>	      },
>>	      {
>>	        "id": 28,
>>	        "id_location": 2,
>>	        "id_user": 19,
>>	        "member": {
>>	          "id": 19,
>>	          "id_role": 4,
>>	          "email": "prova@prova.it",
>>	          "nome": "giuseppeMar",
>>	          "cognome": "ads",
>>	          "reparto": "it"
>>	        }
>>	      }
>>	    ]
>>	  }
>>	]
>>```
>
>-----
>
>>### Create Location
>>Crea una location
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `POST` | **/locations/** | ** ADMIN  ** |
>>#### Header:
>>```
>>	Content-Type: "application/json",
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```
>>	{
>>	 "nome": "sala meeting",
>>	 "indirizzo": "Via Alfredo Nobel, Aversa",
>>	 "contatti": "123"
>>	}
>>```
>>#### Response:
>>```
>>	"Location creata correttamente"
>>```
>
>------
>
>>### Update Location
>>Modifica una location
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `PATCH` | **/locations/3** | ** ADMIN  ** |
>>#### Header:
>>```
>>	Content-Type: "application/json",
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```
>>	{
>>	 "nome": "sala meeting",
>>	 "indirizzo": "Via Alfredo Nobel, Aversa",
>>	 "contatti": "123"
>>	}
>>```
>>#### Response:
>>```
>>	"Location modificata correttamente"
>>```
>
>-----
>
>>### Delete Location
>>Elimina una location
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `DELETE` | **/locations/3** | ** ADMIN  ** |
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
	"Location elimiata correttamente"
>>```
>
>------
>
>>### Add locaction private
>>Aggiunge una location privata
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `POST` | **/locations/3/users** | ** ADMIN  ** |
>>#### Header:
>>```
>>	Content-Type: "application/json",
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```
>>	{
>>	 "id_users": [7,9,10]
>>	}
>>```
>>#### Response:
>>```
>>	[
>>	  {
>>	    "message": "Associazione Utente 7 con Location 5 creata"
>>	  },
>>	  {
>>	    "message": "Associazione Utente 9 con Location 5 creata"
>>	  },
>>	  {
>>	    "message": "Associazione Utente 10 con Location 5 creata"
>>	  }
>>	]
>>```
>
>------
>
>>### Remove locaction private
>>Rimuove una location privata
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `DELETE` | **/locations/3/users** | ** ADMIN  ** |
>>#### Header:
>>```
>>	Content-Type: "application/json",
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Body:
>>```
>>	{
>>	 "id_users": [7,8,9,10]
>>	}
>>```
>>#### Response:
>>```
>>	[
>>	  {
>>	    "message": "Associazione Utente 7 con Location 5 rimossa"
>>	  },
>>	  {
>>	    "message": "L'associazione Utente 8 con Location 5 non esiste"
>>	  },
>>	  {
>>	    "message": "Associazione Utente 9 con Location 5 rimossa"
>>	  },
>>	  {
>>	    "message": "Associazione Utente 10 con Location 5 rimossa"
>>	  }
>>	]
>>```
>
>-----
>
>>### Get event on location
>>Restituisce gli eventi associati a quella location
>>
>>| Metodo | Rotta | Ruolo|
>>| :--------: | :-----------: | :-------: |
>>| `DELETE` | **/locations/3/events** | ** ADMIN  ** |
>>#### Header:
>>```
>>	Authorization: "Bearer ey********************************************M"
>>```
>>#### Response:
>>```
>>	[
>>	  {
>>	    "title": "asd",
>>	    "id": 1,
>>	    "id_category": 0,
>>	    "id_location": 1,
>>	    "id_creator": 0,
>>	    "date_from": "2019-11-05T23:00:00.000Z",
>>	    "date_to": "2019-11-05T23:00:00.000Z",
>>	    "hour_from": "09:00:00",
>>	    "hour_to": "12:14:00",
>>	    "note": null
>>	  },
>>	  {
>>	    "title": "csad",
>>	    "id": 2,
>>	    "id_category": 1,
>>	    "id_location": 1,
>>	    "id_creator": 0,
>>	    "date_from": "2019-11-05T23:00:00.000Z",
>>	    "date_to": "2019-11-05T23:00:00.000Z",
>>	    "hour_from": "09:00:00",
>>	    "hour_to": "12:14:00",
>>	    "note": null
>>	  }
>>	]
>>```
>-----

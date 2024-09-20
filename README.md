# PRO202-Smidig Prosjekt Mappeeksamen

### Karakter: B

I vårt Smidig Prosjekt fikk vi denne problemstillingen fra KPMG:
Vi har et stort ubrukt TV i midten av kontoret, vi vil gjerne ha en applikasjon som kan vise forskjellig informasjon på den.

Løsningen vår er en applikasjon som lar brukeren opprette og administrere en samling av slides, kalt et "prosjekt", som kan redigeres og settes som aktivt. Det kan kun være ett aktivt prosjekt om gangen som vises på TV-skjermen, men brukeren kan fritt redigere hvilket som helst prosjekt. Endringer i det aktive prosjektet vil automatisk oppdatere TV-skjermen, og spille av den nye samlingen av slides. Brukeren kan velge mellom tre forskjellige maler for hver slide og tilpasse innholdet på den valgte sliden. For en praktisk demonstrasjon kan man se en introduksjonsvideo av applikasjonen rett etter innlogging. Slides kan ha text/bilder og video og alt vises på displat siden av applikasjonen.

### Link til applikasjonen som er deployet for testing på heroku:
https://lightbeam-heroku-cf6f81dd60a2.herokuapp.com/
Passord for å komme inn er: admin

### Merkeverdige teknologier i applikasjonen:
- Websocket funksjonalitet for sanntids endringer i display
- Lagring av data i MongoDB
- REST API med Express/Node.js
- React funksjonalitet for et intuitiv Single Page Application

### Lokalt Testing

For å kjøre lokalt trenger applikasjonen 3 Environment Variables som skal ligge inne på et .env fil i server mappen:
- PORT for lokal server å kjøre
- MONGO_URI for at applikasjonen skal kunne lagre data
- COOKIE_SECRET for autentisering av bruker

Og en variabel i .env.local fil som skal ligge i client mappen:
- REACT_APP_WEBSOCKET=ws://localhost:PORT/(PORT skal være porten som backend serveren kjører på)

Kjør disse kommandoene i root mappen av prosjektet for og så kjøre appen:
1. npm install
2. npm run postinstall
3. npm run dev

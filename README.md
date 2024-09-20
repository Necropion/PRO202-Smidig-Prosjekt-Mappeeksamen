# PRO202-Smidig Prosjekt Mappeeksamen

### Karakter: B

### Link til applikasjonen som er deployet for testing på heroku:
https://lightbeam-heroku-cf6f81dd60a2.herokuapp.com/

### Lokalt Testing

For å kjøre lokalt trenger applikasjonen 3 Environment Variables som skal ligge inne på et .env fil i server mappen:
- PORT for lokal server å kjøre
- MONGO_URI for at applikasjonen skal kunne lagre data
- COOKIE_SECRET for autentisering av bruker

Og en variabel i .env.local fil som skal ligge i client mappen:
- REACT_APP_WEBSOCKET=ws://localhost:PORT/(PORT skal være porten som backend serveren kjører på)

1. npm install
2. npm run postinstall
3. npm run dev

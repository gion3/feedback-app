1. In cadrul unui terminal, rulati npm install din folderul .\feedback-app
2. In cadrul unui terminal, rulati npm install din folderul .\feedback-app\backend
3. Pentru a porni server-ul, rulati comanda node .\server.js din folderul .\feedback-app\backend
4. Pentru a rula aplicatia, rulati comanda npm start din folderul .\feedback-app

Functionalitati:
- Aplicatia are interfete pentru studenti si profesori
- Ca profesor, putem creea o activitate la o anumita data, cu o descriere si o durata, urmand ca aplicatia sa genereze un cod unic pt. aceasta activitate
- Ca student, putem introduce codul activitatii si oferi feedback apasand unul din cele 4 emoticoane: happy, sad, surprised, confused)
- Ca profesor, putem vizualiza feedback-ul in timp real, cat si un bar chart cu toate feedback-urile primite.

Tehnologii utilizate:
Front-end: React cu tailwindcss pt styling
Back-end: Node + Express
DB: SQLite + Sequelize ORM


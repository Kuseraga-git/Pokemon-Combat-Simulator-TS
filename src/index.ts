import express from 'express';
import router from './routes/router';
import path from 'path';
import bodyParser from 'body-parser'
import { CombatActionHandler } from './handlers/users';

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())

app.use(express.static(__dirname))

app.use('/', router)
app.post("/api/combat-action", CombatActionHandler)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
})
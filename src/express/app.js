"use strict";

const express = require(`express`);

const rootRouter = require(`./routes/root`);
const myRouter = require(`./routes/my`);
const offersRouter = require(`./routes/offers`);
const path = require(`path`);

const PORT = `3000`;

const app = express();

app.use(express.static(path.resolve(__dirname, `./public`)));
app.set(`views`, path.resolve(__dirname, `./templates`));
app.set(`view engine`, `pug`);

app.use(`/`, rootRouter);
app.use(`/my`, myRouter);
app.use(`/offers`, offersRouter);

app.use((req, res) => res.status(400).render(`errors/400`));
// didnt use next arg so need disable eslint
// eslint-disable-next-line no-unused-vars
app.use(((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render(`errors/500`);
}));

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

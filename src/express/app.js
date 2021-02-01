"use strict";

const express = require(`express`);

const rootRouter = require(`./routes/root`);
const myRouter = require(`./routes/my`);
const offersRouter = require(`./routes/offers`);

const PORT = `3000`;

const app = express();

app.use(`/`, rootRouter);
app.use(`/my`, myRouter);
app.use(`/offers`, offersRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

const express = require('express');

const app = express();


app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '2mb' }));

const indexRouter = require('./routes/index');

app.use("/",indexRouter);

module.exports = app;


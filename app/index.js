const express = require("express");
const {middleware, endpoint, helloRequestCounter} = require("./metrics");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(middleware);

// Route de métriques pour Prometheus
app.get('/metrics', endpoint);

app.get('/health', (req, res) => {
  res.send('OK !');
});

app.get('/', (req, res) => {
  res.send('Node App => monitoring !');
});

app.get('/hello', (req, res) => {
  helloRequestCounter.inc()
  res.send('Hello, world!');
});


app.listen(PORT, () => {
  console.log(`Node App => ${PORT}`);
});
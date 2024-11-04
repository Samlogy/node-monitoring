const express = require("express");
const client = require("prom-client");

const PORT = process.env.PORT || 3001;

const app = express();

const register = new client.Registry();
client.collectDefaultMetrics({ register }); // Collecte des métriques par défaut (CPU, RAM, etc.)

// Déclaration de métriques spécifiques

// Compteur des requêtes HTTP
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Nombre total de requêtes HTTP',
  labelNames: ['method', 'endpoint'],
});

// Histogramme pour mesurer la latence des requêtes HTTP
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Durée des requêtes HTTP en secondes',
  labelNames: ['method', 'endpoint'],
  buckets: [0.1, 0.5, 1, 2, 5] // Buckets pour la latence
});

// Gauge pour mesurer l'usage de la mémoire
const memoryUsageGauge = new client.Gauge({
  name: 'nodejs_memory_usage_bytes',
  help: 'Usage de la mémoire en bytes',
  labelNames: ['type']
});

// Compteur pour un endpoint spécifique (e.g., /hello)
// const helloRequestCounter = new client.Counter({
//   name: 'endpoint_requests_total',
//   help: 'Nombre total de requêtes pour un endpount specifique',
// });

const helloRequestCounter = new client.Counter({
  name: `hello_requests_total`,
  help: 'Nombre total de requêtes pour un endpount specifique',
})

// Route de métriques pour Prometheus
app.get('/metrics', async (req, res) => {
  httpRequestCounter.inc({ method: req.method, endpoint: req.path });
  const memUsage = process.memoryUsage();
  
  // Mise à jour de l'usage de la mémoire (RAM)
  memoryUsageGauge.set({ type: 'rss' }, memUsage.rss);
  memoryUsageGauge.set({ type: 'heapTotal' }, memUsage.heapTotal);
  memoryUsageGauge.set({ type: 'heapUsed' }, memUsage.heapUsed);
  
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

register.registerMetric(httpRequestCounter);
register.registerMetric(httpRequestDuration);
register.registerMetric(memoryUsageGauge);
register.registerMetric(helloRequestCounter);


// const httpRequestDurationMiddleware = (req, res, next) => {
//   const end = httpRequestDuration.startTimer({ method: req.method, endpoint: req.path });
//   res.on('finish', () => {
//     end(); // Fin du chronométrage lorsque la requête est terminée
//   });
//   next();
// }

// // Middleware pour mesurer la durée des requêtes HTTP
// app.use(httpRequestDurationMiddleware);

const middlewareHttpRequestDuration = (req, res, next) => {
  // Compter toutes les requêtes
  httpRequestCounter.inc({ method: req.method, endpoint: req.path });

  // Démarrer le chronométrage des requêtes
  const end = httpRequestDuration.startTimer({ method: req.method, endpoint: req.path });

  // Terminer le chronométrage lorsque la requête est finie
  res.on('finish', () => {
    end(); // Fin du chronométrage
  });

  next();
}

app.use(middlewareHttpRequestDuration);


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
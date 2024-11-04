# Monitoring Node Prometheus + Grafana

## Prometheus

1. go to: `http://localhost:9090`
2. go graph tab enter metric name "cpu_usage_percent" in search field

## App

1. check all metrics (prometheus): `http://localhost:3001/metrics`
2. launch test scenario for our app
3. check all metrics (prometheus): `http://localhost:3001/health`

## Grafana

1. go to: `http://localhost:3000`.
2. explore.
3. aller `https://grafana.com/grafana/dashboards/` pour selectionner le dashboard adéquate.
4. pour ajouter un dashboard: aller dashboard > New > Import > upload (select .json) > prometheus > load

**NB:**
Most important metrics in monitoring:
- applicatives => prom-client (librairie installé dans node app)
- system: => node-export
- database: => postgres-export


** Export Metrics: **

- `prom-client`:
ine librairie cote applicative permet de faire une surveilance d'une app node, avec un controle granulaire.
nombre de requêtes, les temps de réponse, etc.
this `client.collectDefaultMetrics()` collects all metrics for node app (metriques applicatives uniquement)

    - `http_requests_total` : Nombre total de requêtes pour tous les endpoints.
    - `endpoint_requests_total` : Nombre total de requêtes uniquement pour l'endpoint /hello.
    - `http_request_duration_seconds` : Durée des requêtes HTTP (latence).
    - `nodejs_memory_usage_bytes` : memoire utilisée par l'app node (augementation ou diminution + heap memory)

- `node_exporter`:
pour surveiller les métriques système globales (CPU, RAM, disque) de l'environnement où tourne votre application.
donne plus de details que `prom-client` et continue de surveiller meme en cas de app crash.

- `postgres_exporter`:
pour exporter les métriques spécifiques à PostgreSQL (nombre de connexions, requêtes lentes, taux de succès des transactions, etc.).
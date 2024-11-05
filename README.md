# Monitoring Node Prometheus + Grafana

## GEtting started

at the root directory:
```docker compose up```

## App

1. check all metrics (prometheus): `http://localhost:3001/metrics`
3. check all metrics (prometheus): `http://localhost:3001/health`

## Prometheus

1. go to: `http://localhost:9090`
2. go graph tab enter metric name "cpu_usage_percent" in search field

**Export Metrics:**

- `prom-client`:
  ine librairie cote applicative permet de faire une surveilance d'une app node, avec un controle granulaire.
  nombre de requêtes, les temps de réponse, etc.
  this `client.collectDefaultMetrics()` collects all metrics for node app (metriques applicatives uniquement)

      - `http_requests_total` : Nombre total de requêtes pour tous les endpoints.
      - `endpoint_requests_total` : Nombre total de requêtes uniquement pour l'endpoint /hello.
      - `http_request_duration_seconds` : Durée des requêtes HTTP (latence).
      - `nodejs_memory_usage_bytes` : memoire utilisée par l'app node (augementation ou diminution + heap memory)
    `http://localhost:3001/metrics`

- `node_exporter`:
  pour surveiller les métriques système globales (CPU, RAM, disque) de l'environnement où tourne votre application.
  donne plus de details que `prom-client` et continue de surveiller meme en cas de app crash.
  `http://localhost:9100/metrics`

- `postgres_exporter`:
  pour exporter les métriques spécifiques à PostgreSQL (nombre de connexions, requêtes lentes, taux de succès des transactions, etc.).
  `http://localhost:9187/metrics`

**Alerting:**
Ajouter alerting au niveau de prometheus, dès une metrique depasse un certain seuil, une notification va etre emise depuis alert manager vers telegram.

Use telegram to receive alert notifications:

- connect mobile app
- create a new bot
- configure it
- add configuration to the my alert settings (`CHAT_ID`, `BOT_TOKEN`)

Example code test des metriques:

**CPU:**

```bash
docker exec -it <node-app-container> /bin/sh
while true; do echo "Loading CPU"; done
```

**RAM:**

```bash
docker exec -it <node-app-container> /bin/sh
dd if=/dev/zero of=/dev/null &
```


## Grafana

1. go to: `http://localhost:3000`.
2. explore.
3. aller dans grafana labs: `https://grafana.com/grafana/dashboards/` pour selectionner le dashboard adéquate.
4. pour ajouter un dashboard: aller dashboards > New > Import > upload (select .json file) > prometheus > load

**NB:**
Most important metrics in monitoring:

- applicatives => prom-client (librairie installé dans node app)
- system: => node-export
- database: => postgres-export

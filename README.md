# Monitoring Node Prometheus + Grafana

## Prometheus

1. go to: `http://localhost:9090`
2. go graph tab enter metric name "cpu_usage_percent" in search field

## App

1. check all metrics (prometheus): `http://localhost:3000/metrics`
2. launch test scenario for our app
3. check all metrics (prometheus): `http://localhost:3000/health`
4. check all metrics (prometheus): `http://localhost:3000/metrics`

## Grafana

1. go to: `http://localhost:3001`
2. explore

**NB:**
Most important metrics in monitoring:

- CPU, RAM Usage
- Number of visitors
- Disk, Network Traffic Usage

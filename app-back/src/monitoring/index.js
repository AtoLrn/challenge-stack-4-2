import client from "prom-client";

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;

export const register = new Registry();

export const requestTiming = new client.Histogram({
    name: "request_timing",
    help: "The timing of the request",
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
    labelNames: ["path"],
});

register.registerMetric(requestTiming);

collectDefaultMetrics({ register });

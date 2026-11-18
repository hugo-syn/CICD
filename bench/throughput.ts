const start = performance.now();
for (let i = 0; i < 1000; i++) Math.sqrt(i);
console.log("ops in", (performance.now() - start).toFixed(2), "ms");

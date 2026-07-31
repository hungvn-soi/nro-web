module.exports = {
  apps: [
    {
      name: "nro-web",
      cwd: "C:/web game",
      script: "node",
      args: "node_modules/next/dist/bin/next start",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
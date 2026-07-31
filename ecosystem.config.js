module.exports = {
  apps: [
    {
      name: "nro-web",
      cwd: "C:/www/nro-web",
      script: "node",
      args: "node_modules/next/dist/bin/next start",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
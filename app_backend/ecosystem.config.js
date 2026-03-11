export default {
  apps: [
    {
      name: "api",
      script: "npm",
      args: "start -- --env=production",
      watch: false,
      autorestart: true,
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
}

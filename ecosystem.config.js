module.exports = {
  apps: [
    {
      name: 'genmatch-platform',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/genmatch-platform',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/pm2/genmatch-error.log',
      out_file: '/var/log/pm2/genmatch-out.log',
      log_file: '/var/log/pm2/genmatch-combined.log',
      time: true,
      max_memory_restart: '1G',
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s'
    }
  ],
  
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'your-server-ip',
      ref: 'origin/main',
      repo: 'https://github.com/CEO-LEO/genmatch-platform-v3.git',
      path: '/var/www/genmatch-platform',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};

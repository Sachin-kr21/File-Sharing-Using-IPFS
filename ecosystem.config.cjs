// eslint-disable-next-line no-undef
module.exports = {
  apps: [
    {
      name: 'my-react-app',
      script: 'serve',
      args: ['dist', '-s'],
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: 'pm2logs/error.log', 
      out_file: 'pm2logs/out.log', 
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
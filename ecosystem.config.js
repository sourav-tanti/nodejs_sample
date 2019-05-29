module.exports = {
  apps: [{
    name: 'demo',
    script: './src/bin/tis.babel.js',
    watch: true,
    instances: 1,
    exec_mode: 'fork',
    env_dev: {
      NODE_ENV: 'dev',
      env: 'dev',
      port: 3000,
      mysqlDb: 'localhost',
      mysqlPort: 3306,
      mysqlConnLimit: 10,
      mysqlSchema: 'tis_node',
      mysqlUser: 'tis_uusr',
      mysqlPwd: 'Qw3rty#1',
      loglevel: 'debug',
      imagepath: 'sample_path', // removed for demo
      otherfilepath: 'sample_path_other' // removed for demo
    },
    env_prd: {
      NODE_ENV: 'prd',
      env: 'prd'
    }
  }],

  deploy: {
    production: {
      user: 'node',
      host: '0.0.0.0',
      ref: 'origin/master',
      repo: '',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};

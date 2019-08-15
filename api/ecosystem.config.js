module.exports = {
  apps : [
    {
      name      : 'quizzer-api',
      script    : 'index.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production',

      }, 
      ignore_watch: ['./tmp', './public', 'logs/**/*']
    }
  ]
};


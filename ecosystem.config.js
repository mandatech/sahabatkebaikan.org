module.exports = {
  apps: [
    {
      name: 'sahabatkebaikan-production',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

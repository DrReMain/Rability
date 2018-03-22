export default app => {
  if (typeof app.channel !== 'function') {
    return;
  }

  app.on('connection', connection => {
    app.channel('anonymous').join(connection);
  });

  app.on('login', (payload, { connection }) => {
    if (connection) {
      app.channel('anonymous').leave(connection);

      app.channel('authenticated').join(connection);
    }
  });

  app.publish(() => app.channel('authenticated'));
};

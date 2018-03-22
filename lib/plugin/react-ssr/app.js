module.exports = app => {
    if (app.view) {
      app.view.resolve = function (name) {
        return Promise.resolve(name);
      };
    }

    app.view.use('react', require('./lib/view'));
};
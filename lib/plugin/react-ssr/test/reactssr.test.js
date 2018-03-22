'use strict';

const mock = require('egg-mock');

describe('test/reactssr.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/reactssr-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, reactssr')
      .expect(200);
  });
});

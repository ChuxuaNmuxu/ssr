'use strict';

const mock = require('egg-mock');

describe('test/webpack-tool.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/webpack-tool-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, webpackTool')
      .expect(200);
  });
});

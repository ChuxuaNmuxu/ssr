const ReactDOMServer = require('react-dom/server');
const path = require('path');
const React = require('react');
const fs = require('fs');

module.exports = class View {
    constructor (ctx) {
        this.ctx = ctx;
        this.app = ctx.app;
    }

    async render (fullpath, local) {
        const filePath = path.isAbsolute(fullpath) ? fullpath : path.join(this.app.config.view.root[0], fullpath);
        // const reactElement = require('../../../../app/view/home/index.js');
        
        // // console.log('reactElement', reactElement)
        
        // const getReactElement = new Promise(resolve => {
        //   fs.readFile(fullpath, {encoding: 'utf8'}, (err, data) => {
        //     resolve(data);
        //   })
        // })
        
        // const reactElement2 = await getReactElement;
        // console.log('reactElement2: ', typeof reactElement2);
        
        // const html = ReactDOMServer.renderToString(React.createElement(reactElement.default));

        // 从内存读取文件
        const options = this.app.config.reactssr;

        // 渲染引擎返回promise
        return this.app.react.render(fullpath, local, options);
    }

    async renderString () {
        throw new Error('not implement');
    }
}
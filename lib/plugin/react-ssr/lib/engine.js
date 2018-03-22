const fs = require('fs');
const path = require('path');
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const NativeModule = require('module');
const vm = require('vm');

class Engine {
    constructor (app) {
        this.app = app;
    }

    getpage (name, locals, options) {
        /****
        const filePath = path.isAbsolute(name) ? name : path.join(app.config.view.root, name);
        const reactElement = require('../../../../app/view/home/index.js');
        
        console.log('reactElement', reactElement)
        
        const getReactElement = new Promise(resolve => {
          fs.readFile(name, {encoding: 'utf8'}, (err, data) => {
            resolve(data);
          })
        })
        
        const reactElement2 = await getReactElement;
        console.log('reactElement2: ', typeof reactElement2);
        
        return ReactDOMServer.renderToString(React.createElement(reactElement.default));
        ***/ 

        // 从内存中读取文件
        const filePath = path.isAbsolute(name) ? name : path.join(this.app.config.view.root[0], name);

        const {constant} = this.app;
        return new Promise(resolve => {
            // 通知agent读取文件
            this.app.messenger.sendToAgent(constant.READ_FILE_MEMORY, {
                filePath,
                fileName: name,
                target: 'node'
            });

            // 订阅内存文件内容读取 READ_FILE_MEMORY_CONTENT
            this.app.messenger.on(constant.READ_FILE_MEMORY_CONTENT, data => {
                resolve(data.fileContent)
            })
        })

    }

    async render (name, locals, options) {
        const code = await this.getpage(name, locals, options)

        // wrap, runInThisContext这两个函数结合可以将当前环境传入模块中
        // 将文件内容拼接成一个'function(exports, reauire, module, __filename, __dirname) {`${code}`}'
        const wrapper = NativeModule.wrap(code);
        // 相当于eval
        vm.runInThisContext(wrapper)(exports, require, module, __filename, __dirname);

        const reactClass = module.exports;

        const reactElement = reactClass && reactClass.default ? reactClass.default : reactClass;

        // const element = React.createElement(reactElement, locals);

        const html = ReactDOMServer.renderToString(reactElement);

        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <div id="root">
                <div>
                    ${html}
                </div>
            </div>
            <script src='http://127.0.0.1:9000/app.js' />
        </body>
        </html>
        `
    }
}

module.exports = Engine;

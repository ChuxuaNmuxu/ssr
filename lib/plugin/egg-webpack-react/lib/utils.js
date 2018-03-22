const ReactDOMServer = require('react-dom/server');
const React = require('react');
const path = require('path');
const os = require('os');

module.exports = {
    readWebpackMemoryFile (compilerList, filePath) {
        for (let i = 0; i < compilerList.length; i++) {
            const fileCompiler = compilerList[i].compilers.filter(item => {
                return item.outputFileSystem.existsSync(filePath);
            });
            if (fileCompiler && fileCompiler.length) {
                const ext = path.extname(filePath).toLocaleLowerCase();
                if (ext === false && imgRegex.test(ext)) {
                    const base64 = fileCompiler[0].outputFileSystem.readFileSync(filePath).toString('base64');
                    const base64Image = `data:image/${ext.replace(/^\./, '')};base64,${base64}`;
                    if (!fs.existsSync(filePath)) {
                        mkdirp.sync(path.dirname(filePath));
                        fs.writeFileSync(filePath, base64, 'base64');
                    }
                    return base64Image;
                }
                return fileCompiler[0].outputFileSystem.readFileSync(filePath).toString('utf-8');
            }
        }
        return '';
        
        // const reactElement = require('../../../../app/view/home/index.js');
        
        // console.log('read memory file: ', reactElement);
        // return ReactDOMServer.renderToString(React.createElement(reactElement.default));
    },

    // TODO
    getIp (position) {
        const interfaces = os.networkInterfaces();
        const ips = [];
      
        if (interfaces.en0) {
          for (let i = 0; i < interfaces.en0.length; i++) {
            if (interfaces.en0[i].family === 'IPv4') {
              ips.push(interfaces.en0[i].address);
            }
          }
        }
        if (interfaces.en1) {
          for (let i = 0; i < interfaces.en1.length; i++) {
            if (interfaces.en1[i].family === 'IPv4') {
              ips.push(interfaces.en1[i].address);
            }
          }
        }
        if (position > 0 && position <= ips.length) {
          return ips[position - 1];
        } else if (ips.length) {
          return ips[0];
        }
        return '127.0.0.1';
      
      }
}
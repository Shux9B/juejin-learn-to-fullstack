import http from 'http'
import url from 'url'
import path from 'path'
import fs from 'fs'
import mime from 'mime'
import { watch } from 'fs/promises'
import { createDeflate } from 'zlib'
import { stderr } from 'process'
import child_process from 'child_process'
const __dirname = path.dirname(path.resolve(url.fileURLToPath(import.meta.url), '..'));
let server = null
export function createserver (cb) {
    server = http.createServer((req, res) => {
        let filePath = path.resolve(__dirname, path.join('static', `${req.url}`)); // 解析请求的路径
        console.log(filePath)
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            
            const isDir = stats.isDirectory();
            if (isDir) {
                filePath = path.join(filePath, 'index.html');
            }
            if (!isDir || fs.existsSync(filePath)) {
                const mimeType = mime.getType(filePath)
                const timeStamp = req.headers['if-modified-since'];
                let status = 200;
                if (timeStamp && Number(timeStamp) === stats.mtimeMs) {
                    // 如果timeStamp和stats.mtimeMS相等，说明文件内容没有修改
                    status = 304;
                }
                const { ext } = path.parse(filePath);
                const responseHeaders = {
                    'Content-Type': mime.getType(ext),
                    'Cache-Control': 'max-age=86400',
                    'Last-Modified': stats.mtimeMs,
                }
                const compress = /^(text|application)\//.test(mimeType);
                if (compress) {
                    responseHeaders['Content-Encoding'] = 'deflate';
                }
                res.writeHead(status, responseHeaders);
                const fileStream = fs.createReadStream(filePath); // 以流的方式读取文件内容
                fileStream.pipe(createDeflate()).pipe(res);
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Not Found</h1>');
        }
    });
    server.on('clientError', (err, socket) => {
        socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    });
    server.listen(8080, () => {
        console.log('opened server on', server.address());
    });
    cb && cb(server)
}
// createserver()
export function watchFile(paths) {
    paths.forEach(spath => {
        fs.watch(spath, (event, filename) => {
            if (filename) {
                console.log(`${filename}文件发生更新`)
                child_process.exec("npm run build", (err,stdout, stderr) => {
                    if (!err) {
                        server.close(() => {
                            createserver()
                        })
                    }
                })
            }
        })  
    })
}
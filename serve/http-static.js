import http from 'http'
import url from 'url'
import path from 'path'
import fs from 'fs'
import mime from 'mime'
const __dirname = path.dirname(path.resolve(url.fileURLToPath(import.meta.url), '..'));
const server = http.createServer((req, res) => {
    let filePath = path.resolve(__dirname, path.join('static', `${req.url}`)); // 解析请求的路径
    console.log(filePath)
    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const isDir = stats.isDirectory();
        if (isDir) {
            filePath = path.join(filePath, 'index.html');
        }
        if (!isDir || fs.existsSync(filePath)) {
            const { ext } = path.parse(filePath);
            res.writeHead(200, { 'Content-Type': mime.getType(ext) });
            const fileStream = fs.createReadStream(filePath); // 以流的方式读取文件内容
            fileStream.pipe(res)
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
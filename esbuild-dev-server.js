import path from 'path'
import {createserver, watchFile} from './serve/http-watch.js'
export default {
    name: 'dev-server',
    setup(build) {
        // Intercept import paths called "env" so esbuild doesn't attempt
        // to map them to a file system location. Tag them with the "env-ns"
        // namespace to reserve them for this plugin.
        const allImport = []
        build.onResolve({ filter: /.js/ }, args => {
            const p = path.join(args.resolveDir, args.path)
            allImport.push(p)
            return { path: p }
        }
        )
        build.onEnd(result => {
            console.log(`build ended with ${result.errors.length} errors`)
            createserver(() => {
                watchFile(allImport)
            })
        })
    },
}
import {build} from 'esbuild';
import esbuildDevserver from './esbuild-dev-server.js'
const buildOptions = {
  entryPoints: ['./index.web.js'],
  outfile: './static/index.js',
  bundle: true,
  globalName: 'bullshitGenerator',
  minify: true,
  plugins: [esbuildDevserver],
};

build(buildOptions);
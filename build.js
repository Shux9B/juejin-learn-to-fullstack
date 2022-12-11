import {build} from 'esbuild';

const buildOptions = {
  entryPoints: ['./index.web.js'],
  outfile: './static/index.js',
  bundle: true,
  globalName: 'bullshitGenerator',
  minify: true,
};

build(buildOptions);
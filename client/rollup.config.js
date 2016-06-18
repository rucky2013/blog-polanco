import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'src/main.js',
  format: 'es6',
  preferConst: true,
  plugins: [
    nodeResolve({ jsnext: true, main: true }),
    commonjs()
  ],
  sourceMap: true,
  dest: 'dist/js/bundle.js'
}

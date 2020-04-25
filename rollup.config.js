import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default [
  {
    input: ['./src/index.js', './src/sub.js'],
    output: [
      {
        dir: 'dist',
        format: 'cjs',
      },
    ],
    external: [
      'axios',
      'bootstrap',
      'next',
      'prop-types',
      'react',
      'react-bootstrap',
      'react-dom',
    ],
    preserveModules: false,
    plugins: [
      resolve({
        preferBuiltins: true,
      }),
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**',
        presets: ['next/babel'],
        extensions: ['.js', '.jsx', '.json', '.svg', '.ts', '.tsx'],
      }),
      commonjs(),
    ],
  },
];

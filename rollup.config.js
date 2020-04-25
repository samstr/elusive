import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default [
  {
    input: {
      components: './src/components/index.js',
      errors: './src/errors/index.js',
      forms: './src/forms/index.js',
      models: './src/models/index.js',
      sessions: './src/sessions/index.js',
    },
    output: [
      {
        dir: 'dist',
        format: 'cjs',
      },
    ],
    external: [
      'axios',
      'bcryptjs',
      'bootstrap',
      'firebase-admin',
      'jsonwebtoken',
      'next',
      'nookies',
      'prop-types',
      'react',
      'react-bootstrap',
      'react-dom',
      'sanitize-html',
      'uuid',
    ],
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

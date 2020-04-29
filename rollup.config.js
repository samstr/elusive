import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default [
  {
    input: {
      index: './src/index.js',
      api: './src/api/index.js',
      auth: './src/auth/index.js',
      client: './src/client/index.js',
      components: './src/components/index.js',
      errors: './src/errors/index.js',
      forms: './src/forms/index.js',
      http: './src/http/index.js',
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
      '@sentry/node',
      'axios',
      'bcryptjs',
      'bootstrap',
      'firebase-admin',
      'jsonwebtoken',
      'next',
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

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default [
  {
    input: {
      index: './src/index.js',
      auth: './src/auth/index.js',
      client: './src/client/index.js',
      components: './src/components/index.js',
      errors: './src/errors/index.js',
      forms: './src/forms/index.js',
      http: './src/http/index.js',
      mail: './src/mail/index.js',
      'models/index': './src/models/index.js',
      'models/loginAttempts': './src/models/loginAttempts.js',
      'models/passwordResets': './src/models/passwordResets.js',
      'models/users': './src/models/users.js',
      'models/userVerifications': './src/models/userVerifications.js',
      pages: './src/pages/index.js',
      'pages/api': './src/pages/api/index.js',
      'pages/api/data': './src/pages/api/data/index.js',
      routes: './src/routes/index.js',
      sessions: './src/sessions/index.js',
      tokens: './src/tokens/index.js',
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
      'jsonwebtoken',
      'moment',
      'next',
      'next/router',
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

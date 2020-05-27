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
      contexts: './src/contexts/index.js',
      errors: './src/errors/index.js',
      forms: './src/forms/index.js',
      hooks: './src/hooks/index.js',
      http: './src/http/index.js',
      mail: './src/mail/index.js',
      math: './src/math/index.js',
      'models/index': './src/models/index.js',
      'models/loginAttempts': './src/models/loginAttempts.js',
      'models/magicLogins': './src/models/magicLogins.js',
      'models/resetAttempts': './src/models/resetAttempts.js',
      'models/users': './src/models/users.js',
      pages: './src/pages/index.js',
      'pages/api': './src/pages/api/index.js',
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
      '@material-ui/core',
      '@material-ui/core/styles',
      '@material-ui/icons',
      'axios',
      'bcryptjs',
      'clsx',
      'jsonwebtoken',
      'moment',
      'next',
      'next/link',
      'next/router',
      'prop-types',
      'react',
      'react-dom',
      'uuid',
    ],
    plugins: [
      resolve({
        preferBuiltins: true,
      }),
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**',
        presets: [
          [
            'next/babel',
            {
              'styled-jsx': {},
            },
          ],
        ],
        extensions: ['.js', '.jsx', '.json', '.svg', '.ts', '.tsx'],
      }),
      commonjs(),
    ],
  },
];

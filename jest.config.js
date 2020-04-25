module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!**/node_modules/**'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/test/'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'identity-obj-proxy',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleDirectories: ['node_modules'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

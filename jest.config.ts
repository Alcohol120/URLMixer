module.exports = {
    transform: {'^.+\\.ts?$': 'ts-jest'},
    testEnvironment: 'node',
    testRegex: '/tests/.*\\.(test)?\\.ts$',
    moduleFileExtensions: ['js', 'ts', 'json', 'node'],
    moduleDirectories: ['node_modules', 'sources'],
    moduleNameMapper: {
        'URLMixer/(.*)': '<rootDir>/sources/$1',
    },
};
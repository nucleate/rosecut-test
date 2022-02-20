module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: [
        "<rootDir>/.aws-sam",
        "<rootDir>/__tests__/utils"
    ],
    clearMocks: true,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: 'tsconfig.jest.json',
        }],
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^@/src/(.*)$': '<rootDir>/src/$1',
        '\\.(css|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.ts',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

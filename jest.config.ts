import type { Config } from 'jest'

const config: Config = {
	preset: 'ts-jest',
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
	coverageDirectory: 'coverage',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
		'^.+\\.js$': 'babel-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	moduleNameMapper: {
		'^.+\\.svg$': 'jest-svg-transformer',
		'^.+\\.(css|less|scss)$': 'identity-obj-proxy',
	},
}

export default config

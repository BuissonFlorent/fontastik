module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.vue$": "@vue/vue3-jest",
        "^.+\\.ts$": "ts-jest",
        "^.+\\.js$": "babel-jest"
    },
    moduleDirectories: ["node_modules", "src"],
    moduleFileExtensions: [
        "js",
        "ts",
        "json",
        "vue"
    ],
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/$1',
        '^src/(.*)$': '<rootDir>/src/$1',
        "^@/(.*)$": "<rootDir>/src/$1"      // support the same @ -> src alias mapping in source code
    },
};

/*import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    //preset: 'ts-jest',
    //preset: '@vue/cli-plugin-unit-jest',
    //preset: 'ts-jest/presets/default-esm',
    //preset: 'ts-jest/presets/js-with-ts-esm', // requires  `"allowJs": true` in tsconfig.json
    testEnvironment: 'jsdom',
    moduleFileExtensions: [
        "js",
        "ts",
        "json",
        "vue"
    ],
    transform: {
        ".*\\.(vue)$": "@vue/vue3-jest",
        "^.+\\ts$": "ts-jest",
        "^.+\\js$": "babel-jest"
    },
    testURL: "http://localhost/",
    maxWorkers: "50%",
    rootDir: "."
};
export default config;*/

// ALTERNATIVE POSSIBLE CONFIGURATIONS BELOW

/*module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  transformIgnorePatterns: ['/node_modules/(?!@ionic/vue|@ionic/vue-router)']
}*/

/*module.exports = {
    
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    roots: [ '<rootDir>/src'],
    modulePaths: [
        "C:/Users/Florent/Documents/fontastik"
    ],
    moduleNameMapper: {    
        '^@App/(.*)$': '<rootDir>/src/$1',    
        '^lib/(.*)$': '<rootDir>/common/$1',  
    },
};*/



// Configuration from 
// https://github.com/monsat/vue3-realworld-example-app-/blob/setup/package.json
/*const config: Config.InitialOptions = {
    "preset": "ts-jest",
    "globals": {
        "ts-jest": {}
    },
    "testEnvironment": "jsdom",
    "transform": {
        "^.+\\.vue$": "vue3-jest",
        "^.+\\js$": "babel-jest"
    },
    "collectCoverageFrom": [
*/ //   "<rootDir>/src/**/*.{ts,vue}",
/*
        "!<rootDir>/src/config.ts"
    ],
    "moduleFileExtensions": [
      "vue",
      "ts",
      "js",
      "json",
      "node"
    ],
    "testMatch": [
*/ //      "<rootDir>/src/**/*.spec.ts"
/*
    ],
    "modulePaths": [
      "<rootDir>"
    ],
    "setupFilesAfterEnv": [
      "<rootDir>/src/setup-test.ts"
    ]
}*/





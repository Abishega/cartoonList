// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'jsdom',
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//     transform: {
//       '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for .ts and .tsx files
//       '^.+\\.(js|jsx)$': 'babel-jest', // Use babel-jest for .js and .jsx files
//     },
//     transformIgnorePatterns: ['<rootDir>/node_modules/'],
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Custom Jest setup file
//   };
  // module.exports = {
  //   preset: 'ts-jest',  // Ensures Jest is set up for TypeScript
  //   transform: {
  //     "^.+\\.(ts|tsx)$": "babel-jest",  // Use babel-jest for TS and TSX files
  //     "^.+\\.(js|jsx)$": "babel-jest"
  //   },
  //   moduleFileExtensions: ["js", "jsx", "ts", "tsx"], // Allow Jest to work with these file types
  //   transformIgnorePatterns: ["<rootDir>/node_modules/"], // Ensure node_modules is ignored
  // };
  module.exports = {
    preset: 'ts-jest',
       testEnvironment: 'jsdom',
       transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.jsx$": "babel-jest",
        "^.+\\.ts$": "babel-jest",
        "^.+\\.tsx$": "babel-jest",
      },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']

  };

  
 
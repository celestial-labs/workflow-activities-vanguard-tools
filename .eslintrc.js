module.exports = {
    extends: [require.resolve("@vertigis/workflow-sdk/config/.eslintrc")],
    parserOptions: {
        tsconfigRootDir: __dirname,
    },
    rules: {},
    ignorePatterns: ["dist", "node_modules", "__tests__"],
};

module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "space-before-function-paren": "off",
        "quotes": [1, "double", { "avoidEscape": true, "allowTemplateLiterals": true }],
        "camelcase": 1
    }
}
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
	"prettier"
    ],
    "settings": {
	"react": {
	    "version": "detect"
	}
    }
    "rules": {
	"prettier/prettier": "error",
	"react/react-in-jsx-scope": "off",
	"react/jsx-uses-react": "off",
	"no-var": "off",
	"react/prop-types": "off"
    }
}

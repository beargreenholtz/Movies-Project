module.exports = {
	'apps/backend/**/*.ts': [() => 'tsc --noEmit'],
	'apps/frontend/**/*.ts': [() => 'tsc --noEmit'],
	'**/*.{ts,js,cjs,json,yaml}': 'prettier --write',
};

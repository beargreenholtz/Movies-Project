module.exports = {
	branches: ['main'],
	repositoryUrl: 'git+https://github.com/beargreenholtz/Movies-Project',
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		['@semantic-release/npm', { npmPublish: false }],
		'@semantic-release/git',
		'@semantic-release/github',
	],
};

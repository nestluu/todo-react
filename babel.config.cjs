// module.exports = {
// 	presets: [
// 		['@babel/preset-env', { targets: { esmodules: true, node: 'current' } }],
// 		['@babel/preset-react', { runtime: 'automatic' }],
// 	],
// }

module.exports = {
	presets: [
		'@babel/preset-env', // Поддержка стандартного JS
		'@babel/preset-react', // Поддержка JSX
		'@babel/preset-typescript', // Поддержка TypeScript
	],
}

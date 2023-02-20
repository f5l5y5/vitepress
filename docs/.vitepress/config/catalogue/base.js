const baseNav = {
	text: '前端三件套',
	items: [
		{ text: 'HTML', link: '/pages/base/html/' },
		{ text: 'CSS', link: '/pages/base/css/' },
		{ text: 'JS', link: '/pages/base/js/' }
	]
}

const baseSidebar = {
	'/pages/base/': [
		{
			text: 'HTML',
			collapsable: true,
			sidebarDepth: 2,
			items: [{ link: '/pages/base/html/', text: 'html介绍' }]
		},
		{
			text: 'CSS',
			collapsable: true,
			sidebarDepth: 2,
			items: [
				{ link: '/pages/base/css/', text: 'css介绍' },
				{ link: '/pages/base/css/flex.md', text: 'flex' }
			]
		},
		{
			text: 'JS',
			collapsable: true,
			sidebarDepth: 2,
			items: [
				{ link: '/pages/base/js/', text: 'JS介绍' },
				{ link: '/pages/base/js/es6.md', text: 'ES6' },
				{ link: '/pages/base/js/ts.md', text: 'ts学习' }
			]
		}
	]
}

export { baseNav, baseSidebar }

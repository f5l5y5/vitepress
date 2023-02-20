const advancedNav = {
	text: '进阶',
	//可以进行分组 在导航栏
	items: [
		{ text: '', items: [{ text: '单元测试', link: '/pages/advanced/test/' }] },
		{ text: '', items: [{ text: '算法', link: '/pages/advanced/algorithm/' }] },
		{ text: '', items: [{ text: '设计模式', link: '/pages/advanced/design/' }] },
		{ text: '', items: [{ text: '重构', link: '/pages/advanced/refactoring/' }] },
		{ text: '', items: [{ text: 'http状态码', link: '/pages/advanced/network/http' }] }
	]
}

const advancedSidebar = {
	'/pages/advanced/test/': [
		{
			text: '测试',
			collapsable: true,
			sidebarDepth: 2,
			children: [['', '单元测试']]
		}
	],
	'/pages/advanced/algorithm/': [
		{
			text: '算法',
			collapsable: true,
			sidebarDepth: 4,
			items: [
				{ link: '/pages/advanced/algorithm/', text: 'js实现算法' },
				{ link: '/pages/advanced/algorithm/sort/', text: '排序算法' }
			]
		}
	],
	'/pages/advanced/design/': [
		{
			text: '设计模式',
			collapsable: true,
			sidebarDepth: 2,
			children: [['', 'js实现']]
		}
	],
	'/pages/advanced/refactoring/': [
		{
			text: '重构',
			collapsable: true,
			sidebarDepth: 2,
			items: [
				{ link: '/pages/advanced/refactoring/', text: '重构原则' },
				{ link: '/pages/advanced/refactoring/refactoring-2', text: '代码重构' }
			]
		}
	],
	'/pages/advanced/network/': [
		{
			text: '网络',
			collapsable: true,
			sidebarDepth: 2,
			items: [
				{ link: '/pages/advanced/network/', text: '网络简介' },
				{ link: '/pages/advanced/network/http', text: 'http笔记' }
			]
		}
	]
}

export { advancedNav, advancedSidebar }

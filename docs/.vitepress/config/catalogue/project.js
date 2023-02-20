const projectNav = {
	text: '项目',
	items: [
		{ text: '后台管理系统', link: '/pages/project/system/' },
		{ text: 'h5', link: '/pages/project/h5/' }
	]
}

const projectSidebar = {
	'/pages/project/': [
		{
			text: '移动端开发基础',
			collapsable: true,
			sidebarDepth: 2,
			items: [
				{ link: '/pages/project/mobile/', text: '知识点' },
				{ link: '/pages/project/h5/', text: 'h5项目说明' }
			]
		}
	],
	'/pages/project/system/': [
		{
			title: '后台管理系统项目',
			collapsable: true,
			sidebarDepth: 2,
			children: [['', '后台管理系统']]
		}
	]
}
export { projectNav, projectSidebar }

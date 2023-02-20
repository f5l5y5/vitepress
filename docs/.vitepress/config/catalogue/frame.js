const frameNav = {
	text: '框架',
	items: [
		{ text: 'Vue', link: '/pages/frame/vue/' },
		{ text: 'React', link: '/pages/frame/react/' }
	]
}

const frameSidebar = {
	'/pages/frame/vue/': [
		{
			text: 'Vue',
			collapsable: true,
			sidebarDepth: 2,
			items: [
				{ link: '/pages/frame/vue/', text: 'vue学习' },
				{ link: '/pages/frame/vue/permission.md', text: '权限控制' }
			]
		}
	],
	'/pages/frame/react/': [
		{
			title: 'React',
			collapsable: true,
			sidebarDepth: 2,
			children: [['', 'react笔记']] // 左侧没有菜单栏
		}
	]
}
export { frameNav, frameSidebar }

const bookNav = {
	text: '书籍',
	items: [{ text: '书籍清单', link: '/pages/books/' }]
}

const bookSidebar = {
	'/books/': [
		{
			text: '前端书籍',
			collapsable: true,
			sidebarDepth: 2,
			items: [{ link: '/pages/books/js-pattern-excise.md', text: 'html介绍' }]
		}
	]
}

export { bookNav, bookSidebar }

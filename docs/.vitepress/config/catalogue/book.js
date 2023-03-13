const bookNav = {
  text: '书籍',
  items: [
    { text: '书籍清单', link: '/pages/books/' },
    { text: '书籍笔记', link: '/pages/books/vuejs.md' },
  ],
}

const bookSidebar = {
  '/pages/books/': [
    {
      text: '前端书籍',
      collapsable: true,
      sidebarDepth: 2,
      items: [
        { link: '/pages/books/js-pattern-excise.md', text: '设计模式' },
        { link: '/pages/books/vuejs.md', text: 'Vue js 设计与实现' },
      ],
    },
  ],
}

export { bookNav, bookSidebar }

const projectNav = {
  text: '项目',
  items: [
    { text: '工程化配置', link: '/pages/project/main/editorconfig' },
    { text: 'B端', link: '/pages/project/toB/' },
    { text: 'C端', link: '/pages/project/toC/h5' },
  ],
}

const projectSidebar = {
  '/pages/project/main/': [
    {
      text: '项目工程化配置',
      collapsable: true,
      sidebarDepth: 2,
      items: [
        { link: '/pages/project/main/editorconfig', text: 'editorconfig' },
        { link: '/pages/project/main/prettier', text: 'prettier' },
        { link: '/pages/project/main/eslint', text: 'eslint' },
        { link: '/pages/project/main/stylelint', text: 'stylelint' },
        { link: '/pages/project/main/commitlint', text: 'husky+lint-staged+commitlint' },
      ],
    },
  ],
  '/pages/project/toC/': [
    {
      text: '移动端开发基础',
      collapsable: true,
      sidebarDepth: 2,
      items: [
        { link: '/pages/project/toC/mobile', text: '知识点' },
        { link: '/pages/project/toC/h5', text: 'h5项目说明' },
      ],
    },
  ],
  '/pages/project/toB/': [
    {
      title: '后台管理系统项目',
      collapsable: true,
      sidebarDepth: 2,
      children: [['', '后台管理系统']],
    },
  ],
}
export { projectNav, projectSidebar }

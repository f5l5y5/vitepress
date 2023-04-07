const projectNav = {
  text: '项目',
  items: [
    { text: '工程化配置', link: '/pages/project/main/standard' },
    { text: '代码规范', link: '/pages/project/code/vueStandard' },
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
        { link: '/pages/project/main/standard', text: '项目统一标准' },
        { link: '/pages/project/main/editorconfig', text: 'editorconfig' },
        { link: '/pages/project/main/prettier', text: 'prettier' },
        { link: '/pages/project/main/eslint', text: 'eslint' },
        { link: '/pages/project/main/stylelint', text: 'stylelint' },
        { link: '/pages/project/main/commitlint', text: 'husky+lint-staged+commitlint' },
        { link: '/pages/project/main/oss', text: '打包上传ali-oss' },
      ],
    },
  ],
  '/pages/project/code/': [
    {
      text: '移动端开发基础',
      collapsable: true,
      sidebarDepth: 3,
      items: [
        { link: '/pages/project/code/vueStandard', text: 'vue项目规范' },
        { link: '/pages/project/code/error', text: '前端错误总结' },
        { link: '/pages/project/code/errorHandler', text: '错误处理捕获方式总结' },
        { link: '/pages/project/code/vim', text: 'vscode使用vim操作' },
      ],
    },
  ],
  '/pages/project/toC/': [
    {
      text: '移动端开发基础',
      collapsable: true,
      sidebarDepth: 3,
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

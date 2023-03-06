import { algolia } from './config/search'
import { footer } from './config/footer'
import { nav, sidebar } from './config/catalogue'

export default {
  base: '/',
  title: '一诺滚雪球',
  description: '前端笔记',
  head: [
    ['link', { rel: 'icon', href: '/logo.jpeg' }], //浏览器的标签栏的网页图标
  ],
  serviceWorker: true,
  appearance: true,
  lastUpdated: true, // string | boolean
  themeConfig: {
    themeConfig: {
      editLink: {
        pattern: 'https://github.com/f5l5y5/vitepress/edit/main/docs/:path',
        text: 'Edit this page on GitHub',
      },
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/f5l5y5/vitepress' }],
    cleanUrls: true,
    nav,
    sidebar,
    algolia, // 搜索
    footer, // 页脚定义
  },
}

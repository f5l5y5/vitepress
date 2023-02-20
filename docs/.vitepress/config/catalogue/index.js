import { baseSidebar, baseNav } from './base.js'
import { bookSidebar, bookNav } from './book.js'
import { engineerSidebar, engineerNav } from './engineer.js'
import { frameSidebar, frameNav } from './frame'
import { projectSidebar, projectNav } from './project'
import { advancedSidebar, advancedNav } from './advanced'

const nav = [
	{ text: '首页', link: '/' },
	baseNav,
	frameNav,
	engineerNav,
	projectNav,
	advancedNav,
	bookNav,
	{
		text: '关于我',
		items: [
			{ text: 'GitHub', link: 'https://github.com/f5l5y5' },
			{
				text: '掘金',
				link: 'https://juejin.cn/user/2824015112318094'
			},
			{ text: 'CSDN', link: 'https://blog.csdn.net/fly555fly' }
		]
	}
]
const sidebar = {
	...baseSidebar,
	...frameSidebar,
	...engineerSidebar,
	...projectSidebar,
	...advancedSidebar,
	...bookSidebar
}

export { nav, sidebar }

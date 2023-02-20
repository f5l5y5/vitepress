const engineerNav = {
	text: '工程化',
	items: [
		{
			text: '部署',
			items: [
				{ text: 'CICD', link: '/pages/engineer/deploy/' },
				{ text: 'vuepress', link: '/pages/engineer/vuepress/' }
			]
		},
		{
			text: '构建工具',
			items: [
				{ text: 'webpack', link: '/pages/engineer/build/webpack/base/' },
				{ text: 'rollup', link: '/pages/engineer/build/rollup/' },
				{ text: 'vite', link: '/pages/engineer/build/vite/' }
			]
		},
		{
			text: 'git',
			items: [
				{ text: '常用命令', link: '/pages/engineer/git/' },
				{ text: '工作流', link: '/pages/engineer/git/gitflow' }
			]
		}
	]
}

const engineerSidebar = {
	'/pages/engineer/build/webpack/': [
		{
			text: '基础配置',
			collapsable: true,
			sidebarDepth: 5,
			items: [
				{ text: '前言', link: '/pages/engineer/build/webpack/base/' },
				{ text: '基本使用', link: '/pages/engineer/build/webpack/base/base.md' },
				{ text: '基本配置', link: '/pages/engineer/build/webpack/base/config.md' },
				{ text: '开发模式介绍', link: '/pages/engineer/build/webpack/base/development.md' },
				{ text: '处理样式资源', link: '/pages/engineer/build/webpack/base/css.md' },
				{ text: '处理图片资源', link: '/pages/engineer/build/webpack/base/image.md' },
				{ text: '修改输出资源的名称和路径', link: '/pages/engineer/build/webpack/base/output.md' },
				{ text: '自动清空打包资源', link: '/pages/engineer/build/webpack/base/clean.md' },
				{ text: '处理字体图标资源', link: '/pages/engineer/build/webpack/base/font.md' },
				{ text: '处理其他资源', link: '/pages/engineer/build/webpack/base/other.md' },
				{ text: '处理js资源', link: '/pages/engineer/build/webpack/base/javascript.md' },
				{ text: '处理Html资源', link: '/pages/engineer/build/webpack/base/html.md' },
				{ text: '开发服务器&自动化', link: '/pages/engineer/build/webpack/base/server.md' },
				{ text: '生产模式介绍', link: '/pages/engineer/build/webpack/base/production.md' },
				{ text: 'Css 处理', link: '/pages/engineer/build/webpack/base/optimizeCss.md' },
				{ text: 'html 压缩', link: '/pages/engineer/build/webpack/base/minifyHtml.md' },
				{ text: '总结', link: '/pages/engineer/build/webpack/base/summary.md' }
			]
		},
		{
			text: '高级优化',
			collapsable: true,
			sidebarDepth: 5,
			items: [
				{ text: '高级配置', link: '/pages/engineer/build/webpack/senior/' },
				{ text: '提升开发体验', link: '/pages/engineer/build/webpack/senior/enhanceExperience.md' },
				{ text: '提升打包构建速度', link: '/pages/engineer/build/webpack/senior/liftingSpeed.md' },
				{ text: '减少代码体积', link: '/pages/engineer/build/webpack/senior/reduceVolume.md' },
				{ text: '优化代码运行性能', link: '/pages/engineer/build/webpack/senior/optimizePerformance.md' },
				{ text: '总结', link: '/pages/engineer/build/webpack/senior/summary.md' }
			]
		},
		{
			text: '项目配置',
			collapsable: true,
			sidebarDepth: 5,
			items: [
				{ text: '介绍', link: '/pages/engineer/build/webpack/project/' },
				{ text: 'React脚手架', link: '/pages/engineer/build/webpack/project/react-cli.md' },
				{ text: 'Vue脚手架', link: '/pages/engineer/build/webpack/project/vue-cli.md' },
				{ text: '总结', link: '/pages/engineer/build/webpack/project/summary.md' }
			]
		},
		{
			text: '原理分析',
			collapsable: true,
			sidebarDepth: 5,
			items: [
				{ text: '介绍', link: '/pages/engineer/build/webpack/origin/' },
				{ text: 'Loader 原理', link: '/pages/engineer/build/webpack/origin/loader.md' },
				{ text: 'Plugin 原理', link: '/pages/engineer/build/webpack/origin/plugin.md' },
				{ text: '总结', link: '/pages/engineer/build/webpack/origin/summary.md' }
			]
		}
	],
	'/pages/engineer/build/rollup/': [
		{
			text: 'rollup',
			collapsable: true,
			sidebarDepth: 2,
			children: [['', 'rollup笔记']]
		}
	],
	'/pages/engineer/build/vite/': [
		{
			text: 'vite',
			collapsable: true,
			sidebarDepth: 2,
			children: [['', 'vite笔记']]
		}
	],
	'/pages/engineer/deploy/': [
		{
			text: '部署',
			collapsable: true,
			sidebarDepth: 2,
			children: ['']
		}
	],
	'/pages/engineer/git/': [
		{
			text: 'Git命令',
			collapsable: true,
			sidebarDepth: 2,
			items: [
				{ link: '/pages/engineer/git/', text: '常用命令说明' },
				{ link: '/pages/engineer/git/gitflow.md', text: 'gitflow说明' }
			]
		}
	],
	'/pages/engineer/vuepress/': [
		{
			text: 'vuepress',
			collapsable: true,
			sidebarDepth: 2,
			children: ['']
		}
	]
}

export { engineerNav, engineerSidebar }

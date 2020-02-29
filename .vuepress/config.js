module.exports = {
    title: 'laravel-admin-api',
    description: '后台基础框架API集成',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        // ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        nav:[ // 导航栏配置
        {
            text: '使用文档',
            items: [
              { text: '安装', link: '/anzhuang' },
              { text: '中间件', link: '/zhognjianjian' },
              { text: '快速上手', link: '/shangshou' },
              { text: 'API代码模板生成', link: '/apimoban' },
              { text: '版本', link: '/banben' }
            ]
        },
        {
            text: 'API文档',
            items: [
              { text: 'API文档', link: 'https://www.eolinker.com/#/share/index?shareCode=KUgsLJ' },
              { text: 'API文档离线文件', link: '/eolinker' },
            ]
        },
        {
          text: '常用方法类',
            items: [
              { text: '常用方法', link: '/changyon/commonlyusedfunction' },
              { text: 'Excel操作类', link: '/changyon/excelactivyty' }
            ]
        },
        {text: 'GITHUB', link: 'https://github.com/qq2504021719/Laravel-admin-api'}      
        ],
        sidebar: 'auto', // 侧边栏配置
        sidebarDepth: 2, // 侧边栏显示2级
    }
};
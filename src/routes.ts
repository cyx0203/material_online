const routes: any = [
  {
    path: '/login',
    component: '@/pages/login',
  },
  {
    path: '/',
    component: '@/layouts',
    routes: [
      {
        name: '欢迎',
        path: '/welcome',
        icon: 'smile',
        component: '@/pages/welcome',
      },
      {
        name: '自助端',
        path: '/cfgform',
        icon: 'item',
        routes: [
          {
            path: '/cfgform/terminal',
            icon: 'add',
            name: '自助规范',
            component: '@/pages/terminal',
          },
          // {
          //   path: '/cfgform/icon',
          //   icon: 'add',
          //   name: 'ICON',
          //   component: '@/pages/icon',
          // },
          {
            path: '/cfgform/navigation',
            icon: 'edit',
            name: '导航栏（自动生成）',
            component: '@/pages/dragtest2/ttest',
          },
          {
            path: '/cfgform/query',
            icon: 'list',
            name: '传统动画',
            component: '@/pages/welcome',
          },
          {
            path: '/cfgform/voice',
            icon: 'list',
            name: '语音',
            component: '@/pages/voice',
          },
          // {
          //   path: '/cfgform/picture',
          //   icon: 'list',
          //   name: '图片',
          //   component: '@/pages/picture',
          // },
        ],
      },
      {
        name: '移动端',
        path: '/cfg',
        icon: 'maintain',
        routes: [
          {
            path: '/cfg/basedata/basedata',
            icon: 'maintain',
            name: '风格预览',
            component: '@/pages/welcome',
          },
          {
            path: '/cfg/basedata/basedata1',
            icon: 'maintain',
            name: '设备型号维护',
            component: '@/pages/welcome',
          },
          {
            path: '/cfg/maintain/maintain',
            icon: 'maintain',
            name: '部件信息维护',
            component: '@/pages/welcome',
          },
        ],
        access: 'justAdmin',
      },
      {
        name: '资源管理',
        path: '/sysManage',
        icon: 'my',
        routes: [
          {
            name: '资源上传',
            path: '/sysManage/index',
            icon: 'user',
            component: '@/pages/welcome',
          },
          {
            name: '我的收藏',
            path: '/sysManage/my',
            icon: 'my',
            component: '@/pages/welcome',
          },
        ],
        access: 'justAdmin',
      },
      {
        name: '可视化工具',
        path: '/sysManage1',
        icon: 'code',
        routes: [
          {
            name: '资源上传',
            path: '/sysManage1/index',
            icon: 'user',
            component: '@/pages/welcome',
          },
          {
            name: '我的收藏',
            path: '/sysManage1/my',
            icon: 'my',
            component: '@/pages/welcome',
          },
        ],
        access: 'justAdmin',
      },
      {
        name: '用户中心',
        path: '/sysManage2',
        icon: 'my',
        routes: [
          {
            path: '/sysManage2/index',
            icon: 'user',
            component: '@/pages/welcome',
          },
          {
            name: '我的收藏',
            path: '/sysManage2/my',
            icon: 'my',
            component: '@/pages/welcome',
          },
        ],
        access: 'justAdmin',
      },
    ],
  },
];

export { routes };

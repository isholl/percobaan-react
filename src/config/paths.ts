export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },

  auth: {
    register: { path: '/register', getHref: () => '/register' },
    login: { path: '/login', getHref: () => '/login' },
  },

  app: {
    root: {
      path: '/app',
      getHref: () => '/app',
    },
    dashboard: {
      path: '',
      getHref: () => '/app',
    },
  },
} as const;

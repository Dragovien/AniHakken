
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'IndexPage', component: () => import('pages/IndexPage.vue') },
    ]
  },
  {
    path: '/anime',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: ':id', name: 'AnimeShow', component: () => import('pages/AnimeDetailsPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

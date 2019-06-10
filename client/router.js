import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import quiz from '@/pages/quiz'
import createQuiz from '@/pages/createQuiz'
import index from '@/pages/index'

export function createRouter() {
  return new Router ({
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    mode: 'history',
    routes: [
      {
        path: "/",
        component: index,
        name: "index"
      },
      {
        path: "/quiz/:id",
        component: quiz,
        name: "quiz"
      },
      {
        path: "/quiz/:id/edit",
        component: createQuiz,
        name: "createQuiz"
      }
    ]
  })
}

import  {createRouter,createWebHistory} from  'vue-router';

// createRouter方法，用于创建路由器实例，可以管理多个路由
// @ts-ignore
// @ts-ignore
export default createRouter({
    // 路由的模式设置
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            // @ts-ignore
            component: () => import('@/pages/home/index.vue')
        },
        {
            path: '/project',
            // @ts-ignore
            component: () => import('@/pages/project/index.vue')
        },
        {
            path: '/item',
            // @ts-ignore
            component: () => import('@/pages/item/index.vue')
        },

    ],
    // 滚动行为控制: 控制滚动条的位置
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})

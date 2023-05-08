import "vue-router";

declare module "vue-router" {
    interface RouteMeta {
        // 是可选的
        requiresAuth?: boolean;
        requiresNoAuth?: boolean;
        title?: string;
    }
}

// The following declaration was removed to solve the error "Cannot use namespace XXX as type" after updating 
//declare module 'vuex'; 

declare module 'vue-csv-import';

declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

declare module '*.vue' {
    import { defineComponent } from 'vue'
    const component: ReturnType<typeof defineComponent>
    export default component
}

/*declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}*/

/*declare module '@/tabs/*' {
    import Vue from 'vue'
    // noinspection JSDuplicatedDeclaration
    export default Vue
}

declare module '@/components/*' {
    import Vue from 'vue'
    // noinspection JSDuplicatedDeclaration
    export default Vue
}*/
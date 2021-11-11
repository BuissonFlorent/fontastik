// The following declaration was removed to solve the error "Cannot use namespace XXX as type" after updating 
//declare module 'vuex'; 

declare module 'vue-csv-import';

declare module '*.vue' {
    import { defineComponent } from 'vue'
    const component: ReturnType<typeof defineComponent>
    export default component
  }
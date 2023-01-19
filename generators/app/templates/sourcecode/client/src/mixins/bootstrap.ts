import { App } from 'vue';
import * as bootstrap from 'bootstrap';
declare const $: any;

export default {
  install(app: App) {
    app.config.globalProperties.$ = $;
    app.config.globalProperties.bootstrap = bootstrap;
  },
};

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $: any;
    bootstrap: any;
  }
}

<template>
  <div class="home-view">
    <h1 v-if="isLoggedIn">Welcome Home!</h1>
    <login-form v-if="!isLoggedIn" @login="onLogin($event)"></login-form>
    <pre>{{ text }}</pre>
    <action-fab bottom right @click="getText()" button-type="btn-secondary" icon="fas fa-info"></action-fab>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { LoginForm } from '@/components';
import { get, post } from '@/services/api';
import { ActionFab } from '@walts81/vue-common-components';

export default {
  components: {
    ActionFab,
    LoginForm,
  },
  setup() {
    const text = ref('');
    const isBusy = ref(false);
    const isLoggedIn = ref(false);
    const onLogin = async (creds: { username: string; password: string }) => {
      isBusy.value = true;
      const auth = await post('/auth', creds);
      isLoggedIn.value = !!auth.accessToken;
      text.value = JSON.stringify(await get('/about', { token: auth.accessToken }));
      isBusy.value = false;
    };
    const getText = async () => {
      isBusy.value = true;
      text.value = JSON.stringify(await get('/'), null, 2);
      isLoggedIn.value = true;
      isBusy.value = false;
    };
    return { text, getText, onLogin, isBusy, isLoggedIn };
  },
};
</script>

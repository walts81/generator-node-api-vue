<template>
  <section class="vh-100 gradient-custom login-form">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white">
            <div class="card-body px-5 text-center">
              <div class="mb-md-5 mt-md-4">
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-white-50 mb-5">Enter your username and password</p>

                <div class="form-floating form-white mb-4">
                  <input
                    type="text"
                    id="floatingInput"
                    class="form-control form-control-lg"
                    v-model="username"
                    placeholder="name@example.com"
                  />
                  <label class="text-dark" for="floatingInput">Username</label>
                </div>

                <div class="form-floating form-white mb-4">
                  <input
                    type="password"
                    id="floatingPassword"
                    class="form-control form-control-lg"
                    v-model="password"
                    placeholder="password"
                  />
                  <label class="text-dark" for="floatingPassword">Password</label>
                </div>

                <p v-if="forgotPassword" class="small mb-5 pb-lg-2">
                  <a class="text-white-50" href="#!" @click="onForgotPassword()">Forgot password?</a>
                </p>

                <button
                  :disabled="!canLogin"
                  :class="{ disabled: !canLogin }"
                  class="btn btn-outline-light btn-lg px-5"
                  type="submit"
                  @click="onLogin()"
                >
                  Login
                </button>

                <div class="d-flex justify-content-center text-center mt-4 pt-1" v-if="useOauth">
                  <a href="#!" class="text-white" @click="onOauth('facebook')"
                    ><i class="fab fa-facebook-f fa-lg"></i
                  ></a>
                  <a href="#!" class="text-white" @click="onOauth('twitter')"
                    ><i class="fab fa-twitter fa-lg mx-4 px-2"></i
                  ></a>
                  <a href="#!" class="text-white" @click="onOauth('google')"><i class="fab fa-google fa-lg"></i></a>
                </div>
              </div>

              <div v-if="canRegister">
                <p class="mb-0">
                  Don't have an account? <a href="#!" class="text-white-50 fw-bold" @click="onRegister()">Sign Up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, ref } from 'vue';

export default {
  props: {
    canRegister: {
      type: Boolean,
      required: false,
      default: false,
    },
    forgotPassword: {
      type: Boolean,
      required: false,
      default: false,
    },
    useOauth: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['forgot-password', 'login', 'register', 'oauth'],
  setup(_, { emit }) {
    const username = ref('');
    const password = ref('');
    const canLogin = computed(
      () => !!username.value && !!username.value.trim() && !!password.value && !!password.value.trim()
    );
    const onForgotPassword = () => emit('forgot-password');
    const onRegister = () => emit('register');
    const onLogin = () => emit('login', { username: username.value, password: password.value });
    const onOauth = (provider: string) => emit('oauth', provider);

    return { username, password, canLogin, onForgotPassword, onRegister, onLogin, onOauth };
  },
};
</script>

<style lang="scss">
.login-form {
  .card {
    border-radius: 1rem;
  }
}
</style>

<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <p style="margin-bottom: 2rem;">사용자 인증</p>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <label class="login-label">
        <input v-model="num" placeholder="학번을 입력하세요..." autocomplete="false" maxlength="5" minlength="5" type="number"/>
      </label>
      <label class="login-label">
        <input v-model="name" placeholder="이름을 입력하세요..." autocomplete="false" maxlength="4" minlength="2"/>
      </label>
      <button class="btn" @click="login">
        로그인
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      num: "",
      name: "",
    }
  },
  methods: {
    login() {
      this.$store.commit("login", {num: this.num.toString(), name: this.name});
    },
  }
}
</script>

<style scoped>
.login-label {
  padding: .5rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;

  margin-bottom: 1rem;
}

.login-label input {
  width: 100%;
}
</style>
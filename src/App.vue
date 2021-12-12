<template>
  <div v-if="!loading"
       style="height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <span v-if="isLoggedIn" @click="logout" class="mdi mdi-logout-variant btn btn-logout"></span>
    <p style="font-weight: 800; font-size: 1.5rem; margin-bottom: 2rem;">동래고등학교 등교 시스템</p>
    <Login v-if="!isLoggedIn"/>
    <div v-else class="container">
      <div style="width: 100%; display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
          <p>학번</p>
          <p style="font-weight: 600;">{{ num }}</p>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <p>이름</p>
          <p style="font-weight: 600;">{{ name }}</p>
        </div>
      </div>
      <img alt="QR 코드를 로딩 중입니다..." ref="qr" class="qr"/>
      <div class="btn">
        출석 기록 보기
      </div>
    </div>
  </div>
</template>

<style>
@import url("https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css");
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");
@import url("https://cdn.jsdelivr.net/npm/@mdi/font@6.5.95/css/materialdesignicons.min.css");

* {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif !important;
  box-sizing: border-box;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

input {
  border: none;
}

input:focus {
  outline: none;
}

.btn {
  padding: .5rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;

  text-align: center;

  cursor: pointer;

  background: none;
  transition: .3s;
}

.btn:hover {
  background: rgba(0, 0, 0, .05);
}

.container {
  width: 60vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container > * {
  margin-bottom: 1rem;
  width: 100%;
}

.qr {
  height: 1px;
  width: 100%;

  border: 1px solid rgba(0, 0, 0, .3);

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.btn-logout {
  position: absolute;
  right: 1rem;
  top: 1rem;

  color: black;

  border: none;
  padding: 1rem;
}
</style>

<script>
import Login from "./components/Login";
import axios from "axios";
import QrCodeWithLogo from "qrcode-with-logos";

export default {
  components: {Login},
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    num() {
      return this.$store.getters.num;
    },
    name() {
      return this.$store.getters.name;
    },
  },
  watch: {
    isLoggedIn() {
      this.loading = false;
      setTimeout(() => {
        window.addEventListener("resize", () => {
          this.$refs.qr.style.height = `${this.$refs.qr.clientWidth}px`;
          this.$refs.qr.style.lineHeight = `${this.$refs.qr.clientWidth}px`;
        }, true);
        this.$refs.qr.style.height = `${this.$refs.qr.clientWidth}px`;
        this.$refs.qr.style.lineHeight = `${this.$refs.qr.clientWidth}px`;

        this.refresh();
      }, 0);
    }
  },
  methods: {
    logout() {
      if (confirm("로그아웃 하시겠습니까?")) {
        localStorage.clear();
        alert("로그아웃하였습니다.");
        location.reload();
      }
    },
    async refresh() {
      let jwt = (await axios.post("https://dnhs-contest.nlog.dev/api/student/qr", JSON.stringify({
        num: this.num,
        name: this.name,
      }), {
        headers: {
          "Content-Type": "application/json"
        }
      })).data;
      if (jwt.result === 0) {
        await (new QrCodeWithLogo({
          image: this.$refs.qr,
          content: jwt.result_data,
          logo: {
            src: `${location.origin}/img/dnhs.jpg`,
            borderSize: 0.02,
            borderRadius: 100,
            logoRadius: 100,
            logoSize: 0.2
          }
        })).toImage();
      } else {
        alert("QR 코드 발급 실패");
        //location.reload();
      }
      setTimeout(this.refresh, 1000 * 15); // 15 seconds
    }
  },
  data() {
    return {
      loading: true,
    };
  },
  created() {
    let num = localStorage.getItem("num"), name = localStorage.getItem("name");
    if (typeof num === "string" && typeof name === "string") this.$store.commit("login", {num, name});
    else this.loading = false;
  }
}
</script>
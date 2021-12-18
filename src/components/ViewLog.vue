<template>
  <div class="viewlog">
    <div class="viewlog-container" @click.stop="">
      <div class="viewlog-title">출석 기록</div>
      <div class="viewlog-list">
        <div v-for="time of $store.getters.log">
          {{ time.getFullYear() }}년 {{ time.getMonth() + 1 }}월 {{ time.getDate() }}일 / {{ time.getHours() }}시 {{ time.getMinutes() }}분
        </div>
      </div>
      <div class="viewlog-desc">출석 기록 열람은 최대 5일까지의 기록만 보여줍니다.</div>
      <div class="btn viewlog-close" @click="$emit('close')">닫기</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewLog"
}
</script>

<style scoped>
@-webkit-keyframes blur-in {
  0% {
    backdrop-filter: blur(0px);
  }
  25% {
    backdrop-filter: blur(0.5px);
  }
  50% {
    backdrop-filter: blur(1px);
  }
  75% {
    backdrop-filter: blur(1.7px);
  }
  100% {
    backdrop-filter: blur(2.5px);
  }
}

.viewlog {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 999;

  backdrop-filter: blur(2.5px);
  animation: blur-in .3s;
  background: rgba(0, 0, 0, 0.002);

  display: flex;
  align-items: center;
  justify-content: center;
}

.viewlog-container {
  width: 80vw;
  height: 50vh;

  padding: 7% 10%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: white;
  border-radius: 5px;
  box-shadow: 2px 2px 20px 3px rgba(0, 0, 0, 0.25);
}

.viewlog-title {
  font-size: 1.7rem;
  font-weight: 700;

  width: 100%;
  text-align: left;
}

.viewlog-list {
  flex: 1;
  margin: 1.5rem 0;
}

.viewlog-list > * {
  margin: .5rem 0;
}

.viewlog-desc {
  color: gray;
  font-size: .8rem;
  margin-bottom: .7rem;
  text-align: center;
}

.viewlog-close {
  width: 100%;
}
</style>
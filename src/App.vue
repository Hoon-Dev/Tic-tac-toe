<template>
  <div class="container">
    <div>
      <div v-for="(raw, rawIndex) in rawCount" :key="rawIndex" class="raw">
        <span
          v-for="(col, colIndex) in colCount" :key="rawIndex + '/' + colIndex"
          class="col"
          :class="{
            'able': (board[((raw - 1) * rawCount) + col - 1] == 0)
          }"
        >
          {{BOARD_INFO[board[((raw - 1) * rawCount) + col - 1]]}}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const BOARD_INFO = {
  0: "",
  1: "O",
  2: "X"
};

const board = ref([
  0, 1, 0,
  0, 0, 0,
  0, 2, 0
]);

const rawCount = 3;
const colCount = 3;

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}
</style>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.col {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: 5px;
  box-shadow: 0 1px 4px -1px #878787;
  background: white;
  border-radius: 5px;

  vertical-align: top;
  line-height: 80px;
  font-size: 50px;
  font-weight: bold;

  cursor: pointer;

  transition-duration: .3s;
}

.col.able:hover {
  background: #eeeeee;
  box-shadow: 0 1px 4px -1px #5e5e5e;
}
</style>
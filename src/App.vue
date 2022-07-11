<template>
  <div
    class="header"
    :class="{'logined': isLogined}"
  >
    <wallet-multi-button></wallet-multi-button>
  </div>
  <div class="container">
    <div>
      <transition-group name="board">
        <div v-if="isLogined" class="controller">
          <button class="button">참가하기</button>
          <button class="button outline">방 만들기</button>
        </div>
        <div class="board">
          <div v-if="!isLogined">
            <div class="dimmed"></div>
            <div class="wallet-connector">
              <wallet-multi-button></wallet-multi-button>
            </div>
          </div>
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
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { WalletMultiButton, useWallet } from "solana-wallets-vue";

const BOARD_INFO = {
  0: "",
  1: "O",
  2: "X"
};

const rawCount = 3;
const colCount = 3;

const board = ref([
  0, 0, 0,
  0, 0, 0,
  0, 0, 0
]);

const isLogined = computed(() => {
  return useWallet().connected.value;
});
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

.header {
  .swv-button{
    color: #1f2937;
  }

  .swv-button:not([disabled]):hover {
    background-color: white;
  }

  .swv-button-trigger {
    background-color: white;
  }
}
</style>

<style lang="scss" scoped>
.header {
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: end;
  background: white;
  box-shadow: 0 4px 10px -6px darkgrey;
  
  transition-duration: 0s;

  &.logined {
    opacity: 1;
    transition-duration: .5s;
    transition-delay: 1.2s;
  }
}

.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controller {
  padding: 0 5px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;

  .button:first-child {
    margin-right: 8px;
  }

  .button {
    flex: 1;
  }
}

.button {
  font-size: 16px;
  cursor: pointer;
  font-size: 14px;
  color: white;
  background: rgb(48 48 48);
  border-radius: 5px;
  outline: 0;
  border: 0;
  padding: 10px 20px;

  &:hover:not(:active) {
    background: rgb(80 80 80);
  }

  &.outline {
    color: rgb(48 48 48);
    border: 1px solid rgb(48 48 48);
    background: white;
  }

  &.outline:hover:not(:active) {
    color: #888888;
    background: white;
    border-color: #888888;
  }
}

.board {
  position: relative;
  transition-duration: .8s;
}

.wallet-connector {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}

.dimmed {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgb(255 255 255 / 59%);
  border-radius: 5px;
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

  transition-duration: .5s;

  &.able:hover {
    background: #eeeeee;
    box-shadow: 0 1px 2px 0px #878787;
  }
}

.board-enter-from {
  opacity: 0;
}

.board-enter-to {
  opacity: 1;
}

.board-enter-active {
  transition-duration: 1.5s;
  transition-delay: .5s;
}
</style>
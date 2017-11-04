<template>
  <div id="app">
    <board-container/>
  </div>
</template>

<script>
import boardContainer from './components/board-container';

export default {
  name: 'app',
  created() {
  },
  components: {
    'board-container': boardContainer,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
    <offline>
      <board-container slot="online"/>
      <offline-page slot="offline"/>
    </offline>
  </div>
</template>

<script>
import offline from 'v-offline';
import boardContainer from './components/board-container';
import offlinePage from './components/offline-page';

export default {
  name: 'app',
  created() {
  },
  components: {
    'board-container': boardContainer,
    offline,
    'offline-page': offlinePage,
  },
  methods: {
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

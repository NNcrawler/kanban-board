<template lang="html">
  <b-container>
    <b-row><b-col><new-task/></b-col></b-row>
    <b-row>
      {{todos}}
      <b-col>
        <card :tasks="backlog" title="Backlog"/>
      </b-col>
      <b-col>
        <card :tasks="todos" title="Todo"/>
      </b-col>
      <b-col>
        <card title="Doing"/>
      </b-col>
      <b-col>
        <card title="Done"/>
      </b-col>
    </b-row>
    <!-- <mymodal> -->
  </b-container>
</template>

<script>
import list from './card-list';
import newTask from './new-task';

export default {
  components: {
    card: list,
    'new-task': newTask,
  },
  firebase() {
    return {
      todos: this.$db.ref('/todos'),
      backlog: this.$db.ref('/backlog'),
    };
  },
};
</script>

<style lang="css">
</style>

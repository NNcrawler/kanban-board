<template lang="html">
  <b-container>
    <b-row><b-col><new-task/></b-col></b-row>

    <b-row>
      <b-col lg="3" md="6" sm="12">
          <card :tasks="backlog" title="Backlog"/>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <card :tasks="todos" title="Todo"/>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <card :tasks="doing" title="Doing"/>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <card :tasks="done" title="Done"/>
      </b-col>
    </b-row>

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
      doing: this.$db.ref('/doing'),
      done: this.$db.ref('/done'),
    };
  },
};
</script>

<style lang="css">
</style>

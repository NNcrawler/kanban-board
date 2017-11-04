<template lang="html">
  <div class="new-task">
    <b-button v-b-modal.modal1 variant="outline-success">New Task</b-button>
    <b-modal id="modal1" title="Add New Task" @ok="submitTask">
      <b-alert v-if="alert.length>0" show variant="danger">{{alert}}</b-alert>
      <b-form>
        <b-form-group id="title"
                    label="Title:" label-for="taskTitle">
          <b-form-input id="taskTitle"
                        type="text" v-model="task.title" required
                        placeholder="Title of new task"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="description"
                      label="Description:" label-for="taskDescription">
          <b-form-textarea id="taskDescription"
                        type="text" v-model="task.description"
                        :rows="3" :max-rows="6" required
                        placeholder="Description of new task"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group id="point"
                    label="Point:" label-for="taskPoint">
          <b-form-input id="taskPoint"
                        type="text" v-model="task.point" required
                        placeholder="Point ex: 10"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="assignedTo"
                    label="Assigned to:" label-for="taskAsignee">
          <b-form-input id="taskAsignee"
                        type="text" v-model="task.assignedTo" required
                        placeholder="Assignee"
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: {
        title: '',
        description: '',
        point: null,
        assignedTo: '',
      },
      alert: '',
    };
  },
  firebase() {
    return {
      todos: this.$db.ref('/backlog'),
    };
  },
  methods: {
    submitTask(evt) {
      if (!this.task.title || !this.task.description || !this.task.point || !this.task.assignedTo) {
        evt.preventDefault();
        this.alert = 'All field is required!';
      } else if (!new RegExp(/^\d+$/).test(this.task.point)) {
        evt.preventDefault();
        this.alert = 'Point must be a number';
      } else {
        this.$firebaseRefs.todos.push(this.task);
      }
    },
  },
};
</script>

<style lang="css">
.new-task{
  margin-bottom: 30px;
}
</style>

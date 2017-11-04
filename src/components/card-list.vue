<template lang="html">
  <div class="">
    <b-card v-bind:title="title">
      <b-card @click='showModal(task)' v-for="task in tasks" :bg-variant="cardColors"
             :header="task.title"
             class="task mb-2"
             text-variant="white">
         <p class="card-text">{{task.description}}</p>
         <small class="text-light" slot="footer">Assigned to: {{task.assignedTo}} <b-badge pill variant="success">{{task.point}}</b-badge></small>
     </b-card>
     <b-alert v-if="!tasks || tasks.length==0" show variant="info">Nothing here yet.</b-alert>
    </b-card>

    <b-modal ref="detail-task" id="detail-task">
      <div slot="modal-title">
        <h3>{{taskDetails.title}}</h3>
        <div class="task-status"><small>status: {{taskDetails.status}}</small></b-badge></div>
        <div class="task-status"><small><b-badge pill variant="success">Point: {{taskDetails.point}}</b-badge></small></div>
      </div>
      <p> {{taskDetails.description}}</p>
      <div slot="modal-footer">
        <b-button v-on:click="deleteTask" variant="link" type="button" name="button">Delete</b-button>
        <b-button v-on:click="moveBefore" v-if="beforeAvailable" variant="primary" type="button" name="button">Move to {{beforePanel}}</b-button>
        <b-button v-on:click="moveNext" v-if="nextAvailable" variant="primary" type="button" name="button">Move to {{nextPanel}}</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskDetails: {
        title: '',
        description: '',
        point: '',
        status: '',
        key: '',
        assignedTo: '',
      },
    };
  },
  props: ['title', 'tasks'],
  computed: {
    cardColors() {
      if (this.title === 'Backlog') {
        return 'danger';
      } else if (this.title === 'Todo') {
        return 'warning';
      } else if (this.title === 'Doing') {
        return 'info';
      } else if (this.title === 'Done') {
        return 'success';
      }
      return '';
    },
    beforeAvailable() {
      if (this.title === 'Backlog') {
        return false;
      }
      return true;
    },
    nextAvailable() {
      if (this.title === 'Done') {
        return false;
      }
      return true;
    },
    nextPanel() {
      if (this.title === 'Backlog') {
        return 'Todo';
      } else if (this.title === 'Todo') {
        return 'Doing';
      } else if (this.title === 'Doing') {
        return 'Done';
      }
      return 'Nowhere';
    },
    beforePanel() {
      if (this.title === 'Done') {
        return 'Doing';
      } else if (this.title === 'Doing') {
        return 'Todo';
      } else if (this.title === 'Todo') {
        return 'Backlog';
      }
      return 'Nowhere';
    },
  },
  methods: {
    showModal(task) {
      this.taskDetails.title = task.title;
      this.taskDetails.description = task.description;
      this.taskDetails.point = task.point;
      this.taskDetails.key = task['.key'];
      this.taskDetails.assignedTo = task.assignedTo;
      if (this.title === 'Backlog') {
        this.taskDetails.status = 'Backlog';
      } else if (this.title === 'Todo') {
        this.taskDetails.status = 'Todo';
      }
      this.$refs['detail-task'].show();
    },
    hideTaskDetails() {
      this.$root.$emit('bv::hide::modal', 'detail-task');
    },
    deleteTask() {
      const parent = this.title === 'Todo' ? 'todos' : this.title.toLowerCase();
      this.$db.ref(`/${parent}/${this.taskDetails.key}`).remove();
    },
    moveNext() {
      this.hideTaskDetails();
      const task = {
        title: this.taskDetails.title,
        description: this.taskDetails.description,
        point: this.taskDetails.point,
        assignedTo: this.taskDetails.assignedTo,
      };
      let next = '';
      if (this.title === 'Backlog') {
        next = 'todos';
      } else if (this.title === 'Todo') {
        next = 'doing';
      } else if (this.title === 'Doing') {
        next = 'done';
      }
      this.$db.ref(`/${next}`).push(task);
      this.deleteTask();
    },
    moveBefore() {
      this.hideTaskDetails();
      const task = {
        title: this.taskDetails.title,
        description: this.taskDetails.description,
        point: this.taskDetails.point,
        assignedTo: this.taskDetails.assignedTo,
      };
      let before = '';
      if (this.title === 'Done') {
        before = 'doing';
      } else if (this.title === 'Doing') {
        before = 'todos';
      } else if (this.title === 'Todo') {
        before = 'backlog';
      }
      this.$db.ref(`/${before}`).push(task);
      this.deleteTask();
    },
  },
};
</script>

<style lang="css">
.task-status {
  margin: 0 !important;
  padding: 0 !important;
  text-align: left;
}
.task:hover {
  cursor: pointer;
	-webkit-animation: shadow-drop-2-center 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: shadow-drop-2-center 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@-webkit-keyframes shadow-drop-2-center {
  0% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    -webkit-transform: translateZ(50px);
            transform: translateZ(50px);
    -webkit-box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
            box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
  }
}
@keyframes shadow-drop-2-center {
  0% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    -webkit-transform: translateZ(50px);
            transform: translateZ(50px);
    -webkit-box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
            box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
  }
}

/* ----------------------------------------------
 * Css Animation Generated by Animista on 2017-11-4 15:32:39
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation shadow-drop-2-center
 * ----------------------------------------
 */
</style>

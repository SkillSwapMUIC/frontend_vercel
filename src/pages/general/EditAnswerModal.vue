<template>
  <div class="edit-answer-modal">
    <textarea v-model="editedContent" placeholder="Enter your edited answer..."></textarea>
    <button @click="submitEdit">Save</button>
    <button @click="cancelEdit">Cancel</button>
  </div>
</template>

<script>
export default {
  props: ['initialContent'],
  data() {
    return {
      editedContent: this.initialContent
    };
  },
  methods: {
    submitEdit() {
      this.$emit('edit', this.editedContent);
    },
    cancelEdit() {
      this.$emit('cancel');
    }
  }
};
</script>
  
  <style scoped>

  .question-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: transparent;
  padding: 20px;
}

.question-container {
  display: flex;
  align-items: center;
  max-width: 900px;
  width: 100%;
  background: lightblue;
  border-radius: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}


.question-input {
  flex-grow: 1;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 40px 0 0 40px;
}

.action-btn.primary {
  padding: 10px 20px;
  background-color: lightblue;
  color: black;
  border-radius: 0 40px 40px 0;
}


.actions {
  display: flex;
}

.action-btn {
  border: none;
  background: none;
  padding: 10px 20px;
  cursor: pointer;
}

.primary {
  background-color: lightblue;
  color: black;
  border-radius: 0 40px 40px 0;
}

.question-input, .action-btn {
  height: 48px;
}

.question-input:focus, .action-btn:focus,
.question-input:active, .action-btn:active {
  outline: none;
}

@media (max-width: 768px) {
  .question-container {
    flex-direction: column;
    max-width: 100%;
    border-radius: 30px;
  }

  .question-input {
    border-radius: 30px 30px 0 0;
  }

  .primary {
    border-radius: 0 0 30px 30px;
  }
}
</style>
  
<template>
  <div class="discussion-page">
    <div class="question">
      <h1 class="question-title">{{ question.title }}</h1>
      <div v-if="question.content || question.imageUrl">
        <p class="question-content" v-if="question.content">{{ question.content }}</p>
        <img :src="question.imageUrl" alt="Uploaded image" v-if="question.imageUrl">
      </div>
      <div v-else>
        <textarea v-model="editableContent" placeholder="Provide more information on the question..." class="content-textarea"></textarea>

        <label for="image-upload" class="image-upload-label">Upload Image:</label>
        <input type="file" id="image-upload" @change="handleImageUpload">

        <button @click="saveContent" class="save-content-button">Save Content</button>
      </div>
    </div>

    <div class="add-answer">
      <textarea v-model="newAnswer" placeholder="Add your answer here..."></textarea>
      <button @click="submitAnswer">Submit Answer</button>
    </div>

    <div class="answers">
      <h2>Answers</h2>
      <div class="answer" v-for="answer in question.answers" :key="answer.id">
        <p>{{ answer.text }}</p>
        <div class="comments">
          <div class="comment" v-for="comment in answer.comments" :key="comment.id">
            <p>{{ comment.text }}</p>
          </div>
          <div class="add-comment">
            <textarea v-model="newComments[answer.id]" placeholder="Add a comment..."></textarea>
            <button @click="submitComment(answer.id)">Submit Comment</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const editableContent = ref('');
    const question = ref({
      title: route.params.questionTitle || 'Default Question Title',
      content: '',
      imageUrl: '',
      answers: [],
    });
    const newAnswer = ref('');
    const newComments = ref({});

    const handleImageUpload = event => {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = e => {
          question.value.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload an image file.');
      }
    };

    const saveContent = () => {
      question.value.content = editableContent.value;
    };

    const submitAnswer = () => {
      if (newAnswer.value.trim()) {
        const newId = question.value.answers.length + 1;
        question.value.answers.push({
          id: newId,
          text: newAnswer.value,
          comments: [],
        });
        newAnswer.value = '';
      } else {
        alert('Please enter an answer.');
      }
    };

    const submitComment = answerId => {
      const commentText = newComments.value[answerId];
      if (commentText && commentText.trim()) {
        const answerIndex = question.value.answers.findIndex(a => a.id === answerId);
        if (answerIndex !== -1) {
          question.value.answers[answerIndex].comments.push({
            id: question.value.answers[answerIndex].comments.length + 1,
            text: commentText,
          });
          newComments.value[answerId] = '';
        }
      } else {
        alert('Please enter a comment.');
      }
    };

    return {
      question,
      editableContent,
      newAnswer,
      newComments,
      saveContent,
      handleImageUpload,
      submitAnswer,
      submitComment,
    };
  },
};
</script>

<style scoped>
.discussion-page {
  margin: 2rem auto;
  padding: 1rem;
  max-width: 800px;
}

.question-title, .answers h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.question-content, .answer p, .comment p {
  margin-bottom: 2rem;
  word-wrap: break-word;
}

.answers, .answer, .comments, .add-comment {
  margin-top: 1rem;
}

.answer, .comment {
  background-color: #f0f0f0;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.add-comment {
  max-width: 100%;
}

.add-comment textarea {
  width: 100%;
  max-width: 100%;
  margin-bottom: 0.5rem;
  height: 100px;
}

.add-comment button {
  display: block;
  width: auto;
  padding: 8px 16px;
}

.add-answer {
  margin-top: 20px;
}

.add-answer textarea,
.add-comment textarea {
  width: 100%;
  margin-bottom: 0.5rem;
  min-height: 100px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-answer button,
.add-comment button {
  display: block;
  width: auto;
  padding: 8px 16px;
  margin-bottom: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-answer button:hover,
.add-comment button:hover {
  background-color: #45a049;
}

.content-textarea {
  width: 100%;
  height: 200px;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.image-upload-label {
  display: block;
  margin-bottom: 0.5rem;
}

.save-content-button {
  display: inline-block;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.save-content-button:hover {
  background-color: #45a049;
}
</style>

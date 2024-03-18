<template>
  <div class="discussion-page">
    <div class="title-and-subject">
      <textarea class="question-title" readonly>{{ question.title }}</textarea>
      <select v-model="selectedSubject" class="subject-selector">
        <option disabled value="">Select subject</option>
        <option v-for="subject in subjects" :key="subject" :value="subject">{{ subject }}</option>
      </select>
    </div>

    <div v-if="question.content || question.imageUrl">
      <p class="question-content">{{ question.content }}</p>
      <img v-if="question.imageUrl" :src="question.imageUrl" alt="Uploaded image" class="uploaded-image">
    </div>
    <div v-else class="question-details">
      <textarea v-model="editableContent" class="content-textarea" placeholder="Provide more information on the question..."></textarea>
      <div class="image-upload-section">
        <label for="image-upload" class="image-upload-label">Upload Image:</label>
        <input id="image-upload" type="file" @change="handleImageUpload" class="image-upload">
      </div>
      <button @click="saveContent" class="save-content-button">Save Content</button>
    </div>

    <div class="add-answer-section">
      <textarea class="answer-textarea" v-model="newAnswer" placeholder="Add your answer here..."></textarea>
      <button class="submit-answer-btn" @click="submitAnswer">Submit Answer</button>
    </div>

    <div class="answers">
      <h2>Answers</h2>
      <div class="answer" v-for="answer in question.answers" :key="answer.id">
        <p class="answer text-wrap">{{ answer.text }}</p>
        <div class="comments">
          <div class="comment" v-for="comment in answer.comments" :key="comment.id">
            <p class="comment text-wrap">{{ comment.text }}</p>
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
    const subjects = ['Math', 'Programming', 'Science'];
    const selectedSubject = ref(subjects[0]);
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
      subjects,
      selectedSubject,
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

.title-and-subject {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.question-title {
  flex-grow: 1;
  margin-top: 10px;
  background: none;
  border: none;
  font-size: 2rem;
  text-align: center;
  resize: none;
}

.subject-selector {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.question-details {
  margin-bottom: 1rem;
}

.content-textarea {
  width: 100%;
  min-height: 150px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.image-upload-section {
  margin-bottom: 1rem;
}

.image-upload {
  border: 1px solid #ccc;
  display: block;
}

.save-content-button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-content-button:hover {
  background-color: #45a049;
}

.answer-textarea {
  width: 100%;
  min-height: 200px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.submit-answer-btn {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-answer-btn:hover {
  background-color: #45a049;
}

.answers {
  margin-top: 1rem;
}

.answer {
  background-color: #f0f0f0;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.comments {
  margin-top: 1rem;
  padding-left: 1rem;
}

.comment {
  background-color: #e8e8e8;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 4px;
}

.add-comment {
  margin-top: 1rem;
}

.add-comment textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  min-height: 80px;
}

.add-comment button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-comment button:hover {
  background-color: #45a049;
}

.text-wrap {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

</style>

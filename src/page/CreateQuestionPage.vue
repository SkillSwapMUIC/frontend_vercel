<template>
  <div class="create-question-page">
    <div class="title-and-subject">
      <textarea v-model="question.title" class="question-title-input" placeholder="Question Title"></textarea>
      <select v-model="selectedSubject" class="subject-selector">
        <option disabled value="">Select subject</option>
        <option v-for="subject in subjects" :key="subject" :value="subject">{{ subject }}</option>
      </select>
    </div>

    <div class="question-details">
      <textarea v-model="editableContent" class="content-textarea" placeholder="Provide more information on the question..."></textarea>
      <label for="image-upload" class="image-upload-label">Upload Image:</label>
      <input id="image-upload" type="file" @change="handleImageUpload" class="image-upload">

      <button @click="saveContent" class="save-content-button">Save Content</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const subjects = ['Math', 'Programming', 'Science'];
    const selectedSubject = ref('');
    const editableContent = ref('');
    const question = ref({
      title: route.params.questionTitle || '',
      content: '',
      imageUrl: '',
    });

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          question.value.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload an image file.');
      }
    };

    const saveContent = () => {
      question.value.content = editableContent.value;
      router.push({
        name: 'Discussion',
        params: {
          questionTitle: question.value.title,
          questionContent: question.value.content,
          questionSubject: selectedSubject.value,
          questionImage: question.value.imageUrl,
        },
      });
    };

    return {
      subjects,
      selectedSubject,
      question,
      editableContent,
      handleImageUpload,
      saveContent,
    };
  },
};
</script>

<style scoped>
.create-question-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.title-and-subject {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
}

.question-title-input {
  width: 100%;
  padding: 1rem;
  font-size: 2rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

.subject-selector {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

.question-details {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.content-textarea {
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

.image-upload-label {
  margin-bottom: 0.5rem;
}

.image-upload {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

.save-content-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: auto;
  margin-top: 2rem;
}

.save-content-button:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .subject-selector {
    width: 100%;
}

.image-upload {
width: 100%;
  }
}
</style>
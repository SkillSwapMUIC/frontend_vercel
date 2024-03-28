<template>
  <div class="create-question-page">
    <div class="title-and-subject">
      <textarea v-model="question.title" class="question-title-input" placeholder="Enter Question Title"></textarea>
      <select v-model="selectedSubject" class="subject-selector">
        <option disabled value="">Select Subject</option>
        <option v-for="subject in subjects" :key="subject" :value="subject">{{ subject }}</option>
      </select>
    </div>

    <div class="question-details">
      <textarea v-model="editableContent" class="content-textarea" placeholder="Provide more information on the question..."></textarea>
      <div class="image-upload-container">
        <label for="image-upload" class="image-upload-label">
          <span>Upload Image</span>
          <input id="image-upload" type="file" @change="handleImageUpload" class="image-upload">
        </label>
        <div v-if="question.imageUrl" class="image-preview">
          <img :src="question.imageUrl" alt="Uploaded Image" />
        </div>
      </div>

      <button @click="saveContent" class="save-content-button">Save Content</button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const title = ref(route.params.questionTitle || '');
    const content = ref('');
    const subject = ref('');
    const imageUrl = ref('');
    const isLoading = ref(false);
    const errorMessage = ref('');

    const subjects = ref(['Math', 'Programming', 'Science']);

    watch(() => route.params.questionTitle, (newTitle) => {
      title.value = newTitle;
    });

    // const handleImageUpload = async (event) => {
    //   const file = event.target.files[0];
    //   if (file && file.type.startsWith('image/')) {
    //     try {
    //       const formData = new FormData();
    //       formData.append('image', file);
    //       const response = await axios.post('/api/uploadImage', formData, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       });
    //       imageUrl.value = response.data.imageUrl;
    //     } catch (error) {
    //       console.error('Image upload failed:', error);
    //       alert('Failed to upload image. Please try again.');
    //     }
    //   } else {
    //     alert('Please upload an image file.');
    //   }
    // };

    const saveContent = async () => {
      isLoading.value = true;
      try {
        const response = await axios.post('/qanda/question/submit', {
          title: title.value,
          content: content.value,
          subject: subject.value,
          //imageUrl: imageUrl.value,
        });
        isLoading.value = false;
        router.push({ name: 'Discussion', params: { questionId: response.data.id }});
      } catch (error) {
        isLoading.value = false;
        console.error('Failed to save the question:', error);
        errorMessage.value = 'Failed to save the question. Please try again.';
      }
    };

    return {
      title,
      content,
      subjects,
      imageUrl,
      //handleImageUpload,
      saveContent,
      isLoading,
      errorMessage,
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
  border: 1px solid #ccc; /* Add border line */
  background-color: #f7f7f7; /* Light shade color */
  padding: 20px; /* Add padding */
}

.title-and-subject {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%; /* Adjusted width */
  margin-bottom: 2rem;
}

.question-title-input {
  width: 100%;
  padding: 1rem;
  font-size: 2rem;
  margin-bottom: 1rem;
  border: none; /* Remove border */
  border-radius: 8px;
  resize: vertical;
}

.subject-selector {
  padding: 10px;
  border: none; /* Remove border */
  border-radius: 8px;
  width: 100%; /* Adjusted width */
}

.question-details {
  display: flex;
  flex-direction: column;
  width: 80%; /* Adjusted width */
  align-items: center;
}

.content-textarea {
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: none; /* Remove border */
  border-radius: 8px;
  resize: vertical;
}

.image-upload-label {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 1rem;
  border: 2px dashed #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.image-upload-label:hover {
  border-color: #4CAF50;
}

.image-upload {
  display: none;
}

.image-preview {
  margin-top: 1rem;
  text-align: center;
}

.image-preview img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
}

.save-content-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: auto;
  margin-top: 2rem;
  transition: background-color 0.3s ease;
}

.save-content-button:hover {
  background-color: #45a049;
}
</style>

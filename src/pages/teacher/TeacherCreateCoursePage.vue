<template>
  <div class="create-course-page">
    <div class="title-and-category">
      <textarea v-model="courseTitle" class="course-title-input" placeholder="Enter Course Title"></textarea>

      <select v-model="selectedCategory" class="category-selector">
        <option disabled value="">Select Category</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>

    <div class="course-details">
      <textarea v-model="courseDescription" class="content-textarea" placeholder="Provide more information on the course..."></textarea>

      <div class="image-upload-container">
        <label for="image-upload" class="image-upload-label">
          <span>Upload Image</span>
          <input id="image-upload" type="file" @change="handleImageUpload" class="image-upload">
        </label>
        <div v-if="courseImage" class="image-preview">
          <img :src="courseImage" alt="Uploaded Course Image" />
        </div>
      </div>

      <button @click="saveCourse" class="save-content-button">Save Course</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    const categories = ['Math', 'Programming', 'Science'];
    const selectedCategory = ref('');
    const courseTitle = ref('');
    const courseDescription = ref('');
    const courseImage = ref('');
    const isLoading = ref(false);
    const errorMessage = ref('');

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          courseImage.value = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload an image file.');
      }
    };

    const saveCourse = () => {
      if (!selectedCategory.value || !courseTitle.value.trim()) {
        alert('Please fill in all the required fields.');
        return;
      }
      isLoading.value = true;
      axios.post('/api/course/manage', {
        title: courseTitle.value,
        description: courseDescription.value,
        category: selectedCategory.value,
        imageUrl: courseImage.value,
      })
          .then(response => {
            isLoading.value = false;
            router.push({ name: 'TeacherDashboard' });
          })
          .catch(error => {
            isLoading.value = false;
            console.error('There was an error saving the course:', error);
            errorMessage.value = 'Failed to save the course. Please try again.';
          });
    };

    return {
      categories,
      selectedCategory,
      courseTitle,
      courseDescription,
      courseImage,
      handleImageUpload,
      saveCourse,
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

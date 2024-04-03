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
.create-course-page {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
}

.title-and-category {
  text-align: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.course-title-input {
  font-size: 20px; 
  margin-bottom: 10px;
  color: #333;
  width: calc(100% - 40px);
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
}

.category-selector {
  font-size: 16px; 
  margin-bottom: 10px;
  color: #666;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: calc(100% - 40px);
}

.course-details {
  margin-top: 20px;
}

.content-textarea {
  font-size: 14px; 
  line-height: 1.6;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: calc(100% - 40px);
  min-height: 200px;
  resize: vertical;
  margin-top: 20px;
}

.image-upload-container {
  margin-top: 20px;
  text-align: center;
}

.image-upload-label {
  display: inline-block;
  cursor: pointer;
  padding: 12px 20px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.image-upload {
  display: none;
}

.image-preview {
  margin-top: 20px;
  text-align: center;
}

.image-preview img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
}

.save-content-button {
  font-size: 14px;
  padding: 12px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: auto;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.save-content-button:hover {
  background-color: #45a049;
}
</style>

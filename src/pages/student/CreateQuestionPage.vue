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

      <button @click="toggleLatexEditor" class="latex-toggle-button">Add LaTeX formula to your question</button>

      <div v-if="showLatexEditor" class="latex-editor">
        <textarea v-model="latexContent" class="latex-textarea" placeholder="Enter LaTeX content here..."></textarea>
<!--        <div class="latex-preview" v-html="latexPreview"></div>-->
        <div class="latex-preview">
          {{latexPreview}}
        </div>
      </div>

      <div class="image-url-field">
        <label for="image-url-input" class="image-url-label">If you want, you can share a link to a picture</label>
        <input type="text" id="image-url-input" v-model="question.imageUrl" class="image-url-input" placeholder="Paste image URL here">
        <button @click="showImagePreview" class="preview-button">Upload</button>
      </div>
    </div>

    <div v-if="showPreview" class="image-preview">
      <img :src="question.imageUrl" alt="Image Preview">
    </div>

      <button @click="saveContent" class="save-content-button">Save Content</button>
    </div>

</template>

<script>
import {onMounted, ref, watch, nextTick} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios'
import routes from "../../utils/routes_config.js";
import {store} from "../../utils/store.js";
import DOMPurify from 'dompurify';
import { wrapLatexContent } from '../../utils/latexWrapper.js';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const subjects =ref( ['Math', 'Programming']);  // just some default values
    const selectedSubject = ref('');
    const editableContent = ref('');
    const isLoading = ref(false);
    const errorMessage = ref('');
    const showLatexEditor = ref(false);
    const latexContent = ref('');
    const latexPreview = ref('');
    const question = ref({
      title: '',
      content: '',
      imageUrl: '',
    });

    const questionPageSetup = () => {
      const queryTitle = route.query.question_title;

      axios.get(routes("get_all_subjects"))
          .then(response => {
            console.log(response.data)
            if (response.data.length > 0) subjects.value = response.data;

          })
      if (queryTitle) {
        question.value.title = queryTitle;
      }
    };

    onMounted(questionPageSetup);

    const saveContent = () => {
      if (!selectedSubject.value || !question.value.title.trim()) {
        alert('Please fill in all the fields.');
        return;
      }

      isLoading.value = true;
      axios.post(routes("submit_question"), {
        title: question.value.title,
        content: editableContent.value,
        latex_content: latexContent.value,
        subject: selectedSubject.value,
        image_url: question.value.imageUrl,
        auth_token: store.auth_token
      })
          .then(response => {
            isLoading.value = false;
            let question_id = response.data.id;
            console.log(response.data)

            router.push({
              name: 'Discussion',
              params: { question_id },
            });
          })
          .catch(error => {
            isLoading.value = false;
            console.error('There was an error saving the question:', error);
            errorMessage.value = 'Failed to save the question. Please try again.';
          });
    }

    const toggleLatexEditor = () => {
      showLatexEditor.value = !showLatexEditor.value;
    };

    const renderLatex = () => {
      const isAlreadyWrapped = latexContent.value.trim().startsWith('$$');
      const contentToRender = isAlreadyWrapped ? latexContent.value : `$$${latexContent.value}$$`;
      latexPreview.value = DOMPurify.sanitize(contentToRender);
      nextTick(() => {
        if (window.MathJax) {
          window.MathJax.typesetPromise()
              .then(() => console.log('LaTeX rendered successfully.'))
              .catch(err => console.error('MathJax typesetPromise failed:', err));
        }
      });
    };

    watch(latexContent, renderLatex);

    onMounted(() => {
      if (window.MathJax) {
        window.MathJax.typesetPromise();
      } else {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
        script.async = true;
        document.head.appendChild(script);
        script.onload = () => {
          window.MathJax.typesetPromise();
        };
      }
    });

    return {
      subjects,
      selectedSubject,
      question,
      editableContent,
      saveContent,
      isLoading,
      errorMessage,
      showLatexEditor,
      latexContent,
      latexPreview,
      toggleLatexEditor,
      renderLatex,
    };

  },
  data() {
    return {
      imageUrl: '', // Variable to store the image URL
      showPreview: false // Variable to toggle image preview section
    };
  },
  methods: {
    showImagePreview() {
      // Function to toggle image preview section
      this.showPreview = true;
    }
  }


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

.image-url-field {
  padding-top: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.image-url-label {
  margin-right: 1rem;
}

.image-url-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.preview-button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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

.latex-toggle-button,
.render-latex-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.latex-toggle-button:hover,
.render-latex-button:hover {
  background-color: #45a049;
}

.latex-editor {
  margin-top: 1rem;
}

.latex-textarea {
  width: 100%;
  min-height: 100px;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

.latex-preview {
  padding: 1rem;
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 4px;
}

</style>
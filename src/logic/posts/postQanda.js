import axios from "axios";
import routes from "../../utils/routes_config.js";

const submitAnswer = (question, newAnswer, loading, errorMessage) => {
    loading.value = true;
    axios.post('/api/answers', {
        questionId: route.params.id,
        text: newAnswer.value,
    })
        .then(response => {
            question.value.answers.push(response.data);
            newAnswer.value = '';
        })
        .catch(error => {
            console.error('Error submitting answer:', error);
            errorMessage.value = 'Failed to submit answer.';
        })
        .finally(() => {
            loading.value = false;
        });
};

const fetchQuestionDetails = (loading, errorMessage, question, route) => {
    let question_id = route.params.question_id;
    // const questionId = route.params.id;
    loading.value = true;
    errorMessage.value = '';

    axios.get(  routes("get_thread_by_id") + question_id)
        .then(response => {
            console.log(response.data)
            question.value.title = response.data.title
            question.value.content = response.data.content
            question.value.subject = response.data.subject
        })
        .catch(error => {
            console.error('Error fetching question details:', error);
            errorMessage.value = 'Failed to load question details.';
        })
        .finally(() => {
            loading.value = false;
        });
};


const submitComment = (answerId, loading, newComments, question, errorMessage) => {
    loading.value = true;
    axios.post('/api/comments', {
        answerId: answerId,
        text: newComments.value[answerId],
    })
        .then(response => {
            const answer = question.value.answers.find(a => a.id === answerId);
            if (answer) {
                answer.comments.push(response.data);
                newComments.value[answerId] = '';
            }
        })
        .catch(error => {
            console.error('Error submitting comment:', error);
            errorMessage.value = 'Failed to submit comment.';
        })
        .finally(() => {
            loading.value = false;
        });
};


const submit_question = (selectedSubject, question, isLoading, editableContent, router, errorMessage) => {
    if (!selectedSubject.value || !question.value.title.trim()) {
        alert('Please fill in all the fields.');
        return;
    }
    isLoading.value = true;
    axios.post(routes("submit_question"), {
        title: question.value.title,
        content: editableContent.value,
        tags: [selectedSubject.value],
        imageUrl: "MockImage",
        user_id: "MockID"
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
};
export { submitAnswer, fetchQuestionDetails , submitComment, submit_question};
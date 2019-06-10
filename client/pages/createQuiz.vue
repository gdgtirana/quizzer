<template>
  <div class="c-q">
    <div class="big-container">
      <div class="cq-bg"></div>
      <header>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <a class="text-logo">
                <img src="../static/img/startStack.svg" alt="">
              </a>
            </div>
          </div>
        </div>
      </header>
     <stepsComponent/>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import secondMenuComponent from '~/components/secondMenu'
  import stepsComponent from '~/components/steps'

  export default {
    async fetch ({store , params}) {
      try {
        const { data } = await axios.get(`https://startstack.co.uk/quizzer/api/v1/quizzes/${params.id}`);
        if (data.quiz) {
          const quiz = {
            quizName: data.quiz.quizName ? data.quiz.quizName : '',
            topics: data.quiz.topics,
            subtopics: data.quiz.subtopics,
            // question: data.quiz.question ? data.quiz.question : '',
            // correctAnswer: data.quiz.correctAnswer ? data.quiz.correctAnswer : '',
            // secondAnswer: data.quiz.secondAnswer ? data.quiz.secondAnswer : '',
            // thirdAnswer: data.quiz.thirdAnswer ? data.quiz.thirdAnswer : '',
            // fourthAnswer: data.quiz.fourthAnswer ? data.quiz.fourthAnswer : '',
            // difficulty: data.quiz.difficulty ? data.quiz.difficulty : '',
            questions: data.quiz.questions
          }
          return store.commit('setQuiz', quiz)
        }
      } catch (error) {
        console.log(error)
      }
    },
    components: {
      secondMenuComponent,
      stepsComponent
    }
  }
</script>

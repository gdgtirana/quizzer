<template>
  <div class="slide" :id="`slide${slide._id}`">
    <div class="qa">
      <div class="options desktop">
        <ul>
          <li v-for="(choice, index) in slide.answers" :key="`choice-${index}-${slide._id}`">
            <input type="radio"
                   name="option"
                   :value="choice"
                   :id="`option-${index + 1}-${slide._id}`"
                   v-model="selectYourAnswer"
            >
            <label :for="`option-${index + 1}-${slide._id}`"></label>
            <span>{{choice | capitalize}}</span>
          </li>
          <div class="clearfix"></div>
        </ul>
        <div class="clearfix"></div>
        <div class="submit" v-if="currentSlide === totalQuestions">
          <button class="finish btn-quiz" @click="finishQuiz">
            <svg width="200" height="62">
              <defs>
                <linearGradient id="grad2">
                  <stop offset="0%" stop-color="#EF296F"/>
                  <stop offset="100%" stop-color="#FCA336"/>
                </linearGradient>
              </defs>
              <rect x="5" y="5" rx="25" fill="none" stroke="url(#grad2)" width="190" height="50"></rect>
            </svg>
            <span>submit</span>
          </button>
        </div>
        <div class="next" v-if="currentSlide < totalQuestions">
          <button class="btn-quiz" @click="nextQuestion">
            <svg width="200" height="62">
              <defs>
                <linearGradient id="grad1">
                  <stop offset="0%" stop-color="#EF296F"/>
                  <stop offset="100%" stop-color="#FCA336"/>
                </linearGradient>
              </defs>
              <rect x="5" y="5" rx="25" fill="none" stroke="url(#grad1)" width="190" height="50"></rect>
            </svg>
            <span>next</span>
          </button>
        </div>
      </div>
      <div class="options mobile-option">
        <ul>
          <li v-for="(choice, index) in slide.answers" :key="index">
            <input type="radio"
                   name="option"
                   :value="choice"
                   :id="`option-${index + 5}-${slide._id}`"
                   v-model="selectedChoice"
            >
            <label :for="`option-${index + 5}-${slide._id}`" @click="selectAnswer">
              <span>{{choice | capitalize}}</span>
            </label>
          </li>
          <div class="clearfix"></div>
        </ul>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import quizService from '../services/quizServices'
  import quizMock from '@/mocks/quizzes'
  export default {
    props: ['slide', 'totalQuestions', 'currentSlide'],

    filters: {
      capitalize(value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },

    data() {
      return {
        windowWidth: 0,
        windowHeight: 0,
        selectYourAnswer: '',
        selectedChoice: '',
        quizMock
      }
    },

    mounted() {
      window.addEventListener('resize', this.getWindowWidth)
      window.addEventListener('resize', this.getWindowHeight)
      this.getWindowWidth()
      this.getWindowHeight()
    },

    methods: {
      selectAnswer() {
        if (this.windowWidth < 769) {
          if (this.currentSlide === this.totalQuestions) {
            $('.button-option-mobile .submit button').fadeIn("slow")
          } else {
            $('.button-option-mobile .next button').fadeIn("slow")
          }
        }
      },

      finishQuiz() {
        this.postYourAnswers()
        this.$emit('finishQuiz')
      },

      nextQuestion() {
        const isCorrect = this.slide.correct_answer === this.selectedChoice
        this.$emit('nextQuestion', isCorrect)
      },

      getWindowWidth() {
        this.windowWidth = document.documentElement.clientWidth
      },

      getWindowHeight() {
        this.windowHeight = document.documentElement.clientHeight
      },

      postYourAnswers () {
        const body = {
          questions: [
            {
              quiz_id: this.$route.params.id,
              question_id: this.slide._id,
              answer: {
                choices: [this.selectYourAnswer]
              }
            }
          ]
        }
        quizService.postAllAnswers(body).then((res) => {
        }).catch ((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

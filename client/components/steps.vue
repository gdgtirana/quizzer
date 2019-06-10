<template>
  <div>
    <div class="container">
      <section class="step1">
        <div class="top-section">
          <h1 class="step-title" @click="stepTitle">Step 1</h1>
        </div>
        <p>Enter name of your quiz</p>
        <label>name of quiz</label>
        <input type="text" name="name" v-model="quiz.quizName" @blur="patchAQuiz('quizName')">
        <span class="error" v-show="$v.quiz.quizName.$error">Please provide a name</span>
        <button class="next-step" @click="nextStep">next step</button>
      </section>

      <section class="step2">
        <div class="top-section">
          <h1 class="step-title" @click="stepTitle">Step 2</h1>
        </div>
        <p>Enter topic or subtopic of your quiz.</p>
        <label>topic</label>
        <input type="text" name="topic" class="tags-input" id="topic" v-model="quiz.topic" @blur="patchAQuiz('topic')">
        <span class="error" v-show="$v.quiz.topic.$error">Please provide a topic</span>
        <label>subtopic</label>
        <input type="text" name="subtopic" class="tags-input" id="subtopic" v-model="quiz.subtopic" @blur="patchAQuiz('subtopic')">
        <span class="error-subtopic" v-show="$v.quiz.subtopic.$error">Please provide a subtopic</span>
        <button class="next-step" @click="nextStep">next step</button>
      </section>

      <section class="step3">
        <div class="top-section">
          <h1 class="step-title" @click="stepTitle">Step 3</h1>
        </div>
        <p>Enter topic or subtopic of your quiz.</p>
        <div class="row" >
          <div class="col-md-12">
            <label>Question</label>
            <input type="text" v-model="quiz.question" @blur="$v.quiz.question.$touch">
            <span class="error-question" v-show="$v.quiz.question.$error">Field is required</span>
          </div>
          <div class="col-md-3">
            <label>Correct Answer</label>
            <input type="text" id="correct-answer" v-model="quiz.correctAnswer" @blur="$v.quiz.correctAnswer.$touch">
            <span class="error-correct-answer" v-show="$v.quiz.correctAnswer.$error">Field is required</span>
          </div>
          <div class="col-md-3">
            <label>Answer 2</label>
            <input type="text" v-model="quiz.secondAnswer" @blur="$v.quiz.secondAnswer.$touch">
            <span class="error-correct-answer" v-show="$v.quiz.secondAnswer.$error">Field is required</span>
          </div>
          <div class="col-md-3">
            <label>Answer 3</label>
            <input type="text" v-model="quiz.thirdAnswer" @blur="$v.quiz.thirdAnswer.$touch">
            <span class="error-correct-answer" v-show="$v.quiz.thirdAnswer.$error">Field is required</span>
          </div>
          <div class="col-md-3">
            <label>Answer 4</label>
            <input type="text" v-model="quiz.fourthAnswer" @blur="$v.quiz.fourthAnswer.$touch">
            <span class="error-correct-answer" v-show="$v.quiz.fourthAnswer.$error">Field is required</span>
          </div>
          <div class="col-md-3">
            <label>Difficulty</label>
            <input type="text" v-model="quiz.difficulty" @blur="$v.quiz.difficulty.$touch">
            <span class="error-difficulty" v-show="$v.quiz.difficulty.$error">Field is required</span>
          </div>
        </div>
        <div class="add-button" v-if="buttons.length < 10">
          <button @click="postAnswers(-1)">+</button>
          <!--<button>+</button>-->
        </div>
        <div class="all-buttons">
          <div class="buttons-container" v-for="(item, index) in buttons" :key="index">
            <div class="buttons-holder">
              <button @click="postAnswers(item)" :class="activeButton === item ? 'active-button-holder' : ''">{{item}}</button>
            </div>
          </div>
        </div>

        <button style="max-width: 200px" @click="publishRedirect">I'm done, publish me!</button>
      </section>

      <section class="step4">
        <div class="top-section">
          <h1 class="step-title" @click="stepTitle">Step 4</h1>
        </div>
        <button class="publish" @click="nextStep">publish</button>
      </section>
    </div>
  </div>
</template>
<script>
  import quizService from '../services/quizServices'
  import { required } from 'vuelidate/lib/validators'
  import { mapMutations } from 'vuex'

  export default {
    data() {
      return {
        slide: [],
        bg: 0,
        width1: 0,
        questionNr: 0,
        move: 5000,
        moveTop: 1500,
        number: 2,
        number1: 1,
        values: [],
        question: 45,
        title: '',
        titlePrev: '',
        windowWidth: 0,
        windowHeight: 0,
        quiz: {
          quizName: '',
          topic: '',
          subtopic: '',
          question: '',
          correctAnswer: '',
          secondAnswer: '',
          thirdAnswer: '',
          fourthAnswer: '',
          difficulty: ''
        },
        active: '',
        questions: [],
        buttons: [1],
        activeButton: 1,
        quiz_id: '',
        slider: []
      }
    },
    validations: {
      quiz: {
        quizName: {
          required
        },
        topic: {
          required
        },
        subtopic: {
          required
        },
        question: {
          required
        },
        correctAnswer: {
          required
        },
        secondAnswer: {
          required
        },
        thirdAnswer: {
          required
        },
        fourthAnswer: {
          required
        },
        difficulty: {
          required
        }
      }
    },
    mounted () {
      window.addEventListener('resize', this.getWindowWidth)
      window.addEventListener('resize', this. getWindowHeight)
      this.getWindowWidth()
      this.getWindowHeight()
      this.slide = document.getElementsByClassName('slide')
      this.bg = document.getElementById('inner-bg')
      this.width1 = document.documentElement.clientWidth
      this.questionNr = document.getElementById('current-question-number')
      this.width = this.width1
      this.quiz.quizName = this.savedQuiz.quizName
      if (this.savedQuiz.topics.length !== 0) {
        this.quiz.topic = this.savedQuiz.topics[0]
      }

      if (this.savedQuiz.subtopics.length !== 0) {
        this.quiz.subtopic = this.savedQuiz.subtopics[0]
      }

      if (this.windowWidth < 769) {
        this.move = 2500
        this.question = 30
        if (this.windowWidth < 420) {
          this.move = 1500
          this.question = 25
        }
      }
      this.reloadPage()

    },

    computed: {
      savedQuiz () {
        return this.$store.getters.quiz
      },
      storedQuestion () {
        const question = this.$store.getters.questions.filter(question => question.number === this.activeButton)
        if (question.length !== 0) return question[0];
        else return {}
      },
      createdQuiz () {
        return this.$store.getters.quizById
      }
    },
    methods: {
      ...mapMutations(['setQuestion']),
      nextStep () {
        let empty = $(this).siblings("input").filter(function() {
          return this.value === "";
        })
        if(empty.length) {
          toastr["warning"]("Please fill all the fields.", "Field is required!!!", {
            "closeButton": true,
            "positionClass": "toast-top-right"
          });
        }else {
          $(this).parent('section').toggleClass('height', 'display');
          $(this).parent('section').next('section').addClass('display');

          TweenLite.to('.cq-bg', 2, {y: -moveTop, ease: SlowMo.ease.config(1, 0.1, false)});
        }
      },

      getWindowWidth() {
        this.windowWidth = document.documentElement.clientWidth
      },

      getWindowHeight() {
        this.windowHeight = document.documentElement.clientHeight
      },

      stepTitle () {
        $(this).parent().parent().removeClass('height')
      },

      async patchAQuiz (field) {
        this.$v.quiz[field].$touch()
        const body = {}
        if (this.quiz.quizName !== '') {
          body.quiz_name = this.quiz.quizName
        }
        if (this.quiz.topic !== '') {
          body.topics = [this.quiz.topic]
        }
        if (this.quiz.subtopic !== '') {
          body.subtopics = [this.quiz.subtopic]
        }
        if (this.quiz.difficulty !== '') {
          body.difficulty = this.quiz.difficulty
        }
        // const body = {
        //   quiz_name: this.quiz.quizName,
        //   topics: [this.quiz.topic],
        //   subtopics: [this.quiz.subtopic],
        //   difficulty: this.quiz.difficulty !== '' ? this.quiz.difficulty : 1
        // }
        if (Object.keys(body).length !== 0) {
          try {
            await quizService.patchQuiz(body, this.$route.params.id)
          } catch (e) {}
        }
      },

      async postAnswers (index = -1) {
        try {
          // const body = {
          //   questions: [
          //     {
          //       quiz_id: this.$route.params.id,
          //       question: this.quiz.question,
          //       correct_answer: this.quiz.correctAnswer,
          //       answers : [this.quiz.correctAnswer,this.quiz.secondAnswer,this.quiz.thirdAnswer,this.quiz.fourthAnswer]
          //     }
          //   ]
          // }
          // await quizService.postAnswer(body)
          if (index === -1) {
            this.buttons.push(this.buttons.length + 1);
            this.getObject(this.buttons.length);
          } else {
            this.getObject(index);
          }
        } catch (e) {
          if(e.response.data.error === 'This question already exists in this quiz') {
            alert(e.response.data.error)
          }
        }
      },

      getObject(index) {
        if (this.activeButton === index) return;
        const question = {
          question: this.quiz.question,
          correctAnswer: this.quiz.correctAnswer,
          secondAnswer: this.quiz.secondAnswer,
          thirdAnswer: this.quiz.thirdAnswer,
          fourthAnswer: this.quiz.fourthAnswer,
          difficulty: this.quiz.difficulty
        }
        this.setQuestion({
          question,
          number: this.activeButton
        });
        this.activeButton = index;
        if (Object.keys(this.storedQuestion).length !== 0) {
          this.quiz = {...this.storedQuestion}
        } else {
          this.quiz = {
            name: '',
            topic: '',
            subtopic: '',
            question: '',
            correctAnswer: '',
            secondAnswer: '',
            thirdAnswer: '',
            fourthAnswer: '',
            difficulty: ''
          }
        }
        this.$v.quiz.$reset();
      },

      async publishRedirect () {
        const body = {
          questions: [
            {
              quiz_id: this.$route.params.id,
              question: this.quiz.question,
              correct_answer: this.quiz.correctAnswer,
              answers : [this.quiz.correctAnswer,this.quiz.secondAnswer,this.quiz.thirdAnswer,this.quiz.fourthAnswer]
            }
          ]
        }
        try {
          // await quizService.publish(body)
          this.$router.push({ name: "quiz"});
        } catch (error) {
          console.log(error)
        }
      },

      reloadPage () {
        if(location.search.indexOf('reloaded=yes') < 0){
          let hash = window.location.hash
          let loc = window.location.href.replace(hash, '')
          loc += (loc.indexOf('?') < 0? '?' : '&') + 'reloaded=yes'
          setTimeout(() => {
            window.location.href = loc + hash
          }, 100)
        }
      }
    }
  }
</script>

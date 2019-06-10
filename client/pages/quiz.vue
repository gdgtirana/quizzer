<template>
  <div class="quiz">
    <header>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <nav>
              <ul class="menu">
                <li><a href="#">Home</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
    <secondMenuComponent></secondMenuComponent>
    <overlay-component></overlay-component>
    <div class="questionnaire">
      <div id="q-cont">
        <div class="bg">
          <div class="bg-inner" id="inner-bg"></div>
        </div>
        <div class="question-number">Question<div>
          <p id="current-question-number">
            1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>
          </p>
        </div>/{{quizMock.length}}
          <!--/{{questions.length}}-->
        </div>
        <div class="title">
          <!--<h1 v-for="(q, index) in questions" :key="q._id" :id="`question-${index + 1}`" :class="`h1_${index + 1}`">{{q.question}}</h1>-->
          <h1 v-for="(q, index) in quizMock" :key="q._id" :id="`question-${index + 1}`" :class="`h1_${index + 1}`">{{q.question}}</h1>
        </div>
        <div class="slides">
          <!--<slides-component-->
            <!--v-for="(question, index) in questions"-->
            <!--:key="question._id"-->
            <!--:slide="question"-->
            <!--:currentSlide="index + 1"-->
            <!--:totalQuestions="questions.length"-->
            <!--@nextQuestion="nextQuestion"-->
            <!--@finishQuiz="finishQuiz"-->
          <!--/>-->
          <slides-component
            v-for="(question, index) in quizMock"
            :key="question._id"
            :slide="question"
            :currentSlide="index + 1"
            :totalQuestions="questions.length"
            @nextQuestion="nextQuestion"
            @finishQuiz="finishQuiz"
          />
        </div>
        <div class="button-option-mobile">
          <div class="next">
            <button @click="nextQuestion"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
          </div>
          <div class="submit">
            <button class="finish" ref="submitButton" @click="finishQuiz">
              <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div id="wrap-popup" @click="removePopUp">
          <div class="background-container"></div>
          <div id="popup">
            <h1>Your answers are submited!!</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">

  import axios from 'axios'
  import overlayComponent from '~/components/header'
  import secondMenuComponent from '~/components/secondMenu'
  import slidesComponent from '~/components/slides'
  import quizMock from '@/mocks/quizzes'

  export default {
    async asyncData({params}) {
      const {data} = await axios.get(`https://startstack.co.uk/quizzer/api/v1/quizzes/${params.id}`)
      // const quiz = {
      //   name: data.quiz.name ? data.quiz.name : '',
      //   topics: data.quiz.topics,
      //   subtopics: data.quiz.subtopics,
      //   question: data.quiz.question ? data.quiz.question : '',
      //   correctAnswer: data.quiz.correctAnswer ? data.quiz.correctAnswer : '',
      //   secondAnswer: data.quiz.secondAnswer ? data.quiz.secondAnswer : '',
      //   thirdAnswer: data.quiz.thirdAnswer ? data.quiz.thirdAnswer : '',
      //   fourthAnswer: data.quiz.fourthAnswer ? data.quiz.fourthAnswer : '',
      //   difficulty: data.quiz.difficulty ? data.quiz.difficulty : '',
      //   questions: data.quiz.questions
      // }
      return {
        questions: data.quiz.questions
      }
    },

    components: {
      overlayComponent,
      secondMenuComponent,
      slidesComponent
    },

    data () {
      return {
        quizMock,
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
        windowHeight: 0
      }
    },

    methods: {
      getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min
      },
      breakGlass(from, speed) {
        if (from === "reverse") {
          $('.piece').each(function () {
            TweenLite.to($(this), speed, {x: 0, y: 0, rotationX: 0, rotationY: 0, opacity: 1, z: 0})
            TweenLite.to($('#popup h1'), 0.2, {opacity: 1, delay: speed})
          })
          return
        }

        if (!from) {
          TweenLite.to($('#popup h1'), 0.2, {opacity: 0})
        } else {
          TweenLite.from($('#popup h1'), 0.5, {opacity: 0, delay: speed})
        }
        const vue = this
        $('.piece').each(function () {
          var distX = vue.getRandomArbitrary(-250, 250),
            distY = vue.getRandomArbitrary(-250, 250),
            rotY = vue.getRandomArbitrary(-720, 720),
            rotX = vue.getRandomArbitrary(-720, 720),
            z = vue.getRandomArbitrary(-500, 500);

          if (!from) {
            TweenLite.to($(this), speed, {
              x: distX,
              y: distY,
              rotationX: rotX,
              rotationY: rotY,
              opacity: 0,
              z: z
            })
          } else {
            TweenLite.from($(this), speed, {
              x: distX,
              y: distY,
              rotationX: rotX,
              rotationY: rotY,
              opacity: 0,
              z: z
            })
          }
        })
      },
      nextQuestion () {
        if (this.windowWidth < 769) {
          if ($('input[type=radio]').is(':checked')) {
            const val = $('input[type=radio]:checked').val()
            let titlePrev = document.getElementById(`question-${this.number1}`)
            let title = document.getElementById(`question-${this.number}`)
            const vue = this

            Array.prototype.forEach.call(this.slide, () => {
              TweenLite.to(vue.bg, 1, {x: -vue.move, ease: Sine.easeOut, delay: 0.5})
              TweenLite.to(vue.slide, 1, {x: -vue.width, ease: Sine.easeOut})
              TweenLite.to(titlePrev, 1, {opacity: 0})
              TweenLite.to(title, 1, {opacity: 1, delay: 1})
              TweenLite.to(vue.questionNr, 1, {y: -vue.question})
            })

            $('.button-option-mobile .next button').fadeOut('fast')

            setTimeout(function () {
              $('input[type=radio]:checked').prop('checked', false)
            }, 700)

            this.values.push(val)

            this.move = this.move + 500

            this.width += this.width1

            this.number += 1

            this.number1 += 1

            if (this.windowWidth < 769 && this.windowWidth > 420) {
              this.question += 30
            }

            if (this.windowWidth < 420) {
              this.question += 24
            }

          } else {
            this.$toastr.error('Please select the correct answer!!!",<br/> "Answer is required!!!', 'Error')
          }
        } else {
          if ($('input[type=radio]').is(':checked')) {
            const val = $('input[type=radio]:checked').val()
            let titlePrev = document.getElementById(`question-${this.number1}`)
            let title = document.getElementById(`question-${this.number}`)
            const vue = this

            Array.prototype.forEach.call(this.slide, () => {
              TweenLite.to(vue.bg, 2, {x: -vue.move, ease: SlowMo.ease.config(1, 0.1, false)})
              TweenLite.to(vue.slide, 1, {x: -vue.width, delay: 0.5})
              TweenLite.to(titlePrev, 1, {opacity: 0})
              TweenLite.to(title, 1, {opacity: 1, delay: 1})
              TweenLite.to(vue.questionNr, 1, {y: -vue.question})

            })

            $('.slide .next button').fadeOut("fast")

            setTimeout(() => {
              $('input[type=radio]:checked').prop('checked', false)
              if (this.number1 === 5) {
                $('.slide .submit button').fadeIn("fast")
              } else {
                $('.slide .next button').fadeIn("fast")
              }
            }, 1500)

            this.values.push(val)

            this.move += 1700

            this.width += this.width1

            this.number += 1

            this.number1 += 1

            this.question += 45
          } else {
            this.$toastr.error('Please select the correct answer!!!",<br/> "Answer is required!!!', 'Error')
          }
        }
      },
      finishQuiz () {
        $('#wrap-popup').fadeIn('fast')
        this.breakGlass('reverse', speed)

        let pieces = 70,
            speed = 1,
            pieceW = 30,
            pieceH = 35;

        for (let i = pieces - 1; i >= 0; i--) {
          $('#popup').prepend('<div class="piece" style="width:' + pieceW + 'px; height:' + pieceH + 'px"></div>')
        }

        this.breakGlass(true, speed)
      },
      getWindowWidth() {
        this.windowWidth = document.documentElement.clientWidth
      },
      getWindowHeight() {
        this.windowHeight = document.documentElement.clientHeight
      },
      removePopUp() {
        $('#wrap-popup').fadeOut('fast')
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
      if (this.windowWidth < 769) {
        this.move = 2500
        this.question = 30

        if (this.windowWidth < 420) {
          this.move = 1500
          this.question = 25
        }
      }
    }
  }
</script>


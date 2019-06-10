<template>
  <div>
    <!--<header-component></header-component>-->
    <second-menu-component></second-menu-component>
    <overlay-component></overlay-component>
    <section class="top-banner">
      <div class="col-md-12 banner">
        <div class="overlay"></div>
        <video autoplay muted loop id="myVideo">
          <source src="img/video.webm" type="video/mp4">
          Your browser does not support HTML5 video.
        </video>
        <h1>QUIZZER</h1>
        <span class="scroll-btn">
				<a href="#who-are-we">
					<span class="mouse">
						<span>
						</span>
					</span>
				</a>
			</span>
      </div>
    </section>
    <div class="quizzer-container">
      <div class="quizzer-holder" v-for="(quiz, index) in allQuizzes" :key="quiz._id" v-show="index < 17">
        <div class="information-quizz-container">
          <div class="quizz-wrapper">
            <div class="quizz-name-holder">
              <h2>Name:</h2>
              <h3>{{quiz.quizName}}</h3>
            </div>
            <div class="quizz-name-holder">
              <h2>Topic:</h2>
              <h3>{{quiz.topics[0]}}</h3>
            </div>
            <div class="quizz-name-holder">
              <h2>Subtopic:</h2>
              <h3>{{quiz.subtopics[0]}}</h3>
            </div>
          </div>
          <div class="level-holder" v-if="quiz.difficulty">
            <h2>Level</h2>
            <div class="square-container">
              <div class="square-holder"
                   v-for="(level, index) in levels"
                   :key="`level-${index}`"
                   v-show="index < quiz.difficulty"
              >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="black-layer-holder"></div>
    </div>
    <!--<section class="who-are-we" id="who-are-we">-->
      <!--<div class="container">-->
        <!--<div class="row">-->
          <!--<div class="col-md-6">-->
            <!--<h2>Who Are We?</h2>-->
            <!--<p>-->
              <!--Software Development TEAM <br>-->
              <!--Passionate about coding <br>-->
              <!--Highly effective <br>-->
              <!--Very Organized <br>-->
              <!--Scientific <br>-->
              <!--Creative-->
            <!--</p>-->
          <!--</div>-->
          <!--<div class="col-md-6">-->
            <!--<h2>How We Do it?</h2>-->
            <!--<p>-->
              <!--Developer Friendly Company – Latest Technology Stacks-->
              <!--<br><br>-->
              <!--Build from Ground Up – Preferably work with Startups – Growing with them-->
            <!--</p>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</section>-->
    <!--<section class="skills">-->
      <!--<div class="container">-->
        <!--<h1>Skills</h1>-->
        <!--<div class="row">-->
          <!--<input type="radio" id="mobile"-->
                 <!--name="skills"-->
                 <!--checked-->
                 <!--v-model="user.mobile"-->
          <!--/>-->
          <!--<label for="mobile">Mobile</label>-->
          <!--<input type="radio"-->
                 <!--id="backend"-->
                 <!--name="skills"-->
                 <!--v-model="user.backend"-->
          <!--/>-->
          <!--<label for="backend">Backend</label>-->
          <!--<input type="radio"-->
                 <!--id="frontend"-->
                 <!--name="skills"-->
                 <!--v-model="user.frontend"-->
          <!--/>-->
          <!--<label for="frontend">Frontend</label>-->
          <!--<input type="radio"-->
                 <!--id="devops"-->
                 <!--name="skills"-->
                 <!--v-model="user.devop"-->
          <!--/>-->
          <!--<label for="devops">Devops</label>-->
          <!--&lt;!&ndash; <div class="tile mobile">-->
              <!--Native-->
              <!--<img src="">-->
          <!--</div> &ndash;&gt;-->
          <!--<div class="tile mobile">-->
            <!--<p>Hybrid</p>-->
            <!--<img src="img/hybrid.png">-->
          <!--</div>-->
          <!--<div class="tile mobile">-->
            <!--<p>Cross-Platform</p>-->
            <!--<img src="img/cross-platform.png">-->
          <!--</div>-->
          <!--<div class="tile backend">-->
            <!--<p>NodeJs</p>-->
            <!--<img src="img/node.png">-->
          <!--</div>-->
          <!--<div class="tile backend">-->
            <!--<p>Serverless</p>-->
            <!--<img src="img/serverless.png">-->
          <!--</div>-->
          <!--<div class="tile backend">-->
            <!--<p>Go</p>-->
            <!--<img src="img/golang.png">-->
          <!--</div>-->
          <!--<div class="tile frontend">-->
            <!--<p>VueJs</p>-->
            <!--<img src="img/vue.png">-->
          <!--</div>-->
          <!--<div class="tile frontend">-->
            <!--<p>ReactJs</p>-->
            <!--<img src="img/react.png">-->
          <!--</div>-->
          <!--<div class="tile frontend">-->
            <!--<p>Angular</p>-->
            <!--<img src="img/angular.png">-->
          <!--</div>-->
          <!--<div class="tile devops">-->
            <!--<p>Docker</p>-->
            <!--<img src="img/docker.png">-->
          <!--</div>-->
          <!--<div class="tile devops">-->
            <!--<p>AWS</p>-->
            <!--<img src="img/aws.png">-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</section>-->
    <!--<section class="mission">-->
      <!--<div class="container">-->
        <!--<h2>Mission</h2>-->
        <!--<p>-->
          <!--Build World Class products-->
          <!--<br>-->
          <!--Work on Futuristic Products-->
        <!--</p>-->
      <!--</div>-->
    <!--</section>-->
    <!--<section class="address">-->
      <!--<div id="map" style="width:100%;height:400px"></div>-->
      <!--<div class="container">-->
        <!--<h1>Contact Us</h1>-->
        <!--<div class="row">-->
          <!--<div class="col-md-6">-->
            <!--<p>Feel free to contact us with questions, partnership proposals, media inquiries, or just to say“hi.” </p>-->
            <!--<p><span>OUR ADDRESS</span><br>-->
              <!--<i class="fa fa-map-marker" aria-hidden="true"></i>135 Sherringham Avenue,N17 9RU,LONDON-->
            <!--</p>-->
            <!--<p><span>SOMETHING URGENT?</span><br>-->
              <!--Call us any time Monday to Friday and we’ll help out!<br>-->
              <!--<i class="fa fa-mobile" aria-hidden="true"></i>00447446176459-->
            <!--</p>-->
          <!--</div>-->
          <!--<div class="col-md-6">-->
            <!--<form>-->
              <!--<label>Your Name</label>-->
              <!--<input type="text" name="name">-->
              <!--<label>Your Email</label>-->
              <!--<input type="email" name="email">-->
              <!--<label>Subject</label>-->
              <!--<input type="text" name="subject">-->
              <!--<label>Your Message</label>-->
              <!--<textarea></textarea>-->
              <!--<button>Send</button>-->
            <!--</form>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</section>-->
    <footer-component></footer-component>
  </div>
</template>
<script type="text/babel">
  import footerComponent from '~/components/footer'
  import headerComponent from '~/components/header'
  import overlayComponent from '~/components/header'
  import secondMenuComponent from '~/components/secondMenu'
  import quizService from '../services/quizServices'

  export  default  {
    components: {
      footerComponent,
      headerComponent,
      overlayComponent,
      secondMenuComponent
    },

    async fetch ({store}) {
      const {data} = await quizService.getQuizzes()
      return store.commit('setQuizzes', data.quizzes)
    },

    data () {
      return {
        user: {
          mobile: '',
          backend: '',
          frontend: '',
          devop: ''
        },
        levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    },

    computed: {
      allQuizzes () {
        return this.$store.getters.quizzes
      }
    }
  }
</script>

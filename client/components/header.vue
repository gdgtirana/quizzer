<template>
  <div>
    <header>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <!--<a href="#"><img class="logo" src="/img/logo.png"></a>-->
            <img src="../static/img/startStack.svg" alt="">
            <nav>
              <ul class="menu">
                <li><a href="#">Home</a></li>
                <li><a @click="postId" class="create-quiz">Create Quiz</a></li>
                <!--<button @click="postId">Create Quiz</button>-->
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
 import axios from 'axios'

  export default {
    methods : {
      postId () {
        axios.post('https://startstack.co.uk/quizzer/api/v1/quizzes').then((response) => {
          this.$store.commit('setQuizId', response.data.quiz._id)
          this.$router.push({name: 'createQuiz', params: {id: response.data.quiz._id}})
        }).catch ((error) => {
          console.log(error)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    .row {
      .col-md-12 {
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
          width: 120px;
        }
      }
    }
  }
</style>

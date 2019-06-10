<template>
  <div>
    <div class="overlay" id="overlay" @click="activeMenu">
      <nav class="overlay-menu">
        <ul>
          <li>
            <nuxt-link :to="{name: 'index'}">Home</nuxt-link>
            <!--<a href="#">Home</a>-->
          </li>
          <!--<li><a href="#">About</a></li>-->
          <!--<li><a href="#">Work</a></li>-->
          <!--<li><a href="#">Create Quiz</a></li>-->
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      activeMenu () {
        $('#overlay').toggleClass('open')
      }
    }
  }
</script>

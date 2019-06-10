<template>
  <div>
    <div id="menu2" @click="activeMenu">
      <div class="trigger">
        <div class="line2 first top"></div>
        <div class="line2 second middle"></div>
        <div class="line2 bottom"></div>
      </div>
    </div>
    <!--<overlay-component></overlay-component>-->
    <div class="overlay" id="overlay" @click="activeMenu">
      <nav class="overlay-menu">
        <ul>
          <li>
            <nuxt-link :to="{name: 'index'}">Home</nuxt-link>
            <!--<a href="#">Home</a>-->
          </li>
          <!--<li><a href="#">About</a></li>-->
          <!--<li><a href="#">Work</a></li>-->
          <!--<li><a href="#">Contact</a></li>-->
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
  import overlayComponent from '../components/overlay-menu'
  export default {
    components: {
      overlayComponent
    },
    methods: {
      activeMenu () {
        $(this).toggleClass('active')
        $('.line2 .middle').toggleClass('hide')
        $('#overlay').toggleClass('open')
      }
    }
  }

</script>

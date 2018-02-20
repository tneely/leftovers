<template>
  <div id="app">
    <transition name="search">
      <div v-show="showSearch" id="search-page">
        <div id="title">
          <h2>Find recipes for your</h2>
          <h1>Leftovers</h1>
        </div>
        <search/>
        <suggestions/>
        <ingredients-list/>
        <div id="by">by <a href="https://www.tneely.com">Taylor Neely</a></div>
      </div>
    </transition>

    <transition name="results">
      <div v-show="showResults" id="results-page">
        <results/>
      </div>
    </transition>
  </div>
</template>

<script>
import search from "./components/search";
import suggestions from "./components/suggestions";
import ingredientsList from "./components/ingredients-list";
import results from "./components/results";

export default {
  name: "app",
  components: {
    search,
    suggestions,
    ingredientsList,
    results
  },
  created() {
    eventHub.$on("toggle-results", this.toggleResults);
  },
  data() {
    return {
      showResults: false
    };
  },
  computed: {
    showSearch() {
      return !this.showResults;
    }
  },
  methods: {
    toggleResults(state) {
      this.showResults = state;
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
/* Make iOS rounded edges go away */
textarea,
input[type="text"],
input[type="search"],
input[type="button"],
input[type="submit"] {
  -webkit-appearance: none;
  border-radius: 0;
}

/* Everything else */
html {
  font-size: 10px;
}
#app > div {
  max-width: 640px;
  width: 100%;
}
@media (min-width: 320px) {
  /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */
  html {
    font-size: 12px;
  }
}
@media (min-width: 480px) {
  /* smartphones, Android phones, landscape iPhone */
  html {
    font-size: 12px;
  }
}
@media (min-width: 600px) {
  /* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */
  html {
    font-size: 14px;
  }
}
@media (min-width: 801px) {
  /* tablet, landscape iPad, lo-res laptops ands desktops */
  html {
    font-size: 16px;
  }
}
@media (min-width: 1025px) {
  /* big landscape tablets, laptops, and desktops */
  html {
    font-size: 16px;
  }
}
@media (min-width: 1281px) {
  /* hi-res laptops and desktops */
  html {
    font-size: 18px;
  }
  #app > div {
    max-width: 800px;
  }
}

#app {
  align-items: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 1rem;
}
#title {
  font-family: "Fira Sans", sans-serif;
  font-size: 2rem;
  text-align: center;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}
#title h1 {
  font-weight: 700;
}
#title h2 {
  font-weight: 500;
}
#title h1,
h2 {
  margin: 1rem 0 0 0;
}
#by {
  color: whitesmoke;
  margin: 2em 0 1em 0;
  text-align: center;
}
#by a {
  color: gainsboro;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
}
a {
  color: #2c3e50;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
#search-page,
#results-page {
  position: absolute;
}
.search-enter-active {
  transition: all 0.3s ease;
}
.search-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.search-enter,
.search-leave-to {
  transform: translateX(-800px);
  opacity: 0;
}
.results-enter-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.results-leave-active {
  transition: all 0.3s ease;
}
.results-enter,
.results-leave-to {
  transform: translateX(800px);
  opacity: 0;
}
</style>

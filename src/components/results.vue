<template>
  <div id="results">
    <div id="back" @click="goBack" title="Back"></div>
    <h1>Results</h1>
    <div v-if="loading" id="loading" title="Loading..."></div>
    <div v-if="!loading && (results.length ==0)" id="no-results">
      <p>No results found.</p>
      <br>
      <p>Search looks for an exact match on all ingredients. 
        Try removing unlikely ingredient combinations. 
        Soft-matching is in the works.
      </p>
    </div>
    <div class="recipe" v-for="(result,index) in results" :key="index">
      <img :src="result.picture" class="picture"/>
      <a :href="result.link" class="name" target="_blank">
        {{result.name}}
      </a>
      <div class="description">
        {{result.description}}
      </div>
      <a :href="result.link" class="link" target="_blank" title="View full recipe on website"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "results",
  created() {
    eventHub.$on("search", this.getResults);
  },
  data() {
    return {
      results: [],
      loading: false
    };
  },
  methods: {
    getResults(searchItems) {
      this.loading = true;
      let recipeQuery = db.collection("recipes");
      searchItems.forEach(item => {
        recipeQuery = recipeQuery.where(`ingredients.${item}`, "==", true);
      });
      recipeQuery
        .limit(50)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.results.push(doc.data());
          });
          this.loading = false;
        });
    },
    goBack() {
      this.results = [];
      eventHub.$emit("toggle-results", false);
    }
  }
};
</script>

<style>
#results {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}
#results > h1 {
  border-bottom: 2px solid gainsboro;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  text-align: center;
  width: 100%;
}
#no-results {
  text-align: center;
}
.recipe {
  background-color: whitesmoke;
  display: grid;
  grid-gap: 0.25rem 1rem;
  grid-template-areas:
    "picture name name"
    "picture description link";
  grid-template-columns: 8rem 1fr 2rem;
  grid-template-rows: 2rem 6rem;
  margin: 0 0.5rem 1rem 0.5rem;
  padding: 0.5rem;
  width: 100%;
}
.picture {
  border-radius: 3px;
  grid-area: picture;
  height: 100%;
  width: 100%;
}
.name {
  font-size: 1.5rem;
  grid-area: name;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.description {
  font-size: 1.1rem;
  grid-area: description;
  overflow-y: auto;
}
.link {
  align-self: center;
  background: transparent;
  border-top: 0.75rem solid #2c3e50;
  border-right: 0.75rem solid #2c3e50;
  border-radius: 3px;
  box-shadow: 0 0 0 gainsboro;
  grid-area: link;
  height: 3rem;
  left: -1.5rem;
  position: relative;
  transform: rotate(45deg);
  transition: all 0.25s ease;
  width: 3rem;
}
.link:hover {
  border-color: gainsboro;
  box-shadow: 0.5rem -0.5rem 0 #2c3e50;
}
#back {
  background: transparent;
  border-top: 1.25rem solid #2c3e50;
  border-right: 1.25rem solid #2c3e50;
  border-radius: 3px;
  box-shadow: 0 0 0 gainsboro;
  height: 2.5rem;
  left: 2rem;
  position: absolute;
  top: 2rem;
  transform: translate3d(0, -50%, 0) rotate(-135deg);
  transition: all 0.25s ease;
  width: 2.5rem;
}
#back:hover {
  border-color: gainsboro;
  box-shadow: 0.5rem -0.5rem 0 #2c3e50;
}
#loading {
  animation: spin 2s linear infinite;
  border: 16px solid whitesmoke;
  border-top: 16px solid gainsboro;
  border-radius: 50%;
  height: 120px;
  margin-top: 10rem;
  width: 120px;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

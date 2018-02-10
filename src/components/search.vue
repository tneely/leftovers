<template>
  <div id="search">
    <input 
      type="search" 
      v-model="searchItem" 
      @keyup.enter="raiseEnter" 
      @keydown.up="raiseUp" 
      @keydown.down="raiseDown" 
      placeholder="Ingredients"
    />
  </div>
</template>

<script>
export default {
  name: "search",
  created() {
    eventHub.$on("selected", this.clearInput);
  },
  data() {
    return {
      searchItem: ""
    };
  },
  watch: {
    searchItem(val) {
      eventHub.$emit("search-change", val);
    }
  },
  methods: {
    raiseEnter() {
      eventHub.$emit("enter");
    },
    raiseUp() {
      eventHub.$emit("suggestion-nav", -1);
    },
    raiseDown() {
      eventHub.$emit("suggestion-nav", 1);
    },
    clearInput() {
      this.searchItem = "";
    }
  }
};
</script>

<style>
#search {
  text-align: center;
}
#search input {
  border: none;
  border-bottom: 2px solid whitesmoke;
  color: #2c3e50;
  font-size: 2.5rem;
  padding: 10px 10px 10px 5px;
  transition: border-bottom-color 0.25s;
  width: 100%;
}
#search input:focus {
  border-bottom-color: gainsboro;
  outline: none;
}
</style>

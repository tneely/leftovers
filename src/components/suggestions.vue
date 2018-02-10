<template>
  <transition name="height">
    <div v-if="show" id="suggestions">
      <ul>
        <li 
          v-for="(item,index) in suggestions" 
          :key="index" 
          :class="{focus: index===focusIndex}"
          @click="selectItem"
          @mouseover="focusIndex=index"
        >
          {{item}}
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  name: "suggestions",
  created() {
    eventHub.$on("search-change", this.updateSearch);
    eventHub.$on("suggestion-nav", this.changeFocus);
    eventHub.$on("enter", this.selectItem);
    db
      .collection("ingredients")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.ingredients.push(doc.id);
        });
      });
  },
  data() {
    return {
      searchItem: "",
      ingredients: [],
      focusIndex: 0
    };
  },
  computed: {
    show() {
      return this.suggestions.length > 0;
    },
    suggestions() {
      if (this.searchItem.length === 0) {
        return [];
      }
      return this.ingredients.filter(item =>
        item.toLowerCase().startsWith(this.searchItem.toLowerCase())
      );
    }
  },
  methods: {
    updateSearch(searchVal) {
      this.searchItem = searchVal.trim();
    },
    selectItem() {
      if (this.suggestions.length === 0) {
        return;
      }
      eventHub.$emit("selected", this.suggestions[this.focusIndex]);
      this.focusIndex = 0;
    },
    changeFocus(direction) {
      this.focusIndex = Math.min(
        Math.max(0, this.focusIndex + direction),
        this.suggestions.length - 1
      );
    }
  }
};
</script>

<style>
#suggestions {
  background-color: whitesmoke;
  font-size: 1.5rem;
  max-height: 300px;
  overflow-x: hidden;
  overflow-y: auto;
}
#suggestions ul {
  display: flex;
  flex-direction: column;
}
#suggestions li {
  cursor: pointer;
  padding: 5px 10px;
  text-align: left;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}
#suggestions .focus {
  background-color: gainsboro;
}
.height-enter-active,
.height-leave-active {
  transition: max-height 0.25s;
}
.height-enter,
.height-leave-to {
  max-height: 0 !important;
}
</style>

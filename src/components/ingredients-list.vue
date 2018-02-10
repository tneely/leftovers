<template>
  <div id="ingredients-list">
    <button id="search-button" :disabled="disabled" @click="search">
      Search
    </button>
    <ul :class="{active: !disabled}">
      <li v-for="(itemName,index) in itemList" :key="index"> 
          <p>{{itemName}}</p>
            <i @click="removeItem(index)" class="delete fa fa-times"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ingredients-list",
  created() {
    eventHub.$on("selected", this.addItem);
  },
  data() {
    return {
      itemList: []
    };
  },
  computed: {
    disabled() {
      return this.itemList.length === 0;
    }
  },
  methods: {
    addItem(itemName) {
      itemName = itemName.trim();
      if (itemName.length > 0) {
        this.itemList.push(itemName);
      }
    },
    removeItem(index) {
      this.itemList.splice(index, 1);
    },
    search() {
      eventHub.$emit("search", this.itemList);
      eventHub.$emit("toggle-results", true);
    }
  }
};
</script>

<style>
#ingredients-list {
  font-size: 1.75rem;
  text-align: center;
}
#ingredients-list ul {
  border-top: 2px solid whitesmoke;
  transition: border-top-color 0.25s;
}
#ingredients-list ul.active {
  border-top-color: gainsboro;
}
#ingredients-list li {
  display: flex;
  justify-content: space-between;
  padding: 0 10px 10px 10px;
}
.delete {
  color: #2c3e50;
  cursor: pointer;
}
#search-button {
  color: inherit;
  background-color: transparent;
  border: 1px solid #2c3e50;
  border-radius: 4px;
  box-shadow: 2px 2px #2c3e50;
  cursor: pointer;
  margin: 2rem;
  padding: 5px 50px;
  font-size: 1.75rem;
  transition: all 0.25s;
}
#search-button:hover {
  background-color: gainsboro;
}
#search-button:disabled {
  color: #4f4f4f;
  cursor: default;
  background-color: whitesmoke;
  box-shadow: 0 0 transparent;
}
</style>

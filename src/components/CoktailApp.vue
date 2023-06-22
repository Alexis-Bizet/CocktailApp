<template>
  <div>
    <button @click="fetchCocktails">Une autre envie ?</button>
        <div class="cocktail-container" v-if="cocktails.length">
            <div v-for="cocktail in cocktails" :key="cocktail.idDrink" class="cocktail-content">
                <h3>{{ cocktail.strDrink }}</h3>
                    <img :src="cocktail.strDrinkThumb" :alt="cocktail.strDrink" />
                        <ul class='list-ingredients'>
                            <li v-for="(ingredient, index) in cocktail.ingredients" :key="index">
                                {{ ingredient.ingredient }} - {{ ingredient.measure }}
                            </li>
                        </ul>
            </div>
        </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cocktails: []
    };
  },
  mounted() {
    this.fetchCocktails();
  },
  methods: {
    fetchCocktails() {
      this.cocktails = []; 
      for (let i = 0; i < 3; i++) {
        axios
          .get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
          .then(response => {
            const drink = response.data.drinks[0];
            console.log(drink)
            const ingredients = [];
            console.log(ingredients)
            for (let j = 1; j <= 15; j++) {
              const ingredient = drink[`strIngredient${j}`];
              const measure = drink[`strMeasure${j}`];

              if (ingredient) {
                ingredients.push({
                  ingredient,
                  measure
                });
              }
            }

            this.cocktails.push({
              ...drink,
              ingredients
            });
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }
};
</script>


<style scoped>

.cocktail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-left: 40px
}

.cocktail-content {
  display: flex;
  align-items: center;
  margin-top: 100px;
}

h3 {
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: 2rem;
    margin-right: 60px;
    width: 200px;    
}


.list-ingredients{
    list-style-type: none;
    padding: 0;
    width: 300px;
    overflow-y :auto;
}

.list-ingredients::-webkit-scrollbar-track {
  border: 1px solid #000;
  padding: 2px 0;
  background-color: #000000;
}

.list-ingredients::-webkit-scrollbar {
  width: 10px;
  scrollbar-width: thin;
}

.list-ingredients::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #2c3e50;
  border: 1px solid #000;
}

li{
    margin: 1rem;
    font-weight: bold;
}

img{
    width: 300px;
    height: 300px;
    border-radius: 50px;
}

button{
    background-color: #2c3e50;
    color: white;
    font-weight: bold;
    border: 3px solid rgb(248, 244, 244);
    display: flex;
    margin : 0 auto;
    padding-top:10px;
    padding-bottom:10px;
    border-radius: 8px;
    cursor: pointer
}
</style>

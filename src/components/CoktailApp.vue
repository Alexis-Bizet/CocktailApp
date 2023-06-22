<template>
  <div>
    <button @click="fetchCocktails">Une autre envie ?</button>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
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
      cocktails: [],
       errorMessage: ""
    };
  },
  mounted() {
    this.fetchCocktails();
     this.errorMessage = ""; 
  },
  methods: {
    fetchCocktails() {
      this.cocktails = []; 
      for (let i = 0; i < 3; i++) {
        axios
          .get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
          .then(response => {
            const drink = response.data.drinks[0];
            const ingredients = [];
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
            this.errorMessage = "Une erreur s'est produite lors de la récupération des cocktails.";
          });
      }
    }
  }
};
</script>


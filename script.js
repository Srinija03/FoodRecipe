const search=document.querySelector('form');
const searchDiv=document.querySelector('.search');
const container=document.querySelector('.container');
let searchQuery="";
const id='494c0da7';
const key='074819040f39c6e55a4e38e1a4c31bb3';


search.addEventListener('submit',(e)=>{
    e.preventDefault();
    searchQuery=e.target.querySelector('input').value;
    fetchRecipe();
})

async function fetchRecipe(){
    const url=`https://api.edamam.com/search?q=${searchQuery}&app_id=${id}&app_key=${key}&to=80`;

    const response= await fetch(url);
    const data= await response.json();
    generateHTML(data.hits);
    console.log(data)

}
function generateHTML(results)
{
    let generatedHTML='';
    results.map((result)=>{
        generatedHTML += `
        <div class="item">
                <img src="${result.recipe.image}" alt="">
                <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a class="view" href="${result.recipe.url}" target="_blank" >View recipe</a>
                    
               </div>
                <p class="data">Calories = ${result.recipe.calories.toFixed(2)}</p>
                <p class="data">Cuisine = ${result.recipe.cuisineType}</p>
                <p class="data">Carbs = ${result.recipe.digest[1].daily.toFixed(2)}gr</p>                               
           </div>
        `
    })
    searchDiv.innerHTML=generatedHTML;
}
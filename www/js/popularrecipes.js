
var dopopular = function() {
    clean_buttons();
    document.getElementById('popularrecipes').classList.add("selected");
    var workspace = document.getElementById("content");
    workspace.innerHTML = "";

    var btn = document.createElement("button");
    btn.innerHTML = "Get Popular Recipes!";

    btn.onclick = getRecipeInfo;

    workspace.appendChild(btn);
}

//Get recipe info from TheCocktailDB
function getRecipeInfo(){

    var url = "https://www.thecocktaildb.com/api/json/v2/"+ API_KEY + "/popular.php";
    xmlRequest(url,onRecipeSuccess,onRecipeFail);

} 

//Open connection to API
function xmlRequest(url, onSuccess, onFailure){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            onSuccess(JSON.parse(this.responseText));        
        }
        else if (this.readyState == 4){
            onFailure(this.status);
        }
    };

    request.open("GET", url, true);
    request.send();
}

//parse data for up to six cocktails
function onRecipeSuccess(data){
    resetRecipeContent();
    for(let i=0; i < 6; i++){
        var line1 = "Drink: " + data.drinks[i].strDrink;
        var line2 = "Ingredients: " + data.drinks[i].strMeasure1 + " " + data.drinks[0].strIngredient1 + ", " + data.drinks[0].strMeasure2 + " " + data.drinks[0].strIngredient2 + ", " + data.drinks[0].strMeasure3 + " " + data.drinks[0].strIngredient3 + ", " + data.drinks[0].strMeasure4 + " " + data.drinks[0].strIngredient4+ ", " + data.drinks[0].strMeasure5 + " " + data.drinks[0].strIngredient5;
        var line3 = "Instructions: " + data.drinks[i].strInstructions;
        var line4 = "Glass type: " + data.drinks[i].strGlass;

        var ele1 = document.createElement('p');
        var ele2 = document.createElement('p');
        var ele3 = document.createElement('p');
        var ele4 = document.createElement('p');
   
        ele1.innerHTML = line1;
        ele2.innerHTML = line2;
        ele3.innerHTML = line3;
        ele4.innerHTML = line4;

        addRecipeContent(ele1);
        addRecipeContent(ele2);
        addRecipeContent(ele3);
        addRecipeContent(ele4);
    }
}

function onRecipeFail(status){
    alert("Failed to get recipes on code " + toString(status));
}

function addRecipeContent(element){
    var r = document.getElementById("content");
    r.appendChild(element);
}

function resetRecipeContent(){
    var r = document.getElementById("content");
    r.innerHTML = "";
}


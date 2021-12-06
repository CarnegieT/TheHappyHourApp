//TheCoctailDB API Key
const API_KEY = 9973533;

var dorecipesearch = function() {
    clean_buttons();
    document.getElementById('recipesearch').classList.add("selected");
    var workspace = document.getElementById("content");
    workspace.innerHTML = "";

    var btn = document.createElement("button");
    var rinfo = document.createElement("div");
    var txtbox = document.createElement("input");
    txtbox.setAttribute("id","recipeq");
    txtbox.setAttribute("placeholder","Enter a Cocktail...");
    rinfo.setAttribute("id","recipedata");
    btn.innerHTML = "Go!";
    

    btn.onclick = getRecipeInfo;

    workspace.appendChild(txtbox);
    workspace.appendChild(btn);
    workspace.appendChild(rinfo);
}

//Get recipe info from TheCocktailDB
function getRecipeInfo(){
    var val = document.getElementById("recipeq").value;

    if(val === ""){ //Check for empty string, if empty provide error message
        var e = document.createElement('p');
		e.innerHTML = " Please enter a cocktail name!";
        return;
    }
    //call API
    else{
        var url = "https://www.thecocktaildb.com/api/json/v2/"+ API_KEY + "/search.php?s="+ val;
        xmlRequest(url,onRecipeSuccess,onRecipeFail);
    }
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



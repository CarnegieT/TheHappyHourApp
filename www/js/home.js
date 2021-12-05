var dohome = function(){

    clean_buttons();
    document.getElementById('home').classList.add("selected");
    var workspace = document.getElementById("content");
    workspace.innerHTML = "";

    var h1 = document.createElement('h1');
    var text = document.createTextNode("The Happy Hour");
    h1.appendChild(text);
    workspace.append(h1);

    var p1 = document.createElement('p1');
    var text = document.createTextNode("Because it's five o'clock somewhere...");
    p1.appendChild(text);
    workspace.append(p1);

    var h3 = document.createElement('h3');
    text = document.createTextNode("Trinity Carnegie : Z23432125");
    h3.appendChild(text);
    workspace.appendChild(h3);


}
var fullimatgecaixa = document.getElementById("fullimatgecaixa");
var fullImg = document.getElementById("fullImg");

function openFullImg(pic){
    fullimatgecaixa.style.display = "flex";
    fullImg.src = pic; // Changed from fullimatgedisplay.src to fullImg.src
}

function closeFullImg(){
    fullimatgecaixa.style.display = "none";
}
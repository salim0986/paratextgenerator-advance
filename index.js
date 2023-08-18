const input = document.querySelector("#num");
const paraContainer = document.querySelector(".paraContainer");
const submitBtn = document.querySelector(".submitBtn"); 
const _string = "abcdefghijklmnopqrstuvwxyz";
let notEmpty = false;

//Submit
submitBtn.addEventListener("click",()=>{
    let sentenceArr =[];
    for(let i =0; i<Number(input.value); ++i){
        let randWordArr =[];
        for(let i = 0; i<randomWordLength(); ++i){
            randWordArr.push(_string[randomCharacterGenerator()]);
        };
        let randomWord = randWordArr.join("");
        sentenceArr.push(randomWord);
    };
    let sentence= sentenceArr.join(" ");
    sentence = sentence[1].toUpperCase() + sentence.substring(1,(sentence.length-1));
    
    let newDiv = document.createElement("div");
    newDiv.className = "paraCover";
    newDiv.innerHTML =`
    <p>${sentence}</p>
    <div class="btnContainer" style="display:flex;gap:5px">
    <button class="delete">Delete</button>
    <button class="copy">Copy</button>
    </div>
    `;
    paraContainer.append(newDiv);
    input.value="";
    notEmpty = true;

    if(notEmpty){
    let delBtn = document.querySelectorAll('.delete');
    delBtn.forEach(elem => elem.addEventListener('click', deleteFunc));
}
    let copyBtn = document.querySelectorAll(".copy");
    copyBtn.forEach(elem=>elem.addEventListener("click",copyFunc));
});



function randomCharacterGenerator(){
    return Math.round((Math.random()*(_string.length-1)));
}
function randomWordLength(){
    return Math.floor((Math.random()*15)+1);
}
function deleteFunc(){
   this.parentElement.parentElement.remove();
}
function copyFunc(){
    //Getting text
    let text = this.parentElement.parentElement.children[0].innerText;

    //Copy text to clipboard
    navigator.clipboard.writeText(text);
    
    //Alert user
    this.innerText = "Copied!";
    this.style.backgroundColor = "grey";

    //Again show copy button
    this.addEventListener("mouseleave",()=>{
    this.innerText = "Copy";
    this.style.backgroundColor = "rgb(216, 76, 76)"
    });
}

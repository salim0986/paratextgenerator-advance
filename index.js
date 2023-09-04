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
    <textarea style ="display:none;margin:2rem 0; width="100%"></textarea>
    <div class="btnContainer" style="display:flex;gap:5px">
    <button class="done" style = "display:none">Done</button>
    <button class="edit">Edit</button>
    <button class="copy">Copy</button>
    <button class="delete">Delete</button>
    </div> 
    `;
    
    paraContainer.append(newDiv);
    input.value="";

    let delBtn = document.querySelectorAll('.delete');
    delBtn.forEach(elem => elem.addEventListener('click', deleteFunc));

    let copyBtn = document.querySelectorAll(".copy");
    copyBtn.forEach(elem => elem.addEventListener("click",copyFunc));
    
    let editBtn = document.querySelectorAll(".edit");
    editBtn.forEach(elem=>elem.addEventListener("click",editFunc));
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

function editFunc (){
    let para =this.parentElement.parentElement.children[0];
    let edit = this.parentElement.parentElement.children[1];
    let done = this.previousSibling.previousSibling;
    edit.value = para.innerText;
    done.style.display = "block";
    edit.style.display = "block";
    para.style.display = "none";

    done.addEventListener("click",()=>{
    para.innerText = edit.value;
    done.style.display = "none";
    edit.style.display = "none";
    para.style.display = "block";
    })

}

const proceedButton = document.querySelector("#proceed");
const comments = document.querySelectorAll(".comment")

if(proceedButton){
proceedButton.addEventListener("click",()=>{
    comments.forEach((ele)=>{
        console.log("dd")
        ele.style.border="3px blue dashed"
    })
})
}
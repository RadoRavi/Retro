
const container = document.querySelector(".timerCircle");
const proceedButton = document.querySelector("#proceed");
const comments = document.querySelectorAll(".comment")
function onMouseDrag({ movementX, movementY }) {
   console.log("ggggggggggggggggggg")
    let getContainerStyle = window.getComputedStyle(container);
    let leftValue = parseInt(getContainerStyle.left);
    let topValue = parseInt(getContainerStyle.top);
    container.style.left = `${leftValue + movementX}px`;
    container.style.top = `${topValue + movementY}px`;
}
document.addEventListener('readystatechange',()=>{
container?.addEventListener("mousedown", () => {
    

    container?.addEventListener("mousemove", onMouseDrag);
});

document?.addEventListener("mouseup", () => {
    container?.removeEventListener("mousemove", onMouseDrag);
});


proceedButton?.addEventListener("click",()=>{
    comments.forEach((ele)=>{
        ele.style.border="3px blue dashed"
    })
})
})

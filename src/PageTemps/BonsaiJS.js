
const container = document.querySelector(".timerCircle");
function onMouseDrag({ movementX, movementY }) {
    
    let getContainerStyle = window.getComputedStyle(container);
    let leftValue = parseInt(getContainerStyle.left);
    let topValue = parseInt(getContainerStyle.top);
    container.style.left = `${leftValue + movementX}px`;
    container.style.top = `${topValue + movementY}px`;
}
if(container){
container.addEventListener("mousedown", () => {
    container.addEventListener("mousemove", onMouseDrag);
});
document.addEventListener("mouseup", () => {
    container.removeEventListener("mousemove", onMouseDrag);
});
}
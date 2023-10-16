
const itemList=(text,vote) =>{
    return {"text":text?text:"",
    "vote":vote?vote:0}
}
const childs = [{
    "type":"wentwell",
    "list": [
      
    ]},
    {
    "type":"didntwentwell",
    "list": [
     
      
    ]},
    {
    "type":"improve",
    "list": [
      
      
    ]},
    {
    "type":"stop",
    "list": [
     
    ]
  }]


export default function setJsonSkeleton(id){
        const obj = {
          ids:id,
          wentWell:[
            {text:"",vote:0}
          ],
          didntWentWell:[
            {text:"",vote:0}
          ],
          Improve:[
            {text:"",vote:0}
          ],
          Stop:[
            {text:"",vote:0}
          ]
        }

        localStorage.setItem("responseData",obj)
}

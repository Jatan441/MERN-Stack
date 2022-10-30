const taskContainer = document.querySelector(".task_container");

var globalStore = [];

const generateNewCard = (taskData) =>
    `
    <div id= ${taskData.id} class="col-md-6 col-lg-4">
        <div class="card">
            <h5 class="card-header d-flex justify-content-end">
                <button type="button" class="btn btn-outline-success" ><i class="fa-solid fa-pen"></i></button>
                
                <button type="button"  class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fa-solid fa-trash" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>
            </h5>
            <img class="card-img-top p-2" src=${taskData.imageurl} alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title fw-bold text-primary"> ${taskData.taskTitle}</h5>
            <p class="card-text">${taskData.taskDesc}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </div>   `;


const loadInitialCardData =() =>{

    // localStorage to get tasky card data 
    const getCardData = localStorage.getItem("tasky");

    // convert the srting to normal object
    const {cards} = JSON.parse(getCardData);

    // loop over the array of task object to create HTML cards, inject it into the html
    cards.map( (cardObject) =>{
        taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));
        
    // update our globalstore
        globalStore.push(cardObject);
    });

}

const deleteCard = (event) =>{
     
    event = window.event;
    const targetId = event.target.id;
    const tagname = event.target.tagName;

    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetId);

    localStorage.setItem("tasky", JSON.stringify({cards:globalStore}))

    if(tagname === "BUTTON")
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    else
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
}


const saveChanges = () =>{
    const taskData = {
        id : `${Date.now()}`,
        imageurl : document.getElementById("taskUrl").value,
        taskTitle : document.getElementById("taskTitle").value,
        taskType: document.getElementById("taskType").value,
        taskDesc: document.getElementById("taskDescription").value
    };

    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));
    
    globalStore.push(taskData);

    localStorage.setItem( "tasky",JSON.stringify({cards: globalStore}));

}






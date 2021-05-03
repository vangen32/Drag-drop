import {Task, TaskList, TaskType} from "./model"
 
var isDropPosible : TaskType; //потрібно для збереження типу завдання

export class TaskViewCart{
    private task : Task;
    private cart : HTMLDivElement;
    private title : HTMLElement;
    private deadline : HTMLElement;
    private desc : HTMLElement;
    private type : HTMLElement;

    constructor(task : Task){
        this.cart = document.createElement("div");
        this.cart.draggable = true;
        this.title = document.createElement("p");
        this.deadline = document.createElement("p");
        this.desc = document.createElement("p");
        this.type = document.createElement("p");
        this.task = task;
        this.drawCart();
    }
    drawCart(){
        this.cart.style.width = "300px";
        this.cart.style.margin = "5px";
        this.cart.style.padding = "2px"
        this.cart.style.border = "2px solid black";
        this.cart.style.backgroundColor = "pink";
        this.title.innerText = this.task.Title;
        this.deadline.innerText = "To "+ this.task.Deadline.toDateString();
        this.desc.innerText = this.task.Desc;
        this.type.innerText = this.task.Type;
        this.cart.append(this.title, this.deadline, this.desc, this.type);
        this.onDrag();
    }

    get Type(){
        return this.task.Type;
    }
    set Type(TaskType : TaskType){
        this.task.changeType(TaskType);
    }
    get Cart(){
        return this.cart;
    }
    get CartId() : number {
        return this.task.TaskId;
    }

    onDrag(){
        this.cart.addEventListener("dragstart",  (event : DragEvent)=>{
            event.dataTransfer?.setData("number", this.CartId.toString());
            isDropPosible = this.task.Type;
            this.cart.style.backgroundColor = "blue";
        })
        this.cart.addEventListener("dragend",  (event : DragEvent)=>{
            event.dataTransfer?.setData("number", this.CartId.toString());
            this.cart.style.backgroundColor = "pink";
        })
    }
    
}

export class TaskViewCartList{
    private list : TaskViewCart[];

    private planedTaskCol : HTMLDivElement;
    private inProcesTaskCol : HTMLDivElement;
    private doneTaskCol : HTMLDivElement;

   
    constructor(){
        this.list = [];
        this.planedTaskCol = document.createElement("div");
        this.inProcesTaskCol = document.createElement("div");
        this.doneTaskCol = document.createElement("div");
        this.doneTaskCol.style.width = "400px";
        this.inProcesTaskCol.style.width = "400px";
        this.planedTaskCol.style.width = "400px";
        this.doneTaskCol.style.height = "100vh";
        this.inProcesTaskCol.style.height = "100vh%";
        this.planedTaskCol.style.height = "100vh%";
        document.getElementById("wrapper")?.append(this.planedTaskCol, this.inProcesTaskCol, this.doneTaskCol);
        this.dragOver();
    }
    
    addCart(cart : TaskViewCart){
        this.list.push(cart);
    }
    drawAll(){
        this.planedTaskCol.innerHTML ="<h2>Planned</h2>";
        this.inProcesTaskCol.innerHTML ="<h2>In Process</h2>";
        this.doneTaskCol.innerHTML ="<h2>Done</h2>";
        this.list.forEach(element => {
            switch(element.Type){
                case TaskType.Planed:
                    this.planedTaskCol.append(element.Cart);
                    break;
                case TaskType.InProgres:
                    this.inProcesTaskCol.append(element.Cart);
                    break;
                case TaskType.Done:
                    this.doneTaskCol.append(element.Cart);
                    break;
                default:
                    break;
            }
        });
    }

    changeType(id : number, type : TaskType) : void{
        let a = this.list.find(x=>x.CartId==id);
        (a as TaskViewCart).Type = type;
        a?.drawCart();
    }

    dragEnd(onDragOver : CallableFunction){
        this.planedTaskCol.addEventListener("drop", (event) =>{
            let a = event.dataTransfer?.getData("number");
            this.planedTaskCol.style.backgroundColor = "yellow";
            onDragOver(TaskType.Planed, a)
        });
        this.inProcesTaskCol.addEventListener("drop", (event) =>{ 
            let a = event.dataTransfer?.getData("number");
            this.inProcesTaskCol.style.backgroundColor = "yellow";
            onDragOver(TaskType.InProgres, a)
        });
        this.doneTaskCol.addEventListener("drop", (event) =>{ 
            let a = event.dataTransfer?.getData("number");
            this.doneTaskCol.style.backgroundColor = "yellow";
            onDragOver(TaskType.Done, a)
        });
    }

    dragOver(){
        this.planedTaskCol.addEventListener("dragover", (event) =>{
            if(isDropPosible==TaskType.Planed)event.preventDefault();
        });
        this.planedTaskCol.addEventListener("dragenter", (event) =>{
            if(isDropPosible==TaskType.Planed){
                event.preventDefault();
                this.planedTaskCol.style.backgroundColor = "green";
            }
            else{
                this.planedTaskCol.style.backgroundColor = "red";
            }
        });
        this.planedTaskCol.addEventListener("dragleave", (event) =>{ 
            event.preventDefault();
            this.planedTaskCol.style.backgroundColor = "yellow";
        });
////////////////////////////
        this.inProcesTaskCol.addEventListener("dragover", (event) =>{ 
            if(isDropPosible!=TaskType.Done) event.preventDefault();
        });
        this.inProcesTaskCol.addEventListener("dragenter", (event) =>{
            if(isDropPosible!=TaskType.Done){
                event.preventDefault();
                this.inProcesTaskCol.style.backgroundColor = "green";
            }
            else{
                this.inProcesTaskCol.style.backgroundColor = "red";
            }
        });
        this.inProcesTaskCol.addEventListener("dragleave", (event) =>{ 
            event.preventDefault();
            this.inProcesTaskCol.style.backgroundColor = "yellow";
        });
/////////////////////////////////////

        this.doneTaskCol.addEventListener("dragover", (event) =>{ 
            if(isDropPosible!=TaskType.Planed) event.preventDefault();
        });
        this.doneTaskCol.addEventListener("dragleave", (event) =>{ 
            event.preventDefault();
            this.doneTaskCol.style.backgroundColor = "yellow";
        });
        this.doneTaskCol.addEventListener("dragenter", (event) =>{
            if(isDropPosible!=TaskType.Planed){
                event.preventDefault();
                this.doneTaskCol.style.backgroundColor = "green";
            }
            else{
                this.doneTaskCol.style.backgroundColor = "red";
            }
        });
    }
}




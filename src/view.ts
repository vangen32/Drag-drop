import {Task, TaskList, TaskType} from "./model"

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
        this.drawCart(task);
    }
    private drawCart(task : Task){
        this.cart.style.width = "300px";
        this.cart.style.margin = "5px";
        this.cart.style.padding = "2px"
        this.cart.style.border = "2px solid black";
        this.title.innerText = task.Title;
        this.deadline.innerText = "To "+task.Deadline.toDateString();
        this.desc.innerText = task.Desc;
        this.type.innerText = task.Type;
        this.cart.append(this.title, this.deadline, this.desc, this.type);
        this.onDragStart();
    }

    get Type(){
        return this.task.Type;
    }
    set Type(TaskType : TaskType){
        this.task.changeType(TaskType);
        this.type.innerText = this.task.Type;
    }
    get Cart(){
        return this.cart;
    }
    get CartId() : number {
        return this.task.TaskId;
    }

    onDragStart(){
        this.cart.addEventListener("dragstart",  (event)=>{
            let a = this.CartId.toString();
            event.dataTransfer?.setData("number", a);
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
        document.getElementById("wrapper")?.append(this.planedTaskCol, this.inProcesTaskCol, this.doneTaskCol);
        this.dragOver();
    }

    addCart(cart : TaskViewCart){
        this.list.push(cart);
    }

    getTaskCartById(id : number) : TaskViewCart | undefined{
        return this.list.find(x=>x.CartId==id);
    }

    drawAll(){
        this.planedTaskCol.innerHTML ="";
        this.inProcesTaskCol.innerHTML ="";
        this.doneTaskCol.innerHTML ="";
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

    dragEnd(onDragOver : CallableFunction){
        this.planedTaskCol.addEventListener("drop", (event) =>{
            let a = event.dataTransfer?.getData("number");
            (this.getTaskCartById(Number.parseInt(a as string)) as TaskViewCart).Type = TaskType.Planed;
            onDragOver(TaskType.Planed, a);
        });
        this.inProcesTaskCol.addEventListener("drop", (event) =>{ 
            let a = event.dataTransfer?.getData("number");
            (this.getTaskCartById(Number.parseInt(a as string)) as TaskViewCart).Type = TaskType.InProgres;
            onDragOver(TaskType.InProgres, a)
        });
        this.doneTaskCol.addEventListener("drop", (event) =>{ 
            let a = event.dataTransfer?.getData("number");
            (this.getTaskCartById(Number.parseInt(a as string)) as TaskViewCart).Type = TaskType.Done;
            onDragOver(TaskType.Done, a)
        });
    }

    dragOver(){
        this.planedTaskCol.addEventListener("dragover", (DragEvent) =>{
            let a = DragEvent.dataTransfer?.getData("number") as string;
            console.log(a)
            if((this.getTaskCartById(Number.parseInt(a, 10)) as TaskViewCart).Type != TaskType.Planed){
                this.planedTaskCol.style.backgroundColor = "red";
            }
            else{
                DragEvent.preventDefault();
                this.planedTaskCol.style.backgroundColor = "green"; 
            }
            
        });
        this.planedTaskCol.addEventListener("dragleave", (event) =>{ 
            event.preventDefault();
            this.planedTaskCol.style.backgroundColor = "yellow";
        });

        this.inProcesTaskCol.addEventListener("dragover", (event) =>{ 
            let a = event.dataTransfer?.getData("number");
            if((this.getTaskCartById(Number.parseInt(a as string)) as TaskViewCart).Type == TaskType.Planed){
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

        this.doneTaskCol.addEventListener("dragover", (event) =>{ 
            let a = event.dataTransfer?.getData("number");
            if((this.getTaskCartById(Number.parseInt(a as string)) as TaskViewCart).Type == TaskType.Planed){
                event.preventDefault();
                this.doneTaskCol.style.backgroundColor = "green";
            }
            else{
                this.doneTaskCol.style.backgroundColor = "red"; 
            }
        });
        this.doneTaskCol.addEventListener("dragleave", (event) =>{ 
            event.preventDefault();
            this.doneTaskCol.style.backgroundColor = "yellow";
        });
    }
}
import {Task, TaskList, TaskType} from "./model"
import {TaskViewCart, TaskViewCartList } from "./view"

export class Controller{
    taskList : TaskList;
    viewList : TaskViewCartList;
    constructor(taskList : TaskList, viewList : TaskViewCartList){
        this.taskList = taskList;
        this.viewList = viewList;
        this.taskList.list.forEach(element => {
            this.viewList.addCart(new TaskViewCart(element));
        });
        this.viewList.dragEnd(this.onDragEnd);
        this.viewList.drawAll();
    }

    onDragEnd = (taskType : TaskType, cart : number) =>{
        const taskInDateBase = this.taskList.getTask(cart)
        if (taskInDateBase) {
            switch (taskType){
                case TaskType.Planed:
                    taskInDateBase.changeType(TaskType.Planed);
                    this.viewList.changeType(cart, TaskType.Planed);
                    break;
                case TaskType.InProgres:
                    taskInDateBase.changeType(TaskType.InProgres);
                    this.viewList.changeType(cart, TaskType.InProgres);
                    break;
                case TaskType.Done:
                    taskInDateBase.changeType(TaskType.Done);
                    this.viewList.changeType(cart, TaskType.Done);
                    break;
                default:
                    break;
            }
        }
        this.viewList.drawAll();
    }

    showAllDate(){
        this.taskList.list.forEach(task=>{
            console.log(task);
        });
    }
}
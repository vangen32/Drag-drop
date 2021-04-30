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
        const task = this.taskList.getTask(cart)
        console.log(task)
        if (task) {
            switch (taskType){
                case TaskType.Planed:
                    task.changeType(TaskType.Planed);
                    break;
                case TaskType.InProgres:
                    task.changeType(TaskType.InProgres);
                    break;
                case TaskType.Done:
                    task.changeType(TaskType.Done);
                    break;
                default:
                    break;
            }
        }
        this.viewList.drawAll();
    }
}
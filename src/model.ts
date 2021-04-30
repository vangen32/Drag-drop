export enum TaskType{
    Planed = "Planed",
    InProgres = "In Procers",
    Done = "Done"
  }

  
export class Task{
    private static id : number = 0;
    private title : string;
    private desc : string;
    private deadline : Date;
    private type : TaskType;
    private taskId : number;
  
    get Title(){
      return this.title;
    }
    get Desc(){
      return this.desc;
    }
    get Deadline(){
      return this.deadline;
    }
    get Type(){
      return this.type;
    }
    get TaskId(): number{
        return this.taskId
    }
  
    constructor(Title : string, Desc : string, DeadLine : Date){
      this.taskId =Task.id++;
      this.title = Title;
      this.deadline = DeadLine;
      this.desc = Desc;
      this.type = TaskType.Planed;
    }
    changeType(TaskType : TaskType){
      this.type = TaskType;
    }
  }


export class TaskList{
      list : Task[];
      constructor(){
          this.list = [];
      }
      addTask(task : Task){
        this.list.push(task);
      }
      getTask(id : number): Task | undefined{
        let a = this.list.find(x => x.TaskId == id);
        return a;
      }
      removeTask(id:number){
          let a = this.list.filter(x=>x.TaskId==id);
          this.list.splice(this.list.indexOf(a[0]),1);
      }
  }
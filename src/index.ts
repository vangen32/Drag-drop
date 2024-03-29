import {Task, TaskList, TaskType} from "./model"
import {TaskViewCart, TaskViewCartList } from "./view"
import {Controller} from "./controller"


var a1 = new Task("Do Something1", "Do it faster", new Date(2021, 6, 20));
var a2 = new Task("Do Something2", "Do it faster2", new Date("22.06.2021"));
var a3 = new Task("Do Something3", "Do it faster3", new Date("23.06.2021"));
var a4 = new Task("Do Something4", "Do it faster4", new Date("24.06.2021"));
var a5 = new Task("Do Something5", "Do it faster5", new Date("25.06.2021"));
var a6 = new Task("Do Something6", "Do it faster6", new Date("26.06.2021"));

var tsList = new TaskList();
tsList.addTask(a1);
tsList.addTask(a2);
tsList.addTask(a3);
tsList.addTask(a4);
tsList.addTask(a5);
tsList.addTask(a6);

var controller = new Controller(tsList, new TaskViewCartList());
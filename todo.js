let tasks = [];   //creating array of tasks
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

// console.log('Working');  //for testing purpose

//In add/delete/toggle we use render function... so in this case we are rendering list array every time.

function addTaskToDom(task){
	const li=document.createElement('li'); //creating li tag 

	li.innerHTML=`
	<input type="checkbox" id="${task.id}"  ${task.done ? 'checked' : ''} class= "custom-checkbox"> 
	<label for="${task.id}">${task.text}</label> 
	<img src="bin.svg" class="delete" data-id="${task.id}" />
    
    `;
	
          taskList.append(li);  //putting li inside [ul-->TaskList]
}


function renderList () {
	taskList.innerHTML='';

	for(let i=0;i<tasks.length;i++){
		addTaskToDom(tasks[i]);  
	}
	tasksCounter.innerHTML=tasks.length;
}

function toggleTask (taskId) {
	const task=tasks.filter(function(task){
		return task.id == taskId;
	});
	if(task.length>0){
		const currentTask=task[0];

		currentTask.done = !currentTask.done;  //changing their boolean values
		renderList();
		showNotification("task toggleed succesfully !");
		return;
	}
	showNotification("could not toggled");
}

function deleteTask(taskId) {
	const newtasks=tasks.filter(function(task){  //using filter method on tasks array
		return task.id != taskId;
	})

	tasks=newtasks;  
	renderList();
	showNotification("task deleted succesfully !");
}

function addTask (task) {
	if(task){
		tasks.push(task);
		renderList();
		showNotification('Task added succesfully !');
		// console.log("task added"); --> for testing purpose
		return;
	}
	showNotification('Task cannot be added');
}

function showNotification(text) {
	alert(text);
}

function handleInputKeypress(e){  //e--> *event instance
	if(e.key==='Enter'){
		const text = e.target.value;
		// console.log('text is:',text);  for testing purpose

		if(!text){
			showNotification('Task text cannot be empty');
			return;
		}
		const task={  //creating tasks object
			text,
			id: Date.now().toString(),
			done:false
		}

		e.target.value=''; //changing text back to default blank after pressing key
		addTask(task);
	}
}

function handleClickListener(e){
	const target=e.target;
	console.log(target);
	

	if(target.className == 'custom-checkbox'){
		const taskId=target.id;
		toggleTask(taskId);
		return;
	}
	else if(target.className == 'addBtn'){
		const text = addTaskInput.value;
		console.log('text is:',text);

		if(!text){
			showNotification('Task text cannot be empty');
			return;
		}
		const task={  //creating object
			text,
			id: Date.now().toString(),
			done:false
		}

		addTaskInput.value=''; //changing text back to default blank after clicking add button
		addTask(task);
		return;
	}

	else if(target.className == 'delete'){
		const taskId=target.dataset.id;//grabbing taskid to delete, (dataset is the property to get data in tag)
		deleteTask(taskId);
		return;
	}

}

addTaskInput.addEventListener('keyup',handleInputKeypress); //will 
// check the input as soon as typed and pressed entered.
//keyup--> is event and handleinput.. is handling functioning of it
//we made.


document.addEventListener('click',handleClickListener); //applying eventlistener on dcument[ on whole html document...]
//it will check for the classes where the mouse is clicked and take action using if else condition.
var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var list = document.getElementsByTagName("li");

function inputLength() {
	return input.value.length;  /*returns length of new item*/
}

function createListElement() {   /* function to create new list with button attached*/
	var li = document.createElement("li");
	var row = document.createElement("div"); /* div for row*/
	var itemCol = document.createElement("div"); /* div for item column*/
	var delCol = document.createElement("div"); /* div for delete column*/
	var del = document.createElement("button"); /*delete button*/

	row.setAttribute("class", "row"); /* set class row*/
	itemCol.setAttribute("class", "col"); /*set class col*/
	delCol.setAttribute("class", "col"); 
	del.innerHTML = "delete"; /*button shows delete text inside*/
	del.setAttribute("class", "buttonDel"); /*set class buttonDel*/

	li.appendChild(document.createTextNode(input.value)); /* add value to new li*/
	itemCol.appendChild(li); /*add new item to first Column*/
	row.appendChild(itemCol); /*add new column to new row */
	
	delCol.appendChild(del); /*add delete button to second column*/
	row.appendChild(delCol); /*add new column to current row; this row now has 2 columns*/
	ul.appendChild(row); /*add new row to the unordered list*/

	checkDone(); /*check if any of the items including new are clicked for done*/
	checkDelete(); /*check if any of the items including new are to be deleted*/
	input.value = ""; /*resets the userinput text bar so that the last input doesn't sit there*/
}

function addListAfterClick() {
	if (inputLength() > 0) { /*if input bar is not empty, add new item*/
		createListElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) { /*if input bar not empty and the enter key is pressed, add new item*/
		createListElement();
	}
}

function checkDone(){ /*function to check if list clicked for done*/
	for(var i=0; i<list.length;i++){
		list[i].addEventListener("click", toggleOnOff); /*checks if an item clicked*/
	}
}

function toggleOnOff(){
	this.classList.toggle("done"); /*toggles done style for current item*/
}


function checkDelete(){
	var delButton = document.getElementsByClassName("buttonDel"); 
	for(var i=0; i< delButton.length;i++){ /*iterates until it checks all delete buttons*/
			delButton[i].addEventListener("click", clearElement); /*checks if delete clicked, if so then run clearElement*/
			delButton[i].info = list[i]; /*new variable info with parent delButton. Assign the current list iteration to info*/
		}
}

function clearElement(){
	for (var i=0; i<list.length; i++){
		this.parentNode.parentNode.remove(); /*removes the row*/
	}
}

button.addEventListener("click", addListAfterClick); /*adds new item if clicked enter button*/
input.addEventListener("keypress", addListAfterKeypress); /*adds new item if pressed enter key*/
checkDone(); /*function to check if list clicked for done*/
checkDelete(); /*function to check if delete button pressed*/
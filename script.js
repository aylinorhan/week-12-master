// LIST ARRAY IS WHERE OUR DATA FOR THIS APPLICATION LIVES
var listArray = [{
        name: "Books to Read", //object 0, listarray[0] would bring up "books to read", 
        //the key would be "name"; accessed by obj.name
        items: [
            "Hitchhiker's Guide to Galaxy",
            "Walden",
            "The Elephant, the Tiger, and the Cell Phone"
            //listarray.items would bring up the "items" content
            //whenever someone adds a value to the list, it should be added to listarray or items
        ]
    }, //this is the first object
    {
        name: "Groceries to Buy", //object 1, listarray[1] would bring up "groceries to buy"
        items: [
            "Milk",
            "Eggs",
            "Butter"
        ]
    } //this is the second object, the whole list
];
var selectedList = 0; 
var listDiv = document.getElementById("lists");
var itemDiv = document.getElementById("list-items");
var addListButton = document.getElementById("add-list-button");
var addItemButton = document.getElementById("add-item-button");

// ------------------------------------------------------
// GET AND SET DATA FROM LOCAL STORAGE
// ------------------------------------------------------


// ------------------------------------------------------
// LIST SELECTION
// ------------------------------------------------------
// 1. Listen to click
// 2. Get the list that was clicked on
// 3. Remove "active" from classList
// 4. add "active" to selected list
// 5. update items for selected div
listDiv.addEventListener("click", function(e) {
    var targetElement = e.target; //with target, instead of getting the parent element we get the list element
    //^we know which list element was clicked on 
    console.log(targetElement.dataset);
    console.log(targetElement.dataset.index); //from these we know the value of the list element
    selectedList = targetElement.dataset.index; //we just updated the value of the variable, but this doesn't update html yet
    updateLists();
    updateItemsForSelectedList(); //these two functions are to update the html page
    //^we always call upon these 2, to update html
});


// ------------------------------------------------------
// FUNCTIONS TO UPDATE THE HTML PAGE WITH RESPECT TO DATA
// ------------------------------------------------------
function updateLists() {
    while (listDiv.hasChildNodes()) {
        listDiv.removeChild(listDiv.lastChild);
    }

    listArray.forEach(function(list, i) {
        // Create an 'a' element
        var aElement = document.createElement("a");
        aElement.classList.add("list-group-item");
        aElement.classList.add("list-group-item-action");
        aElement.classList.add("list");
        if (i == selectedList) {
            aElement.classList.add("active");
        } //to show which list has been selected

        aElement.setAttribute("data-index", i);

        var textNode = document.createTextNode(list.name);
        aElement.appendChild(textNode);

        listDiv.appendChild(aElement);
    });
}

function updateItemsForSelectedList() {
    //this function creates html elements based on whatever the selected list is
    while (itemDiv.hasChildNodes()) {
        itemDiv.removeChild(itemDiv.lastChild);
    }

    var listItemArray = listArray[selectedList].items;
    //listArray[0].items, is the same as the sentence above.
    //this would give us the list of books in list 0
    listItemArray.forEach(function(item, i) {
        // Populate the list-items div (the right div) wit respective list items
        // - make a new 'a' element, we create an html element
        //item is the text that we want
         var aElement = document.createElement("a");
         // - add classes to its classList
        aElement.classList.add("list-group-item");
        aElement.classList.add("list-group-item-action");
        aElement.classList.add("list");
        // - set value of 'data-index' attribute to i
        aElement.setAttribute("data-index", i);
        // - Create a textNode with item name
        var textNode = document.createTextNode(item);
        //^item is the text that we want

        // - append textNode to the 'a' element
        aElement.appendChild(textNode);
        // - append 'a' element to the itemDiv
        itemDiv.appendChild(aElement);
    });
}

updateLists();
updateItemsForSelectedList();

// ------------------------------------------------------
// ADDING TO LIST
// ------------------------------------------------------
addListButton.addEventListener("click", function(e) { 
    //addlistbutton listens to the click, and whenver someone clicks the following function would run, 
    //adding the value of the user input
    e.preventDefault();
    var listName = document["add-list-form"]["list-name-input"].value;
    if (listName.length >= 3) {
        var newList = {
            name: listName,
            items: []
        };
        listArray.push(newList); //this would update the list
        updateLists();
    } else {
        alert("Please enter a valid list name: Atleast 3 characters");
    }
});

// ------------------------------------------------------
// ADDING TO LIST ITEMS
// ------------------------------------------------------
addItemButton.addEventListener("click", function(e) {
    e.preventDefault();
    var currentList = listArray[selectedList];
    var itemArray = currentList.items;

    // - get the input value in a variable
    var inputValue = document["add-item-form"]["item-name-input"].value; //this is giving us access to the html element, 
    //not the value within it until we say .value, and the value is added by the user
    // - check if the input value is more than 2 characters
    // - add it into itemArray
    itemArray.push(inputValue);
    // - update listItem div
    updateItemsForSelectedList();

});

// ------------------------------------------------------
// POP-UP HANDLING CODE
// ------------------------------------------------------
var buttonsArray = document.querySelectorAll(".popup-button");
// querySelectorAll returns a DOMTokenList and not an Array (which includes methods like forEach)
buttonsArray = Array.from(buttonsArray); // Conevrting DOMTokenList to an Array

buttonsArray.forEach(function(button) {
    button.addEventListener("click", function() {
        var popup = document.getElementById(this.dataset.popupid);
        // The data attributes can be accessed by .dataset variable which is part of the DOMElement (check HTML for buttonsArray)
        popup.style.display = "flex";
    });
});

var closeButton = document.querySelectorAll(".close");
closeButton.forEach(function(button, i) {
    button.addEventListener("click", closePopups);
});

function closePopups() {
    var popupsArray = Array.from(document.querySelectorAll(".popup"));
    popupsArray.forEach(function(popup) {
        popup.style.display = "none";
    });
}

// storage controller

// item controller
const ItemCtrl = (function () {
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };
  // Data Structure/State
  const data = {
    items: [
      // { id: 0, name: "Steak Dinner", calories: "1200" },
      // { id: 1, name: "Cookie", calories: "400" },
      // { id: 2, name: "Eggs", calories: "300" },
    ],
    currentItem: null,
    totalCalories: 0,
  };
  // Public Methods
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      // create id
      let ID;
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      // calories to number
      calories = parseInt(calories);
      // add new item
      // new Item – calls the construcor
      newItem = new Item(ID, name, calories);

      data.items.push(newItem);

      return newItem;
    },
    getItemById: function (id) {
      let found = null;
      // loop through items
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    getTotalCalories: function () {
      let total = 0;
      // Loop through items and add calories which were submitted
      data.items.forEach(function (item) {
        total += item.calories;
        // total = total + item.calories;
      });
      // set total calories in data structure
      data.totalCalories = total;
      // return total
      return data.totalCalories;
    },
    updateItem:function(name,calories){
      console.log("name,calories",name,calories)
      console.log("data.currentItem.id",data.currentItem.id)
      // calories to number
      calories=parseInt(calories);
      let found=null;
      data.items.forEach(function(item){
        console.log("item.id",item.id)
        if(item.id===data.currentItem.id){
          item.name=name;
          item.calories=calories;
          found=item;
        }
      })
      console.log("found",found)
      return found;
    },
    setCurrentItem: function (item) {
      data.currentItem = item;
    },
    getCurrentItem: function () {
      return data.currentItem;
    },
    logData: function () {
      return data;
    },
  };
})();

// ui controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    listItems:'#item-list li',
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
  };
  // Public Methods
  return {
    populateItemList: function (items) {
      let html = "";
      items.forEach(function (item) {
        html += `<li class="collection-item" id="item-${item.id}">
            <strong>
            ${item.name}:
            </strong>
            <em>${item.calories} Calories</em>  
            <a href="javascript:void(0);" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>              
        </li>`;
      });
      // Insert List Items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getSelectors: function () {
      return UISelectors;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    addListItem: function (item) {
      console.log("addListItem-item", item);
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = "block";
      // create li element
      const li = document.createElement("li");
      // Add class
      li.className = "collection-item";
      // add id
      li.id = `item-${item.id}`;
      // add html
      li.innerHTML = `<strong>
      ${item.name}:
      </strong>
      <em>${item.calories} Calories</em>  
      <a href="javascript:void(0);" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
      </a> `;
      // Insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories: function (totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    addItemToForm: function () {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    updateListItem:function(item){
      let listItems=document.querySelectorAll(UISelectors.listItems);
      // Turn Nodelist to array because we cannot use foreach on nodelist
      listItems=Array.from(listItems);
      listItems.forEach(function(listItem){
        const itemId=listItem.getAttribute('id');
        if(itemId===`item-${item.id}`){
          document.querySelector(`#${itemId}`).innerHTML=`<strong>
          ${item.name}:
          </strong>
          <em>${item.calories} Calories</em>  
          <a href="javascript:void(0);" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
          </a> `
        }
      })
    }

  };
})();
// App controller
const AppCtrl = (function (ItemCtrl, UICtrl) {
  // Load Event Listeners
  const loadEventListeners = function () {
    // get ui selectors
    const UISelectors = UICtrl.getSelectors();
    // Add item event
    console.log("UISelectors", UISelectors);
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
    // Disable submit on enter click
    document.addEventListener('keypress',function(e){
      if(e.keycode===13||e.which===13){
        e.preventDefault();
        return false; 
      }
    }) 
    // Edit icon click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);
    // Update icon click event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);
  };
  // add item submit
  const itemAddSubmit = function (e) {
    console.log("Add Btn Clicked");
    // Get form input from UI controller
    e.preventDefault();
    const input = UICtrl.getItemInput();
    // check for name and calorie input
    if (input.name !== "" && input.calories != "") {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      // console.log("newItem",newItem);
      // add item to ui list
      UICtrl.addListItem(newItem);
      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // add total calories to ui
      UICtrl.showTotalCalories(totalCalories);
      //  Clear Fields
      UICtrl.clearInput();
    }
  };
  // click edit item
  const itemEditClick = function (e) {
    e.preventDefault();
    if (e.target.classList.contains("edit-item")) {
      // get list item id (item-0,item-1)
      const listId = e.target.parentNode.parentNode.id;
      console.log("listId", listId); // 0 or 1 or 2
      // break into an array
      //we are directly binding the id, but useful when using multiple classes
      const listIdArr = listId.split("-");
      console.log("listIdArr", listIdArr);
      // Get actual id
      const id = parseInt(listIdArr[1]);
      const itemToEdit = ItemCtrl.getItemById(id);
      console.log("itemToEdit", itemToEdit); // consoles the selected item clicked on respective edit icon
      // set current item
      ItemCtrl.setCurrentItem(itemToEdit);
      // add item to form
      UICtrl.addItemToForm();
    }
  };
  // Update Item submit
  const itemUpdateSubmit=function(e){
    e.preventDefault();
    console.log('update btn clicked');
    // Get Item Input
    const input=UICtrl.getItemInput();
    // Update Item
    const updatedItem=ItemCtrl.updateItem(input.name,input.calories);
    console.log("updatedItem".updatedItem)
    // Update UI
    UICtrl.updateListItem(updatedItem);
    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // add total calories to ui
    UICtrl.showTotalCalories(totalCalories);
  }
  console.log(ItemCtrl.logData());
  // Public Methods
  return {
    init: function () {
      console.log("Initializing App..");
      // clear edit state / set initial set
      UICtrl.clearEditState();
      // Fetch items from data structure
      const items = ItemCtrl.getItems();
      console.log("items", items);
      // check if any items are present
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }
      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // add total calories to ui
      UICtrl.showTotalCalories(totalCalories);
      // load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

// Initializing the App
AppCtrl.init();

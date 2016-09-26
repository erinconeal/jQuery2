// if (Modernizr.localstorage) {
//   // window.localStorage is available!
// } else {
//   // no native support for HTML5 storage :(
//   // maybe try dojox.storage or a third-party solution
// }


$(document).ready(function() {
  //we should make it so that our newTaskForm is hidden when the document loads. Let's put this near the top of our document so that it loads correctly.
  $('#newTaskForm').hide();

  //Listo will be our main array for storing tasks.
  var listo = [];

  var advanceTask = function(task) {
    var modified = task.innerText.trim()
    for (var i = 0; i < listo.length; i++) {
      if (listo[i].task === modified) {
        if (listo[i].id === 'new') {
          listo[i].id = 'inProgress';
        } else if (listo[i].id === 'inProgress') {
          listo[i].id = 'archived';
        } else {
          listo.splice(i, 1);
        }
        break;
      }
    }
    task.remove();
  };

  //task constructor so our users can create object tasks for their lists.
  var Task = function(task) {
    this.task = task;
    this.id = 'new';
  }

  var addTask = function(task) {
    //our code will only run if 'task' is "truthy". Empty tasks are not truthy since they're just empty strings. Next, we want to call our task constructor and fill it with the new task, then we will push the new task to listo, and save it.
    if (task) {
      task = new Task(task);
      listo.push(task);

//we want the input form to clear after we submit it, which currently isn't happening. Then we want to make it so we can show our new list item in our index.html.
      $('#newItemInput').val('');
      $('#newList').append(
        '<a href="#finish" class="" id="item">' +
        '<li class="list-group-item">' +
        '<h3>' + task.task + '</h3>'+
        '<span class="arrow pull-right">' +
        '<i class="glyphicon glyphicon-arrow-right">' +
        '</span>' +
        '</li>' +
        '</a>'
      );
    }
    //add the fade toggle so that our New button will hide and show the input form at the same time.
    $('#newTaskForm').slideToggle('fast', 'linear');
  };

  //We will now call a jQuery event that calls the addTask function when we click the saveNewItem button.
  $('#saveNewItem').on('click', function(e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  });

  //create a way for our tasks to be moved from new, to in progress, to archived, and eventually deleted.
  $(document).on('click', '#item', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
  });

  $(document).on('click', '#inProgress', function(e) {
    e.preventDefault();
    var task = this;
    task.id = "archived";
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
  });

  $(document).on('click', '#archived', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  });

  //Opens form
  $('#add-todo').on('click', function() {
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });

  //closes form
    $('#cancel').on('click', function (e) {
        e.preventDefault();
        $('#newTaskForm').fadeToggle('fast', 'linear');
    });


});

//Black Diamond: Local Storage

// Our Browser's Brain
//
// The final step for the todo list is to save our list items on local storage. Local storage allows our app to access the browsers built in storage. We can save a limited amount of data in cool ways. This means if we close our browser our list items will still be there!
//
// Here are some resources:
//
// http://diveintohtml5.info/storage.html
//
// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

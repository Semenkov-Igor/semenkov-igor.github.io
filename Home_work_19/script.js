$(function () {

  const URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/users';
  userTemplate = $('#userTemplate').html();
  $userList = $("#users tbody");

  let dialogCreate, form,
    emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    name = $("#name"),
    surname = $("#surname"),
    email = $("#email"),
    phone = $("#phone"),
    allFields = $([]).add(name).add(surname).add(email).add(phone),
    tips = $(".validateTips");

  $userList.on('click', '.' + 'user', onUserChangeClick);
  $userList.on('click', '.' + 'remove', onDeleteButtonClick);

  function onUserChangeClick(e) {
    dialogChange.dialog("open");
    const taskId = $(e.target).closest('.user').data('id');
    let task;
    fetch(URL + '/' + taskId)
      .then((res) => res.json())
      .then((data) => (task = data))
      .then(updateStatus);
  }

  function updateStatus(task) {
    $("#name1").val(task.name);
    $("#surname1").val(task.surname);
    $("#email1").val(task.email);
    $("#phone1").val(task.phone);

    let tas = {
      name: name.val(),
      surname: surname.val(),
      email: email.val(),
      phone: phone.val()
    };

    fetch(URL + '/' + task.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tas),
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
  }

  function onDeleteButtonClick(e) {
    e.stopPropagation();
    const user = $(e.target).closest('.user');
    console.log($(e.target).parent())
    deleteItem(user);
  }

  function deleteItem(el) {
    console.log(el)
    const userId = el.data('id');
    el.remove();
    deleteUser(userId);
  };

  function deleteUser(id) {
    console.log(id);
    fetch(URL + '/' + id, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  getData();

  function getData() {
    fetch(URL)
      .then((res) => res.json())
      .then(renderData);
  }

  function renderData(data) {
    $userList.html(data.map(generateHtml).join('\n'))
  }

  function generateHtml(task) {
    return userTemplate
      .replace('{{id}}', task.id)
      .replace('{{name}}', task.name)
      .replace('{{surname}}', task.surname)
      .replace('{{email}}', task.email)
      .replace('{{phone}}', task.phone);
  };

  function updateTips(t) {
    tips
      .text(t)
      .addClass("ui-state-highlight");
    setTimeout(function () {
      tips.removeClass("ui-state-highlight", 1500);
    }, 500);
  }

  function checkLength(o, n, min, max) {
    if (o.val().length > max || o.val().length < min) {
      o.addClass("ui-state-error");
      updateTips("Length of " + n + " must be between " +
        min + " and " + max + ".");
      return false;
    } else {
      return true;
    }
  }

  function checkRegexp(o, regexp, n) {
    if (!(regexp.test(o.val()))) {
      o.addClass("ui-state-error");
      updateTips(n);
      return false;
    } else {
      return true;
    }
  }

  function addUser() {
    let valid = true;
    allFields.removeClass("ui-state-error");

    valid = valid && checkLength(name, "username", 2, 16);
    valid = valid && checkLength(surname, "usersurname", 2, 16);
    valid = valid && checkLength(email, "email", 4, 80);
    valid = valid && checkLength(phone, "phone", 5, 16);

    valid = valid && checkRegexp(name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter.");
    valid = valid && checkRegexp(surname, /^[a-z]([0-9a-z_\s])+$/i, "Usersurname may consist of a-z, 0-9, underscores, spaces and must begin with a letter.");
    valid = valid && checkRegexp(email, emailRegex, "eg. ui@jquery.com");
    valid = valid && checkRegexp(phone, /^([0-9])+$/, "Phone field only allow 0-9");

    if (valid) {
      createUser();
      dialogCreate.dialog("close");
    }
    return valid;
  }

  function createUser() {
    let task = {
      name: name.val(),
      surname: surname.val(),
      email: email.val(),
      phone: phone.val()
    };

    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        getData();
        console.log(data);
      });
  };

  dialogCreate = $("#dialog-form").dialog({
    autoOpen: false,
    height: 400,
    width: 350,
    modal: true,
    buttons: {
      "Create an account": addUser,
      Cancel: function () {
        dialogCreate.dialog("close");
      }
    },
    close: function () {
      form[0].reset();
      allFields.removeClass("ui-state-error");
    }
  });

  form = dialogCreate.find("form").on("submit", function (event) {
    event.preventDefault();
    addUser();
  });

  $("#createUser").button().on("click", function () {
    dialogCreate.dialog("open");
  });




  dialogChange = $("#dialog-form-change").dialog({
    autoOpen: false,
    height: 400,
    width: 350,
    modal: true,
    buttons: {
      "Save change an account": checkChange,
      Cancel: function () {
        dialogChange.dialog("close");
      }
    },
    close: function () {
      form[0].reset();
      allFields.removeClass("ui-state-error");
    }
  });

  function checkChange() {
    let valid = true;
    allFields.removeClass("ui-state-error");

    valid = valid && checkLength(name, "username", 2, 16);
    valid = valid && checkLength(surname, "usersurname", 2, 16);
    valid = valid && checkLength(email, "email", 4, 80);
    valid = valid && checkLength(phone, "phone", 5, 16);

    valid = valid && checkRegexp(name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter.");
    valid = valid && checkRegexp(surname, /^[a-z]([0-9a-z_\s])+$/i, "Usersurname may consist of a-z, 0-9, underscores, spaces and must begin with a letter.");
    valid = valid && checkRegexp(email, emailRegex, "eg. ui@jquery.com");
    valid = valid && checkRegexp(phone, /^([0-9])+$/, "Phone field only allow 0-9");

    if (valid) {
      changeUser();
      dialogChange.dialog("close");
    }
    return valid;
  }

  function changeUser() {
    console.log('Hi, Igor!')
  }

});
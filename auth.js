
function registerState() {
    const token = localStorage.getItem("token") 
    if (token && token != "undefined") {
      $("#signOutBTN").show()
      $("#loginBTN").hide()
      $("#auth").hide()
    } else {
      $("#signOutBTN").hide()

    }
  }

 function signOut() {
    localStorage.removeItem("token")
    $("#loginBTN").show()
    $("#signOutBTN").hide()
    alertify.set({ delay: 3000 });
    alertify.success("Good bye!");
  }


function register(e) {
    // e.preventDefault() doesn t work for registering twice
    e.stopImmediatePropagation() // prevent for registering twice
    console.log($("#email").val())
    console.log($("#password").val())
    if ($("#password").val().length < 6) {
      alertify.set({ delay: 3000 });
      alertify.error("Your password must be between 6 and 32 characters!");
      return;
    }

    $.post('https://rob4path2.herokuapp.com/api/auth/register',   // url
      {
        name: $("#username").val(),
        email: $("#email").val(),
        password: $("#password").val(),
      }, // data to be submit
      function (data, status, jqXHR) {  // success callback
        console.log(data)
      },
      "application/json"
    ).done(function (message) {
      console.log(message)

    }).fail(function (xhr, status, error) {

      alertify.set({ delay: 3000 });
      alertify.error(JSON.parse(xhr.responseText).message);

    })
    return false;
  }

  function login(e) {
    e.stopImmediatePropagation() // prevent for logining twice

    $.post('https://rob4path2.herokuapp.com/api/auth/login',   // url
      {
        name: $("#username").val(),
        email: $("#email").val(),
        password: $("#password").val(),
      }, // data to be submit
      function (data, status, jqXHR) {  // success callback
        console.log({ data })
        console.log({ status })
        console.log({ jqXHR })
        if ($("#email").val() === "bcrrobby@gmail.com") {
          console.log("CONGRATS FOR VLAAAAAD")
        }
      },
      "application/json"
    ).done(function (message) {
      console.log(message)

    }).fail(function (xhr, status, error) {
      const token = JSON.parse(xhr.responseText).token
      localStorage.setItem("token", token)
      registerState()
      console.log(JSON.parse(xhr.responseText))
      console.log(JSON.parse(xhr.responseText).message)
      console.log(xhr.responseText.message)
      console.log(status)


      if (JSON.parse(xhr.responseText).message === "OK") {
        alertify.set({ delay: 3000 });

        alertify.success("Log in succes!");
      }
      else {
        alertify.set({ delay: 3000 });

        alertify.error(JSON.parse(xhr.responseText).message)
      }
    })
    return false;
  }
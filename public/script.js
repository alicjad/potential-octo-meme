
function listboxresults() {
  var message, x;
  message = document.getElementById("errormsz");
  message.innerHTML = "";
  x = document.getElementById("txtCellPhones").value;
  try {
    if (x == "") throw "item  not selected";
  }
  catch (err) {
    message.innerHTML = "Alert " + err;
    document.getElementById("errormsz").style.color = "red";
  }
}
document.getElementById("chkInternetConnection").onchange = e => {
  // e.target.checked
  fetch("/connection", {
    method: e.target.checked ? "POST" : "DELETE"
  })
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          document.getElementById("price").textContent = data.price;
        });
      }
    })
    .catch(err => {
      console.log(err);
      alert("An error occured");
    });
};

document.getElementById("txtPhoneLines").onchange = e => {
  fetch("/phoneline", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: e.target.value
    })
  })
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          document.getElementById("price").textContent = data.price;
        });
      }
    })
    .catch(err => {
      console.log(err);
      alert("An error occured");
    });
};

document.getElementById("addPhones").onclick = e => {
  var cellPhoneSelect = document.getElementById("txtCellPhones");
  var selectedPhones = document.getElementById("txtChosenCellPhones");
  var id = cellPhoneSelect.value;

  fetch("/phone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: id
    })
  })
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          let option = document.createElement("option");
          option.value = data.phone.id;
          option.text = data.phone.name;
          selectedPhones.add(option);
          document.getElementById("price").textContent = data.price;
        });
      }
    })
    .catch(err => {
      console.log(err);
      alert("An error occured");
    });
};

document.getElementById("removePhones").onclick = e => {
  var cellPhoneSelect = document.getElementById("txtCellPhones");
  var selectedPhones = document.getElementById("txtChosenCellPhones");

  var id = selectedPhones.value;
  var index = selectedPhones.selectedIndex;

  fetch("/phone", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: id
    })
  })
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log(data);
          let option = document.createElement("option");
          option.value = data.phone.id;
          option.text = data.phone.name;
          cellPhoneSelect.add(option);
          selectedPhones.remove(index);
          document.getElementById("price").textContent = data.price;
        });
      }
    })
    .catch(err => {
      console.log(err);
      alert("An error occured");
    });
};

document.getElementById("buyBtn").onclick = e => {
  fetch("/cart", {
    method: "POST"
  })
    .then(response => {
      response.json().then(data => {
        var string = "";

        data.cart.map(element => {
          string += `\n${element.name} - ${element.price} DKK`;
        });

        string += `\nTotal price: ${data.price} DKK`;

        alert(string);
      });
    })
    .catch(err => {
      console.log(err);
      alert("An error occured");
    });
};

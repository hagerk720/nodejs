const con = document.querySelector(".container");
function render(element) {
  let html = `<div class="card container">
  <div class="welcome-text">name :  ${element.name}</div>

  <div class="welcome-text row">
    <p> mobile </p>
    <p>${element.mobile}</p>
  </div>
  <div class="welcome-text row">
    <p> address </p>
    <p>${element.address}</p>
  </div>
  <div class="welcome-text row">
    <p>email </p>
    <p>${element.email}</p>
  </div>
  </div>`;
  con.insertAdjacentHTML("afterbegin", html);
}
fetch("../serverSide/clients.json")
  .then((data) => {
    return data.json();
  })
  .then((d) =>
    d.clients.forEach((element) => {
      render(element);
    })
  );

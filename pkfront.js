let sysid = "exmpl";
let element = document.getElementById("front");

fetch(`https://api.pluralkit.me/v2/systems/${sysid}/fronters`)
.then(response => {
    if (response.ok) return response.json();
    else if (response.status === 403) { 
      element.innerHTML = "front is private";
      element.style.color = "orange";
      return response.json();
    }
    else if (response.status === 500) {
      element.innerHTML = "500: internal server error";
      element.style.color = "red";
      return response.json();
    }
    else if (response.status === 404) {
      element.innerHTML = "404: system not found";
      element.style.color = "red";
      return response.json();
    }
    else throw new Error(response.status + ': ' +  response.statusText);
  })
.then(data => {
    console.log(data);
    if (data.members.length > 0) {
      element.innerHTML = data.members.map(m => m.name).join(", ");
    } else {
      element.innerHTML = "(no fronters)";
    }
  })
.catch((error) => {
  console.log(error);
    element.innerHTML = error.message;
    element.style.color = "red";
  });
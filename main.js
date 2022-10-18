async function saveToLocalStorage(event) {
  event.preventDefault();

  const expenseValue = event.target.exp.value;
  const description = event.target.descr.value;
  const category = event.target.categ.value;

  const obj = {
    expenseValue: expenseValue,
    description: description,
    category: category,
  };

  try {
    let response = await axios.post(
      "https://crudcrud.com/api/2a380f8bbe5a48a8bf2eea890191abbe/expenseTrackerData",
      obj
    );
    showOnScreen(response.data);
  } catch (error) {
    document.body.innerHTML =
      document.body.innerHTML + "<h4> Something went wrong </h4>";
    console.log(error);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    let response = await axios.get(
      "https://crudcrud.com/api/2a380f8bbe5a48a8bf2eea890191abbe/expenseTrackerData"
    );
    console.log(response);
    for (var i = 0; i < response.data.length; i++) {
      showOnScreen(response.data[i]);
    }
  } catch (error) {
    console.log(error);
  }
});

function showOnScreen(user) {
  const parentNode = document.getElementById("listOfUser");

  const childHTML = `<li id=${user._id}> ${user.expenseValue} - ${user.description} - ${user.category} <button style="border-color:green;" onclick=editUserDeatils('${user.description}','${user.expenseValue}','${user.category}','${user._id}')>Edit Expense</button> <button style="border-color:red;" onclick=deleteUser('${user._id}')>Delete Expense</button> </li>`;

  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

//edit user

function editUserDeatils(descr, exp, categ, userId) {
  console.log(descr, categ, userId);
  document.getElementById("descr").value = descr;
  document.getElementById("exp").value = exp;
  document.getElementById("categ").value = categ;

  deleteUser(userId);
}

//delete user

async function deleteUser(userId) {
  try {
    let response = await axios.delete(
      `https://crudcrud.com/api/2a380f8bbe5a48a8bf2eea890191abbe/expenseTrackerData/${userId}`
    );
    removeUserFromScreen(userId);
  } catch (error) {
    console.log(error);
  }
}

//remove user

function removeUserFromScreen(descr) {
  const parentNode = document.getElementById("listOfUser");
  const childNodeToBeDeleted = document.getElementById(descr);

  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}

const users = [
  { name: "Андрей", age: 12, city: "Москва" },
  { name: "Александр", age: 34, city: "Санкт-Петербург" },
  { name: "Светлана", age: 52, city: "Минск" },
  { name: "Екатерина", age: 29, city: "Краснодар" },
  { name: "Антон", age: 24, city: "Сочи" },
  { name: "Гриша", age: 38, city: "Астана" },
  { name: "Иван", age: 64, city: "Ставрополь" },
  { name: "Татьяна", age: 34, city: "Рига" },
  { name: "Константин", age: 40, city: "Ростов-на-дону" },
  { name: "Павел", age: 21, city: "Белгород" },
  { name: "Игорь", age: 19, city: "Красноярск" },
  { name: "Лариса", age: 10, city: "Екатеринбург" },
  { name: "Лиза", age: 9, city: "Самара" },
  { name: "Соня", age: 20, city: "Курск" },
  { name: "Миша", age: 30, city: "Москва" },
  { name: "Рома", age: 15, city: "Калининград" },
  { name: "Маша", age: 47, city: "Томск" },
  { name: "Филип", age: 30, city: "Москва" },
];

const userTemplate = document.getElementById("user-template").content;
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");
const ageFilter = document.getElementById("age-filter");
const sortSelect = document.getElementById("sort");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const cityInput = document.getElementById("city");
const addUserButton = document.getElementById("add-user");
const editModal = document.getElementById("edit-modal");
const editNameInput = document.getElementById("edit-name");
const editAgeInput = document.getElementById("edit-age");
const editCityInput = document.getElementById("edit-city");
const cancelEditButton = document.getElementById("cancel-edit");
const saveEditButton = document.getElementById("save-edit");

let currentUser = null;

function renderUsers(users) {
  userList.innerHTML = "";
  users.forEach((user) => {
    const userClone = userTemplate.cloneNode(true);
    userClone.querySelector(".user-name").textContent = `Имя: ${user.name}`;
    userClone.querySelector(".user-age").textContent = `Возраст: ${user.age}`;
    userClone.querySelector(".user-city").textContent = `Город: ${user.city}`;
    userClone
      .querySelector(".edit")
      .addEventListener("click", () => openEditModal(user));
    userClone
      .querySelector(".delete")
      .addEventListener("click", () => deleteUser(user));
    userList.appendChild(userClone);
  });
}

function filterUsers() {
  const searchValue = searchInput.value.toLowerCase();
  const ageValue = ageFilter.value;
  const sortedUsers = [...users].sort((a, b) => {
    if (sortSelect.value === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return a.age - b.age;
    }
  });

  const filteredUsers = sortedUsers.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchValue);
    let matchesAge = true;
    if (ageValue === "under20") {
      matchesAge = user.age < 20;
    } else if (ageValue === "20-30") {
      matchesAge = user.age >= 20 && user.age <= 30;
    } else if (ageValue === "30-40") {
      matchesAge = user.age >= 30 && user.age <= 40;
    } else if (ageValue === "above40") {
      matchesAge = user.age > 40;
    }
    return matchesSearch && matchesAge;
  });

  renderUsers(filteredUsers);
}

function addUser() {
  const name = nameInput.value;
  const age = parseInt(ageInput.value);
  const city = cityInput.value;
  if (name && age && city) {
    users.push({ name, age, city });
    nameInput.value = "";
    ageInput.value = "";
    cityInput.value = "";
    filterUsers();
  }
}

function openEditModal(user) {
  currentUser = user;
  editNameInput.value = user.name;
  editAgeInput.value = user.age;
  editCityInput.value = user.city;
  editModal.classList.remove("hidden");
}

function closeEditModal() {
  editModal.classList.add("hidden");
  currentUser = null;
}

function saveEdit() {
  if (currentUser) {
    currentUser.name = editNameInput.value;
    currentUser.age = parseInt(editAgeInput.value);
    currentUser.city = editCityInput.value;
    filterUsers();
    closeEditModal();
  }
}

function deleteUser(user) {
  const index = users.indexOf(user);
  if (index > -1) {
    users.splice(index, 1);
    filterUsers();
  }
}

searchInput.addEventListener("input", filterUsers);
ageFilter.addEventListener("change", filterUsers);
sortSelect.addEventListener("change", filterUsers);
addUserButton.addEventListener("click", addUser);
cancelEditButton.addEventListener("click", closeEditModal);
saveEditButton.addEventListener("click", saveEdit);

renderUsers(users);

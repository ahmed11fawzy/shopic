const searchIcon = document.querySelector("#searchIcon");
const searchField = document.querySelector("#searchField");

function handleSearchIconClick(searchIcon, searchField) {
  searchIcon.addEventListener("click", () => {
    searchField.focus();
    searchField.classList.toggle("focus");
    searchIcon.classList.toggle("fa-magnifying-glass");
  });
  searchIcon.addEventListener("blur", () => {
    searchField.classList.remove("focus");
    searchIcon.classList.toggle("fa-magnifying-glass");
  });
  searchField.addEventListener("blur", () => {
    searchField.classList.remove("focus");
    searchIcon.classList.toggle("fa-magnifying-glass");
  });
}

handleSearchIconClick(searchIcon, searchField);


searchField.addEventListener("input", () => {
  const searchValue = searchField.value.toLowerCase();

});



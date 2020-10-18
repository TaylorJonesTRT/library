let myLibrary = [];
let table = document.querySelector(".table-body");
let newBookBtn = document.getElementById("new-book");
let form = document.querySelector(".new-book-form");
let content = document.getElementById("content");
let closeForm = document.querySelector(".close-form");
let submitBtn = document.querySelector(".add-book-btn");
let readStatusRow = document.getElementById("read-status");


newBookBtn.addEventListener('click', () => {
    form.style.display = "block";
    content.classList.add("blur");
    document.querySelector(".logo").classList.add("blur");
});
closeForm.addEventListener('click', () => {
  form.style.display = "none";
  content.classList.remove("blur");
  document.querySelector(".logo").classList.remove("blur");
})

function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pageNum = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  // Need to create the code that will take the information from the html form and route it into here
  let idOfBook = myLibrary.length;
  let titleRow = document.getElementById("book-title").value;
  let authorRow = document.getElementById("author").value;
  let pageCountRow = document.getElementById("page-count").value;
  let readStatusRow = document.getElementById("read-status").checked;

  if (titleRow == "" || authorRow == "" || pageCountRow == "") {
    alert("Please make sure to fill out all form rows");
  } else {
    let newBook = new Book(idOfBook, titleRow, authorRow, pageCountRow, readStatusRow);
    myLibrary.push(newBook);
    localStorage.setItem('my_library', JSON.stringify(myLibrary));
  }
}

// Update the DOM to show all of the books in the library and add other functions
function displayLibrary() {
  myLibrary = JSON.parse(localStorage.getItem('my_library')) || [];
  resetDisplay();
  for (i = 0; i < myLibrary.length; i++){
    let row = document.createElement("tr");
    row.classList.add("book-entery");
    table.appendChild(row);

    let idData = document.createElement("td");
    idData.innerHTML = myLibrary[i].id;
    row.appendChild(idData);

    let titleData = document.createElement("td");
    titleData.innerHTML = myLibrary[i].title;
    row.appendChild(titleData);

    let authorData = document.createElement("td");
    authorData.innerHTML = myLibrary[i].author;
    row.appendChild(authorData);

    let pageNumData = document.createElement("td");
    pageNumData.innerHTML = myLibrary[i].pageNum;
    row.appendChild(pageNumData);

    let readStatusData = document.createElement("td");
    readStatusData.innerHTML = myLibrary[i].read;
    row.appendChild(readStatusData);

    let deleteBtn = document.createElement("td");
    deleteBtn.addEventListener("click", removeBookFromLibrary);
    deleteBtn.appendChild(document.createElement("a")).classList.add("fas", "fa-trash");
    deleteBtn.href = "#";
    row.appendChild(deleteBtn);
  }

  function resetDisplay() {
    table.innerHTML = "";
  }

  function removeBookFromLibrary() {
    myLibrary.splice(i-1, 1);
    localStorage.setItem('my_library', JSON.stringify(myLibrary));
    resetDisplay();
    displayLibrary();
  }
  // for (book of myLibrary) {
  //   console.log(book.id);
  //   let row = document.createElement("tr");
  //   let checkedBox = document.createElement("INPUT");
  //   checkedBox.setAttribute("type", "checkbox");
  //   if (book.read === true) {
  //     checkedBox.checked = true;
  //   } else {
  //     checkedBox.checked = false;
  //   }
  //   table.appendChild(row);
  //   let bookIdRow = document.createElement("td").innerHTML = book.id;
  //   let titleRow = document.createElement("td").innerHTML = book.title;
  //   let authorRow = document.createElement("td").innerHTML = book.author;
  //   let pageNumRow = document.createElement("td").innerHTML = book.pageNum;
  //   let checkboxRow = document.createElement("td").appendChild(checkedBox);
  //   // Create a delete button
  //   let entryDelete = document.createElement("td");
  //   let aHref = document.createElement("a");
  //   aHref.href = "#";
  //   let fontAwesome = document.createElement("i");
  //   aHref.appendChild(fontAwesome);
  //   entryDelete.appendChild(aHref);
  // }
}


submitBtn.addEventListener('click', addBookToLibrary);

displayLibrary();
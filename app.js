let myLibrary = [];
let table = document.querySelector(".table-body");
let newBookBtn = document.getElementById("new-book");
let form = document.querySelector(".new-book-form");
let content = document.getElementById("content");
let closeForm = document.querySelector(".close-form");
let submitBtn = document.querySelector(".add-book-btn");
let readStatusRow = document.getElementById("read-status");

window.addEventListener('load', () => {
  myLibrary = JSON.parse(localStorage.getItem('my_library')) || [];
  displayLibrary();
});

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

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pageNum = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  // Need to create the code that will take the information from the html form and route it into here
  let titleRow = document.getElementById("book-title").value;
  let authorRow = document.getElementById("author").value;
  let pageCountRow = document.getElementById("page-count").value;
  let readStatusRow = document.getElementById("read-status").checked;

  if (titleRow == "" || authorRow == "" || pageCountRow == "") {
    alert("Please make sure to fill out all form rows");
  } else {
    let newBook = new Book(titleRow, authorRow, pageCountRow, readStatusRow);
    myLibrary.push(newBook);
    localStorage.setItem('my_library', JSON.stringify(myLibrary));
  }
}

// Update the DOM to show all of the books in the library and add other functions
function displayLibrary() {
  resetDisplay();
  for (let i = 0; i < myLibrary.length; i++){

    let row = document.createElement("tr");
    row.classList.add("book-entery");
    row.setAttribute("book-id", i+1);
    table.appendChild(row);

    let idData = document.createElement("td");
    idData.innerHTML = i+1;
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

    let readStatusData = document.createElement("td").appendChild(document.createElement("input"));
    readStatusData.type = "checkbox";
    readStatusData.classList.add("read-status");
    if (myLibrary[i].read == true) {
      readStatusData.checked = true;
    } else {
      readStatusData.checked = false;
    }
    row.appendChild(readStatusData);
    readStatusData.addEventListener("click", () => {
      if (myLibrary[i].read == true) {
        myLibrary[i].read = false;
        localStorage.setItem('my_library', JSON.stringify(myLibrary));
      } else {
        myLibrary[i].read = true;
        localStorage.setItem('my_library', JSON.stringify(myLibrary));
      }
    });

    let deleteBtn = document.createElement("td");
    deleteBtn.setAttribute("delete-id", myLibrary[i].id)
    deleteBtn.appendChild(document.createElement("a")).classList.add("fas", "fa-trash");
    deleteBtn.href = "#";
    row.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", removeBookFromLibrary);
  }

  function resetDisplay() {
    table.innerHTML = "";
  }

  function removeBookFromLibrary() {
    myLibrary.splice(this.parentNode.rowIndex - 1, 1);
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
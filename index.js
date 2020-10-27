
let myLibrary = [];

if (localStorage.getItem('books') !== null) {
    console.log("load")
    let books = JSON.parse(localStorage.getItem('books'))
    books.forEach(book => {
        myLibrary.push(new Book(book.title, book.author, book.pages, book.status))
    })
}


function Book(title, author, pages, status) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
}

Book.prototype.info = function () {
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.status + '.'
}

Book.prototype.readStatus = function (e) {
    card = e.target.parentElement;
    index = card.id;

    if (myLibrary[index].status === "Unread") {
        myLibrary[index].status = "Read";
        card.remove()
        renderLibrary()

    } else if (myLibrary[index].status === "Read") {
        myLibrary[index].status = "Unread";
        card.remove()
        renderLibrary()
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)
    Book(myLibrary[0])
}

function submitBook(title, author, pages, status) {

    const userBook = new Book(title, author, pages, status)
    console.log(userBook)
    addBookToLibrary(userBook)
    console.log(myLibrary)
    renderLibrary()
}

function renderLibrary() {
    console.log("render")
    for (let i = 0; i <= (myLibrary.length); i++) {
        card = document.getElementById(i)
        if (card != null) {
            card.remove()
        }
    }

    for (let i = 0; i < myLibrary.length; i++) {
        libraryContainer = document.querySelector('#libraryContainer')
        let card = document.createElement('div');
        card.classList.add("card");
        card.setAttribute("id", i)
        let infoPrint = document.createElement('p');
        infoPrint.textContent += myLibrary[i].info();

        btn = document.createElement("BUTTON")
        btn.textContent += "Delete"
        btn.value = i;
        btn.onclick = deleteCard;

        readStatusBtn = document.createElement("BUTTON");
        readStatusBtn.textContent += "Read Status";
        readStatusBtn.value = 0;
        readStatusBtn.onclick = Book.prototype.readStatus;

        card.appendChild(infoPrint);
        libraryContainer.appendChild(card);
        card.appendChild(btn);
        card.appendChild(readStatusBtn)
    }
    localStorage.setItem('books', JSON.stringify(myLibrary))
}

function deleteCard(e) {
    let index = e.target.value;
    card = document.getElementById(index)
    card.remove()
    myLibrary.splice(index, 1);
    console.log(myLibrary)
    renderLibrary()
}


document.getElementById("form").style.display = "none";
document.getElementById("hide").style.display = "none";

function buttonToggle(a) {
    if (a == 1) {
        document.getElementById("show").style.display = "block";
        document.getElementById("form").style.display = "none";
        document.getElementById("hide").style.display = "none";
    }
    else {
        document.getElementById("show").style.display = "none";
        document.getElementById("form").style.display = "block";
        document.getElementById("hide").style.display = "block";
        a == 1
    }
}

renderLibrary()


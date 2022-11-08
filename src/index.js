
let artTitle = document.createElement("h2")
let commentsSect = document.getElementById("comments-section")

// IF YOU HAVE TO DO W EVENT LISTENER
// document.addEventListener("DOMContentLoaded", () => {
//     fetch('http://localhost:3000/current-exhibits/1')
//     .then(response => response.json())
//     .then((object) => {
//         renderArt(object)
//         handleForm(object.comments)
//     })
//    }
// )

function fetchyFetch() {
    fetch('http://localhost:3000/current-exhibits/1')
    .then(response => response.json())
    .then((object) => {
        renderArt(object)
        handleForm(object.comments)
    })
}

fetchyFetch()

function renderArt(object) {
    while (commentsSect.firstChild) {
        commentsSect.removeChild(commentsSect.firstChild)
    }
    let artTitle = document.getElementById("exhibit-title")
    let ticketsBought = document.getElementById("tickets-bought")
    let artDescription = document.getElementById("exhibit-description")
    let artImage = document.getElementById("exhibit-image")
    let buyTixBtn = document.getElementById("buy-tickets-button")
    let tixNumber = object.tickets_bought
    artTitle.innerText = object.title
    ticketsBought.innerText = `${tixNumber} tickets bought`
    artDescription.innerText = object.description
    artImage.src = object.image
    buyTixBtn.addEventListener("click", () => { updateTixNumber() })
    
    function updateTixNumber() {
        tixNumber++
        ticketsBought.innerText = `${tixNumber} tickets bought`
    }

    let artComments = object.comments
    for (let comment of artComments) {
        commentsFunction(comment) 
        }
    }
    function commentsFunction(comment) {
        let commentP = document.createElement("p")
        commentP.innerHTML = comment
        commentsSect.appendChild(commentP)
        }
        
    function handleForm(comments) {
        let addCommentForm = document.getElementById("comment-form")
        console.log(addCommentForm)
        addCommentForm.addEventListener("submit", (e) => {
            e.preventDefault()
            console.log([...comments, e.target["comment-input"].value])
                fetch('http://localhost:3000/current-exhibits/1', {
                method: 'PATCH',
                body: JSON.stringify({
                    comments: [...comments, e.target["comment-input"].value]
                }),
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                },
            })
            .then (response => response.json())
            .then ((data) => {
                commentsFunction(data.comments[comments.length - 1])
                fetchyFetch()
            }
            ) 
        })
}
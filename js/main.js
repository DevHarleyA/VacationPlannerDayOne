let placeName = document.querySelector('#destinationName')
let place = document.querySelector('#location')
let photo = document.querySelector('#photoURL')
let desc = document.querySelector('#description')
const destList = document.querySelector('.insertHere')

document.querySelector('form').addEventListener('submit', createNew)

// Add Function
function createNew(e) {
    e.preventDefault()
    if(placeName.value == '') {
        return
    }

    // enclosing div
    const cardDiv = document.createElement('div')
    destList.appendChild(cardDiv)
    cardDiv.className = 'col'
    
    // card shell
    const cardShell = document.createElement('div')
    cardDiv.appendChild(cardShell)
    cardShell.className = 'card'
    cardShell.style = 'width: 18rem;'
    
    // card image
    const cardImage = document.createElement('img')
    cardShell.appendChild(cardImage)
    if(photo.value == '') {
        cardImage.src = 'https://www.marsh.com/content/dam/marsh/Imagery/marsh-2/thumbnail-768x768/airline-in-clouds.jpg'
    } else {
        cardImage.src = photo.value
    }
    cardImage.className = 'card-img-top'

    // card body
    const cardBody = document.createElement('div')
    cardShell.appendChild(cardBody)
    cardBody.className = 'card-body'

    // location
    const location = document.createElement('h4')
    cardBody.appendChild(location)
    location.className = 'card-title'
    location.innerText = place.value

    // name
    const dest = document.createElement('h5')
    cardBody.appendChild(dest)
    dest.className = 'card-title'
    dest.innerText = placeName.value

    // description
    const details = document.createElement('p')
    cardBody.appendChild(details)
    details.className = 'card-text'
    details.innerText = desc.value

    // edit button
    const edits = document.createElement('button')
    cardBody.appendChild(edits)
    edits.className = 'btn btn-primary me-2'
    edits.innerText = 'Edit Place'
    edits.addEventListener('click', editPlace)

    // delete button
    const removeBtn = document.createElement('button')
    cardBody.appendChild(removeBtn)
    removeBtn.className = 'btn btn-danger me-2'
    removeBtn.innerText = 'Delete Place'
    removeBtn.addEventListener('click', deletePlace)

    // Change title of Card Category
    document.querySelector('.wishList').innerText = 'My WishList'

    // empty form for new submission
    placeName.value = ''
    place.value = ''
    photo.value = ''
    desc.value = ''
}

// Update Function
function editPlace(e) {
    let thisCard = e.target.parentNode
    let destinationName = thisCard.childNodes[0]
    let locationName = thisCard.childNodes[1]
    let photo = e.target.parentNode.parentNode.childNodes[0]
    let desc2 = thisCard.childNodes[2]

    let newDestination = window.prompt('What do you want to see?')
    let newLocation = window.prompt('Where is your destination?')
    let newURL = window.prompt('Did you have a new image URL? [Please enter URL only]')
    let newDesc = window.prompt('Why do you want to go here?')

    destinationName.innerText = newDestination
    locationName.innerText = newLocation

    if (newURL.length > 5) {
        photo.src = newURL
    }

    desc2.innerText = newDesc
}


// Delete Function - Works
function deletePlace(e) {
    if (e.target.innerText = 'Delete Place') {
        e.target.parentNode.parentNode.parentNode.remove()
    }
}
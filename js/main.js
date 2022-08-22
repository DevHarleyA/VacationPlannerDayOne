const placeName = document.querySelector('#destinationName')
const place = document.querySelector('#location')
const photo = document.querySelector('#photoURL')
const desc = document.querySelector('#description')
const destList = document.querySelector('.insertHere')

document.querySelector('.submitButton').addEventListener('click', createNew)
document.querySelector('.insertHere').addEventListener('click', deletePlace)

// Add Function
function createNew(e) {
    e.preventDefault()
    if(placeName.value == '') {
        return
    }

    const cardDiv = document.createElement('div')
    destList.appendChild(cardDiv)
    cardDiv.className = 'col'
    
    const cardShell = document.createElement('div')
    cardDiv.appendChild(cardShell)
    cardShell.className = 'card'
    cardShell.style = 'width: 18rem;'
    
    const cardImage = document.createElement('img')
    cardShell.appendChild(cardImage)
    if(photo.value == '') {
        cardImage.src = 'https://placekitten.com/200/300'
    } else {
        cardImage.src = photo.value
    }
    cardImage.className = 'card-img-top'

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

    // delete button
    const removeBtn = document.createElement('button')
    cardBody.appendChild(removeBtn)
    removeBtn.className = 'btn btn-danger me-2'
    removeBtn.innerText = 'Delete Place'

    // empty form for new submission
    placeName.value = ''
    place.value = ''
    photo.value = ''
    desc.value = ''
}

// Update Function
function editPlace(e) {
    const destinationName = e.target.parentNode.childNodes[0].innerText
    const locationName = e.target.parentNode.childNodes[1].innerText
    // const photo = e.target.parentNode.parentNode.
    const desc2 = 

    console.log(destinationName)
}

// Delete Function - Works
function deletePlace(e) {
    e.target.parentNode.parentNode.parentNode.remove()
}
const editBtn = document.getElementsByClassName('editBtn')

Array.from(editBtn).forEach(function (element) {
    element.addEventListener('click', function () {
        let destinationName = this.parentNode.childNodes[3].innerText
        let locationName = this.parentNode.childNodes[1].innerText
        let desc2 = this.parentNode.childNodes[5].innerText

        console.log(destinationName + " <= destination name " + locationName + " <= location name " + desc2 + " <= description." )

        let newDestination = window.prompt('What do you want to see?')
        let newLocation = window.prompt('Where is your destination?')
        let newDesc = window.prompt('Why do you want to go here?')

        console.log("New Place: " + newDestination + ". New Location: " + newLocation + ". New Desc: " + newDesc)
        // fetch goes here
        fetch('changePlace', {
            method: 'put',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                'newDestinationName': newDestination,
                'newLocation': newLocation,
                'newDescription': newDesc,
                'oldDestinationName': destinationName
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .then(data => {
            console.log(data)
            window.location.reload(true)
        })
    })
})


// Delete Function - Works
function deletePlace(e) {
    if (e.target.innerText = 'Delete Place') {
        e.target.parentNode.parentNode.parentNode.remove()
    }
}
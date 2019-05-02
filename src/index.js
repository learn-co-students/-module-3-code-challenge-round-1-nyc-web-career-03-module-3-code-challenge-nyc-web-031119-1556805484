document.addEventListener('DOMContentLoaded', (e) => {
  const beerList = document.querySelector('#list-group')
  const beerDetails = document.querySelector('#beer-detail')

  fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    .then(beers => {
      beers.forEach(beer => {
        beerList.innerHTML += `<li class="list-group-item" data-id=${beer.id}>${beer.name}</li>`
      })

    })

  document.addEventListener('click', (e) => {
    let beerId = e.target.dataset["id"]

    if (e.target.className === document.querySelector('.list-group-item').className){
      fetch(`http://localhost:3000/beers/${beerId}`)
      .then(resp => resp.json())
      .then(beer => {
        beerDetails.innerHTML = `
        <h1>${beer.name}</h1>
        <img src=${beer.image_url}>
        <h3>${beer.tagline}</h3>
        <textarea>${beer.description}</textarea>
        <button id="edit-beer" data-id=${beer.id} class="btn btn-info">Save</button>`
      })
    }
  })

  document.addEventListener('click', (e) => {
    let beerId = e.target.dataset["id"]
    let saveButton = document.querySelector('#edit-beer')

    if (e.target === document.querySelector('#edit-beer')){
      fetch(`http://localhost:3000/beers/${beerId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          description: document.querySelector('textarea').value
        })
      })
      alert("Changes have been saved!")
    }

  })

})

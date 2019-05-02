document.addEventListener('DOMContentLoaded', function() {
  const BEERS_URL = 'http://localhost:3000/beers';
  const beerDetail = document.querySelector('#beer-detail');
  const listGroup = document.querySelector('#list-group');
  function fetchBeers(url) {
    fetch(url)
    .then(res => res.json())
    .then(beers => {
        renderBeers(beers)
      })
  }

  function renderBeers(beers) {
    listGroup.innerHTML = ''
    beers.forEach(function(beer) {
      let li = document.createElement('li');
      listGroup.appendChild(li);
      li.textContent = beer.name;
      li.dataset.beerId = beer.id;
    })
  }
  fetchBeers(BEERS_URL)

  function fetchBeer(url) {
    fetch(url)
    .then(res => res.json())
    .then(beer => renderBeer(beer))
  }

  function renderBeer(beer) {
    beerDetail.innerHTML = '';
    beerDetail.innerHTML = `
    <h1>${beer.name}</h1>
    <img src=${beer.image_url} >
    <h3>${beer.tagline}</h3>
    <textarea id="beer-desc-${beer.id}">${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info" data-beer-btn="${beer.id}">Save</button>
    `
  }

  listGroup.addEventListener('click', function(e) {
    if (e.target.hasAttribute('data-beer-id')) {
      fetchBeer(`${BEERS_URL}/${e.target.dataset.beerId}`);
    }
  });

  function submitEdit(beerDesc, beerId) {
    let formData = {
      description: beerDesc
    }

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "applicaion/json"
      },
      body: JSON.stringify(formData)
    }

    fetch(`${BEERS_URL}/${beerId}`, configObj)
  }

  beerDetail.addEventListener('click', function(e) {
    if (e.target.hasAttribute("data-beer-btn")) {
      let beerId = e.target.dataset.beerBtn;
      let beerDesc = document.querySelector(`#beer-desc-${e.target.dataset.beerBtn}`);
      submitEdit(beerDesc.value, beerId);
    }
  })
})

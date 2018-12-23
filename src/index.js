document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded')

})


const tableRow = document.getElementById('table-body')
tableRow.addEventListener('click', editPop)
const editForm = document.getElementById('dog-form')
editForm.addEventListener('submit', editDog)

fetch('http://localhost:3000/dogs')
.then(res => res.json())
.then(renderDogs)

function renderDogs(data) {
  data.forEach(dogsElements)
}

function dogsElements(dog) {
    const row = document.createElement('tr')
    row.dataset.id = dog.id
    const name = document.createElement('td')
    name.setAttribute('class', 'name-text')
    name.innerText = dog.name
    const breed = document.createElement('td')
    breed.setAttribute('class', 'breed-text')
    breed.innerText = dog.breed
    const sex = document.createElement('td')
    sex.setAttribute('class', 'sex-text')
    sex.innerText = dog.sex
    const edit = document.createElement('td')
    edit.innerText = 'Edit Dog'
    const button = document.createElement('button')
    button.innerText = 'Edit'
    edit.appendChild(button)
    row.appendChild(name)
    row.appendChild(breed)
    row.appendChild(sex)
    row.appendChild(edit)
    tableRow.appendChild(row)
}

function editPop(event) {
  if (event.target.innerText === 'Edit') {
    let dogId = document.querySelector(".dog-id")
    let parentElement = event.target.parentElement.parentElement
    const nameValue = event.target.parentElement.parentElement.children[0].innerText
    const breedValue = event.target.parentElement.parentElement.children[1].innerText
    const sexValue = event.target.parentElement.parentElement.children[2].innerText
    const nameInput =  document.getElementById('name-input')
    const breedInput =  document.getElementById('breed-input')
    const sexInput =  document.getElementById('sex-input')
    dogId.value = parentElement.dataset.id
    nameInput.value = nameValue
    breedInput.value = breedValue
    sexInput.value = sexValue
  }
}

function editDog(event) {
  event.preventDefault()
  let dogId = event.target.querySelector(".dog-id").value
  const nameInput =  document.getElementById('name-input').value
  const breedInput =  document.getElementById('breed-input').value
  const sexInput =  document.getElementById('sex-input').value
  fetch(`http://localhost:3000/dogs/${dogId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput,
      breed: breedInput,
      sex: sexInput
    })
  }).then(res => res.json()).then(data => {
    let tr = document.querySelector(`[data-id='${dogId}']`)
    tr.querySelector('.name-text').innerText = nameInput
    tr.querySelector('.breed-text').innerText = breedInput
    tr.querySelector('.sex-text').innerText = sexInput
    editForm.reset()
  })
}

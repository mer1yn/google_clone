const inputElement = document.getElementById('search_input')
const inputContainer = document.getElementById('input_container')
const searchButton = document.getElementById('search_button')

const listContainer = document.getElementById('list_container')
const listElement = document.getElementById('list')
listContainer.style.display = "none"

const searchList = getLastSearches()

inputElement.addEventListener('keyup', handleInputChange)
searchButton.addEventListener('click', handleButtonClick)

function getLastSearches() {
    const searchList = localStorage.getItem('searchList')
    if (!searchList) {
        return []
    }
    return JSON.parse(searchList)
}

function handleInputChange(e) {
    if(e.key === 'Enter') {
        handleButtonClick(null)
        return
    }

    if (e.target.value.length > 0) {
        listElement.innerHTML = "";
        const currentList = searchList.filter((obj, index) => obj.indexOf(e.target.value) >= 0)
        inputContainer.classList.add('active')
        listContainer.style.display = "block"
        let li
        if (currentList.length) {
            currentList.forEach((obj, index) => {
                li = document.createElement('li')
                li.innerHTML = obj
                li.addEventListener('click', () => {
                    window.location = `https://www.google.com/search?&q=${obj}`
                })
                listElement.append(li)
            })
        } else {
            li = document.createElement('li')
            li.innerHTML = "No hay resultados guardados."
            listElement.appendChild(li)
        }
    } else {
        inputContainer.classList.remove('active')
        listContainer.style.display = "none"
    }

}

function handleButtonClick(e) {
    searchList.push(inputElement.value)
    localStorage.setItem('searchList', JSON.stringify(searchList))
    window.location = `https://www.google.com/search?&q=${inputElement.value}`
}
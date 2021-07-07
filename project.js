const form = document.getElementById('film-form');
const titleElement = document.querySelector('#title');
const directorElement = document.querySelector('#director');
const urlElement = document.querySelector('#url');
const cardBody = document.querySelectorAll('.card-body')[1];
const clearButton = document.getElementById('clear-films');

eventListeners();

function eventListeners(){

    form.addEventListener('submit', addFilm);
    document.addEventListener('DOMContentLoaded', function(){
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    })
    cardBody.addEventListener('click', deleteFilm); 
    clearButton.addEventListener('click', clearAllFilms);

}

function addFilm(e){   
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === '' || director === '' || url === '')
        UI.displayMessages('danger', 'Fill all areas please!');    
    else{
        const newFilm = new Film(title, director, url);
        UI.addFilmToUI(newFilm); 
        Storage.addFilmToStorage(newFilm);
        UI.displayMessages('success', 'Film added succesfully!');
        UI.clearInputs(titleElement, urlElement, directorElement);
    }

    e.preventDefault();
}

function deleteFilm(e){

    if(e.target.id === 'delete-film'){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.
            previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages('warning', 'Film deleted succesfully!');
    }
}

function clearAllFilms(){
    if(confirm('Are you sure to delete all films?')){
        UI.clearAllFilmFromUI();
        Storage.clearAllFilmFromStorage();
    }    
}
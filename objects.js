//accessing buttons in the dom
const addMoovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');
const movies = []; //movies array

//add movie content to page, append new movies to list.
const renderMovies = (filter = '') => {
    const movieList = document.getElementById('movie-list');

    if (movies.length === 0) {
        movieList.classList.remove('visible');
        return;
    } else {
        movieList.classList.add('visible');
    }
    movieList.innerHTML = ''; //clearance can happen after if check,//note not the best approach. May cause performance issue.

    const filteredMovies = !filter ? movies :
        movies.filter(movie => movie.info.title.includes(filter));

    filteredMovies.forEach(movie => {
        const movieEl = document.createElement('li');
        const { info, ...otherProps } = movie; //object destructuring(same as array destructring(pulling properties))    

        console.log(otherProps) //pull out properities not included by name from syntax(MovieID)
            // movieEl.textContent = movie.info.title; //chain properties syntax
            // const { title: movieTitle } = info; //accessed property in object and assigned new name.
        let { getFormattedTitle } = movie;
        // getFormattedTitle = getFormattedTitle.bind(movie);//bind prepares function for future use.
        let text = getFormattedTitle.call(movie) + ' - '; //apply(takes array argument) can be used as well.
        for (const key in info) { //for in loop used to go through all keys in an object
            if (key !== 'title' && key !== '_title') {
                text = text + `${key}: ${info[key]}`;
            }
        }
        movieEl.textContent = text;
        movieList.append(movieEl);
    });
};


//adding a movie, by gather using input
const addmovieHandler = () => {
    const title = document.getElementById('title').value; //value property used to hold user input. 
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    //'trim' Removes the leading and trailing white space and line terminator characters from a string.
    if (
        extraName.trim() === '' ||
        extraValue.trim() === ''
    ) {
        return;
    }
    const newMovie = {
        //shortcut if property & key name are the same, one name can be used(can't be a string);
        info: {
            set title(val) {
                if (val.trim === '') {
                    this._title = 'DEFAULT';
                    return;
                }
                this._title = val;
            },
            get title() {
                return this._title; //touppercase transformation could be appended here.
            },
            [extraName]: extraValue //assigned dynamically added property & value.
        },
        MovieID: Math.random().toString(), //Returns a number between 0 and 1 to generate pseudorandom ID.
        //baking logics in code below,don't use arrow function. 
        getFormattedTitle() {
            return this.info.title.toUpperCase();
        }
    };

    newMovie.info.title = title;
    console.log(newMovie.info.title);

    movies.push(newMovie); //pushed new movie on movies, won't output in the dom. 
    renderMovies();
};

const searchMovieHandler = () => {
    const filterTerm = document.getElementById('filter-title').value;
    renderMovies(filterTerm); //funct forwareded to var so that it is accepted only when filter btn is clicked.
};

addMoovieBtn.addEventListener('click', addmovieHandler); //add movie btn func added
searchBtn.addEventListener('click', searchMovieHandler); // search btn handler
let timer;


/* toggle menu when user clicks on hamburger icon */
function toggleMenu() {
    const menuButton = document.querySelector('#menu-button'); /* matches first element in css that matches #menu-button */
    const menuPopup = document.querySelector('.menu-popup')

    menuButton.addEventListener('click', function() {
        if(menuPopup.style.display === 'none' || menuPopup.style.display === ''){
            menuPopup.style.display = 'block';
        }
        else{
            menuPopup.style.display = 'none';
        }
    });
}

function searchMovie(){

    const input = document.getElementById('search');
    const searchPopup = document.getElementById('search-popup');
    input.addEventListener('input', () => {

        clearTimeout(timer);
        
        const charCount = input.value.length;
        if (charCount >= 1){
            console.log("user is typing")
            //display the serach popup if its not displayed
            if(searchPopup.style.display === 'none' || searchPopup.style.display === ''){
                searchPopup.style.display = 'block';
            }
            

            //set a timeout function to call api if user has not typed anyting for 1 second
            timer = setTimeout(() => inputTimerFunction(input.value), 1000); //sets ananonymous function "()" and scheduels it to run 3 seconds later. when x seconds pass, it grabs latest input.value and runs it. essentially saying setTimeout(function, ms)



        }
        else{ //char count is zero
            if(searchPopup.style.display === 'block'){
                searchPopup.innerHTML = "";
                searchPopup.style.display = 'none';
                console.log('pop up gone')
            }
        }

    });
}

function addMovie(){
    const addButtons = document.querySelectorAll('.add');
    addButtons.forEach(button => button.addEventListener('click', function(event){
        console.log(`add button was clicked, id is ${button.id}`);
        
        }));
    
    
}

function inputTimerFunction(movieTitle){

    const parentDiv = document.getElementById('search-popup');

    tmdb_key = '45ae8aefc6ec1806724f0bb383d75ff9';
    tmdb_token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWFlOGFlZmM2ZWMxODA2NzI0ZjBiYjM4M2Q3NWZmOSIsIm5iZiI6MTc0MDYwMzY2NC40NDYsInN1YiI6IjY3YmY4MTEwYzkzMjcxNDkxZjM1OGEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fjgmOV99fmdXl336Hnfwk06AXSepTug2k3gLTHr9xV4';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: tmdb_token
        }
    };

    fetch(`https://api.themoviedb.org/3/search/movie?query=${movieTitle}&include_adult=false&language=en-US&page=1`, options)
    .then(res => res.json())
    .then(json => {
        let movieList = json.results || [];
        parentDiv.innerHTML = "";

        //testing
        for(const movie of movieList){

            //search result container
            var searchResultDiv = document.createElement('div');
            searchResultDiv.classList.add('search-result');

            //movieDiv containter: contains movie image
            var movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');
            searchResultDiv.appendChild(movieDiv);

            var movieImage = document.createElement('img');
            movieImage.classList.add('movie-image');
            movieDiv.appendChild(movieImage);

            //movie text container: contatins date, year and rating
            var textDiv = document.createElement('div');
            textDiv.classList.add('text-container');
            searchResultDiv.appendChild(textDiv);

            var titleDiv = document.createElement('div');
            titleDiv.classList.add('title');

            var yearDiv = document.createElement('div');
            yearDiv.classList.add('year');

            var ratingDiv = document.createElement('div');
            ratingDiv.classList.add('rating');

            textDiv.appendChild(titleDiv);
            textDiv.appendChild(yearDiv);
            textDiv.appendChild(ratingDiv);

            var buttonDiv = document.createElement('div');
            buttonDiv.classList.add('add-button');
            searchResultDiv.appendChild(buttonDiv);

            let id = movie.id || "N/A";
            var button = document.createElement('button');
            button.classList.add('add');
            button.id = id;
            button.textContent = 'Add';
            buttonDiv.appendChild(button);




            let moviePoster;
            if(movie.poster_path){
                moviePoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            }
            else{
                moviePoster = "";
            }

            let movieTitle = movie.original_title || "Title: Unknown Title";
            let movieDate = movie.release_date || "Unknown Date";
            let rating = movie.vote_average || "N/A";

            movieImage.src = moviePoster;
            titleDiv.textContent = `${movieTitle}`;
            yearDiv.textContent = `Date: ${movieDate}`;
            ratingDiv.textContent = `Rating: ${rating}`;

            parentDiv.appendChild(searchResultDiv)

        }
        //VERY IMPORTANT: 
        //PURPPOSE: function call to listen for when use clicks on add button
        //Reason for placement: if placed inside the window.onlaod, when page loads there are no 'add' buttons in the DOM yet 
        //                      due to no searces from user. Since .add buttons dont exist at that moment, document.querySelectorAll('.add') 
        //                      returns empty list and no event listeners are attached. If placed inside timer function, then the list will return 
        //                      all .add buttons from the user search

        addMovie();

        })
}



window.onload = function() {
    toggleMenu();
    searchMovie();
};

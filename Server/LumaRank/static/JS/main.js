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

function toggleMovie(){
    /* toggle movie pop up when user clicks on watched movie */

    const movie = document.querySelectorAll('.movie');
    const moviePopup = document.querySelector('.movie-popup');
    const exitMoviePopup = document.querySelector('.exit-movie-popup');
    const overlay = document.querySelector('.overlay');

    /* loop thorugh each movie and add an event listener */
    /* 'movie.forEach' tells JS to loop through each movie, but it does not know what to do with each movie so...*/
    /* specify 'movie.forEach(movie =>...)' movie => is just like saying 'function(movie)'; we need movie parameter so JS knows which movie to work on*/ 
    movie.forEach(movie => movie.addEventListener('click', function(){
        if(moviePopup.style.display === 'none' || moviePopup.style.display === ''){
            moviePopup.style.display = 'flex';
            overlay.style.display = 'block';
        }
        else{
            moviePopup.style.display = 'none';
            overlay.style.display = 'none';
        }
    }));
    exitMoviePopup.addEventListener('click', function(){
        moviePopup.style.display ='none';
        overlay.style.display = 'none';
    });

}
toggleMenu();
toggleMovie();

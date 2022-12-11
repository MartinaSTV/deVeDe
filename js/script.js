
import {saveToDatabase, displayMovieList } from './firebase.js'

// delat upp js koden i två moduler för att få en mer lättläst kod som inte är 
//för lång och som är tydligt delat i olika sectioner efter innehåll.

// ToDo
 // spara i värdet från input i variabler
 // click funktion för att spara 
 // spara ner i databasen
 // Kunna se din film lista
 // Ta bort från listan 
 // söka i Listan Query/where
 // skriv ut din sökning. 
 // lägg k moduler för att lättare läsa koden. 

 const title = document.querySelector('#title')
 const genre = document.querySelector('#genre')
 const date = document.querySelector('#date')

 let movie = {
  titleValue: ``,
  genreValue: ``,
  dateValue: 0
 };
 
 function clickSave(){

   let btn = document.querySelector('#btnAdd')
   btn.addEventListener('click', async () =>{

    movie.titleValue = title.value
    movie.genreValue = genre.value
    movie.dateValue = date.value
      await saveToDatabase(movie)

     });
  
 }
 clickSave()

function displayMovieListBtn(){
  let btnShowList = document.querySelector('#show')
  btnShowList.addEventListener('click', async () =>{

    await displayMovieList()
    hideShow()

  })
}
displayMovieListBtn()

function hideShow() {
  let showList = document.querySelector('#movieList')
  if (showList.style.display === "none") {
    showList.style.display = "block";
  } else {
    showList.style.display = "none";
  }
}
export {}

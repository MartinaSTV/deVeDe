
import {saveToDatabase, displayMovieList, displaySearchResult, searchList, deleteFromMovieList} from './firebase.js'

/* Delat upp js koden i två moduler för att få en mer lättläst kod som inte är 
för lång och som är tydligt delat i olika sectioner efter innehåll.
 I denna modulen ligger alla knappar och dess lyssnare. 
 I den andra modulen firebase.js ligger funktionerna som jobbar emot firease och 
 även display funktionerna som visar på sida */

// ToDo
 // spara i värdet från input i variabler
 // click funktion för att spara 
 // spara ner i databasen
 // Kunna se din film lista
 // Ta bort från listan 
 // söka i Listan Query/where
 // skriv ut din sökning. 
 // lägg i moduler för att lättare läsa koden. 

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
      await displayMovieList()
      title.value = ``
      genre.value = ``
      date.value = 0
     });
  
 }
 clickSave()

function displayMovieListBtn(){
  let btnShowList = document.querySelector('#show')
  btnShowList.addEventListener('click', async () =>{
    
    displayMovieList()
    hideShow()

  })
}
displayMovieListBtn()

function hideShow() {
  let showList = document.querySelector('#movieList')
  showList.classList.toggle('hide');
}
export {}

function clickdelete(){
  const btnRemove = document.querySelectorAll('#remove')
  console.log(btnRemove)

  btnRemove.forEach((remove) =>{
      remove.addEventListener('click', async (event)=>{

          const idButton = event.target.getAttribute('data-ID')//hämtar ID från databas i getAttribute från knappen.
          await deleteFromMovieList(idButton)
          displayMovieList()
          console.log(idButton)
      })
  });
}

function searchMovie(){
  let searchBtn = document.querySelector('#search')
  searchBtn.addEventListener('click', async ()=>{

      console.log('click')
      const result = await searchList()
      displaySearchResult(result)
  })
}
searchMovie()

export {clickdelete}

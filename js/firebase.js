 /* Delat upp js koden i två moduler för att få en mer lättläst kod och som är tydligt delat i olika sectioner efter innehåll.
 I denna modulen ligger funktionerna som jobbar emot firease och 
 även display funktionerna som visar informtionen på sidan 
 I den andra modulen ligger alla knappar och dess lyssnare.*/

 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
 import { getFirestore, collection, addDoc, getDocs, query, where, doc, deleteDoc} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
 import {clickdelete} from './script.js'
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyB4Va_5YtqTrkjP1Be2KxkFSgosoglWUPw",
   authDomain: "devede-c3d08.firebaseapp.com",
   projectId: "devede-c3d08",
   storageBucket: "devede-c3d08.appspot.com",
   messagingSenderId: "989283955613",
   appId: "1:989283955613:web:72167bc968736447093574"
 };

 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app)
 // Initialize Firebase

 async function saveToDatabase(movie){
    console.log(movie)
      try{
            await addDoc(collection(db, 'movie'), movie);
  
      } catch(error){
          console.log('Error', error)
      }
  };

async function displayMovieList(){
  let sectionElem = document.querySelector('#movieList')
  sectionElem.innerHTML = ``
  try{
    let Movielist =  await getDocs(collection(db, 'movie'))
     Movielist.forEach((title) => {
  
        let titleList = `<article class="articleList"><h2>${title.data().titleValue}</h2><p>${title.data().genreValue}</p>
        <p>${title.data().dateValue}</p><button id="remove" data-ID = ${title.id}>Ta bort</button>
        </article>
        `
        sectionElem.insertAdjacentHTML('beforeend', titleList)
     });
     clickdelete()
 }catch (error){
    console.log('error', error);
 }
}

async function deleteFromMovieList(idButton){
    console.log(idButton)

    try{
        await deleteDoc(doc(db,'movie', idButton))

    }catch(error){
       console.log('Error:', error)
    }
}
//check if movie exist.
async function searchList(movie){
    const searchInput = document.querySelector('#inputSearch')
    const searchValue = searchInput.value
    console.log(searchValue)
    try{
        const movieSearch = query (collection(db, 'movie'), where( 'titleValue', '==', searchValue)) // titleValue är namnet i databasen. searchvlue är namet som skrivs in i inpurfältet.
        const result = await getDocs(movieSearch)
        let resultReturn = {} // ett tomt block där result ska skickas in?
    
        result.forEach((resultR)=>{
            console.log(resultR)
            resultReturn = resultR
            console.log(resultReturn)
        })
        return resultReturn
           
    }catch(error){
        console.log('Error:',error)
    }
}

   // visa sökning, finns filmen visa resultat, om inte säg film finns ej.
   async function displaySearchResult(movie){

    let searchList = document.querySelector('#searchList')
    let movieID = movie.id

     if (movieID){

        let searchElem = `<article class="articleSearch"><h2>${movie.data().titleValue}</h2><p>${movie.data().genreValue}</p>
        <p>${movie.data().dateValue}</p></article>
        
        `
        searchList.insertAdjacentHTML('beforeend', searchElem);

     }else{
        searchList.innerText = 'Din film finns ej med i listan'
    }      
};

  export {saveToDatabase, displayMovieList, deleteFromMovieList, displaySearchResult, searchList}
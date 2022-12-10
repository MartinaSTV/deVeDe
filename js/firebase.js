 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
 import { getFirestore, collection, addDoc, getDocs, query, where, doc, deleteDoc} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
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

async function deleteFromMovieList(idButton){
    console.log(idButton)

    try{
        await deleteDoc(doc(db,'movie', idButton))

    }catch(error){
       console.log('Error:', error)
    }
}
  //check if movie exist. getDocs - query-where - show specifik result

async function searchList(){
    const searchInput = document.querySelector('#search')
    const searchValue = searchInput.value
    console.log(searchValue)
    try{
        const movieSearch = query (collection(db, 'movie'), where( 'titleValue', '==', searchValue)) // titleValue är namnet i databasen. searchvlue är namet som skrivs in i inpurfältet.
        const result = await getDocs(movieSearch)
        const resultReturn = {} // ett tomt block där result ska skickas in?
    
        result.forEach((resultR)=>{
            resultReturn = resultR
    
        })
        return resultReturn
           
    }catch(error){
        console.log('Error:',error)
    }
 
   
}
searchList()

async function displaySearchResult(resultReturn){
    
    let ExistInList = await searchList(resultReturn)
    
    let searchList = document.querySelector('#searchList')

        let searchElem = `<article><h2>${resultR.data().titleValue}</h2><p>${resultReturn.data().genreValue}</p>
        <p>${resultReturn.data().dateValue}</p></article>
        
        `
        searchList.insertAdjacentHTML('beforeend', searchElem);

}


function searchMovie(){
    let searchBtn = document.querySelector('#search')
    searchBtn.addEventListener('click', async ()=>{
  
      //await searchList()
      displaySearchResult()
  
    })
      
  }
  searchMovie()
  

  export {saveToDatabase, displayMovieList, deleteFromMovieList}
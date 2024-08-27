

import {
    auth,
    database,
    reference,
    addData,
    retrieveData,
    query
} from "../../Firebase-config/firebase-config.js";

// الحصول على قيمة المفتاح المخزن في sessionStorage
const movieKey = JSON.parse(sessionStorage.getItem("Name-Movie"));

function getMovieDataByName(movieKey) {
    console.log( " is" + movieKey)
    const movieRef = reference(database, "Movies/"+movieKey);
    console.log(movieRef)
   retrieveData(movieRef,(snapshot)=>{
let movieData=snapshot.val();
if(movieData!=null){
    displayMovieData(movieData)
}
else{
    alert("Data wasnt found");
}
   })
}

function displayMovieData(movieData) {
    const section = document.querySelector('.hero');
    section.innerHTML = `
        <div class="movie">
            <img src="${movieData.imageHorizontal}" alt="${movieData.Name}">
            <h2 style="color:red";>${movieData.Name}</h2>
            <p>${movieData.Description}</p>
        </div>
    `;
}

getMovieDataByName(movieKey);




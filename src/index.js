//const:
const url = "http://localhost:3000"
// index.js
/*
steps: 
[]1-when the page loads, fire a function called displayRamens
that requests data from the server to get all of the ramen objects
2- display the imag for each of the ramen using an img tag inside 
the #ramen-menu div]
[3- click on an image from the #ramen-menu div and fire callback
handleClick to see all the info displayed inside the #ramen-detail
div (where it says insert comment here and insert rating here)]
4- attach a submit event listener to the new-ramen form using a 
function called addSubmitListener
5- after the submission, create a new ramen and add it to the 
#ramen-menu div. the new ramen does not need to stay on page 
once the page is refreshed

*** program should have a main function (at the bottom) that 
invokes displayRamens and addSubmitListener after the dom has 
loaded.
*/

// Callbacks
const handleClick = (ramen) => {
  const ramenDetailDiv = document.getElementById("ramen-detail");
  const detailImage = ramenDetailDiv.querySelector(".detail-image")
  const detailName = ramenDetailDiv.querySelector(".name")
  const detailRestaurant = ramenDetailDiv.querySelector(".restaurant")
  const detailRating = document.getElementById("rating-display")
  const detailComment = document.getElementById("comment-display")
  
  detailImage.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = ramen.rating; 
  detailComment.textContent= ramen.comment;  
};

//click on image from #ramen-menu div and fire a callback function
//to see all the info about that ramen displayed inside the
//#ramen-detail div (where it says insert comment here and 
// insert rating here)
/*
attatch a submit eventlistener to the new-ramen form
*/
const addSubmitListener = () => {
  const form = document.querySelector('form')
  form.addEventListener('submit', (e)=> {
    e.preventDefault()
   
    const newRamenName = document.getElementById("new-name").value;
    const newRamenRestaurant = document.getElementById("new-restaurant").value;
    const newRamenImg = document.getElementById("new-image").value;
    const newRamenRating = document.getElementById("new-rating").value;
    const newRamenComment = document.getElementById("new-comment").value;


    const newRamen = {
      name: newRamenName,
      restaurant: newRamenRestaurant,
      image: newRamenImg,
      rating: newRamenRating,
      comment: newRamenComment
   }
   handleSubmit(newRamen);
  })
};

const handleSubmit= (ramen) => {
  const ramenDiv = document.querySelector("#ramen-menu");
  const img = document.createElement("img");
  img.src = ramen.image
  img.addEventListener("click", () => handleClick(ramen));
  ramenDiv.appendChild(img);
};




const displayRamens = () => {
 fetch("http://localhost:3000/ramens")
 .then(response => response.json())
 .then(data => {
  const ramenMenuDiv = document.getElementById('ramen-menu');
  data.forEach(ramen=> {
  const img = document.createElement('img');
  img.src = ramen.image; 
  img.addEventListener("click", () => handleClick(ramen));
  ramenMenuDiv.appendChild(img);
  console.log(ramenMenuDiv)
 })
})
  .catch(err => alert(err));
};

/*
create a function displayFirstRamen
fetch the data from the server when page loads and display its details in the
#ramen-details div
*/
const displayFirstRamen = () => {
  fetch(url + '/ramens')
  .then(response => response.json())
  .then(data => {

    const firstRamen = data[0];

    const ramenDetailDiv = document.getElementById("ramen-detail");
    const detailImage = ramenDetailDiv.querySelector(".detail-image");
    const detailName = ramenDetailDiv.querySelector(".name");
    const detailRestaurant = ramenDetailDiv.querySelector(".restaurant");
    const detailRating = document.querySelector("#rating-display");
    const detailComment = document.querySelector("#comment-display");

    detailImage.src = firstRamen.image;
    detailName.textContent = firstRamen.name;
    detailRestaurant.textContent = firstRamen.restaurant;
    detailRating.textContent = firstRamen.rating;
    detailComment.textContent = firstRamen.comment;
  })
  .catch(err => console.error(err));
}

const main = () => {
  displayRamens();
  addSubmitListener();
  displayFirstRamen();
  
  // Invoke displayRamens here
  // Invoke addSubmitListener here
}
main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

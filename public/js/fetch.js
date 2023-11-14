var photoCount = 0;
var count = document.getElementById('count');

function buildCardsUsingDOMAPI(container, data) {
    let cardDiv = document.createElement('div');
    cardDiv.addEventListener('click', () => cardDiv.style.opacity = '0'); //inspired from https://stackoverflow.com/questions/29017379/how-to-make-fadeout-effect-with-pure-javascript
    cardDiv.addEventListener('transitionend', () => { 
        cardDiv.remove();
        photoCount--;
        count.innerHTML = "Number of Photos: " + photoCount;
    });
    cardDiv.setAttribute('class', 'photo-card');
    let imgElement = document.createElement('img');
    imgElement.setAttribute('src', data.thumbnailUrl);
    let title = document.createElement('p');
    title.setAttribute('class', 'photo-title');
    title.appendChild(document.createTextNode(data.title));
    cardDiv.appendChild(imgElement);
    cardDiv.appendChild(title);
    container.appendChild(cardDiv);
}

function fetchPhotos() {
    fetch("https://jsonplaceholder.typicode.com/albums/2/photos")  
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let container = document.getElementById('photo-list');
            data.forEach(function (photo) {
                buildCardsUsingDOMAPI(container, photo);
                photoCount++;
                count.innerHTML = "Number of Photos: " + photoCount;
            });
        });
}
fetchPhotos();


// function buildCardsUsingStrings(data) {
//     return `<div class="photo-card">
//                 <img class="photo-img" src=${data.thumbnailUrl}/>
//                 <p class="photo-title">${data.title}</p>
//             </div>`;
// }

// function fetchPhotos() {
//     fetch("https://jsonplaceholder.typicode.com/albums/2/photos")
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             let photosHTML = "";
//             data.forEach(function (photo) {
//                 photosHTML += buildCardsUsingStrings(photo)
//             });
//             document.getElementById('photo-list').innerHTML = photosHTML;
//         });
// }
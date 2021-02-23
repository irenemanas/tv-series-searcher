"use strict";let shows=[],favourites=[];const inputElement=document.querySelector(".js-input"),buttonElement=document.querySelector(".js-button");function getDataFromApi(){fetch("http://api.tvmaze.com/search/shows?q="+inputElement.value).then(t=>t.json()).then(t=>{shows=t,paintShows()})}function handleSearch(){getDataFromApi()}function setInLocalStorage(){const t=JSON.stringify(favourites);localStorage.setItem("data",t)}function getFromLocalStorage(){const t=localStorage.getItem("data");if(null===t)favourites=[];else{const e=JSON.parse(t);favourites=e,paintFavourites()}}buttonElement.addEventListener("click",handleSearch);const defaultImg="https://via.placeholder.com/210x295/ffffff/666666/?";function paintShows(){let t="";for(const e of shows){const o=e.show;t+=favourites.findIndex(t=>t.show.id===o.id)>=0?`<li class="show show-favourite js-show" id="${o.id}">`:`<li class="show js-show" id="${o.id}">`,t+=`<h2 class="show__title">${o.name}</h2>`;const s=o.image;t+=null===s?`<img src="${defaultImg}">`:`<img src="${s.medium}" alt="Cartel Serie"></img>`,t+="</li>"}document.querySelector(".js-shows-container").innerHTML=t,listenShowEvents()}function listenShowEvents(){const t=document.querySelectorAll(".js-show");for(const e of t)e.addEventListener("click",handleFavourite)}function handleFavourite(t){const e=parseInt(t.currentTarget.id),o=shows.findIndex(t=>t.show.id===e),s=favourites.findIndex(t=>t.show.id===e);-1===s?favourites.push(shows[o]):favourites.splice(s,1),paintFavourites(),paintShows(),setInLocalStorage()}function paintFavourites(){let t="";for(const e of favourites){const o=e.show;t+=`<li class="favourite js-favourite" id="${o.id}">`,t+=`<h2 class="favourite__title">${o.name}</h2>`;const s=o.image;t+=null===s?`<img src="${defaultImg}">`:`<img src="${s.medium}" alt="Cartel Serie"></img>`,t+="</li>"}document.querySelector(".js-favourites-container").innerHTML=t}getFromLocalStorage();
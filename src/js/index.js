"use strict";
//--------------------------------------------------------------------//

/** IMPORTATIONS */
import { getDATA } from "./utils.js";
import { filterByTags } from "./modFilterByTags.js";
import { goToContent } from "./modGoToContent.js";

//!---------------------------------------**

/**
 * Tu crées un tableau vide qui va contenir les données de chaque photographe (nom, location, price, citation etc...)
 */
let photographerData = [];

/**
 * 1. Tu crées une fonction qui va récupérer les data du .json
 * 2. Tu places ces data dans un tableau
 * 3. Tu map() les tags de chaque photographes dans la div.photographes_list
 * 3. @returns {innerHTML} Tu injectes le html des cartes photographe (.card) puis tu map() chaque photographes et leurs data
 */
export const photographerDisplay = async () => {
  photographerData = (await getDATA()).photographers;
  //tu map() les tags que l'on va placer push() dans un tableau tags
  document.querySelector(".photographes_list").innerHTML = photographerData
    .map((photographer) => {
      const tags = [];
      for (let i = 0; i < photographer.tags.length; i += 1) {
        tags.push(
          `  
          <li><a href="#" class="tag-name tag-name--small" aria-label="${photographer.tags[i]}" data-tag ="${photographer.tags[i]}"><span class="sr-only">Tag</span> #${photographer.tags[i]}</a></li>
          `
        );
      }
      //la carte d'un photographe
      return `
        <section class="card">
            <a class="card_link" href="photographe.html?id=${
              photographer.id
            }"><span class="hiddenText">Aller sur la page du photographe ${photographer.name}</span></a>
            <div class="avatar avatar--big"><img src="./src/imgs/photographe/portraits/${
              photographer.portrait
            }" alt="${photographer.alt}"></div>
            <div class="card_name">${photographer.name}</div>
            <div class="card_location">${photographer.city}, ${
        photographer.country
      }</div>
            <div class="card_citation">${photographer.tagline}</div>
            <div class="card_price">${photographer.price}€/jour</div>
            <ul class="tags--center" lang="en">
            ${tags.join("")}
            </ul>
          </section>
          `;
    })
    .join(""); //tu supprimes la (,) entre chaque photographe mappé
};

//!---------------------------------------**

// Filtre par tags > le code est situé dans le fichier modFilterByTags.js
//! Show All ? = index.html > il existe probablement une autre solution sans recharger la page
filterByTags();

// apparition du btn 'Voir le contenu' au scroll (un smooth scroll est placé sur le body en css)
goToContent();

export function handleFirstTab(e) {
  if (e.keyCode === 9) { // the "I am a keyboard user" key
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
  }
}

window.addEventListener('keydown', handleFirstTab);

const pollutionEchelle = [
    {
        echelle: [0,50],
        qualiter: "Tres bon",
        src: "TresContent",
        background: "linear-gradient(to right, #45B649, #DCE35B)"

    },
    {
        echelle: [51,100],
        qualiter: "Bon",
        src: "Content",
        background: "linear-gradient(to right, #F3F9A7, #CAC531)",
    },
    {
        echelle: [101,150],
        qualiter: "Moyenne",
        src: "Mauvais pour la santé",
        background: "linear-gradient(to right, #F16529, #E44D26)",
    },
    {
        echelle: [151,200],
        qualiter: "Mauvaise",
        src: "Mauvais",
        background: "linear-gradient(to right, #ef473a, #cb2d3e)",
    },
    {
        echelle: [201,300],
        qualiter: "Très mauvais",
        src: "TresMauvais",
        background: "linear-gradient(to right, #8E54E9, #4776E6)",
    },
    {
        echelle: [301,500],
        qualiter: "Terrible",
        src: "Terrible",
        background: "linear-gradient(to right, #45B649, #DCE35B)",
    },
]
const loader = document.querySelector(".loader");
const emojiLogo = document.querySelector(".emojiLogo");
const informationUtilisateur = document.querySelector(".informationUtilisateur");

async function getPollutionData(){
    try{
        const response = await fetch("http://api.airvisual.com/v2/nearest_city?key=0b8e0da2-fec3-46f5-a7ae-d3a98873b76a ").catch(error =>{
            throw new Error(error)
        })
        if(!response.ok){
            throw new Error(`Error ${response.status},${response.statusText}`)
        }





        const responseData = await response.json();
        const aqius = responseData.data.current.pollution.aqius;
        const sortedData = {
            city: responseData.data.city,
            aqius,
            ...pollutionEchelle.find(obj => aqius >= obj.echelle[0] && aqius<= obj.echelle[1])
        }
        informartionDeLaVille(sortedData);
    }
    catch(error){
        loader.classList.remove("active");
        emojiLogo.src ="./img/TresMauvais.png";
        informationUtilisateur.textContent = error.message
    }
}
getPollutionData()


const nomDeLaVille = document.querySelector(".nomDeLaVille");
const infoPollution = document.querySelector(".infoPollution");
const qualiteDeLairValeur = document.querySelector(".qualiteDeLairValeur");
const backgroundLayer = document.querySelector(".backgroundLayer");

function informartionDeLaVille(data){
    emojiLogo.src = `./img/${data.src}.png`;
    informationUtilisateur.textContent = `Voici la situations à ${data.city}`;
    nomDeLaVille.textContent = data.city;
    infoPollution.textContent = data.qualiter;
    qualiteDeLairValeur.textContent = data.aqius;
    backgroundLayer.style.backgroundImage = data.background;
    loader.classList.remove("active");
    pointeurPlacement(data.aqius);
}
const localisationPointeur = document.querySelector(".localisationPointeur");

function pointeurPlacement(AQIUSValue){
    const parentWidth = localisationPointeur.parentElement.scrollWidth;
    localisationPointeur.style.transform = `translateX(${(AQIUSValue / 500) * parentWidth}px)`;
}

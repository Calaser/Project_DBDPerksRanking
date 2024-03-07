let perksReview;
let perksRankingData;
let perksInfoData;

let fetchArray = [fetch("perks_review.json"), fetch("perks_ranking.json"), fetch("perks_info.json")];
Promise.all(fetchArray)
   .then(responses => Promise.all(responses.map(response => {
      if (response.ok)
         return response.json();
      else
         throw new Error(`fetch ${response.url} fail!`);
   })))
   .then(dataArray => {
      perksReview = dataArray[0];
      perksRankingData = dataArray[1];
      perksInfoData = dataArray[2];
      document.getElementById("navBtn1").classList.add("highLight");
      renderTierListFunction(perksRankingData, perksInfoData, "survivor");
   })
   .catch(error => console.log(error));

// fetchArray = promise array
// responses = response array
// response = response
// response.json() = promise


// old fetch method below (sometime execute render function before fetch first two data)

// fetch("perks_review.json")
//    .then(res => res.json())
//    .then(json => perksReview = json)
//    .catch(error => {
//       console.log("Perks Review Fetch Error!", error);
//    })


// fetch("perks_ranking.json")
//    .then(res => res.json())
//    .then(json => perksRankingData = json)
//    .catch(error => {
//       console.log("Perks Ranking Fetch Error!", error);
//    })

// fetch("perks_info.json")
//    .then(res => res.json())
//    .then(json => perksInfoData = json)
//    .then(json => {
//       perksInfoData = json;
//       document.getElementById("navBtn1").classList.add("highLight");
//       renderTierListFunction(perksRankingData, perksInfoData, "survivor");
//    })
//    .catch(error => {
//       console.log("Perks Info Fetch / Render Error!", error);
//    });


function renderTierListFunction(perksRankingData, perksInfoData, role) {
   const keys = Object.keys(perksInfoData);
   //change title
   document.getElementsByClassName("rankingTitle")[0].innerHTML = `${role} Perks Rating Ver 7.1.0`;

   //clean tier list
   for (let i = 1; i <= 5; i++) {
      document.getElementById(`star${i}`).innerHTML = "";
   }
   keys.forEach(key => {
      if (perksInfoData[key].role === role) {
         //create perk DOM
         const createBtn = document.createElement("div");
         createBtn.className = "perksBtn";
         createBtn.id = perksInfoData[key].name;
         const createIcon = document.createElement("div");
         createIcon.className = "perksIcon";
         createIcon.style.backgroundImage = `url("img/${role}/IconPerks_${perksInfoData[key].image.slice(perksInfoData[key].image.lastIndexOf("_") + 1, perksInfoData[key].image.indexOf("."))}.webp")`;
         createBtn.appendChild(createIcon);

         //place perk DOM to tier list
         for (let i = 0; i < 5; i++) {
            for (let j = 0; j < perksRankingData[role][i].length; j++) {
               if (perksRankingData[role][i][j] === perksInfoData[key].name) {
                  createBtn.style.order = j;
                  document.getElementById(`star${5 - i}`).appendChild(createBtn);
               }
            }
         }

         //create call perk description EventListener
         const content = document.getElementById("content");
         const contentWrapper = document.getElementById("contentWrapper");
         const contentBackground = document.getElementById("content_background");
         createBtn.addEventListener('click', (e) => {
            if (document.getElementsByClassName("selected")[0])
               document.getElementsByClassName("selected")[0].classList.remove("selected");
            e.target.classList.add("selected");
            contentWrapper.classList.add("show");
            contentBackground.classList.add("show");
            content.innerHTML = `
            <div id="perk_info">
               <img src="img/${role}/IconPerks_${perksInfoData[key].image.slice(perksInfoData[key].image.lastIndexOf("_") + 1, perksInfoData[key].image.indexOf("."))}.webp"></img>
               <h2>${perksInfoData[key].name}</h2>
   
               <p>${(function fun() { //use IIFE for looping
                  desc = perksInfoData[key].description;
                  for (var j = 0; j < perksInfoData[key].tunables.length; j++) {
                     desc = desc.replaceAll(`{${j}}`, perksInfoData[key].tunables[j].slice(-1));
                  }
                  return desc;
               })()}
               </p>
            </div>
            
            <div id="perk_review">
               <h2>Review</h2>
               <p>
                  ${perksReview[role][perksInfoData[key].name] || "No comment available."}
               </p>
            </div>

            <div id="content_closeBtn">✖</div>
            `;
            const closeBtn = document.getElementById("content_closeBtn");
            closeBtn.addEventListener('click', () => {
               contentWrapper.classList.remove("show");
               contentBackground.classList.remove("show");
            })
            contentBackground.addEventListener('click', () => {
               contentWrapper.classList.remove("show");
               contentBackground.classList.remove("show");
            })
         })
      }
   })
}

document.getElementById("navBtn1").addEventListener("click", (e) => {
   renderNavFunction(e);
   renderTierListFunction(perksRankingData, perksInfoData, "survivor");
})

document.getElementById("navBtn2").addEventListener("click", (e) => {
   renderNavFunction(e);
   renderTierListFunction(perksRankingData, perksInfoData, "killer");
})

function renderNavFunction(e) {
   Array.from(document.getElementsByClassName("navBtn")).forEach((btn) => {
      btn.classList.remove("highLight")
   });
   e.target.classList.add("highLight");
   document.getElementById("contentWrapper").classList.remove("show");
   document.getElementById("content_background").classList.remove("show");
}

document.getElementById("navBtn1").addEventListener("click", (e) => {
   renderNavFunction(e);
   renderTierListFunction(perksRankingData, perksInfoData, "survivor");
})



// filter data
const perksProperty = {
   "heal": ["Adrenaline", "For the People", "Resilience", "We'll make it", "Renewal", "Botany Knowledge"],
   "repair": ["Prove Thyself", "Resilience", "Deja Vu"]
}

// filter var init
let filterTag = {};
Object.keys(perksProperty).forEach(key => filterTag[key] = false);
let filterResult = {};

// filter btn create
Array.from(document.getElementsByClassName("rankingSheetFilterBtn")).forEach(btn => {
   btn.addEventListener("click", (e) => {
      filterTag[btn.id] = !filterTag[btn.id];

      //refresh filterResult
      filterResult = {};
      Object.keys(filterTag).forEach(key => {
         if (filterTag[key])
            perksProperty[key].forEach(perk => filterResult[perk] = true);
      });

      filterRenderFunction();
   })
})

function filterRenderFunction() {
   //refresh filter btn status
   Object.keys(filterTag).forEach(property => {
      if (filterTag[property])
         document.getElementById(property).classList.add("selected");
      else
         document.getElementById(property).classList.remove("selected");
   })

   // check if enter filterMode
   if (Object.keys(filterTag).filter(property => filterTag[property]).length > 0)
      document.getElementById("rankingSheetWrapper").classList.add("filterMode");
   else
      document.getElementById("rankingSheetWrapper").classList.remove("filterMode");

   // refresh perk class according filterResult
   Array.from(document.getElementsByClassName("filterPerks")).forEach(perk => {
      perk.classList.remove("filterPerks");
   })
   Object.keys(filterResult).forEach(perk => {
      document.getElementById(perk).classList.add("filterPerks");
   })


}
// 在終端使用 live-server 指令以開啟local host

// 7.1.0
// survivor video: https://www.youtube.com/watch?v=mJk6isUi9H0&t
// killer video: https://www.youtube.com/watch?v=q3YNmVPmIeY

// perks info API: https://dbd.tricky.lol/apidocs/  Perks section
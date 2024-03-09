let perksReview;
let perksRankingData;
let perksInfoData;
let perksProperty;

let fetchArray = [fetch("perks_review.json"), fetch("perks_ranking.json"), fetch("perks_info.json"), fetch("perks_property.json")];
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
      perksProperty = dataArray[3];
      document.getElementById("navBtn1").classList.add("highLight");
      tierListRenderFunction(perksRankingData, perksInfoData, "survivor");
      filterCreateFunction("survivor");
   })
   .catch(error => console.log(error));

function tierListRenderFunction(perksRankingData, perksInfoData, role) {
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
            if (document.getElementsByClassName("perkSelected")[0])
               document.getElementsByClassName("perkSelected")[0].classList.remove("perkSelected");
            e.target.classList.add("perkSelected");
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
   navRenderFunction(e);
   tierListRenderFunction(perksRankingData, perksInfoData, "survivor");
   filterCreateFunction("survivor");
})

document.getElementById("navBtn2").addEventListener("click", (e) => {
   navRenderFunction(e);
   tierListRenderFunction(perksRankingData, perksInfoData, "killer");
   filterCreateFunction("killer");
})

function navRenderFunction(e) {
   Array.from(document.getElementsByClassName("navBtn")).forEach((btn) => {
      btn.classList.remove("highLight")
   });
   e.target.classList.add("highLight");
   document.getElementById("contentWrapper").classList.remove("show");
   document.getElementById("content_background").classList.remove("show");
}



// filter var declear
const filterTag = {};
const filterResult = {};

function filterCreateFunction(role) {
   // var init
   for (var n in filterTag)
      delete filterTag[n];
   for (var n in filterResult)
      delete filterResult[n];
   Object.keys(perksProperty[role]).forEach(key => filterTag[key] = false);
   

   // filter init
   document.getElementById("rankingSheetWrapper").classList.remove("filterMode");
   Array.from(document.getElementsByClassName("rankingSheetFilterBtn")).forEach(btn => btn.remove());

   // filter btn create according to perksProperty
   Object.keys(perksProperty[role]).forEach(key => {
      const createBtn = document.createElement("button");
      createBtn.className = "rankingSheetFilterBtn";
      createBtn.id = key;
      createBtn.innerText = key;
      createBtn.addEventListener("click", () => {
         filterTag[key] = !filterTag[key];
         //refresh filterResult;
         for (var n in filterResult)
            delete filterResult[n];
         Object.keys(filterTag).forEach(key => {
            if (filterTag[key])
               perksProperty[role][key].forEach(perk => filterResult[perk] = true);
         });
         filterRenderFunction();
      })
      document.getElementById("rankingSheetFilter").appendChild(createBtn);
   });
}

function filterRenderFunction() {
   //refresh filter btn status
   Object.keys(filterTag).forEach(property => {
      if (filterTag[property])
         document.getElementById(property).classList.add("filterSelected");
      else
         document.getElementById(property).classList.remove("filterSelected");
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
let perksReview;
fetch("perks_review.json")
   .then(res => res.json())
   .then(json => perksReview = json)
   .catch(error => {
      console.log("Perks Review Fetch Error!", error);
   })


let perksRankingData;
fetch("perks_ranking.json")
   .then(res => res.json())
   .then(json => perksRankingData = json)
   .catch(error => {
      console.log("Perks Ranking Fetch Error!", error);
   })

let perksInfoData;
fetch("perks_info.json")
   .then(res => res.json())
   .then(json => perksInfoData = json)
   .then(json => {
      perksInfoData = json;

      renderFunction(perksRankingData, perksInfoData);
   })
   .catch(error => {
      console.log("Perks Info Fetch / Render Error!", error);
   });


function renderFunction(perksRankingData, perksInfoData) {
   const keys = Object.keys(perksInfoData);
   keys.forEach(key => {
      if (perksInfoData[key].role === "survivor") {
         //create perk DOM
         const createIcon = document.createElement("img");
         createIcon.id = perksInfoData[key].name;
         createIcon.src = `img/IconPerks_${perksInfoData[key].image.slice(perksInfoData[key].image.indexOf("_") + 1, perksInfoData[key].image.indexOf("."))}.webp`;

         //place perk DOM to tier list
         for (let i = 0; i < 5; i++) {
            for (let j = 0; j < perksRankingData[i].length; j++) {
               if (perksRankingData[i][j] === perksInfoData[key].name) {
                  createIcon.style.order = j;
                  document.getElementById(`star${5 - i}`).appendChild(createIcon);
               }
            }
         }

         //create call perk description EventListener
         const content = document.getElementById("content");
         const contentWrapper = document.getElementById("contentWrapper");
         const contentBackground = document.getElementById("content_background");
         createIcon.addEventListener('click', () => {
            contentWrapper.classList.add("show");
            contentBackground.classList.add("show");
            content.innerHTML = `
            <div id="perk_info">
               <img src="img/IconPerks_${perksInfoData[key].image.slice(perksInfoData[key].image.lastIndexOf("_") + 1, perksInfoData[key].image.lastIndexOf("."))}.webp"></img>
               <h2>${perksInfoData[key].name}</h2>
   
               <p>${(function fun() { //use IIFE for looping
                  desc = perksInfoData[key].description;
                  for (var j = 0; j < perksInfoData[key].tunables.length; j++) {
                     desc = desc.replace(`{${j}}`, perksInfoData[key].tunables[j].slice(-1));
                  }
                  return desc;
               })()}
               </p>
            </div>

            <div id="perk_review">
               <h2>Review</h2>
               <p>
                  ${perksReview[perksInfoData[key].name] || "No comment."}
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

// 在終端使用 live-server 指令以開啟local host
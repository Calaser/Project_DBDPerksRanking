let perksRanking;
fetch("perks_ranking.json")
   .then(res => res.json())
   .then(json => perksRanking = json);

fetch("perks_info.json")
   .then(res => res.json())
   .then(json => {
      const keys = Object.keys(json);
      keys.forEach(key => {
         if(json[key].role === "survivor") {
         //create perk DOM
         const createIcon = document.createElement("img");
         createIcon.id = json[key].name;
         createIcon.src = `img/IconPerks_${json[key].image.slice(json[key].image.indexOf("_") + 1, json[key].image.indexOf("."))}.webp`;

         //place perk DOM to tier list
         for (let i = 0; i < 5; i++) {
            for (let j = 0; j < perksRanking[i].length; j++) {
               if (perksRanking[i][j] === json[key].name) {
                  console.log(`${perksRanking[i][j]} in perksRanking[${i}][${j}]`);
                  createIcon.style.order = j;
                  document.getElementById(`star${5 - i}`).appendChild(createIcon);
               }
            }
         }

         //create call perk description EventListener
         const content = document.getElementById("content");
         createIcon.addEventListener('click', () => {
            content.innerHTML = `
            <div class="perk_info">
               <img src="img/IconPerks_${json[key].image.slice(json[key].image.lastIndexOf("_") + 1, json[key].image.lastIndexOf("."))}.webp"></img>
               <h2>${json[key].name}</h2>
   
               <p>${(function fun() {
                  desc = json[key].description;
                  for (var j = 0; j < json[key].tunables.length; j++) {
                     desc = desc.replace(`{${j}}`, json[key].tunables[j].slice(-1));
                  }
                  return desc;
               })()}
               </p>
            </div>
            `;
         })
      }
      })
   })
   .catch(error => {
      console.log("Error:", error);
   });









//    document.getElementById(key[i]).addEventListener('click', () => {
//       const content = document.getElementById("content");
//       fetch("perks_info.json")
//          .then(res => res.json())
//          .then(json => {
//             console.log(json.key[i]);
//             content.innerHTML = `
//          <div class="perk_info">
//             <img src="img/IconPerks_${json.key[i].name}.webp"></img>
//             <h2>${json.key[i].name}</h2>
//             <p>${(function fun() {
//                   desc = json.key[i].description;
//                   for (var j = 0; j < json.key[j].variable.length; j++) {
//                      desc = desc.replace(`{${j}}`, json.key[j].variable[j].slice(-1));
//                   }
//                   return desc;
//                })()}
//             </p>
//          </div>
//          `;
//          })
//          .catch(error => {
//             console.log("Error:", error);
//          });
//    });
// }


// 在終端使用 live-server 指令以開啟local host
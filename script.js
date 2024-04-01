let perksReview;
let perksRankingData;
let perksInfoData;
let perksProperty;
let textTranslate;

const langList = [
   ["en", "english"],
   ["zh-TW", "繁體中文"]
];
let currentLanguage = "en";
let settingOn = false;
let role = "survivor";
const navList = [
   ["survivor", "7.1.0"],
   ["killer", "7.1.0"]
];

const localLanguage = JSON.parse(localStorage.getItem("localLanguage"));
if (localLanguage) {
   currentLanguage = localLanguage;
}


let fetchArray = [fetch("perks_review.json"), fetch("perks_ranking.json"), fetch("perks_info.json"), fetch("perks_property.json"), fetch("text_translate.json")];
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
      textTranslate = dataArray[4];

      //init render call
      navRenderFunction();
      filterRenderFunction(role);
      tierListRenderFunction(perksRankingData, perksInfoData, role);
      contentRenderFunction();
      uiTranslateFunction(currentLanguage, "header");
   })
   .catch(error => console.log(error));



function navRenderFunction() {
   for (let i = 0; i < navList.length; i++) {
      const createLi = document.createElement("li");
      const createBtn = document.createElement("a");
      createBtn.className = `navBtn ${navList[i][0]}`;
      createBtn.id = `navBtn${i}`;
      createBtn.addEventListener("click", () => {
         navBtnRenderFunction(i);
      })

      const createInnertext1 = document.createElement("span");
      createInnertext1.className = "headerUI capitalize";
      createInnertext1.innerText = `${navList[i][0]} Perks`;

      const createInnertext2 = document.createElement("p");
      createInnertext2.className = "monospace";
      createInnertext2.innerText = `ver ${navList[i][1]}`;

      createBtn.appendChild(createInnertext1);
      createBtn.appendChild(createInnertext2);
      createLi.appendChild(createBtn);

      document.getElementById("navList").appendChild(createLi);
   }
   navBtnRenderFunction(0);
   settingRenderFunction();
}

function navBtnRenderFunction(index) {
   role = navList[index][0];
   tierListRenderFunction(perksRankingData, perksInfoData, role);
   filterRenderFunction(role);
   Array.from(document.getElementsByClassName("navSelected")).forEach((btn) => {
      btn.classList.remove("navSelected");
   });
   document.getElementById(`navBtn${index}`).classList.add("navSelected");
   document.getElementById("contentWrapper").classList.remove("show");
   document.getElementById("content_background").classList.remove("show");

   contentRenderFunction();
}



function settingRenderFunction() {
   document.getElementById("navSetting").addEventListener("click", () => {
      settingOn = true;
      settingBtnRenderFunction();
   })
   document.getElementById("settingBackground").addEventListener("click", () => {
      settingOn = false;
      settingBtnRenderFunction();
   })
   document.getElementById("settingWindowCloseBtn").addEventListener("click", () => {
      settingOn = false;
      settingBtnRenderFunction();
   })

   langList.forEach(lang => {
      const createBtn = document.createElement("button");
      createBtn.id = lang[0];
      createBtn.innerText = lang[1];
      createBtn.addEventListener("click", (e) => {
         if (currentLanguage !== e.target.id) {
            currentLanguage = e.target.id;
            settingBtnRenderFunction(currentLanguage);
         }
      })
      document.getElementById("settingWindow").appendChild(createBtn);
   })
}

function settingBtnRenderFunction(targetLanguage) {
   // modal 
   document.getElementById("settingModal").style.display = settingOn ? "block" : "none";

   Array.from(document.getElementsByClassName("langSelected")).forEach(langBtn => langBtn.classList.remove("langSelected"))
   document.getElementById(currentLanguage).classList.add("langSelected");

   if (targetLanguage) {
      // change language
      uiTranslateFunction(targetLanguage, "default", role);

      // save language setting
      localStorage.setItem("localLanguage", JSON.stringify(targetLanguage));
   }
}



// filter var declear
const filterTag = {};
const filterResult = {};

function filterRenderFunction(role) {
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
      createBtn.className = "rankingSheetFilterBtn filterUI_d";
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
         filterBtnRenderFunction();
      })
      document.getElementById("rankingSheetFilter").appendChild(createBtn);
   });
   uiTranslateFunction(currentLanguage, "filter", role);
}

function filterBtnRenderFunction() {
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



function tierListRenderFunction(perksRankingData, perksInfoData, role) {
   const keys = Object.keys(perksInfoData);
   // clean tier list
   for (let i = 1; i <= 5; i++) {
      document.getElementById(`star${i}`).innerHTML = "";
   }

   // create tier list
   keys.forEach(key => {
      if (perksInfoData[key].role === role) {
         // create perk DOM
         const createBtn = document.createElement("div");
         createBtn.className = "perksBtn";
         createBtn.id = perksInfoData[key].name;
         const createIcon = document.createElement("div");
         createIcon.className = "perksIcon";
         createIcon.style.backgroundImage = `url("img/${role}/IconPerks_${perksInfoData[key].image.slice(perksInfoData[key].image.lastIndexOf("_") + 1, perksInfoData[key].image.indexOf("."))}.webp")`;
         createBtn.appendChild(createIcon);

         // place perk DOM to tier list
         for (let i = 0; i < 5; i++) {
            for (let j = 0; j < perksRankingData[role][i].length; j++) {
               if (perksRankingData[role][i][j] === perksInfoData[key].name) {
                  createBtn.style.order = j;
                  document.getElementById(`star${5 - i}`).appendChild(createBtn);
               }
            }
         }

         // create call perk description EventListener
         createBtn.addEventListener('click', (e) => {
            tierListBtnRenderFunction(e, key);
         })
      }
   })
   uiTranslateFunction(currentLanguage, "tierlist", role);
}

function tierListBtnRenderFunction(e, key) {
   // refresh selected perk
   Array.from(document.getElementsByClassName("perkSelected")).forEach(perk => {
      perk.classList.remove("perkSelected");
   })
   e.target.classList.add("perkSelected");

   // show modal DOM
   const contentWrapper = document.getElementById("contentWrapper");
   const contentBackground = document.getElementById("content_background");
   contentWrapper.classList.add("show");
   contentBackground.classList.add("show");

   // content change
   // display change
   if (!document.getElementById("content_default").classList.contains("content_hide")) {
      document.getElementById("content_default").classList.add("content_hide");
      document.getElementById("content_info").classList.remove("content_hide");
      document.getElementById("content_review").classList.remove("content_hide");
   }
   // info part
   const content_info_img = document.getElementById("content_info_img");
   const content_info_title = document.getElementById("content_info_title");
   const content_info_content = document.getElementById("content_info_content");
   content_info_img.src = `img/${role}/IconPerks_${perksInfoData[key].image.slice(perksInfoData[key].image.lastIndexOf("_") + 1, perksInfoData[key].image.indexOf("."))}.webp`;
   content_info_title.innerText = `${perksInfoData[key].name}`;
   let desc = perksInfoData[key].description;
   for (let i = 0; i < perksInfoData[key].tunables.length; i++) {
      desc = desc.replaceAll(`{${i}}`, perksInfoData[key].tunables[i].slice(-1));
   }
   content_info_content.innerHTML = desc;

   //review part
   const content_review_content = document.getElementById("content_review_content");
   content_review_content.innerHTML = `${perksReview[role][perksInfoData[key].name] || "No comment available."}`

   //translate
   uiTranslateFunction(currentLanguage, "content");
}



function contentRenderFunction() {
   // reset content
   const content = document.getElementById("content");
   content.innerHTML = "";

   // content_default DOM build
   const content_default = document.createElement("div");
   const content_default_title = document.createElement("h2");
   const content_default_content = document.createElement("p");

   content_default.id = "content_default";
   content_default_title.id = "content_default_title";
   content_default_title.className = "contentUI";
   content_default_content.id = "content_default_content";
   content_default_content.className = "contentUI";

   content_default.appendChild(content_default_title);
   content_default.appendChild(content_default_content);
   content.appendChild(content_default);

   // content_info DOM build
   const content_info = document.createElement("div");
   const content_info_img = document.createElement("img");
   const content_info_title = document.createElement("h2");
   const content_info_content = document.createElement("p");

   content_info.id = "content_info";
   content_info.className = "content_hide";
   content_info_img.id = "content_info_img";
   content_info_title.id = "content_info_title";
   content_info_content.id = "content_info_content";

   content_info.appendChild(content_info_img);
   content_info.appendChild(content_info_title);
   content_info.appendChild(content_info_content);
   content.appendChild(content_info);

   // content_review DOM build
   const content_review = document.createElement("div");
   const content_review_title = document.createElement("h2");
   const content_review_content = document.createElement("p");

   content_review.id = "content_review";
   content_review.className = "content_hide";
   content_review_title.className = "contentUI";
   content_review_content.id = "content_review_content";

   content_review.appendChild(content_review_title);
   content_review.appendChild(content_review_content);
   content.appendChild(content_review);

   // closeBtn DOM build
   const content_closeBtn = document.createElement("div");
   const contentWrapper = document.getElementById("contentWrapper");
   const contentBackground = document.getElementById("content_background");
   content_closeBtn.id = "content_closeBtn";
   content_closeBtn.innerText = "✖";
   content.appendChild(content_closeBtn);

   content_closeBtn.addEventListener('click', () => {
      contentWrapper.classList.remove("show");
      contentBackground.classList.remove("show");
   })
   contentBackground.addEventListener('click', () => {
      contentWrapper.classList.remove("show");
      contentBackground.classList.remove("show");
   })

   uiTranslateFunction(currentLanguage, "content");
}



function uiTranslateFunction(language, mode, role) {
   // decide render which part according to mode var
   let uiIndex = [mode];
   if (mode === "default")
      uiIndex = ["header", "filter", "tierlist", "content"];

   // render
   uiIndex.forEach(part => {
      for (let i = 0; i < document.getElementsByClassName(`${part}UI`).length; i++) {
         document.getElementsByClassName(`${part}UI`)[i].innerText = textTranslate[`${part}`][language][i];
      }
   })

   // dynamic render
   if (uiIndex.includes("tierlist")) {
      document.getElementsByClassName(`tierlistUI_d`)[0].innerText = `${textTranslate["var"][role][language]} ${textTranslate["tierlist"][language][0]}`;
   }
   if (uiIndex.includes("filter")) {
      Array.from(document.getElementsByClassName(`filterUI_d`)).forEach(tag => {
         tag.innerText = `${textTranslate["filter"]["tag"][role][tag.id.toLowerCase()][language]}`
      });
   }
}



// 在終端使用 live-server 指令以開啟local host

// 7.1.0
// survivor video: https://www.youtube.com/watch?v=mJk6isUi9H0&t
// killer video: https://www.youtube.com/watch?v=q3YNmVPmIeY

// perks info API: https://dbd.tricky.lol/apidocs/  Perks section
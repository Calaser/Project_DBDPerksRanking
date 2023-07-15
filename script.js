// const btn = document.getElementById('btn');
// const menu = document.getElementById('wrapper');

// btn.addEventListener('click', () => {
//     btn.classList.toggle('trigger');
//     menu.classList.toggle('trigger');
// });


// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'perks_info.json', true);
// xhr.onreadystatechange = function() {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     var data = JSON.parse(xhr.responseText);
//     console.log(data);
//   }
// };
// xhr.send();


// 在終端使用 live-server 指令以開啟local host
const content = document.getElementById("content");
const json = [];
fetch("perks_info.json")
   .then(res => res.json())
   .then(json => {
      console.log(json.Adrenaline);
      content.innerHTML = `
      <div class="perk_info">
         <img src=${json.Adrenaline.image}></img>
         <h3>${json.Adrenaline.name}</h3>
         <p>${(function fun() {
            desc = json.Adrenaline.description;
            for(var i = 0; i < json.Adrenaline.variable.length; i++) {
               desc = desc.replace(`{${i}}`, json.Adrenaline.variable[i].slice(-1));
            }
            return desc;
         })()}
         </p>
      </div>
   `;
   })
   .catch(error => {
      console.log("Error:", error);
   });
# Project_DBDPerksRanking
一個關於Dead by Deadlight這個遊戲中的技能排行與評價。

[**>> 點此前往網站 <<**](https://calaser.github.io/Project_DBDPerksRanking/)

<img src="https://imgur.com/SQi2D4S.png">

## 網站功能
可透過標頭的導航列在不同主題的排行榜之間切換，
並且有語系切換功能讓使用者在不同語言間切換。

每個排行榜主要由一個技能的主觀強度列表(附帶檢索工具)以及一個介紹技能的區塊組成，<br />
透過點擊排行榜上的任意技能圖案可以開啟相關技能的說明及評價文本。

## 網站內容
目前有以下排行榜資料：<br />
7.1.0 倖存者技能強度榜<br />
7.1.0 殺手技能強度榜<br />

以上榜單包含7.1.0全部的技能圖案與說明文本，<br />
評價部分目前已經完成全部倖存者與少部分的殺手技能。
(技能文本僅有英文，評價僅有中文)

## 相關元素
+ HTML
  - Nav
  - Table
  - Semantic HTML
+ CSS
  - Custom Properties
  - RWD
    * Media Quary
    * Modal(change layout)
  - Pseudo Element (tooltips)
  - Simple Transition
+ Javascript
  - Async request (fetch and callback function chaining)
  - JSON data process and object iterate
  - DOM manipulate and generate according to data
  - Render function

## 資料來源
強度列表主要來源為Dead by Daylight英文社群知名內容創作者Otzdarva的技能排名影片：<br />
https://www.youtube.com/watch?v=mJk6isUi9H0&t (Survivor)<br />
https://www.youtube.com/watch?v=q3YNmVPmIeY (Killer)

技能評價則是由個人整理影片中Otzdarva的評價加上自己的理解後修改產生。<br />

技能文本來源 API：<br />
https://dbd.tricky.lol/api/perks<br />
基於技能資料會隨著版本改變以及來源API的資料錯漏，實際上是將當時的資料修復後存成本地json使用。<br />
*由於DBD中文社群似乎沒有相關API，並且考量到官方在遊戲中的中文技能文本本身也常有錯誤，故使用英文版本。

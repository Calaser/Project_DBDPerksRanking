# Project_DBDPerksRanking
一個關於Dead by Deadlight這個遊戲中的技能排行與評價。

[**>> 點此前往網站 <<**](https://calaser.github.io/Project_DBDPerksRanking/)

<img src="https://i.imgur.com/e2oCLip.png">

## 網站功能
可透過標頭的導航列在不同主題的排行榜之間切換。

每個排行榜主要由一個技能的主觀強度列表以及一個介紹技能的區塊組成，<br />
透過點擊排行榜上的任意技能圖案可以開啟相關技能的說明及評價文本。

## 網站內容
目前有以下排行榜資料：<br />
7.1.0 倖存者技能強度榜<br />
7.1.0 殺手技能強度榜<br />

以上榜單包含7.1.0全部的技能說明文本，<br />
但評價部分目前只更新了4~5星的倖存者技能。

## 相關元素
+ HTML
  - Nav
  - Table
  - Semantic HTML
+ CSS
  - Custom Properties (color picking)
  - RWD
    * Media Quary
    * Modal (change layout for small screen)
  - Pseudo Element (tooltips)
+ Javascript
  - Async request (fetch and callback function chaining)
  - JSON data process and object iterate
  - DOM manipulate according to data
  - Render function (centralized process)

## 資料來源
強度列表主要來源為Dead by Daylight英文社群知名內容創作者Otzdarva的技能排名影片：<br />
https://www.youtube.com/watch?v=mJk6isUi9H0&t (Survivor)<br />
https://www.youtube.com/watch?v=q3YNmVPmIeY (Killer)

技能評價則是由個人整理影片中Otzdarva的評價加上少許自己的理解後產生。<br />
*為了避免影響原影片流量，並沒有打算將評價翻成其他語言。

技能文本來源 API：<br />
https://dbd.tricky.lol/api/perks<br />
基於技能會隨著版本調整以及來源API的資料錯漏，實際上是將當時的資料修正後存成本地json使用。<br />
*由於DBD中文社群似乎沒有相關API，並且考量到官方在遊戲中的中文技能文本本身也常常有錯誤，故使用英文版本。

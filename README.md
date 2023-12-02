# Project_DBDPerksRanking
一個關於Dead by Deadlight這個遊戲中的技能排行與評價。

<img src="https://i.imgur.com/e2oCLip.png">

## 網站功能
可透過標頭的導航列在不同主題的排行榜之間切換。

每個排行榜主要由一個技能的主觀強度列表以及一個介紹技能的區塊組成，<br />
透過點擊強度排行榜上的任意技能圖案可以開啟相關的技能介紹。

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

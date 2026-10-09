var $el={};
function $(id){if(!$el[id]||!$el[id].isConnected)$el[id]=document.getElementById(id);return $el[id];}

var coins=0,coinsPerClick=1,totalEarned=0,totalTaps=0,totalPlayTime=0;
var totalShardsEarned=0,lastShardsForTracking=0;
var crystals=0,crystalsMax=1000,goldenMultiplier=1,goldenTimer=0,unlocked={};
var shards=0,bloodMoonActive=false,bloodMoonTimer=0;
var eventMultiplier=1,eventTimer=0,eventName="",currentEventKey="";
var crystalBoostMultiplier=1,crystalBoostTimer=0,crystalBoostName="";
var usedPromos={},logoClicks=0,logoClickTimer=null,logoCooldown=0,ownedItems={};
var secretUnlocked=false,secretAutoClicker=false,secretClickerInterval=null,secretAutoClickerTimer=0;
var depositUnlocked=false,depositLevel=0,lastDepositTimeKey="";
var generatorLevel=1,generatorTimer=180;
var lastClickTime=0;
var GENERATOR_MAX_LEVEL=50,GENERATOR_BASE_COST=100,GENERATOR_COST_MULT=1.5,GENERATOR_DURATION=180;
var smileSkinUnlocked=false,smileSkinActive=false;
var lastDisplayedCoins=0;
var lastShopUpdate=0;
var BUY_UNLOCK_10=25;
var BUY_UNLOCK_25=100;
var chestsOpened=0;
var personalBestCoins=0;
var lastRecordCheck=0;
var theftActive=false,theftTimer=0,theftTickTimer=null,theftTotalLost=0,lastTheftKey="";
var THEFT_TICK_INTERVAL=25,THEFT_DURATION=600,THEFT_PERCENT=0.01;
var theftRestored=false;
var UPGRADE_MAX_LEVEL=699,UPGRADE_COST_MULT=1.05;
var GLOBAL_UPGRADE_COST_MULT=10;
var profile={nickname:"",id:"",createdAt:0};
var tapTimestamps=[],tapViolations=[];
var TAP_LIMIT=100,TAP_WINDOW=1000,VIOLATION_WINDOW=10000,VIOLATION_THRESHOLD=3;
var notesUnlocked={};
var note1Shown=false,note2Shown=false,note3Shown=false;
var note4Shown=false,note5Shown=false,note6Shown=false,note7Shown=false;
var tutorialActive=false,tutorialStep=0;
var TUTORIAL_DONE_KEY="clicker-tutorial-done-v1";
var TUTORIAL_STEPS=[
"👆 Нажми на большую кнопку — получишь монеты",
"🛒 Покупай улучшения в Магазине — доход идёт сам",
"⚡ Прокачивай генератор, чтобы тапать чаще!",
"🎁 Раз в час открывай Сундук — там кристаллы и осколки",
"📜 Выполняй ежедневные Задания — обновляются каждый день",
"🎨 Покупай Скины и заглядывай в Магазин за 💎",
"🐾 На второй странице — Питомцы. Собирай и корми!",
"🕵️ В игре есть немало секретных действий — попробуй их найти!"
];
var DEPOSIT_LEVELS=[
{level:1,cost:1000000000000000,emoji:"😭"},{level:2,cost:5000000000000000,emoji:"😢"},
{level:3,cost:15000000000000000,emoji:"😟"},{level:4,cost:50000000000000000,emoji:"😐"},
{level:5,cost:100000000000000000,emoji:"😕"},{level:6,cost:250000000000000000,emoji:"🙂"},
{level:7,cost:500000000000000000,emoji:"😊"},{level:8,cost:1000000000000000000,emoji:"😄"},
{level:9,cost:5000000000000000000,emoji:"😁"},{level:10,cost:15000000000000000000,emoji:"😂"},
{level:11,cost:50000000000000000000,emoji:"🤣"},{level:12,cost:100000000000000000000,emoji:"😎"},
{level:13,cost:500000000000000000000,emoji:"🥳"},{level:14,cost:1000000000000000000000,emoji:"😍"},
{level:15,cost:5000000000000000000000,emoji:"🤩"},{level:16,cost:25000000000000000000000,emoji:"😻"},
{level:17,cost:100000000000000000000000,emoji:"🥰"},{level:18,cost:500000000000000000000000,emoji:"😘"},
{level:19,cost:1000000000000000000000000,emoji:"😇"},{level:20,cost:5000000000000000000000000,emoji:"🤑"},
{level:21,cost:25000000000000000000000000,emoji:"👑"},{level:22,cost:100000000000000000000000000,emoji:"🌟"},
{level:23,cost:500000000000000000000000000,emoji:"💫"},{level:24,cost:1000000000000000000000000000,emoji:"🌈"},
{level:25,cost:5000000000000000000000000000,emoji:"✨"}];
var DEPOSIT_DROP_INTERVAL=30*60*1000,DEPOSIT_HUNGRY_RATE=5000000;
var gulauActive=false,gulauTimer=0;
var bossActive=false,bossHP=150,bossMaxHP=150,bossTimeLeft=45.0,bossTimerInterval=null,bossClickCooldown=0,bossClickCount=0,bossClickTimer=null,bossRewardClaimed=false;
var alarmTimeout=null,alarmActive=false,alarmClicks=0,alarmSound=null,ALARM_TIME=5*60*1000;
var rewardClaimed=false,rewardTabShown=false,noteShown=false;
var pahanUnlocked=false,pahanActive=false,pahanTimer=0,pahanTickInterval=null,pahanTimerInterval=null;
var PAHAN_TAPS_PER_SEC=2,PAHAN_REWARD_PER_TAP=1e27,PAHAN_DURATION=10;

var WHEEL_SECTORS=[
{type:"coins",value:0.05,label:"+5% 💰"},{type:"gems",value:15,label:"+15 💎"},
{type:"shards",value:20,label:"+20 🌑"},{type:"coins",value:0.15,label:"+15% 💰"},
{type:"empty",value:0,label:"Пусто ❌"},{type:"gems",value:30,label:"+30 💎"},
{type:"coins",value:0.25,label:"+25% 💰"},{type:"shards",value:50,label:"+50 🌑"},
{type:"negCoins",value:-0.15,label:"−15% 💰"},{type:"gems",value:50,label:"+50 💎"},
{type:"negGems",value:-5,label:"−5 💎"},{type:"negShards",value:-10,label:"−10 🌑"}];
var wheelSpinning=false,wheelFreeUsed=false,wheelPaidUsed=false,wheelLastResetDay="";

var DAILY_PRIZES=[
{type:"coins",value:500,label:"💰 500"},{type:"coins",value:5000,label:"💰 5K"},
{type:"gems",value:5,label:"💎 5"},{type:"gems",value:15,label:"💎 15"},
{type:"shards",value:20,label:"🌑 20"},{type:"boost",value:1,label:"⚡ Буст"},
{type:"gems",value:25,label:"💎 25"}];
var dailySpinning=false,dailyLastUsed="";

var minigameActive=false,minigameTaps=0,minigameTimer=10,minigameTimerInterval=null,minigameBest=0;
var minigameLastUsed=0;
var MINIGAME_COOLDOWN=60*60*1000;
var MINIGAME_DURATION=10;

var globalUpgrades={
superClicker:{id:"superClicker",name:"🌟 Супер кликер",desc:"+1 к базовому клику за уровень",cost:1500,baseCost:1500,count:0,maxLevel:5,effect:"click",amount:1},
bloodLuck:{id:"bloodLuck",name:"🩸 Кровавая удача",desc:"+1% к шансу осколка в Кровавую луну",cost:10000,baseCost:10000,count:0,maxLevel:5,effect:"bloodShard",amount:0.01},
absoluteBoost:{id:"absoluteBoost",name:"🔱 Воля Абсолюта",desc:"+5% к прибыли от Абсолюта",cost:100000000000000000000,baseCost:100000000000000000000,count:0,maxLevel:5,effect:"absoluteMult",amount:0.05},
genesisBoost:{id:"genesisBoost",name:"💠 Эхо Генезиса",desc:"+3% к прибыли от Генезиса",cost:1000000000000000000000,baseCost:1000000000000000000000,count:0,maxLevel:5,effect:"genesisMult",amount:0.03}};

var BOOSTERS={
boost2:{id:"boost2",icon:"⚡",name:"Буст ×2",desc:"Множитель ×2 на 15 минут",duration:15*60,mult:2,storage:0},
boost3:{id:"boost3",icon:"⚡",name:"Буст ×3",desc:"Множитель ×3 на 10 минут",duration:10*60,mult:3,storage:0},
boost5:{id:"boost5",icon:"⚡",name:"Буст ×5",desc:"Множитель ×5 на 5 минут",duration:5*60,mult:5,storage:0}};

var CRYSTAL_ITEMS={
coinsBag:{icon:"💰",name:"Мешок монет",desc:"1 час дохода монетами",cost:5},
boost2:{icon:"⚡",name:"Буст ×2",desc:"Множитель ×2 на 15 минут → в хранилище",cost:10},
boost3:{icon:"⚡",name:"Буст ×3",desc:"Множитель ×3 на 10 минут → в хранилище",cost:20},
boost5:{icon:"⚡",name:"Буст ×5",desc:"Множитель ×5 на 5 минут → в хранилище",cost:35},
chest:{icon:"🎁",name:"Мгновенный сундук",desc:"Сразу открывает сундук",cost:20},
depositUp:{icon:"🏦",name:"+1 уровень вклада",desc:"Только если вклад куплен",cost:100}};

var BACKGROUNDS={
base:{id:"base",name:"Базовый",cls:"",cost:0,owned:true},
space:{id:"space",name:"🌌 Космос",cls:"bg-space",cost:25,particles:"stars",owned:false},
flame:{id:"flame",name:"🔥 Пламя",cls:"bg-flame",cost:25,particles:"sparks",owned:false},
ocean:{id:"ocean",name:"🌊 Океан",cls:"bg-ocean",cost:25,particles:"bubbles",owned:false},
sakura:{id:"sakura",name:"🌸 Сакура",cls:"bg-sakura",cost:25,particles:"petals",owned:false},
ice:{id:"ice",name:"❄️ Лёд",cls:"bg-ice",cost:25,particles:"snow",owned:false},
bloodmoon:{id:"bloodmoon",name:"🌑 Кровавая луна",cls:"bg-bloodmoon",cost:25,particles:"pulse",owned:false},
volcano:{id:"volcano",name:"🌋 Вулкан",cls:"bg-volcano",cost:25,particles:"lava",owned:false},
nebula:{id:"nebula",name:"🌌 Туманность",cls:"bg-nebula",cost:25,particles:"nebula",owned:false}};
var activeBg="base";
var bgParticles=[];
var bgCanvas=null,bgCtx=null,bgAnimFrame=null,bgFrameCounter=0;
var bgParallax={x:0,y:0,targetX:0,targetY:0};
var _ufoState={x:-100,y:100,speed:0.5,spawnAt:0,visible:false};
var _fishArray=[];
var _emberArray=[];
var _butterflyState={x:0,y:0,angle:0,spawnAt:0};
var _lastBgFrame=0;

var quests=[],questsDate="",questsClaimed=0;
var QUEST_TYPES={
taps_100:{icon:"👆",name:"Сделай 100 тапов",goal:100,reward:2,rewardType:"💎",stat:"taps"},
taps_500:{icon:"💪",name:"Сделай 500 тапов",goal:500,reward:5,rewardType:"💎",stat:"taps"},
taps_1000:{icon:"🔥",name:"Сделай 1000 тапов",goal:1000,reward:10,rewardType:"💎",stat:"taps"},
coins_10k:{icon:"💰",name:"Заработай 10K монет",goal:10000,reward:2,rewardType:"💎",stat:"earn"},
coins_100k:{icon:"🏆",name:"Заработай 100K монет",goal:100000,reward:5,rewardType:"💎",stat:"earn"},
coins_1m:{icon:"👑",name:"Заработай 1M монет",goal:1000000,reward:10,rewardType:"💎",stat:"earn"},
buy_upgrades_5:{icon:"🔧",name:"Купи 5 улучшений",goal:5,reward:3,rewardType:"💎",stat:"upgrades"},
open_chest:{icon:"🎁",name:"Открой сундук",goal:1,reward:5,rewardType:"💎",stat:"chest"},
catch_golden:{icon:"🪙",name:"Поймай золотую монетку",goal:1,reward:3,rewardType:"💎",stat:"golden"},
buy_skin:{icon:"🎨",name:"Купи скин",goal:1,reward:5,rewardType:"💎",stat:"skin"},
deposit_up:{icon:"🏦",name:"Улучши вклад",goal:1,reward:5,rewardType:"🌑",stat:"deposit"},
prestige_item:{icon:"🩸",name:"Купи предмет за осколки",goal:1,reward:5,rewardType:"🌑",stat:"item"}};
var questProgress={};
var settings={showFloat:true,showGolden:true,showDaily:true,sound:true,music:false,lowParticles:false,krohlupic:true};

var SKIN_PRICE=5;
var skins={
gold:{name:"Золотистый",bg:"radial-gradient(circle at 30% 30%, #fff59d, #f9a825)",owned:true},
blue:{name:"Синий",bg:"radial-gradient(circle at 30% 30%, #90caf9, #1565c0)",owned:false},
green:{name:"Зелёный",bg:"radial-gradient(circle at 30% 30%, #a5d6a7, #2e7d32)",owned:false},
diamond:{name:"Алмазный",bg:"radial-gradient(circle at 30% 30%, #e1f5fe, #0277bd)",owned:false},
ruby:{name:"Рубиновый",bg:"radial-gradient(circle at 30% 30%, #ff8a80, #b71c1c)",owned:false},
gennadii:{name:"GENNADII",special:true,secret:true,owned:false}};
var activeSkin="gold";

var EMOJI_SKINS={
heart:{id:"heart",emoji:"❤️",name:"Сердечко",cost:10,anim:"pulse",owned:false},
fire_heart:{id:"fire_heart",emoji:"❤️‍🔥",name:"Огненное сердце",cost:10,anim:"pulse-shake",owned:false},
shield:{id:"shield",emoji:"🛡",name:"Щит",cost:10,anim:"bounce",owned:false},
candy:{id:"candy",emoji:"🍬",name:"Конфета",cost:10,anim:"wobble",owned:false}};
var activeEmojiSkin=null;

var ITEMS={
blade:{icon:"🩸",name:"Кровавый клинок",desc:"Оружие первых охотников",cost:5,bonuses:[0.05,0.08,0.12]},
amulet:{icon:"🧿",name:"Амулет луны",desc:"Оберег из чёрного камня",cost:10,bonuses:[0.10,0.15,0.22]},
elixir:{icon:"⚗️",name:"Кровавый эликсир",desc:"Зелье из лунной росы",cost:20,bonuses:[0.15,0.22,0.32]},
candle:{icon:"🕯️",name:"Свеча ритуала",desc:"Горит вечно алым светом",cost:35,bonuses:[0.20,0.30,0.42]},
skull:{icon:"💀",name:"Череп врага",desc:"Трофей с поля битвы",cost:55,bonuses:[0.25,0.37,0.52]},
bat:{icon:"🦇",name:"Летучая мышь",desc:"Хранительница ночи",cost:80,bonuses:[0.30,0.45,0.62]},
orb:{icon:"🔮",name:"Тёмный шар",desc:"Видит сквозь время",cost:120,bonuses:[0.40,0.58,0.80]},
scythe:{icon:"🗡️",name:"Серп луны",desc:"Жнёт врагов как колосья",cost:180,bonuses:[0.50,0.72,1.00]},
wings:{icon:"🦋",name:"Крылья вампира",desc:"Дар ночной охоты",cost:250,bonuses:[0.75,1.05,1.45]},
crown:{icon:"👑",name:"Венец луны",desc:"Власть над Кровавой луной",cost:500,bonuses:[1.00,1.40,1.90]},
throne:{icon:"🔱",name:"Трон Кровавого Лорда",desc:"Легендарный трон алой эпохи",cost:1000,bonuses:[1.50,2.00,2.70]}};
var ITEM_MAX_LEVEL=3,ITEM_PRICE_MULT=[1,2.5,6.25];

var upgrades={
clicker:{name:"👆 Кликер",desc:"+1 монета за тап",cost:10,baseCost:10,count:0,effect:"click",amount:1},
farm:{name:"🌾 Ферма",desc:"+1 монета в секунду",cost:50,baseCost:50,count:0,effect:"auto",amount:1},
factory:{name:"🏭 Фабрика",desc:"+10 монет в секунду",cost:500,baseCost:500,count:0,effect:"auto",amount:10},
bank:{name:"🏦 Банк",desc:"+100 монет в секунду",cost:5000,baseCost:5000,count:0,effect:"auto",amount:100},
server:{name:"🖥️ Серверная",desc:"+1000 монет в секунду",cost:50000,baseCost:50000,count:0,effect:"auto",amount:1000},
lab:{name:"🔬 Лаборатория",desc:"+10000 монет в секунду",cost:500000,baseCost:500000,count:0,effect:"auto",amount:10000},
space:{name:"🚀 Космостанция",desc:"+100K монет в секунду",cost:5000000,baseCost:5000000,count:0,effect:"auto",amount:100000},
quantum:{name:"⚛️ Квантовый комп",desc:"+1M монет в секунду",cost:50000000,baseCost:50000000,count:0,effect:"auto",amount:1000000},
portal:{name:"🌀 Портал",desc:"+10M монет в секунду",cost:500000000,baseCost:500000000,count:0,effect:"auto",amount:10000000},
galaxy:{name:"🌌 Галактика",desc:"+100M монет в секунду",cost:5000000000,baseCost:5000000000,count:0,effect:"auto",amount:100000000},
universe:{name:"🌠 Вселенная",desc:"+1B монет в секунду",cost:50000000000,baseCost:50000000000,count:0,effect:"auto",amount:1000000000},
multiverse:{name:"♾️ Мультивселенная",desc:"+10B монет в секунду",cost:500000000000,baseCost:500000000000,count:0,effect:"auto",amount:10000000000},
singularity:{name:"🕳️ Сингулярность",desc:"+100B монет в секунду",cost:5000000000000,baseCost:5000000000000,count:0,effect:"auto",amount:100000000000},
godmode:{name:"👁️ Око Творца",desc:"+1T монет в секунду",cost:50000000000000,baseCost:50000000000000,count:0,effect:"auto",amount:1000000000000},
infinity:{name:"💫 Бесконечность",desc:"+10T монет в секунду",cost:500000000000000,baseCost:500000000000000,count:0,effect:"auto",amount:10000000000000},
timecrystal:{name:"🕰️ Кристалл времени",desc:"+100T монет в секунду",cost:5000000000000000,baseCost:5000000000000000,count:0,effect:"auto",amount:100000000000000},
blackhole:{name:"🌑 Чёрная дыра",desc:"+1Qa монет в секунду",cost:50000000000000000,baseCost:50000000000000000,count:0,effect:"auto",amount:1000000000000000},
omega:{name:"♎ Омега",desc:"+10Qa монет в секунду",cost:500000000000000000,baseCost:500000000000000000,count:0,effect:"auto",amount:10000000000000000},
eternity:{name:"🌌 Вечность",desc:"+100Qa монет в секунду",cost:5000000000000000000,baseCost:5000000000000000000,count:0,effect:"auto",amount:100000000000000000},
creation:{name:"✨ Творец",desc:"+2Qi монет в секунду",cost:50000000000000000000,baseCost:50000000000000000000,count:0,effect:"auto",amount:2000000000000000000},
absolute:{name:"🔱 Абсолют",desc:"+20Qi монет в секунду",cost:500000000000000000000,baseCost:500000000000000000000,count:0,effect:"auto",amount:20000000000000000000},
transcend:{name:"🕉️ Трансцендентность",desc:"+60Qi монет в секунду",cost:5000000000000000000000,baseCost:5000000000000000000000,count:0,effect:"auto",amount:60000000000000000000},
genesis:{name:"💠 Генезис",desc:"+500Qi монет в секунду",cost:50000000000000000000000,baseCost:50000000000000000000000,count:0,effect:"auto",amount:500000000000000000000}};

for(var _uid in upgrades){
if(typeof upgrades[_uid].unlocked10==="undefined")upgrades[_uid].unlocked10=false;
if(typeof upgrades[_uid].unlocked25==="undefined")upgrades[_uid].unlocked25=false;
if(typeof upgrades[_uid].buyMult==="undefined")upgrades[_uid].buyMult=1;
}

var PET_TYPES={
hamster:{id:"hamster",emoji:"🐹",name:"Хомяк",rarity:"common",rarityLabel:"🟢 Обычный",chance:0.35,sellPrice:25,bonus:{income:0.15},deathMsg:"Твой Хомяк погиб от голода..."},
kitten:{id:"kitten",emoji:"🐱",name:"Котёнок",rarity:"common",rarityLabel:"🟢 Обычный",chance:0.25,sellPrice:25,bonus:{gemTap:0.0002},deathMsg:"Твой Котёнок погиб от голода..."},
fox:{id:"fox",emoji:"🦊",name:"Лисёнок",rarity:"rare",rarityLabel:"🔵 Редкий",chance:0.14,sellPrice:100,bonus:{income:0.35,gemTap:0.0005},deathMsg:"Твой Лисёнок погиб от голода..."},
penguin:{id:"penguin",emoji:"🐧",name:"Пингвин",rarity:"rare",rarityLabel:"🔵 Редкий",chance:0.08,sellPrice:100,bonus:{shardTap:0.003},deathMsg:"Твой Пингвин погиб от голода..."},
wolf:{id:"wolf",emoji:"🐺",name:"Волчонок",rarity:"rare",rarityLabel:"🔵 Редкий",chance:0.10,sellPrice:100,bonus:{income:0.28,shardTap:0.002},deathMsg:"Твой Волчонок погиб от голода..."},
dragon:{id:"dragon",emoji:"🐉",name:"Дракончик",rarity:"epic",rarityLabel:"🟣 Эпический",chance:0.04,sellPrice:300,bonus:{income:0.45,gemTap:0.0015,shardTap:0.005},deathMsg:"Твой Дракончик погиб от голода..."},
phoenix:{id:"phoenix",emoji:"🦅",name:"Феникс",rarity:"epic",rarityLabel:"🟣 Эпический",chance:0.04,sellPrice:350,bonus:{income:0.55,gemTap:0.002,shardTap:0.009},deathMsg:"Твой Феникс погиб от голода..."}};
var PET_EGG_PRICE=65;
var PET_EGG_INCUBATE=30*60*1000;
var PET_EGG_GROW=15*60*1000;
var PET_EGG_HATCH_TAPS=3;
var PET_STORAGE_MAX=5;
var PET_HUNGER_MAX=100;
var PET_HUNGER_DROP_ONLINE=60*1000;
var PET_XP_INTERVAL=12000;
var FOOD_TYPES={strawberry:{emoji:"🍓",name:"Клубничка",hunger:5,price:5},banana:{emoji:"🍌",name:"Банан",hunger:10,price:10},orange:{emoji:"🍊",name:"Апельсин",hunger:20,price:20}};
var FOOD_CASHBACK=3;

var achievements=[
{id:"tap_1",icon:"👆",title:"Первый тап",desc:"Сделайте 1 тап",tier:"bronze",check:function(){return totalTaps>=1;}},
{id:"tap_100",icon:"💪",title:"Сотня тапов",desc:"Сделайте 100 тапов",tier:"bronze",check:function(){return totalTaps>=100;}},
{id:"tap_1000",icon:"🔥",title:"Тысяча тапов",desc:"Сделайте 1000 тапов",tier:"bronze",check:function(){return totalTaps>=1000;}},
{id:"tap_5k",icon:"⚡",title:"5 000 тапов",desc:"Сделайте 5 000 тапов",tier:"silver",check:function(){return totalTaps>=5000;}},
{id:"tap_10k",icon:"🌟",title:"10 000 тапов",desc:"Сделайте 10 000 тапов",tier:"silver",check:function(){return totalTaps>=10000;}},
{id:"tap_25k",icon:"💫",title:"25 000 тапов",desc:"Сделайте 25 000 тапов",tier:"silver",check:function(){return totalTaps>=25000;}},
{id:"tap_50k",icon:"🌠",title:"50 000 тапов",desc:"Сделайте 50 000 тапов",tier:"silver",check:function(){return totalTaps>=50000;}},
{id:"tap_100k",icon:"👑",title:"100 000 тапов",desc:"Сделайте 100 000 тапов",tier:"gold",check:function(){return totalTaps>=100000;}},
{id:"tap_250k",icon:"🏆",title:"250 000 тапов",desc:"Сделайте 250 000 тапов",tier:"gold",check:function(){return totalTaps>=250000;}},
{id:"tap_500k",icon:"👑",title:"500 000 тапов",desc:"Сделайте 500 000 тапов",tier:"gold",check:function(){return totalTaps>=500000;}},
{id:"tap_1m",icon:"💠",title:"Миллион тапов",desc:"Сделайте 1 000 000 тапов",tier:"gold",check:function(){return totalTaps>=1000000;}},
{id:"coins_100",icon:"💰",title:"Сотня",desc:"Накопите 100 монет",tier:"bronze",check:function(){return coins>=100;}},
{id:"coins_1k",icon:"💎",title:"Тысячник",desc:"Накопите 1K монет",tier:"bronze",check:function(){return coins>=1000;}},
{id:"coins_1m",icon:"🏆",title:"Миллионер",desc:"Накопите 1M монет",tier:"bronze",check:function(){return coins>=1000000;}},
{id:"coins_1b",icon:"👑",title:"Миллиардер",desc:"Накопите 1B монет",tier:"silver",check:function(){return coins>=1000000000;}},
{id:"coins_1t",icon:"🌟",title:"Триллионер",desc:"Накопите 1T монет",tier:"silver",check:function(){return coins>=1000000000000;}},
{id:"coins_1qa",icon:"💵",title:"Квадриллионер",desc:"Накопите 1 Qa монет",tier:"silver",check:function(){return coins>=1000000000000000;}},
{id:"coins_1qi",icon:"🌈",title:"Квинтиллионер",desc:"Накопите 1 Qi монет",tier:"gold",check:function(){return coins>=1000000000000000000;}},
{id:"coins_1sx",icon:"💠",title:"Секстиллионер",desc:"Накопите 1 Sx монет",tier:"gold",check:function(){return coins>=1000000000000000000000;}},
{id:"coins_1sp",icon:"🌌",title:"Септиллионер",desc:"Накопите 1 Sp монет",tier:"gold",check:function(){return coins>=1000000000000000000000000;}},
{id:"coins_1oc",icon:"🌠",title:"Октиллионер",desc:"Накопите 1 Oc монет",tier:"gold",check:function(){return coins>=1000000000000000000000000000;}},
{id:"coins_1no",icon:"💎",title:"Нониллионер",desc:"Накопите 1 No монет",tier:"gold",check:function(){return coins>=1000000000000000000000000000000;}},
{id:"earn_1m",icon:"📈",title:"Первая прибыль",desc:"Заработайте 1M",tier:"bronze",check:function(){return totalEarned>=1000000;}},
{id:"first_million",icon:"🎯",title:"Первый миллион!",desc:"Особая цель",tier:"gold",check:function(){return totalEarned>=1000000;}},
{id:"earn_1b",icon:"💼",title:"Оборот",desc:"Заработайте 1B",tier:"silver",check:function(){return totalEarned>=1000000000;}},
{id:"first_up",icon:"🔧",title:"Улучшатель",desc:"Купите первое улучшение",tier:"bronze",check:function(){return upgrades.clicker.count>=1;}},
{id:"farm_10",icon:"🌾",title:"Фермер",desc:"Купите 10 ферм",tier:"bronze",check:function(){return upgrades.farm.count>=10;}},
{id:"factory_5",icon:"🏭",title:"Промышленник",desc:"Купите 5 фабрик",tier:"silver",check:function(){return upgrades.factory.count>=5;}},
{id:"bank_5",icon:"🏦",title:"Банкир",desc:"Купите 5 банков",tier:"silver",check:function(){return upgrades.bank.count>=5;}},
{id:"space_1",icon:"🚀",title:"Космонавт",desc:"Купите космостанцию",tier:"silver",check:function(){return upgrades.space.count>=1;}},
{id:"quantum_1",icon:"⚛️",title:"Квантовый скачок",desc:"Купите квантовый комп",tier:"silver",check:function(){return upgrades.quantum.count>=1;}},
{id:"portal_1",icon:"🌀",title:"Портал открыт",desc:"Купите портал",tier:"silver",check:function(){return upgrades.portal.count>=1;}},
{id:"galaxy_1",icon:"🌌",title:"Владыка галактик",desc:"Купите галактику",tier:"silver",check:function(){return upgrades.galaxy.count>=1;}},
{id:"universe_1",icon:"🌠",title:"Властелин миров",desc:"Купите вселенную",tier:"gold",check:function(){return upgrades.universe.count>=1;}},
{id:"infinity_1",icon:"💫",title:"Бесконечность",desc:"Купите бесконечность",tier:"gold",check:function(){return upgrades.infinity.count>=1;}},
{id:"timecrystal_1",icon:"🕰️",title:"Владыка времени",desc:"Купите Кристалл времени",tier:"gold",check:function(){return upgrades.timecrystal.count>=1;}},
{id:"blackhole_1",icon:"🌑",title:"Пожиратель",desc:"Купите Чёрную дыру",tier:"gold",check:function(){return upgrades.blackhole.count>=1;}},
{id:"omega_1",icon:"♎",title:"Омега",desc:"Купите Омегу",tier:"gold",check:function(){return upgrades.omega.count>=1;}},
{id:"eternity_1",icon:"🌌",title:"Вечность",desc:"Купите Вечность",tier:"gold",check:function(){return upgrades.eternity.count>=1;}},
{id:"creation_1",icon:"✨",title:"Творец",desc:"Купите Творца",tier:"gold",check:function(){return upgrades.creation.count>=1;}},
{id:"absolute_1",icon:"🔱",title:"Абсолют",desc:"Купите Абсолют",tier:"gold",check:function(){return upgrades.absolute.count>=1;}},
{id:"transcend_1",icon:"🕉️",title:"Трансцендент",desc:"Купите Трансцендентность",tier:"gold",check:function(){return upgrades.transcend.count>=1;}},
{id:"genesis_1",icon:"💠",title:"Генезис",desc:"Купите Генезис",tier:"gold",check:function(){return upgrades.genesis.count>=1;}},
{id:"deposit_5",icon:"😕",title:"Смайлик ур. 5",desc:"Вклад до 5",check:function(){return depositLevel>=5;}},
{id:"deposit_10",icon:"😂",title:"Смайлик ур. 10",desc:"Вклад до 10",check:function(){return depositLevel>=10;}},
{id:"deposit_15",icon:"🤩",title:"Смайлик ур. 15",desc:"Вклад до 15",check:function(){return depositLevel>=15;}},
{id:"deposit_20",icon:"🤑",title:"Смайлик ур. 20",desc:"Вклад до 20",check:function(){return depositLevel>=20;}},
{id:"deposit_25",icon:"✨",title:"Смайлик ур. 25",desc:"Максимум вклада",check:function(){return depositLevel>=25;}},
{id:"gen_10",icon:"⚡",title:"Генератор ур. 10",desc:"Генератор до 10",check:function(){return generatorLevel>=10;}},
{id:"gen_25",icon:"💥",title:"Генератор ур. 25",desc:"Генератор до 25",check:function(){return generatorLevel>=25;}},
{id:"gen_50",icon:"🚀",title:"Генератор ур. 50",desc:"Максимум генератора",check:function(){return generatorLevel>=50;}},
{id:"cps_100",icon:"⚡",title:"Электростанция",desc:"100 монет/сек",tier:"bronze",check:function(){return getCPS()>=100;}},
{id:"cps_10k",icon:"🌩️",title:"Гроза",desc:"10K монет/сек",tier:"bronze",check:function(){return getCPS()>=10000;}},
{id:"cps_1m",icon:"🌪️",title:"Ураган",desc:"1M монет/сек",tier:"silver",check:function(){return getCPS()>=1000000;}},
{id:"cps_100m",icon:"🌊",title:"Цунами",desc:"100M монет/сек",tier:"silver",check:function(){return getCPS()>=100000000;}},
{id:"cps_1b",icon:"🌀",title:"Космический шторм",desc:"1B монет/сек",tier:"gold",check:function(){return getCPS()>=1000000000;}},
{id:"cps_1t",icon:"💫",title:"Сингулярность",desc:"1T монет/сек",tier:"gold",check:function(){return getCPS()>=1000000000000;}},
{id:"cps_1qa",icon:"🌌",title:"Бог скорости",desc:"1Qa монет/сек",tier:"gold",check:function(){return getCPS()>=1000000000000000;}},
{id:"crystals_10",icon:"💎",title:"Первые капли",desc:"10 кристаллов",tier:"bronze",check:function(){return crystals>=10;}},
{id:"crystals_50",icon:"💠",title:"Коллекционер",desc:"50 кристаллов",tier:"bronze",check:function(){return crystals>=50;}},
{id:"crystals_200",icon:"🔷",title:"Богач",desc:"200 кристаллов",tier:"silver",check:function(){return crystals>=200;}},
{id:"crystals_500",icon:"💠",title:"Сокровищница",desc:"500 кристаллов",tier:"silver",check:function(){return crystals>=500;}},
{id:"crystals_800",icon:"👑",title:"Алмазный лорд",desc:"800 кристаллов",tier:"gold",check:function(){return crystals>=800;}},
{id:"crystals_1000",icon:"🏆",title:"Максимум",desc:"Лимит кристаллов",tier:"gold",check:function(){return crystals>=1000;}},
{id:"shards_25",icon:"🩸",title:"Первая кровь",desc:"25 осколков",tier:"bronze",check:function(){return shards>=25;}},
{id:"shards_100",icon:"💀",title:"Кровопийца",desc:"100 осколков",tier:"bronze",check:function(){return shards>=100;}},
{id:"shards_500",icon:"🌑",title:"Владыка крови",desc:"500 осколков",tier:"silver",check:function(){return shards>=500;}},
{id:"shards_1000",icon:"🩸",title:"Кровавый барон",desc:"1000 осколков",tier:"silver",check:function(){return shards>=1000;}},
{id:"shards_5k",icon:"👹",title:"Кровавый король",desc:"5000 осколков",tier:"gold",check:function(){return shards>=5000;}},
{id:"shards_10k",icon:"😈",title:"Кровавый император",desc:"10000 осколков",tier:"gold",check:function(){return shards>=10000;}},
{id:"shards_50k",icon:"💀",title:"Кровавый бог",desc:"50000 осколков",tier:"gold",check:function(){return shards>=50000;}},
{id:"time_10m",icon:"⏰",title:"10 минут",desc:"Проведите 10 минут",tier:"bronze",check:function(){return totalPlayTime>=600;}},
{id:"time_1h",icon:"⏱️",title:"1 час",desc:"Проведите 1 час",tier:"bronze",check:function(){return totalPlayTime>=3600;}},
{id:"time_6h",icon:"🕐",title:"6 часов",desc:"Проведите 6 часов",tier:"silver",check:function(){return totalPlayTime>=21600;}},
{id:"time_12h",icon:"🕛",title:"12 часов",desc:"Проведите 12 часов",tier:"silver",check:function(){return totalPlayTime>=43200;}},
{id:"time_24h",icon:"📅",title:"Сутки в игре",desc:"24 часа",tier:"silver",check:function(){return totalPlayTime>=86400;}},
{id:"time_week",icon:"📆",title:"Неделя в игре",desc:"7 дней",tier:"gold",check:function(){return totalPlayTime>=604800;}},
{id:"time_month",icon:"🗓️",title:"Живая легенда",desc:"30 дней",tier:"gold",check:function(){return totalPlayTime>=2592000;}},
{id:"leader_top3",icon:"🥉",title:"В топ-3",desc:"Войти в топ-3 лидерборда",tier:"bronze",check:function(){return unlocked.leader_top3===true;}},
{id:"leader_top2",icon:"🥈",title:"Серебро",desc:"Занять 2 место",tier:"silver",check:function(){return unlocked.leader_top2===true;}},
{id:"leader_top1",icon:"🥇",title:"Золото",desc:"Возглавить лидерборд",tier:"gold",check:function(){return unlocked.leader_top1===true;}},
{id:"chest_1",icon:"🎁",title:"Первый сундук",desc:"Откройте сундук",tier:"bronze",check:function(){return chestsOpened>=1;}},
{id:"chest_10",icon:"🗝️",title:"Кладоискатель",desc:"10 сундуков",tier:"silver",check:function(){return chestsOpened>=10;}},
{id:"chest_100",icon:"💰",title:"Сундук-мастер",desc:"100 сундуков",tier:"gold",check:function(){return chestsOpened>=100;}},
{id:"super_clicker_max",icon:"🌟",title:"Супер кликер",desc:"Максимум Супер кликера",tier:"gold",check:function(){return globalUpgrades.superClicker.count>=5;}},
{id:"wheel_first",icon:"🎡",title:"Первое вращение",desc:"Крутите колесо",tier:"bronze",check:function(){return unlocked.wheel_first===true;}},
{id:"bg_all",icon:"🖼️",title:"Коллекционер фонов",desc:"Купите все 8 фонов",tier:"gold",check:function(){return unlocked.bg_all===true;}},
{id:"daily_first",icon:"📅",title:"Первый ежедневный спин",desc:"Крутите рулетку",tier:"bronze",check:function(){return unlocked.daily_first===true;}},
{id:"minigame_50",icon:"⏱️",title:"Скоростной палец",desc:"50 тапов",tier:"bronze",check:function(){return minigameBest>=50;}},
{id:"minigame_80",icon:"💨",title:"Турбо-палец",desc:"80 тапов",tier:"silver",check:function(){return minigameBest>=80;}},
{id:"minigame_120",icon:"🔥",title:"Бог скорости",desc:"120 тапов",tier:"gold",check:function(){return minigameBest>=120;}},
{id:"pet_first",icon:"🐹",title:"Первый питомец",desc:"Вырасти питомца",tier:"bronze",check:function(){return (typeof petTotalCount==="function"&&petTotalCount()>=1);}},
{id:"pet_active",icon:"⭐",title:"Верный друг",desc:"Активируй питомца",tier:"bronze",check:function(){return (typeof petGetActive==="function"&&petGetActive()!==null);}},
{id:"pet_feed_10",icon:"🍓",title:"Заботливый",desc:"Покорми 10 раз",tier:"silver",check:function(){return (unlocked._petFeedCount||0)>=10;}},
{id:"pet_dragon",icon:"🐉",title:"Дракончик",desc:"Получи Дракончика",tier:"gold",check:function(){return unlocked._petHasDragon===true;}},
{id:"pet_phoenix",icon:"🦅",title:"Из пепла",desc:"Получи Феникса",tier:"gold",check:function(){return unlocked._petHasPhoenix===true;}},
{id:"golden_secret_10",icon:"✨",title:"Охотник за удачей",desc:"10 золотых тапов",tier:"silver",check:function(){return (unlocked._goldenSecretCount||0)>=10;}},
{id:"golden_secret_50",icon:"🌟",title:"Мастер удачи",desc:"50 золотых тапов",tier:"gold",check:function(){return (unlocked._goldenSecretCount||0)>=50;}},
{id:"fnf_rhythm",icon:"🎵",title:"Мастер ритма",desc:"FNF без промаха",tier:"gold",check:function(){return unlocked._fnfPerfect===true;}}
];

var SAVE_KEY="clicker-save";
var PROFILE_KEY="clicker-profile";
var firebaseConfig={databaseURL:"https://clickerup-80939-default-rtdb.firebaseio.com/"};
var db=null;

var NOTES_DATA={
note4:{icon:"📜",title:"Записка №4",preview:"«Я соглашаюсь с условиями...»",text:"«Я {NICK} соглашаюсь с условиями и вступаю в компанию Krochlupic-Up!»",sign:"— Контракт",unlocked:false},
note1:{icon:"📜",title:"Записка №1",preview:"«Он заставляет меня нажимать...»",text:"«Он заставляет меня нажимать эту чёртову кнопку. Я устал. Сутки напролёт я сижу здесь и нажимаю её — ради денег. Лишь это поможет…»",sign:"— ???",unlocked:false},
note5:{icon:"📜",title:"Записка №5",preview:"«Дорогой дневник...»",text:"«Дорогой дневник, знаю это глупо, но... Хотя, зачем мне делиться своими переживаниями с бумажкой?»",sign:"— ???",unlocked:false},
note2:{icon:"📜",title:"Записка №2",preview:"«Сначала… всё выглядит красиво…»",text:"«Сначала.. Как по мне, всё выглядит красиво, и.. Так правильно, столько существ объединились.. Но мне не даёт покоя один факт, зачем это всё, в чем смысл такого бизнеса?»",sign:"— ???",unlocked:false},
note6:{icon:"📜",title:"Записка №6",preview:"«Он такой милый…»",text:"«Он такой милый, никогда не видел рас, которые были такими очаровательными!»",sign:"— ???",unlocked:false},
note3:{icon:"📜",title:"Записка №3",preview:"«Дорогой дневник, я нашёл работу!»",text:"«Дорогой дневник, я наконец-то нашел работу!\nЭта студия самая богатая в этом городе, и.. подозреваю что в этом мире!»",sign:"— ???",unlocked:false},
note7:{icon:"📜",title:"Записка №7",preview:"«Я слышал крик…»",text:"«Я слышал крик, у выхода из здания, вчера.. а сегодня.. он пропал.. его похитили! Это точно!»",sign:"— ???",unlocked:false}};

var FORTUNES=["Сегодня удача на твоей стороне. Тапай смелее!","Один тап — и мир изменится.","Смайлик сегодня доволен тобой.","Хороший день для покупки улучшений.","Если что-то не получается — просто тапай ещё.","Кровавая луна знает о тебе больше.","Он смотрит. Он всегда смотрит.","Кристаллы приходят к терпеливым.","Сегодня ты найдёшь то, что искал.","Не все кликеры одинаково полезны.","Записки — не просто текст.","Ты слишком много тапаешь.","Пахан одобряет твой выбор.","Иногда лучший ход — остановиться.","Сегодня хороший день для рекорда.","Твой смайлик мечтает о 25 уровне.","Кровавые осколки любят настойчивых.","Если увидишь золотую монетку — не зевай.","Один клик отделяет тебя от величия.","Сегодня можно всё. Даже купить скин.","Тайна ближе, чем кажется.","Не забывай про сундук.","Что-то хорошее случится через 67 тапов.","Сегодня звезда по имени Ты восходит.","Мир — это кликер.","Слушай музыку. Она знает ритм удачи.","Не все секреты нужно искать.","Сегодня никто не догонит тебя.","День, когда сбывается загаданное на 228 тапе.","Улыбнись смайлику — и он улыбнётся тебе.","Тот, кто читает это, уже победитель.","Два клика — и ты ближе к цели.","Жизнь как сундук: откроешь — узнаешь.","Кристаллы — это застывшее время.","Сегодня лучше, чем вчера.","Кто-то наблюдает за твоими успехами.","Хорошее предсказание всегда сбывается.","Не всё золото, что блестит."];
var FORTUNE_KEY="clicker-last-fortune-day";

var _fmtCache={};
var _fmtCacheCount=0;
function formatNumber(n){
if(!isFinite(n)||isNaN(n))return "0";
n=Math.floor(n);
var c=_fmtCache[n];
if(c!==undefined)return c;
var r;
if(n<1000)r=n.toString();
else if(n<1000000)r=(n/1000).toFixed(1)+"K";
else if(n<1000000000)r=(n/1000000).toFixed(2)+"M";
else if(n<1000000000000)r=(n/1000000000).toFixed(2)+"B";
else if(n<1000000000000000)r=(n/1000000000000).toFixed(2)+"T";
else if(n<1000000000000000000)r=(n/1000000000000000).toFixed(2)+"Qa";
else if(n<1000000000000000000000)r=(n/1000000000000000000).toFixed(2)+"Qi";
else if(n<1000000000000000000000000)r=(n/1000000000000000000000).toFixed(2)+"Sx";
else if(n<1000000000000000000000000000)r=(n/1000000000000000000000000).toFixed(2)+"Sp";
else if(n<1000000000000000000000000000000)r=(n/1000000000000000000000000000).toFixed(2)+"Oc";
else if(n<1000000000000000000000000000000000)r=(n/1000000000000000000000000000000).toFixed(2)+"No";
else if(n<1000000000000000000000000000000000000)r=(n/1000000000000000000000000000000000).toFixed(2)+"Dc";
else r=n.toExponential(2);
_fmtCache[n]=r;
_fmtCacheCount++;
if(_fmtCacheCount>5000){_fmtCache={};_fmtCacheCount=0;}
return r;
}

function vibrate(ms){if(typeof navigator==="undefined"||typeof navigator.vibrate!=="function")return;try{navigator.vibrate(ms);}catch(e){}}
function lockScroll(){document.body.classList.add("no-scroll");}
function unlockScroll(){document.body.classList.remove("no-scroll");}
function syncScrollLock(){var a=document.querySelector(".modal:not(.hidden), #chest-overlay:not(.hidden), #wheel-overlay:not(.hidden), #daily-overlay:not(.hidden), #minigame-overlay:not(.hidden), #offline-popup:not(.hidden), #alarm-overlay:not(.hidden), #tutorial-overlay:not(.hidden), #fnf-overlay:not(.hidden), #subscribe-banner:not(.hidden)");if(a)lockScroll();else unlockScroll();}

function initFirebase(){try{if(typeof firebase==="undefined"){console.warn("Firebase SDK не загружен");return;}firebase.initializeApp(firebaseConfig);db=firebase.database();console.log("Firebase подключён");}catch(e){console.warn("Firebase не подключён:",e);}}

function checkTapLimit(){var n=Date.now();var a=[];for(var i=0;i<tapTimestamps.length;i++){if(n-tapTimestamps[i]<TAP_WINDOW)a.push(tapTimestamps[i]);}tapTimestamps=a;if(tapTimestamps.length>=TAP_LIMIT){tapViolations.push(n);var v=[];for(var j=0;j<tapViolations.length;j++){if(n-tapViolations[j]<VIOLATION_WINDOW)v.push(tapViolations[j]);}tapViolations=v;if(tapViolations.length>=VIOLATION_THRESHOLD){tapViolations=[];tapTimestamps=[];var l=Math.floor(coins*0.5);coins-=l;var p=document.createElement("div");p.className="achievement-popup";p.style.background="linear-gradient(135deg, #b71c1c, #ff5252)";p.style.color="white";p.textContent="⛔ "+formatNumber(l);document.body.appendChild(p);setTimeout(function(){p.remove();},5000);saveGame();}return false;}tapTimestamps.push(n);return true;}

function addCrystals(amount){if(!isFinite(amount)||amount<=0)return;var s=crystalsMax-crystals;if(s<=0){var c=amount*1e15;coins+=c;totalEarned+=c;showCrystalConvert(amount);return;}if(amount<=s){crystals+=amount;}else{var o=amount-s;crystals=crystalsMax;var c2=o*1e15;coins+=c2;totalEarned+=c2;showCrystalConvert(o);}}
function showCrystalConvert(a){if(!isFinite(a)||a<=0)return;var p=document.createElement("div");p.className="achievement-popup";p.textContent="💎 "+a+" 💎 → "+formatNumber(a*1e15);document.body.appendChild(p);setTimeout(function(){p.remove();},3500);}

function saveGame(){
if(window.__resetting)return;
var data={coins:coins,coinsPerClick:coinsPerClick,totalEarned:totalEarned,totalShardsEarned:totalShardsEarned,totalTaps:totalTaps,totalPlayTime:totalPlayTime,crystals:crystals,chestsOpened:chestsOpened,personalBestCoins:personalBestCoins,lastTheftKey:lastTheftKey,unlocked:unlocked,lastTime:Date.now(),shards:shards,eventMultiplier:eventMultiplier,eventTimer:eventTimer,eventName:eventName,currentEventKey:currentEventKey,crystalBoostMultiplier:crystalBoostMultiplier,crystalBoostTimer:crystalBoostTimer,crystalBoostName:crystalBoostName,usedPromos:usedPromos,ownedItems:ownedItems,secretUnlocked:secretUnlocked,secretAutoClicker:secretAutoClicker,secretAutoClickerTimer:secretAutoClickerTimer,depositUnlocked:depositUnlocked,depositLevel:depositLevel,lastDepositTimeKey:lastDepositTimeKey,generatorLevel:generatorLevel,generatorTimer:generatorTimer,smileSkinUnlocked:smileSkinUnlocked,smileSkinActive:smileSkinActive,gulauActive:gulauActive,gulauTimer:gulauTimer,rewardClaimed:rewardClaimed,bossRewardClaimed:bossRewardClaimed,noteShown:noteShown,notesUnlocked:notesUnlocked,note4Shown:note4Shown,note5Shown:note5Shown,note6Shown:note6Shown,note7Shown:note7Shown,pahanUnlocked:pahanUnlocked,quests:quests,questsDate:questsDate,questsClaimed:questsClaimed,questProgress:questProgress,boostersStorage:{},upgrades:{},globalUpgrades:{},wheelState:{freeUsed:wheelFreeUsed,paidUsed:wheelPaidUsed,lastResetDay:wheelLastResetDay},activeBg:activeBg,bgOwned:{},emojiSkinsOwned:{},dailyLastUsed:dailyLastUsed,minigameBest:minigameBest,minigameLastUsed:minigameLastUsed,skinsOwned:{},activeSkin:activeSkin,activeEmojiSkin:activeEmojiSkin};
for(var b in BOOSTERS){data.boostersStorage[b]=BOOSTERS[b].storage;}
for(var i in upgrades){data.upgrades[i]={count:upgrades[i].count,unlocked10:!!upgrades[i].unlocked10,unlocked25:!!upgrades[i].unlocked25,buyMult:upgrades[i].buyMult||1};}
for(var g in globalUpgrades){data.globalUpgrades[g]={count:globalUpgrades[g].count};}
for(var bg in BACKGROUNDS){data.bgOwned[bg]=BACKGROUNDS[bg].owned;}
for(var es in EMOJI_SKINS){data.emojiSkinsOwned[es]=EMOJI_SKINS[es].owned;}
for(var s in skins){data.skinsOwned[s]=skins[s].owned;}
if(typeof petSaveToSave==="function")petSaveToSave(data);
localStorage.setItem(SAVE_KEY,JSON.stringify(data));
try{localStorage.setItem("clicker-used-promos",JSON.stringify(usedPromos));}catch(e){}
saveSkins();
  }
// === ПРОФИЛЬ ===
function saveProfile(){try{localStorage.setItem(PROFILE_KEY,JSON.stringify(profile));}catch(e){}}
function loadProfile(){try{var r=localStorage.getItem(PROFILE_KEY);if(r){var d=JSON.parse(r);profile.nickname=d.nickname||"";profile.id=d.id||"";profile.createdAt=d.createdAt||0;}}catch(e){}}
function hasProfile(){return profile.nickname&&profile.nickname.length>=2;}
function generateProfileId(){var ts=Date.now();var c="abcdefghijklmnopqrstuvwxyz0123456789";var r="";for(var i=0;i<4;i++){r+=c[Math.floor(Math.random()*c.length)];}return "u_"+ts+"_"+r;}
function ensureProfileId(){if(!profile.id&&hasProfile()){profile.id=generateProfileId();saveProfile();}}
function showProfileModal(){var m=$("modal-profile");if(!m)return;m.classList.remove("hidden");syncScrollLock();var i=$("profile-name-input");if(i){i.value=profile.nickname||"";if(hasProfile()){i.setAttribute("readonly","readonly");}else{i.removeAttribute("readonly");}}setTimeout(function(){if(i&&!hasProfile())i.focus();},300);if(typeof renderProfileBanner==="function")renderProfileBanner();if(typeof renderBannerList==="function")renderBannerList();}
function setupProfileSave(){var b=$("profile-save-btn"),i=$("profile-name-input"),e=$("profile-error");if(!b||!i)return;b.onclick=function(){if(hasProfile()){$("modal-profile").classList.add("hidden");syncScrollLock();return;}var n=i.value.trim();if(!n||n.length<2){if(e)e.textContent="Ник ≥ 2 символа";return;}if(n.length>15){if(e)e.textContent="Ник ≤ 15 символов";return;}if(!/^[a-zA-Zа-яА-Я0-9_ ]+$/.test(n)){if(e)e.textContent="Только буквы, цифры, пробел, _";return;}profile.nickname=n;profile.id=generateProfileId();profile.createdAt=Date.now();saveProfile();if(e)e.textContent="";$("modal-profile").classList.add("hidden");syncScrollLock();updateLeaderboardName();setTimeout(function(){startTutorial();},500);saveGame();if(typeof socialInit==="function")setTimeout(socialInit,800);};}
function setupProfileCopy(){var b=$("profile-copy-btn"),i=$("profile-name-input");if(!b||!i)return;b.onclick=function(){var n=i.value.trim();if(!n){alert("Ник пустой");return;}try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(n).then(function(){var o=b.textContent;b.textContent="✅";setTimeout(function(){b.textContent=o;},1000);}).catch(function(){i.select();document.execCommand("copy");var o=b.textContent;b.textContent="✅";setTimeout(function(){b.textContent=o;},1000);});}else{i.select();document.execCommand("copy");var o=b.textContent;b.textContent="✅";setTimeout(function(){b.textContent=o;},1000);}}catch(e){}};}
function updateLeaderboardName(){var i=$("leader-name");if(i)i.value=profile.nickname||"";}

// === ОБУЧЕНИЕ ===
function startTutorial(){if(tutorialActive)return;tutorialActive=true;tutorialStep=0;var o=$("tutorial-overlay");if(!o)return;o.classList.remove("hidden");syncScrollLock();renderTutorialStep();}
function renderTutorialStep(){var t=$("tutorial-text"),n=$("tutorial-next");if(!t||!n)return;t.textContent=TUTORIAL_STEPS[tutorialStep];n.textContent=(tutorialStep===TUTORIAL_STEPS.length-1)?"Завершить ✓":"Далее ▶";}
function nextTutorialStep(){tutorialStep++;if(tutorialStep>=TUTORIAL_STEPS.length){endTutorial();return;}renderTutorialStep();}
function endTutorial(){tutorialActive=false;tutorialStep=0;var o=$("tutorial-overlay");if(o)o.classList.add("hidden");syncScrollLock();try{localStorage.setItem(TUTORIAL_DONE_KEY,"1");}catch(e){}}
function setupTutorial(){var n=$("tutorial-next"),s=$("tutorial-skip");if(n)n.onclick=nextTutorialStep;if(s)s.onclick=endTutorial;}

// === ЗАПИСКИ ===
function unlockNote(id){if(notesUnlocked[id])return;notesUnlocked[id]=true;if(NOTES_DATA[id])NOTES_DATA[id].unlocked=true;var t=$("tab-note");if(t)t.classList.remove("hidden");renderNoteList();saveGame();}
function renderNoteList(){var l=$("note-list");if(!l)return;l.innerHTML="";var any=false;for(var id in NOTES_DATA){var n=NOTES_DATA[id];if(!notesUnlocked[id])continue;any=true;var d=document.createElement("div");d.className="note-list-item";d.innerHTML='<div class="note-list-icon">'+n.icon+'</div>'+'<div class="note-list-info">'+'<div class="note-list-title">'+n.title+'</div>'+'<div class="note-list-preview">'+n.preview+'</div>'+'</div>';d.onclick=function(nid){return function(){showNoteDetail(nid);};}(id);l.appendChild(d);}if(!any){l.innerHTML='<p style="text-align:center;color:#d4c5a0;font-size:13px;">Пока нет записок...</p>';}}
function showNoteDetail(id){var n=NOTES_DATA[id];if(!n)return;$("note-list-view").style.display="none";$("note-detail-view").style.display="block";var t=n.text;if(id==="note4"){var nk=(profile.nickname&&profile.nickname.length>0)?profile.nickname:"Аноним";t=t.replace("{NICK}",nk);}$("note-detail-text").textContent=t;$("note-detail-sign").textContent=n.sign;}
function setupNoteBack(){var b=$("note-back");if(b)b.onclick=function(){$("note-list-view").style.display="block";$("note-detail-view").style.display="none";};}
function showNotePopup(t){var p=document.createElement("div");p.className="achievement-popup";p.textContent=t;p.style.background="linear-gradient(135deg, #d4c5a0, #8b7355)";p.style.color="#1a1a2e";document.body.appendChild(p);setTimeout(function(){p.remove();},5000);}
function checkNotesUnlock(){
if(!note4Shown&&coins>=1000000){note4Shown=true;unlockNote("note4");showNotePopup("📜 Записка #1");playSound("achievement");saveGame();}
if(!note5Shown&&coins>=1000000000000){note5Shown=true;unlockNote("note5");showNotePopup("📜 Записка #2");playSound("achievement");saveGame();}
if(!note6Shown&&depositLevel>=25){note6Shown=true;unlockNote("note6");showNotePopup("📜 Записка #3");playSound("achievement");saveGame();}
if(!note7Shown&&totalEarned>=1e32){note7Shown=true;unlockNote("note7");showNotePopup("📜 Записка #4");playSound("achievement");saveGame();}
if(!note1Shown&&coins>=1000000000000000000){note1Shown=true;unlockNote("note1");noteShown=true;showNotePopup("📜 Записка #5");playSound("achievement");saveGame();}
if(!note2Shown&&coins>=1000000000000000000000000){note2Shown=true;unlockNote("note2");showNotePopup("📜 Записка #6");playSound("achievement");saveGame();}
if(!note3Shown&&coins>=2e31){note3Shown=true;unlockNote("note3");showNotePopup("📜 Записка #7");playSound("achievement");saveGame();}}
function checkNoteTab(){var t=$("tab-note");if(!t)return;var a=false;for(var k in notesUnlocked){if(notesUnlocked[k]){a=true;break;}}if(a)t.classList.remove("hidden");else t.classList.add("hidden");}

// === ЗАГРУЗКА ===
function loadGame(){
var raw=localStorage.getItem(SAVE_KEY);
if(!raw)return;
try{
var d=JSON.parse(raw);
coins=d.coins||0;coinsPerClick=d.coinsPerClick||1;totalEarned=d.totalEarned||0;
totalShardsEarned=d.totalShardsEarned||0;totalTaps=d.totalTaps||0;totalPlayTime=d.totalPlayTime||0;
lastDisplayedCoins=coins;chestsOpened=d.chestsOpened||0;personalBestCoins=d.personalBestCoins||coins;
lastTheftKey=d.lastTheftKey||"";dailyLastUsed=d.dailyLastUsed||"";minigameBest=d.minigameBest||0;minigameLastUsed=d.minigameLastUsed||0;
var lc=d.crystals||0;
if(lc>crystalsMax){var o=lc-crystalsMax;var cv=o*1e15;coins+=cv;totalEarned+=cv;crystals=crystalsMax;}else{crystals=lc;}
if(d.unlocked){for(var u in d.unlocked)unlocked[u]=d.unlocked[u];}
if(d.upgrades){for(var id2 in d.upgrades){if(upgrades[id2]){upgrades[id2].count=d.upgrades[id2].count;upgrades[id2].unlocked10=!!d.upgrades[id2].unlocked10;upgrades[id2].unlocked25=!!d.upgrades[id2].unlocked25;upgrades[id2].buyMult=d.upgrades[id2].buyMult||1;}}}
for(var rid in upgrades){var ru=upgrades[rid];if(typeof ru.buyMult!=="number")ru.buyMult=1;if(ru.count>=UPGRADE_MAX_LEVEL){ru.count=UPGRADE_MAX_LEVEL;ru.cost=Infinity;}else{ru.cost=Math.floor(ru.baseCost*Math.pow(UPGRADE_COST_MULT,ru.count));}}
if(d.globalUpgrades){for(var gid in d.globalUpgrades){if(globalUpgrades[gid]){globalUpgrades[gid].count=d.globalUpgrades[gid].count||0;}}}
for(var ggid in globalUpgrades){var gu=globalUpgrades[ggid];gu.cost=Math.floor(gu.baseCost*Math.pow(GLOBAL_UPGRADE_COST_MULT,gu.count));}
if(d.boostersStorage){for(var bid in d.boostersStorage){if(BOOSTERS[bid])BOOSTERS[bid].storage=d.boostersStorage[bid]||0;}}
if(d.bgOwned){for(var bgid in d.bgOwned){if(BACKGROUNDS[bgid])BACKGROUNDS[bgid].owned=!!d.bgOwned[bgid];}}
if(d.activeBg&&BACKGROUNDS[d.activeBg])activeBg=d.activeBg;
if(d.emojiSkinsOwned){for(var esid in d.emojiSkinsOwned){if(EMOJI_SKINS[esid])EMOJI_SKINS[esid].owned=!!d.emojiSkinsOwned[esid];}}
if(d.skinsOwned){for(var sid in d.skinsOwned){if(skins[sid])skins[sid].owned=!!d.skinsOwned[sid];}}
if(d.activeSkin&&skins[d.activeSkin])activeSkin=d.activeSkin;
if(d.activeEmojiSkin&&EMOJI_SKINS[d.activeEmojiSkin])activeEmojiSkin=d.activeEmojiSkin;
else if(d.activeEmojiSkin===null)activeEmojiSkin=null;
if(d.wheelState){wheelFreeUsed=d.wheelState.freeUsed||false;wheelPaidUsed=d.wheelState.paidUsed||false;wheelLastResetDay=d.wheelState.lastResetDay||"";}
if(d.lastTime){
var sa=Math.floor((Date.now()-d.lastTime)/1000);var cap=Math.min(sa,8*3600);
var e=Math.floor(getCPS()*cap);
if(e>0){coins+=e;totalEarned+=e;$("offline-amount").textContent=formatNumber(e);var mp=[];var lc2=parseInt(localStorage.getItem("lastChest")||"0");var ccl=3600000-(Date.now()-lc2);if(lc2>0&&ccl<=0&&sa>=3600){mp.push("🎁 Сундук готов");}var tb=0;for(var bb in BOOSTERS){tb+=(BOOSTERS[bb].storage||0);}if(tb>0){mp.push("📦 Бустеров: <b>"+tb+"</b>");}if(d.depositUnlocked&&d.depositLevel>=1&&d.depositLevel<=5&&sa>=600){mp.push("😭 Смайлик голоден");}var me=$("offline-missed");if(me){if(mp.length>0){me.innerHTML=mp.join("<br>");me.classList.remove("hidden");}else{me.classList.add("hidden");}}$("offline-popup").classList.remove("hidden");syncScrollLock();playSound("achievement");$("offline-close").onclick=function(){$("offline-popup").classList.add("hidden");syncScrollLock();saveGame();};}
if(d.depositUnlocked&&d.depositLevel>=1&&d.depositLevel<=5){var hp=Math.floor(DEPOSIT_HUNGRY_RATE*cap);if(hp>0)coins=Math.max(0,coins-hp);}}
shards=d.shards||0;lastShardsForTracking=shards;
eventMultiplier=1;eventTimer=0;eventName="";currentEventKey="";
crystalBoostMultiplier=d.crystalBoostMultiplier||1;crystalBoostTimer=d.crystalBoostTimer||0;crystalBoostName=d.crystalBoostName||"";
try{var gp=localStorage.getItem("clicker-used-promos");if(gp)usedPromos=JSON.parse(gp);else if(d.usedPromos)usedPromos=d.usedPromos;}catch(e){if(d.usedPromos)usedPromos=d.usedPromos;}
if(d.ownedItems){ownedItems=d.ownedItems;for(var oid in ownedItems){if(ownedItems[oid]===true)ownedItems[oid]=1;if(ownedItems[oid]===false)delete ownedItems[oid];}}
secretUnlocked=d.secretUnlocked||false;secretAutoClicker=d.secretAutoClicker||false;secretAutoClickerTimer=d.secretAutoClickerTimer||0;
depositUnlocked=d.depositUnlocked||false;depositLevel=d.depositLevel||0;lastDepositTimeKey=d.lastDepositTimeKey||"";
generatorLevel=d.generatorLevel||1;
if(generatorLevel<1)generatorLevel=1;
if(generatorLevel>GENERATOR_MAX_LEVEL)generatorLevel=GENERATOR_MAX_LEVEL;
generatorTimer=GENERATOR_DURATION;
smileSkinUnlocked=d.smileSkinUnlocked||false;
smileSkinActive=d.smileSkinActive||false;
if(!smileSkinUnlocked)smileSkinActive=false;
gulauActive=d.gulauActive||false;gulauTimer=d.gulauTimer||0;
rewardClaimed=d.rewardClaimed||false;bossRewardClaimed=d.bossRewardClaimed||false;noteShown=d.noteShown||false;pahanUnlocked=d.pahanUnlocked||false;
if(d.notesUnlocked){for(var nid in d.notesUnlocked){if(d.notesUnlocked[nid]){notesUnlocked[nid]=true;if(NOTES_DATA[nid])NOTES_DATA[nid].unlocked=true;}}}
if(notesUnlocked["note1"])note1Shown=true;
if(notesUnlocked["note2"])note2Shown=true;
if(notesUnlocked["note3"])note3Shown=true;
if(notesUnlocked["note4"])note4Shown=true;
if(notesUnlocked["note5"])note5Shown=true;
if(notesUnlocked["note6"])note6Shown=true;
if(notesUnlocked["note7"])note7Shown=true;
quests=d.quests||[];questsDate=d.questsDate||"";questsClaimed=d.questsClaimed||0;questProgress=d.questProgress||{};
if(gulauActive&&gulauTimer>0){$("gulau-info").style.display="block";updateGulauTimer();}
if(secretUnlocked&&secretAutoClicker&&secretAutoClickerTimer>0){setTimeout(function(){startSecretAutoClicker();},500);}
if(crystalBoostTimer>0&&crystalBoostMultiplier>1){document.body.classList.add("boost-active");}
if(typeof petLoadFromSave==="function")petLoadFromSave(d);
setTimeout(checkDailyBonus,3000);
checkRewardTab();checkNoteTab();updateDepositSideButton();updatePahanButton();updateBoostBanner();
applyOfflineDepositDrop();updateEvent();updateSuperEvent();updateBloodMoon();updateTheft();
lastDisplayedCoins=coins;
}catch(e){console.warn("Ошибка загрузки:",e);}}

// === ВРЕМЯ ВКЛАДА ===
function getTimeKey(){var d=new Date();var y=d.getFullYear();var m=("0"+(d.getMonth()+1)).slice(-2);var day=("0"+d.getDate()).slice(-2);var h=("0"+d.getHours()).slice(-2);var half=Math.floor(d.getMinutes()/30)*30;var hh=("0"+half).slice(-2);return y+"-"+m+"-"+day+"-"+h+"-"+hh;}
function getTimeKeyValue(k){var p=k.split("-");return new Date(parseInt(p[0]),parseInt(p[1])-1,parseInt(p[2]),parseInt(p[3]),parseInt(p[4])).getTime();}
function applyOfflineDepositDrop(){if(!depositUnlocked||depositLevel<1)return;var nk=getTimeKey();if(!lastDepositTimeKey){lastDepositTimeKey=nk;saveGame();return;}if(lastDepositTimeKey===nk)return;var lm=getTimeKeyValue(lastDepositTimeKey);var nm=getTimeKeyValue(nk);var H=30*60*1000;var t=Math.floor((nm-lm)/H);if(t<=0){lastDepositTimeKey=nk;saveGame();return;}if(t>500)t=500;var td=0;for(var i=0;i<t;i++){var dp=Math.random()<0.5?1:3;td+=dp;}var b=depositLevel;depositLevel=Math.max(1,depositLevel-td);if(depositLevel!==b){setTimeout(function(){var p=document.createElement("div");p.className="achievement-popup";p.textContent="😭 "+b+" → "+depositLevel;document.body.appendChild(p);setTimeout(function(){p.remove();},4000);},1500);}lastDepositTimeKey=nk;saveGame();}
function checkDepositTimeTick(){if(!depositUnlocked)return;var nk=getTimeKey();if(!lastDepositTimeKey){lastDepositTimeKey=nk;return;}if(lastDepositTimeKey===nk)return;var lm=getTimeKeyValue(lastDepositTimeKey);var nm=getTimeKeyValue(nk);var H=30*60*1000;var t=Math.floor((nm-lm)/H);if(t<=0){lastDepositTimeKey=nk;return;}var td=0;for(var i=0;i<t;i++){var dp=Math.random()<0.5?1:3;td+=dp;}var b=depositLevel;depositLevel=Math.max(1,depositLevel-td);lastDepositTimeKey=nk;if(depositLevel!==b){updateDepositSideButton();var m=$("modal-deposit");if(m&&!m.classList.contains("hidden"))renderDeposit();var p=document.createElement("div");p.className="achievement-popup";p.textContent="😭 "+b+" → "+depositLevel;document.body.appendChild(p);setTimeout(function(){p.remove();},4000);saveGame();}}

// === НАСТРОЙКИ ===
function loadSettings(){var r=localStorage.getItem("clicker-settings");if(r){try{var d=JSON.parse(r);settings.showFloat=d.showFloat!==false;settings.showGolden=d.showGolden!==false;settings.showDaily=d.showDaily!==false;settings.sound=d.sound!==false;settings.music=d.music===true;settings.lowParticles=d.lowParticles===true;settings.krohlupic=d.krohlupic!==false;}catch(e){}}var e1=$("opt-float"),e2=$("opt-golden"),e3=$("opt-daily"),e4=$("opt-sound"),e5=$("opt-music"),e6=$("opt-lowparticles"),e7=$("opt-krohlupic");if(e1)e1.checked=settings.showFloat;if(e2)e2.checked=settings.showGolden;if(e3)e3.checked=settings.showDaily;if(e4)e4.checked=settings.sound;if(e5)e5.checked=settings.music;if(e6)e6.checked=settings.lowParticles;if(e7)e7.checked=settings.krohlupic;document.body.classList.toggle("low-particles",settings.lowParticles);}
function saveSettings(){localStorage.setItem("clicker-settings",JSON.stringify(settings));}

// === ЯЗЫК ===
function setupLangSwitch(){document.querySelectorAll(".lang-btn").forEach(function(b){b.onclick=function(){var c=b.dataset.lang;if(!c||c===currentLang)return;setLang(c);playSound("ui");vibrate(10);};});}
function showLangChoiceModal(){var m=$("modal-language");if(!m)return;m.classList.remove("hidden");syncScrollLock();}
function setupLangChoice(){document.querySelectorAll("[data-choose-lang]").forEach(function(b){b.onclick=function(){var c=b.dataset.chooseLang;setLang(c);var m=$("modal-language");if(m)m.classList.add("hidden");syncScrollLock();setTimeout(function(){if(!hasProfile()){showProfileModal();}},400);};});}

// === ЗВУКИ ===
var sounds={},bgMusic=null,bgMusic2=null,currentMusicIndex=0;
function initSounds(){var n=["click","ui","achievement","chest","boss","eat"];n.forEach(function(x){try{sounds[x]=new Audio("sounds/"+x+".mp3");sounds[x].volume=0.4;}catch(e){}});try{bgMusic=new Audio("sounds/music.mp3");bgMusic.loop=false;bgMusic.volume=0.25;bgMusic.addEventListener("ended",function(){playNextMusic();});}catch(e){}try{bgMusic2=new Audio("sounds/music2.mp3");bgMusic2.loop=false;bgMusic2.volume=0.25;bgMusic2.addEventListener("ended",function(){playNextMusic();});}catch(e){}try{alarmSound=new Audio("sounds/alarm.mp3");alarmSound.loop=true;alarmSound.volume=0.5;}catch(e){}}
function playSound(n){if(!settings.sound)return;var s=sounds[n];if(!s)return;var now=Date.now();if(!s._last)s._last=0;if(now-s._last<80)return;s._last=now;try{s.currentTime=0;s.play();}catch(e){}}
function playMusic(){if(!settings.music)return;var t=(currentMusicIndex===0)?bgMusic:bgMusic2;if(!t)return;try{t.currentTime=0;t.play().catch(function(){});}catch(e){}}
function playNextMusic(){if(!settings.music)return;var o=(currentMusicIndex===0)?bgMusic2:bgMusic;if(o){try{o.pause();o.currentTime=0;}catch(e){}}currentMusicIndex=1-currentMusicIndex;var t=(currentMusicIndex===0)?bgMusic:bgMusic2;if(!t)return;try{t.currentTime=0;t.play().catch(function(){});}catch(e){}}
function stopMusic(){try{if(bgMusic)bgMusic.pause();}catch(e){}try{if(bgMusic2)bgMusic2.pause();}catch(e){}}
function unlockAudio(){for(var n in sounds){try{var p=sounds[n].play();if(p&&p.then){p.then(function(){sounds[n].pause();sounds[n].currentTime=0;}).catch(function(){});}}catch(e){}}if(settings.music)playMusic();document.removeEventListener("touchstart",unlockAudio);document.removeEventListener("click",unlockAudio);}
document.addEventListener("touchstart",unlockAudio,{once:true,passive:true});
document.addEventListener("click",unlockAudio,{once:true});
function handleVis(){if(document.hidden)stopMusic();else{if(settings.music)playMusic();}}
document.addEventListener("visibilitychange",handleVis);
window.addEventListener("pagehide",stopMusic);
window.addEventListener("blur",stopMusic);

// === ФОНЫ ===
function applyBackground(){document.body.classList.remove("bg-space","bg-flame","bg-ocean","bg-sakura","bg-ice","bg-bloodmoon","bg-volcano","bg-nebula","has-bg");if(activeBg==="base"){bgParticles=[];return;}var bg=BACKGROUNDS[activeBg];if(!bg)return;document.body.classList.add("has-bg",bg.cls);bgParticles=[];var pt=bg.particles;var bc=pt==="stars"?80:pt==="snow"?40:pt==="petals"?30:pt==="bubbles"?35:pt==="sparks"?40:pt==="lava"?30:pt==="nebula"?15:20;var c=settings.lowParticles?Math.floor(bc*0.4):bc;for(var i=0;i<c;i++){bgParticles.push({x:Math.random()*100,y:Math.random()*100,size:pt==="stars"?Math.random()*1.8+0.6:Math.random()*3+1.5,speed:pt==="sparks"?0.4+Math.random()*0.4:0.15+Math.random()*0.35,drift:Math.random()*0.3-0.15,rot:Math.random()*Math.PI*2,rotSpeed:Math.random()*0.04-0.02,alpha:0.4+Math.random()*0.6});}_fishArray=[];_emberArray=[];_ufoState.visible=false;_ufoState.spawnAt=Date.now();_butterflyState.spawnAt=Date.now();}
function ptColor(pt,far){if(far){if(pt==="stars")return "#aaa";if(pt==="sparks")return "#6a3a00";if(pt==="bubbles")return "#3a5a8a";if(pt==="petals")return "#8a5a70";if(pt==="snow")return "#8aa8c8";if(pt==="pulse")return "#4a0000";if(pt==="lava")return "#5a2a00";if(pt==="nebula")return "#3a1a5a";}return "#fff";}
function renderBgParticles(now){
if(!bgCanvas||!bgCtx)return;
if(!now)now=performance.now();
if(now-_lastBgFrame<42){bgAnimFrame=requestAnimationFrame(renderBgParticles);return;}
_lastBgFrame=now;bgFrameCounter++;
var W=bgCanvas.width,H=bgCanvas.height;
bgCtx.clearRect(0,0,W,H);
if(activeBg==="base"){bgAnimFrame=requestAnimationFrame(renderBgParticles);return;}
var pt=BACKGROUNDS[activeBg].particles;
bgParallax.x+=(bgParallax.targetX-bgParallax.x)*0.05;
bgParallax.y+=(bgParallax.targetY-bgParallax.y)*0.05;
bgCtx.save();bgCtx.globalAlpha=0.35;var oX=bgParallax.x*0.2,oY=bgParallax.y*0.2;
for(var i=0;i<bgParticles.length;i+=3){var p=bgParticles[i];var px=((p.x/100)*W+oX+W)%W;var py=((p.y/100)*H+oY+H)%H;bgCtx.fillStyle=ptColor(pt,true);bgCtx.beginPath();bgCtx.arc(px,py,p.size*0.7,0,Math.PI*2);bgCtx.fill();}
bgCtx.restore();
for(var i=0;i<bgParticles.length;i++){
var p=bgParticles[i];
if(pt==="stars"){p.alpha=0.4+Math.sin(Date.now()/600+i)*0.4;}
else if(pt==="sparks"){p.y-=p.speed*0.5;p.x+=p.drift*0.2;if(p.y<-5){p.y=105;p.x=Math.random()*100;}}
else if(pt==="bubbles"){p.y-=p.speed*0.4;p.x+=Math.sin(Date.now()/900+i)*0.15;if(p.y<-5){p.y=105;p.x=Math.random()*100;}}
else if(pt==="petals"){p.y+=p.speed*0.3;p.x+=Math.sin(Date.now()/800+i)*0.3;p.rot+=p.rotSpeed;if(p.y>105){p.y=-5;p.x=Math.random()*100;}}
else if(pt==="snow"){p.y+=p.speed*0.25;p.x+=p.drift;p.rot+=p.rotSpeed*0.5;if(p.y>105){p.y=-5;p.x=Math.random()*100;}}
else if(pt==="pulse"){p.alpha=0.3+Math.abs(Math.sin(Date.now()/1200+i))*0.5;}
else if(pt==="lava"){p.y-=p.speed*0.35;p.x+=Math.sin(Date.now()/700+i)*0.2;if(p.y<-5){p.y=105;p.x=Math.random()*100;}}
else if(pt==="nebula"){p.alpha=0.2+Math.abs(Math.sin(Date.now()/2000+i))*0.4;}
var px=(p.x/100)*W+bgParallax.x*0.5;var py=(p.y/100)*H+bgParallax.y*0.5;var sz=p.size;
bgCtx.save();bgCtx.globalAlpha=p.alpha;
if(pt==="stars"){bgCtx.fillStyle="#fff";bgCtx.beginPath();bgCtx.arc(px,py,sz,0,Math.PI*2);bgCtx.fill();}
else if(pt==="sparks"){bgCtx.fillStyle="#ff9500";bgCtx.fillRect(px,py,sz*0.6,sz*2);}
else if(pt==="bubbles"){bgCtx.strokeStyle="rgba(180,230,255,.7)";bgCtx.lineWidth=1.5;bgCtx.beginPath();bgCtx.arc(px,py,sz*2,0,Math.PI*2);bgCtx.stroke();}
else if(pt==="petals"){bgCtx.translate(px,py);bgCtx.rotate(p.rot);bgCtx.fillStyle="#ffb0d0";bgCtx.beginPath();bgCtx.ellipse(0,0,sz*2,sz,0,0,Math.PI*2);bgCtx.fill();}
else if(pt==="snow"){bgCtx.translate(px,py);bgCtx.rotate(p.rot);bgCtx.strokeStyle="#fff";bgCtx.lineWidth=1;for(var k=0;k<3;k++){bgCtx.beginPath();bgCtx.moveTo(-sz,-sz);bgCtx.lineTo(sz,sz);bgCtx.stroke();bgCtx.rotate(Math.PI/3);}}
else if(pt==="pulse"){var g=bgCtx.createRadialGradient(px,py,0,px,py,sz*15);g.addColorStop(0,"rgba(255,0,0,.8)");g.addColorStop(1,"rgba(255,0,0,0)");bgCtx.fillStyle=g;bgCtx.beginPath();bgCtx.arc(px,py,sz*15,0,Math.PI*2);bgCtx.fill();}
else if(pt==="lava"){bgCtx.fillStyle="rgba(255,100,0,.9)";bgCtx.beginPath();bgCtx.arc(px,py,sz*1.5,0,Math.PI*2);bgCtx.fill();}
else if(pt==="nebula"){var g2=bgCtx.createRadialGradient(px,py,0,px,py,sz*20);g2.addColorStop(0,"rgba(160,100,255,.7)");g2.addColorStop(0.5,"rgba(80,50,200,.3)");g2.addColorStop(1,"rgba(80,50,200,0)");bgCtx.fillStyle=g2;bgCtx.beginPath();bgCtx.arc(px,py,sz*20,0,Math.PI*2);bgCtx.fill();}
bgCtx.restore();
}
if(activeBg==="space"){drawUFO(W,H);}
else if(activeBg==="ocean"){drawFish(W,H);}
else if(activeBg==="flame"||activeBg==="volcano"){drawEmber(W,H);}
else if(activeBg==="sakura"){drawButterfly(W,H);}
bgAnimFrame=requestAnimationFrame(renderBgParticles);}
function drawUFO(W,H){var now=Date.now();if(!_ufoState.visible&&now-_ufoState.spawnAt>30000){_ufoState.visible=true;_ufoState.x=-60;_ufoState.y=50+Math.random()*100;_ufoState.spawnAt=now;}if(_ufoState.visible){_ufoState.x+=_ufoState.speed;if(_ufoState.x>W+60){_ufoState.visible=false;_ufoState.spawnAt=now;}bgCtx.save();bgCtx.globalAlpha=0.7;bgCtx.translate(_ufoState.x,_ufoState.y);bgCtx.fillStyle="#a0ffb0";bgCtx.beginPath();bgCtx.arc(0,-8,14,Math.PI,0);bgCtx.fill();bgCtx.fillStyle="#6a6a8a";bgCtx.beginPath();bgCtx.ellipse(0,0,22,8,0,0,Math.PI*2);bgCtx.fill();bgCtx.fillStyle="#ff5252";bgCtx.beginPath();bgCtx.arc(-12,4,2.5,0,Math.PI*2);bgCtx.fill();bgCtx.fillStyle="#ffd54f";bgCtx.beginPath();bgCtx.arc(0,4,2.5,0,Math.PI*2);bgCtx.fill();bgCtx.fillStyle="#4fc3f7";bgCtx.beginPath();bgCtx.arc(12,4,2.5,0,Math.PI*2);bgCtx.fill();bgCtx.restore();}}
function drawFish(W,H){if(_fishArray.length===0){for(var i=0;i<3;i++){_fishArray.push({x:Math.random()*W,y:Math.random()*H,speed:0.3+Math.random()*0.5,dir:Math.random()<0.5?1:-1,color:["#ff9800","#ffeb3b","#4fc3f7"][i],size:8+Math.random()*6,phase:Math.random()*Math.PI*2});}}_fishArray.forEach(function(f){f.x+=f.speed*f.dir;f.y+=Math.sin(Date.now()/1000+f.phase)*0.3;if(f.x>W+30)f.x=-30;if(f.x<-30)f.x=W+30;bgCtx.save();bgCtx.globalAlpha=0.6;bgCtx.translate(f.x,f.y);bgCtx.scale(f.dir,1);bgCtx.fillStyle=f.color;bgCtx.beginPath();bgCtx.ellipse(0,0,f.size,f.size*0.6,0,0,Math.PI*2);bgCtx.fill();bgCtx.beginPath();bgCtx.moveTo(-f.size,0);bgCtx.lineTo(-f.size-6,-f.size*0.5);bgCtx.lineTo(-f.size-6,f.size*0.5);bgCtx.closePath();bgCtx.fill();bgCtx.fillStyle="#000";bgCtx.beginPath();bgCtx.arc(f.size*0.4,-f.size*0.2,1.5,0,Math.PI*2);bgCtx.fill();bgCtx.restore();});}
function drawEmber(W,H){if(_emberArray.length===0){for(var i=0;i<15;i++){_emberArray.push({x:Math.random()*W,y:H+Math.random()*100,speed:0.5+Math.random()*1,size:1+Math.random()*2.5});}}_emberArray.forEach(function(e){e.y-=e.speed;if(e.y<-10){e.y=H+10;e.x=Math.random()*W;}bgCtx.save();bgCtx.globalAlpha=0.7;bgCtx.fillStyle="#ff6600";bgCtx.beginPath();bgCtx.arc(e.x,e.y,e.size,0,Math.PI*2);bgCtx.fill();bgCtx.restore();});}
function drawButterfly(W,H){var now=Date.now();if(now-_butterflyState.spawnAt>15000){_butterflyState.x=Math.random()*W;_butterflyState.y=Math.random()*H;_butterflyState.spawnAt=now;}_butterflyState.x+=Math.sin(now/1000)*0.5;_butterflyState.y+=Math.cos(now/1200)*0.3;_butterflyState.angle+=0.05;bgCtx.save();bgCtx.globalAlpha=0.6;bgCtx.translate(_butterflyState.x,_butterflyState.y);var wf=Math.sin(now/100)*0.6;bgCtx.fillStyle="#ff80ab";bgCtx.beginPath();bgCtx.ellipse(-6,-2,6,4,wf,0,Math.PI*2);bgCtx.fill();bgCtx.beginPath();bgCtx.ellipse(6,-2,6,4,-wf,0,Math.PI*2);bgCtx.fill();bgCtx.fillStyle="#4a148c";bgCtx.fillRect(-1,-3,2,6);bgCtx.restore();}
function resizeBgCanvas(){if(!bgCanvas)return;bgCanvas.width=window.innerWidth;bgCanvas.height=window.innerHeight;}
function startBgAnimation(){if(!bgCanvas){bgCanvas=$("bg-canvas");if(bgCanvas)bgCtx=bgCanvas.getContext("2d");}resizeBgCanvas();if(bgAnimFrame)cancelAnimationFrame(bgAnimFrame);bgFrameCounter=0;_lastBgFrame=0;renderBgParticles();}
function bgParallaxMove(x,y){var cx=window.innerWidth/2,cy=window.innerHeight/2;bgParallax.targetX=(x-cx)*0.03;bgParallax.targetY=(y-cy)*0.03;}
document.addEventListener("mousemove",function(e){bgParallaxMove(e.clientX,e.clientY);},{passive:true});
document.addEventListener("touchmove",function(e){if(e.touches&&e.touches[0])bgParallaxMove(e.touches[0].clientX,e.touches[0].clientY);},{passive:true});
function renderBackgrounds(){var l=$("bg-list");if(!l)return;l.innerHTML="";for(var id in BACKGROUNDS){var bg=BACKGROUNDS[id];var d=document.createElement("div");var c="skin-item";if(activeBg===id)c+=" active";if(!bg.owned)c+=" locked";d.className=c;d.dataset.bgid=id;var p="";if(activeBg===id)p='<div class="skin-price">✓ Активен</div>';else if(bg.owned)p='<div class="skin-price">Нажмите</div>';else p='<div class="skin-price">'+bg.cost+' 💎</div>';d.innerHTML='<div class="bg-preview '+id+'"></div>'+'<div class="skin-name">'+bg.name+'</div>'+p;l.appendChild(d);}document.querySelectorAll("[data-bgid]").forEach(function(el){el.onclick=function(){var id=el.dataset.bgid;var bg=BACKGROUNDS[id];if(bg.owned){if(activeBg===id&&id!=="base"){activeBg="base";}else{activeBg=id;}playSound("ui");applyBackground();startBgAnimation();renderBackgrounds();saveGame();return;}if(crystals<bg.cost){alert("Недостаточно кристаллов!\nНужно: "+bg.cost+" 💎\nУ вас: "+crystals+" 💎");return;}crystals-=bg.cost;bg.owned=true;activeBg=id;playSound("ui");vibrate(10);applyBackground();startBgAnimation();renderBackgrounds();updateUI();var ao=true;var cc=0;for(var bid in BACKGROUNDS){if(bid==="base")continue;if(BACKGROUNDS[bid].owned)cc++;else ao=false;}if(ao&&cc===8&&!unlocked.bg_all){unlocked.bg_all=true;checkAchievements();}saveGame();};});}

// === СКИНЫ ===
function loadSkins(){var r=localStorage.getItem("clicker-skins");if(r){try{var d=JSON.parse(r);if(d.owned){for(var id in d.owned){if(skins[id])skins[id].owned=d.owned[id];}}if(d.active&&skins[d.active])activeSkin=d.active;if(d.emojiOwned){for(var eid in d.emojiOwned){if(EMOJI_SKINS[eid])EMOJI_SKINS[eid].owned=d.emojiOwned[eid];}}if(d.activeEmoji&&EMOJI_SKINS[d.activeEmoji])activeEmojiSkin=d.activeEmoji;if(d.activeEmoji===null)activeEmojiSkin=null;}catch(e){}}}
function saveSkins(){var od={};for(var id in skins){od[id]=skins[id].owned;}var eo={};for(var eid in EMOJI_SKINS){eo[eid]=EMOJI_SKINS[eid].owned;}try{localStorage.setItem("clicker-skins",JSON.stringify({owned:od,active:activeSkin,emojiOwned:eo,activeEmoji:activeEmojiSkin}));}catch(e){}}
function applySkin(){var b=$("click-btn");if(!b)return;b.classList.remove("skin-gennadii");b.classList.remove("has-emoji","skin-heart","skin-fire_heart","skin-shield","skin-candy");var e=b.querySelector(".emoji-skin-display");if(e)e.remove();if(activeEmojiSkin&&EMOJI_SKINS[activeEmojiSkin]&&EMOJI_SKINS[activeEmojiSkin].owned){var es=EMOJI_SKINS[activeEmojiSkin];b.classList.add("has-emoji","skin-"+es.id);b.style.background="";b.style.boxShadow="";var sp=document.createElement("span");sp.className="emoji-skin-display";sp.textContent=es.emoji;b.appendChild(sp);return;}var s=skins[activeSkin];if(activeSkin==="gennadii"&&s.owned){b.classList.add("skin-gennadii");b.style.background="";b.style.boxShadow="";return;}if(s.image)b.style.background="url('"+s.image+"') center / cover no-repeat";else b.style.background=s.bg;b.style.boxShadow="0 6px 0 rgba(0, 0, 0, 0.4)";}
function renderSkins(){var l=$("skins-list");if(!l)return;l.innerHTML="";for(var id in skins){var s=skins[id];if(s.secret&&!s.owned)continue;var d=document.createElement("div");var c="skin-item";if(activeEmojiSkin===null&&activeSkin===id)c+=" active";if(!s.owned)c+=" locked";d.className=c;d.dataset.id=id;var ps,pt;if(s.special&&id==="gennadii"){ps="background:radial-gradient(circle at 50% 50%, #f4a8c0 0%, #f4a8c0 40%, #e8d7b8 42%, #e8d7b8 100%);";pt="";}else if(s.image){ps="background:url('"+s.image+"') center / cover no-repeat;";pt="";}else{ps="background:"+s.bg+";";pt="ТАП";}var p="";if(activeEmojiSkin===null&&activeSkin===id)p='<div class="skin-price">✓ Выбран</div>';else if(s.owned)p='<div class="skin-price">Нажмите</div>';else if(s.special)p='<div class="skin-price">Только промокод</div>';else p='<div class="skin-price">'+SKIN_PRICE+' 💎</div>';d.innerHTML='<div class="skin-preview" style="'+ps+'">'+pt+'</div>'+'<div class="skin-name">'+s.name+'</div>'+p;l.appendChild(d);}document.querySelectorAll(".skin-item[data-id]").forEach(function(el){el.onclick=function(){var id=el.dataset.id;var s=skins[id];if(s.owned){activeSkin=id;activeEmojiSkin=null;playSound("ui");saveSkins();applySkin();renderSkins();renderEmojiSkins();return;}if(s.special){alert("Этот скин только через промокод!");return;}if(crystals<SKIN_PRICE){alert("Недостаточно кристаллов!\nНужно: "+SKIN_PRICE+" 💎\nУ вас: "+crystals+" 💎");return;}crystals-=SKIN_PRICE;s.owned=true;activeSkin=id;activeEmojiSkin=null;playSound("ui");vibrate(10);addQuestProgress("skin",1);saveSkins();applySkin();renderSkins();renderEmojiSkins();updateUI();saveGame();};});}
function renderEmojiSkins(){var l=$("emoji-skins-list");if(!l)return;l.innerHTML="";for(var id in EMOJI_SKINS){var es=EMOJI_SKINS[id];var d=document.createElement("div");var c="skin-item";if(activeEmojiSkin===id)c+=" active";if(!es.owned)c+=" locked";d.className=c;d.dataset.eid=id;var p="";if(activeEmojiSkin===id)p='<div class="skin-price">✓ Выбран</div>';else if(es.owned)p='<div class="skin-price">Нажмите</div>';else p='<div class="skin-price">'+es.cost+' 💎</div>';d.innerHTML='<div class="skin-preview" style="font-size:38px;background:#0e1a30;color:#fff">'+es.emoji+'</div>'+'<div class="skin-name">'+es.name+'</div>'+p;l.appendChild(d);}document.querySelectorAll("[data-eid]").forEach(function(el){el.onclick=function(){var id=el.dataset.eid;var es=EMOJI_SKINS[id];if(es.owned){activeEmojiSkin=(activeEmojiSkin===id)?null:id;playSound("ui");saveSkins();applySkin();renderSkins();renderEmojiSkins();return;}if(crystals<es.cost){alert("Недостаточно кристаллов!\nНужно: "+es.cost+" 💎\nУ вас: "+crystals+" 💎");return;}crystals-=es.cost;es.owned=true;activeEmojiSkin=id;playSound("ui");vibrate(10);saveSkins();applySkin();renderSkins();renderEmojiSkins();updateUI();saveGame();};});}
function renderSmileSkins(){var l=$("smile-skins-list");if(!l)return;l.innerHTML="";var d=document.createElement("div");var ia=smileSkinActive,iu=smileSkinUnlocked;var c="skin-item";if(ia)c+=" active";if(!iu)c+=" locked";d.className=c;var p="";if(!iu)p='<div class="skin-price">Только промокод</div>';else if(ia)p='<div class="skin-price">✓ Включён</div>';else p='<div class="skin-price">Нажмите</div>';d.innerHTML='<div class="smile-skin-preview blood"><span>😈</span></div>'+'<div class="skin-name">Кровавая мутация</div>'+p;l.appendChild(d);d.onclick=function(){if(!smileSkinUnlocked){alert("Только через промокод!");return;}smileSkinActive=!smileSkinActive;playSound("ui");renderSmileSkins();updateDepositSideButton();var m=$("modal-deposit");if(m&&!m.classList.contains("hidden"))renderDeposit();saveGame();};}
function getItemBonus(){var s=0;for(var id in ITEMS){var lv=ownedItems[id]||0;if(typeof lv==="boolean")lv=lv?1:0;if(lv>0){s+=ITEMS[id].bonuses[lv-1];}}return 1+s;}

// === ТАП-ЭФФЕКТЫ ===
function spawnTapRing(x,y){var lv=1;if(upgrades.clicker.count>=500)lv=5;else if(upgrades.clicker.count>=250)lv=4;else if(upgrades.clicker.count>=100)lv=3;else if(upgrades.clicker.count>=50)lv=2;var r=document.createElement("div");r.className="tap-ring tap-ring-lvl"+lv;r.style.left=x+"px";r.style.top=y+"px";r.style.width="80px";r.style.height="80px";document.body.appendChild(r);setTimeout(function(){r.remove();},500);}
function spawnTapWave(x,y){if(settings.lowParticles)return;var w=document.createElement("div");w.className="tap-wave";w.style.left=x+"px";w.style.top=y+"px";document.body.appendChild(w);setTimeout(function(){w.remove();},600);}
function spawnScreenShake(){if(settings.lowParticles)return;var p=document.querySelector(".page-active");if(!p)return;p.classList.remove("shake");void p.offsetWidth;p.classList.add("shake");setTimeout(function(){p.classList.remove("shake");},150);}

// === ПРЕДМЕТЫ ===
function renderItems(){var l=$("items-list"),se=$("items-shards"),ce=$("items-crystals");if(!l)return;if(se)se.textContent=shards;if(ce)ce.textContent=crystals;l.innerHTML="";for(var id in ITEMS){var it=ITEMS[id];var lv=ownedItems[id]||0;if(typeof lv==="boolean")lv=lv?1:0;var im=lv>=ITEM_MAX_LEVEL;var cb=lv>0?it.bonuses[lv-1]:0;var nb=!im?it.bonuses[lv]:0;var nc=!im?Math.round(it.cost*ITEM_PRICE_MULT[lv]):0;var can=!im&&shards>=nc;var d=document.createElement("div");d.className="item-card"+(lv>0?" owned":"");var e="";if(lv===0)e="Не куплено · Ур. 0/3";else if(im)e="Максимум · +"+Math.round(cb*100)+"%";else e="Ур. "+lv+"/3 · +"+Math.round(cb*100)+"% → +"+Math.round(nb*100)+"%";var bt="";if(im)bt="✓ Максимум";else if(lv===0)bt=nc+" 🌑";else bt="Улучшить: "+nc+" 🌑";var bc="item-buy"+(im?" owned-btn":"");d.innerHTML='<div class="item-icon">'+it.icon+'</div>'+'<div class="item-info">'+'<div class="item-name">'+it.name+'</div>'+'<div class="item-desc">'+it.desc+'</div>'+'<div class="item-effect">'+e+'</div>'+'</div>'+'<button class="'+bc+'" data-id="'+id+'"'+(im||!can?' disabled':'')+'>'+bt+'</button>';l.appendChild(d);}document.querySelectorAll(".item-buy").forEach(function(b){b.onclick=function(){var id=b.dataset.id;var it=ITEMS[id];var lv=ownedItems[id]||0;if(typeof lv==="boolean")lv=lv?1:0;if(lv>=ITEM_MAX_LEVEL)return;var c=Math.round(it.cost*ITEM_PRICE_MULT[lv]);if(shards<c){alert("Недостаточно осколков!\nНужно: "+c+" 🌑\nУ вас: "+shards+" 🌑");return;}shards-=c;ownedItems[id]=lv+1;playSound("ui");vibrate(10);addQuestProgress("item",1);renderItems();updateUI();saveGame();};});}

// === МАГАЗИН КРИСТАЛЛОВ ===
function renderCrystalShop(){var l=$("crystal-list");if(!l)return;l.innerHTML="";for(var id in CRYSTAL_ITEMS){var it=CRYSTAL_ITEMS[id];var dis=false,st="",bt=it.cost+' 💎';if(id==="boost2"||id==="boost3"||id==="boost5"){st="В хранилище: "+(BOOSTERS[id]?BOOSTERS[id].storage:0);}else if(id==="coinsBag"){var g=Math.floor(getCPS()*3600);st=g>0?("Даст "+formatNumber(g)+" монет"):"CPS пока 0";}else if(id==="depositUp"){if(!depositUnlocked||depositLevel>=25){dis=true;st=!depositUnlocked?"Сначала купите вклад":"Вклад на максимуме";}else{st="Ур. "+depositLevel+" → "+(depositLevel+1);}}else if(id==="chest"){st="Сразу откроется";}var d=document.createElement("div");d.className="item-card";d.innerHTML='<div class="item-icon">'+it.icon+'</div>'+'<div class="item-info">'+'<div class="item-name">'+it.name+'</div>'+'<div class="item-desc">'+it.desc+'</div>'+'<div class="item-effect">'+st+'</div>'+'</div>'+'<button class="item-buy crystal-buy" data-id="'+id+'"'+(dis?' disabled':'')+'>'+bt+'</button>';l.appendChild(d);}document.querySelectorAll(".crystal-buy").forEach(function(b){if(b.disabled){b.onclick=null;return;}b.onclick=function(){buyCrystalItem(b.dataset.id);};});}
function buyCrystalItem(id){var it=CRYSTAL_ITEMS[id];if(!it)return;if(id==="depositUp"){if(!depositUnlocked){alert("Сначала купите вклад!");return;}if(depositLevel>=25){alert("Вклад на максимуме!");return;}}if(id==="boost2"||id==="boost3"||id==="boost5"){if(crystalBoostTimer>0&&crystalBoostMultiplier>1){alert("Буст уже активен!");return;}}if(crystals<it.cost){alert("Недостаточно кристаллов!\nНужно: "+it.cost+" 💎\nУ вас: "+crystals+" 💎");return;}crystals-=it.cost;if(id==="coinsBag"){var g=Math.floor(getCPS()*3600);coins+=g;totalEarned+=g;alert("💰 Получено "+formatNumber(g)+" монет!");}else if(id==="boost2"||id==="boost3"||id==="boost5"){addBoosterToStorage(id);}else if(id==="chest"){var r=getChestRewards();openChestAnimation(r.crystals,r.coins,r.shards,r.booster,function(){addCrystals(r.crystals);coins+=r.coins;totalEarned+=r.coins;shards+=r.shards;if(r.booster)addBoosterToStorage(r.booster);chestsOpened++;addQuestProgress("chest",1);updateUI();updateChestButton();checkAchievements();saveGame();});}else if(id==="depositUp"){depositLevel++;lastDepositTimeKey=getTimeKey();playSound("eat");addQuestProgress("deposit",1);updateDepositSideButton();}playSound("ui");vibrate(10);updateBoostBanner();updateUI();renderCrystalShop();saveGame();}

// === БУСТЕРЫ ===
function addBoosterToStorage(id){if(!BOOSTERS[id])return;BOOSTERS[id].storage=(BOOSTERS[id].storage||0)+1;showBoosterAddedPopup(id);saveGame();var mb=$("modal-boosters");if(mb&&!mb.classList.contains("hidden"))renderBoosters();}
function showBoosterAddedPopup(id){var b=BOOSTERS[id];if(!b)return;var p=document.createElement("div");p.className="achievement-popup";p.textContent=b.icon+" Бустер ×"+b.mult+" в хранилище";document.body.appendChild(p);setTimeout(function(){p.remove();},3000);}
function activateBooster(id){var b=BOOSTERS[id];if(!b)return;if(!b.storage||b.storage<=0){alert("Нет бустеров!");return;}if(crystalBoostTimer>0&&crystalBoostMultiplier>1){alert("Активен другой бустер!");return;}b.storage--;crystalBoostMultiplier=b.mult;crystalBoostTimer=b.duration;crystalBoostName=b.icon+" Буст ×"+b.mult;playSound("ui");updateBoostBanner();updateUI();renderCrystalShop();renderBoosters();saveGame();}
function renderBoosters(){var l=$("boosters-list"),bn=$("booster-active-banner");if(!l)return;if(bn){if(crystalBoostTimer>0&&crystalBoostMultiplier>1){var m=Math.floor(crystalBoostTimer/60),s=crystalBoostTimer%60;bn.textContent="⚡ Активен ×"+crystalBoostMultiplier+" — "+m+":"+(s<10?"0":"")+s;bn.classList.remove("hidden");}else{bn.classList.add("hidden");}}l.innerHTML="";for(var id in BOOSTERS){var b=BOOSTERS[id];var c=b.storage||0;var ia=(crystalBoostTimer>0&&crystalBoostMultiplier===b.mult);var io=(crystalBoostTimer>0&&crystalBoostMultiplier>1&&!ia);var cl="booster-card";if(c<=0)cl+=" empty";if(ia)cl+=" active-booster";var d=document.createElement("div");d.className=cl;var bt="Активировать",bd=false;if(c<=0){bt="Нет в наличии";bd=true;}else if(io){bt="Активен другой";bd=true;}else if(ia){bt="Уже активен";bd=true;}d.innerHTML='<div class="booster-icon">'+b.icon+'</div>'+'<div class="booster-info">'+'<div class="booster-name">'+b.name+'</div>'+'<div class="booster-desc">'+b.desc+'</div>'+'<div class="booster-count">📦 В наличии: '+c+'</div>'+'</div>'+'<button class="booster-activate-btn" data-bid="'+id+'"'+(bd?' disabled':'')+'>'+bt+'</button>';l.appendChild(d);}document.querySelectorAll(".booster-activate-btn").forEach(function(b){if(b.disabled){b.onclick=null;return;}b.onclick=function(){activateBooster(b.dataset.bid);};});}
function updateBoostBanner(){var b=$("boost-banner");if(!b)return;if(crystalBoostTimer>0&&crystalBoostMultiplier>1){var m=Math.floor(crystalBoostTimer/60),s=crystalBoostTimer%60;b.textContent=crystalBoostName+" — "+m+":"+(s<10?"0":"")+s;b.classList.remove("hidden");document.body.classList.add("boost-active");}else{b.classList.add("hidden");document.body.classList.remove("boost-active");}}
function updateCrystalBoostTimer(){if(crystalBoostTimer>0){crystalBoostTimer--;if(crystalBoostTimer<=0){crystalBoostTimer=0;crystalBoostMultiplier=1;crystalBoostName="";}updateBoostBanner();var mb=$("modal-boosters");if(mb&&!mb.classList.contains("hidden"))renderBoosters();}}

// === ГЕНЕРАТОР ===
function getGeneratorCPS(){if(generatorLevel<1)return 1;return Math.max(1,Math.floor(generatorLevel/2.5));}
function getGeneratorCooldownMs(){return Math.round(1000/getGeneratorCPS());}
function getGeneratorCost(){if(generatorLevel>=GENERATOR_MAX_LEVEL)return Infinity;return Math.round(GENERATOR_BASE_COST*Math.pow(GENERATOR_COST_MULT,generatorLevel-1));}
function upgradeGenerator(){if(generatorLevel>=GENERATOR_MAX_LEVEL)return;var c=getGeneratorCost();if(coins<c){alert("Недостаточно монет!\nНужно: "+formatNumber(c)+"\nУ вас: "+formatNumber(coins));return;}coins-=c;generatorLevel++;generatorTimer=GENERATOR_DURATION;playSound("ui");vibrate(10);updateGeneratorButton();renderGenerator();updateUI();saveGame();}
function updateGeneratorTimer(){generatorTimer--;if(generatorTimer<=0){generatorTimer=GENERATOR_DURATION;var dr=[1,2,3,5];var d=dr[Math.floor(Math.random()*dr.length)];var b=generatorLevel;generatorLevel=Math.max(1,generatorLevel-d);if(generatorLevel!==b){updateGeneratorButton();var m=$("modal-generator");if(m&&!m.classList.contains("hidden"))renderGenerator();showGeneratorDropPopup(d);}}updateGeneratorButton();}
function showGeneratorDropPopup(d){var p=document.createElement("div");p.className="achievement-popup";p.textContent="⚡ Генератор −"+d+" (сейчас "+generatorLevel+")";document.body.appendChild(p);setTimeout(function(){p.remove();},3000);}
function updateGeneratorButton(){var b=$("generator-btn");if(!b)return;var c=getGeneratorCPS();var ct=(c<1)?("1 тап / "+(1/c).toFixed(1)+" сек"):(c+" тап/сек");b.textContent="⚡ Генератор: Ур. "+generatorLevel+" ("+ct+")";}
function renderGenerator(){var c=$("generator-content");if(!c)return;var cps=getGeneratorCPS();var im=generatorLevel>=GENERATOR_MAX_LEVEL;var nc=im?0:getGeneratorCost();var m=Math.floor(generatorTimer/60),s=generatorTimer%60;var ct=(cps<1)?("1 тап за "+(1/cps).toFixed(1)+" сек"):(cps+" тапов/сек");var pp=(generatorTimer/GENERATOR_DURATION)*100;var h='<div class="generator-emoji">⚡</div>'+'<div class="generator-level">Уровень '+generatorLevel+' / '+GENERATOR_MAX_LEVEL+'</div>'+'<div class="generator-stat">Скорость: <b>'+ct+'</b></div>'+'<div class="generator-stat">До падения: <b>'+m+':'+(s<10?"0":"")+s+'</b></div>'+'<div class="generator-bar"><div class="generator-bar-fill" style="width:'+pp+'%"></div></div>'+'<div class="generator-warning">⚠️ Раз в 3 минуты уровень падает на 1–5</div>';if(!im){h+='<div class="deposit-desc">Улучшить: <b>'+formatNumber(nc)+'</b> монет</div>'+'<button id="generator-upgrade-btn" class="deposit-btn" type="button">⚡ Улучшить</button>';}else{h+='<div class="deposit-happy">✨ Максимальный уровень!</div>';}c.innerHTML=h;var b=$("generator-upgrade-btn");if(b){b.disabled=coins<nc;b.onclick=upgradeGenerator;}}
var cooldownInterval=null;
function startCooldownUI(){if(cooldownInterval)return;cooldownInterval=setInterval(function(){var b=$("click-btn");if(!b)return;if(generatorLevel>=20){b.classList.remove("cooldown");b.classList.add("tap-ready");var to=$("tap-cooldown-text");if(to)to.textContent="";return;}var cd=getGeneratorCooldownMs();var el=Date.now()-lastClickTime;var l=cd-el;if(l>0){var sl=(l/1000).toFixed(1);var t=$("tap-cooldown-text");if(t)t.textContent="⌛ "+sl;b.classList.add("cooldown");b.classList.remove("tap-ready");}else{b.classList.remove("cooldown");b.classList.add("tap-ready");var t2=$("tap-cooldown-text");if(t2)t2.textContent="";}},100);}

// === ВКЛАД ===
function getCurrentDepositEmoji(){if(!depositUnlocked||depositLevel<1)return "❓";var l=DEPOSIT_LEVELS[depositLevel-1];return l?l.emoji:"❓";}
function updateDepositSideButton(){var b=$("deposit-side-btn");if(!b)return;b.classList.remove("lvl-hungry","lvl-mid","lvl-happy","lvl-max");if(!depositUnlocked){b.textContent="❓";return;}b.textContent=getCurrentDepositEmoji();if(depositLevel<=5)b.classList.add("lvl-hungry");else if(depositLevel<=15)b.classList.add("lvl-mid");else if(depositLevel<25)b.classList.add("lvl-happy");else b.classList.add("lvl-max");}
function renderDeposit(){
var c=$("deposit-content");if(!c)return;
if(!depositUnlocked){c.innerHTML='<div class="deposit-emoji">❓</div>'+'<div class="deposit-desc">Купите вклад за <b>1 Qa</b> монет.</div>'+'<div class="deposit-desc" style="color:#aaa;font-size:13px;">Смайлик будет расти с каждым вложением.</div>'+'<button id="deposit-buy-btn" class="deposit-btn" type="button">💰 Купить вклад за 1 Qa</button>';var b=$("deposit-buy-btn");if(b){b.disabled=coins<DEPOSIT_LEVELS[0].cost;b.onclick=function(){if(depositUnlocked)return;if(coins<DEPOSIT_LEVELS[0].cost)return;coins-=DEPOSIT_LEVELS[0].cost;depositUnlocked=true;depositLevel=1;lastDepositTimeKey=getTimeKey();playSound("eat");vibrate(10);renderDeposit();updateDepositSideButton();updateUI();saveGame();};}return;}
var e=getCurrentDepositEmoji();var ih=depositLevel<=5;var im=depositLevel>=25;var sc="";if(smileSkinActive&&smileSkinUnlocked)sc=" skin-blood";var eh;if(smileSkinActive&&smileSkinUnlocked){eh='<div class="deposit-emoji'+sc+(ih?' hungry':'')+'" id="deposit-emoji-el"><span class="emoji-inner">'+e+'</span></div>';}else{eh='<div class="deposit-emoji'+(ih?' hungry':'')+'" id="deposit-emoji-el">'+e+'</div>';}
var h=eh+'<div class="deposit-level">Уровень '+depositLevel+' / 25</div>';
if(ih)h+='<div class="deposit-warning">😭 Голодный! Ест 5M монет/сек</div>';
else if(im)h+='<div class="deposit-happy">✨ Полный вклад!</div>';
else h+='<div class="deposit-happy">Смайлик доволен</div>';
if(!im){var nc=DEPOSIT_LEVELS[depositLevel].cost;h+='<div class="deposit-desc">Следующий: <b>'+formatNumber(nc)+'</b> монет</div>'+'<button id="deposit-buy-btn" class="deposit-btn" type="button">💰 Вложить '+formatNumber(nc)+'</button>';}else{h+='<div class="deposit-desc" style="color:#4caf50;">Максимум!</div>';}
c.innerHTML=h;
var b2=$("deposit-buy-btn");if(b2){var n=DEPOSIT_LEVELS[depositLevel].cost;b2.disabled=coins<n;b2.onclick=function(){var cn=DEPOSIT_LEVELS[depositLevel].cost;if(depositLevel>=25)return;if(coins<cn)return;coins-=cn;depositLevel++;lastDepositTimeKey=getTimeKey();playSound("eat");vibrate(10);addQuestProgress("deposit",1);updateDepositSideButton();updateUI();renderDeposit();saveGame();};}
var ee=$("deposit-emoji-el");if(ee){ee.style.cursor="pointer";ee.onclick=bossEmojiClick;}}
function updateDepositHunger(){if(!depositUnlocked){var h=$("hungry-info");if(h)h.style.display="none";return;}if(depositLevel<=5){var h2=$("hungry-info");if(h2)h2.style.display="block";var e=Math.min(coins,DEPOSIT_HUNGRY_RATE);if(e>0)coins-=e;}else{var h3=$("hungry-info");if(h3)h3.style.display="none";}}

// === БОСС ===
function setupBossSecret(){var e=$("boss-emoji");if(e){e.onclick=function(){if(!bossActive)return;if(bossClickCooldown>0)return;bossClickCooldown=0.05;bossHP--;if(bossHP<0)bossHP=0;updateBossUI();e.classList.remove("hurt");void e.offsetWidth;e.classList.add("hurt");if(bossHP<=0)winBoss();};}var s=$("boss-start");if(s)s.onclick=function(){startBoss();};}
function startBoss(){bossActive=true;bossHP=bossMaxHP;bossTimeLeft=45.0;$("boss-result").textContent="";$("boss-result").className="";$("boss-start").style.display="none";updateBossUI();if(bossTimerInterval)clearInterval(bossTimerInterval);bossTimerInterval=setInterval(function(){if(!bossActive)return;bossTimeLeft-=0.05;bossClickCooldown-=0.05;if(bossClickCooldown<0)bossClickCooldown=0;if(bossTimeLeft<=0){bossTimeLeft=0;loseBoss();}updateBossUI();},50);}
function updateBossUI(){var f=$("boss-hp-fill"),t=$("boss-hp-text"),tm=$("boss-timer");if(f)f.style.width=(bossHP/bossMaxHP*100)+"%";if(t)t.textContent=bossHP+" / "+bossMaxHP;if(tm)tm.textContent="⏱ "+bossTimeLeft.toFixed(1)+" с";}
function winBoss(){bossActive=false;if(bossTimerInterval){clearInterval(bossTimerInterval);bossTimerInterval=null;}var r=$("boss-result");if(!bossRewardClaimed){bossRewardClaimed=true;shards+=25;if(r){r.textContent="🏆 Победа! +25 🌑";r.className="win";}}else{if(r){r.textContent="🏆 Победа! (награда уже получена)";r.className="win";}}$("boss-start").style.display="block";$("boss-start").textContent="🔁 Ещё раз";playSound("achievement");vibrate(50);updateUI();saveGame();}
function loseBoss(){bossActive=false;if(bossTimerInterval){clearInterval(bossTimerInterval);bossTimerInterval=null;}var p=10000000000000000000;var l=Math.min(coins,p);coins-=l;var r=$("boss-result");if(r){r.textContent="💀 Провал! −"+formatNumber(l);r.className="lose";}$("boss-start").style.display="block";$("boss-start").textContent="🔁 Попробовать";playSound("ui");updateUI();saveGame();}
function bossEmojiClick(){bossClickCount++;if(bossClickTimer)clearTimeout(bossClickTimer);bossClickTimer=setTimeout(function(){bossClickCount=0;},1500);if(bossClickCount>=3){bossClickCount=0;openBossModal();}}
function openBossModal(){var m=$("modal-boss");if(!m)return;var d=$("modal-deposit");if(d)d.classList.add("hidden");bossActive=false;bossHP=bossMaxHP;bossTimeLeft=45.0;$("boss-result").textContent="";$("boss-result").className="";$("boss-start").style.display="block";$("boss-start").textContent="🔥 Начать бой";updateBossUI();m.classList.remove("hidden");syncScrollLock();playSound("boss");}

// === ТРЕВОГА ===
function resetAlarmTimer(){if(alarmTimeout)clearTimeout(alarmTimeout);alarmTimeout=setTimeout(triggerAlarm,ALARM_TIME);}
function triggerAlarm(){if(alarmActive)return;alarmActive=true;alarmClicks=0;updateAlarmCounter();var o=$("alarm-overlay");if(o)o.classList.remove("hidden");syncScrollLock();if(alarmSound&&settings.sound){try{alarmSound.currentTime=0;alarmSound.play().catch(function(){});}catch(e){}}}
function stopAlarm(){alarmActive=false;var o=$("alarm-overlay");if(o)o.classList.add("hidden");syncScrollLock();if(alarmSound){try{alarmSound.pause();alarmSound.currentTime=0;}catch(e){}}resetAlarmTimer();}
function updateAlarmCounter(){var c=$("alarm-counter");if(c)c.textContent=alarmClicks+" / 5";}
function setupAlarm(){var o=$("alarm-overlay");if(!o)return;o.onclick=function(){if(!alarmActive)return;alarmClicks++;updateAlarmCounter();playSound("ui");if(alarmClicks>=5)stopAlarm();};resetAlarmTimer();}

// === НАГРАДА ===
function checkRewardTab(){var t=$("tab-reward");if(!t)return;if(rewardClaimed){t.classList.add("hidden");return;}if(upgrades.clicker.count>=228){if(!rewardTabShown){t.classList.remove("hidden");rewardTabShown=true;var p=document.createElement("div");p.className="achievement-popup";p.textContent="🏅 Ты прокачал Кликер до 228! Открой вкладку «Награда»!";document.body.appendChild(p);setTimeout(function(){p.remove();},5000);playSound("achievement");}}else{t.classList.add("hidden");rewardTabShown=false;}}
function claimReward(){if(rewardClaimed)return;shards+=25;rewardClaimed=true;var r=$("reward-result");if(r){r.textContent="🎉 +25 🌑!";r.style.color="#4caf50";}var b=$("reward-claim");if(b){b.disabled=true;b.textContent="✅ Получено";}playSound("achievement");vibrate(20);updateUI();saveGame();setTimeout(function(){var t=$("tab-reward");if(t)t.classList.add("hidden");var m=$("modal-reward");if(m)m.classList.add("hidden");syncScrollLock();},2000);}

// === КВЕСТЫ ===
function getTodayKey(){var d=new Date();if(d.getHours()<6)d.setDate(d.getDate()-1);return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();}
function generateQuests(){var ak=[];for(var k in QUEST_TYPES){if(k==="buy_skin"){var hu=false;for(var s in skins){if(!skins[s].owned&&!skins[s].special){hu=true;break;}}if(!hu)continue;}if(k==="deposit_up"){if(depositLevel>=25)continue;}if(k==="prestige_item"){var hi=false;for(var i in ITEMS){var lv=ownedItems[i]||0;if(typeof lv==="boolean")lv=lv?1:0;if(lv<ITEM_MAX_LEVEL){hi=true;break;}}if(!hi)continue;}ak.push(k);}var ch=[];while(ch.length<3&&ak.length>0){var idx=Math.floor(Math.random()*ak.length);ch.push(ak[idx]);ak.splice(idx,1);}quests=ch;questsDate=getTodayKey();questsClaimed=0;questProgress={};quests.forEach(function(id){questProgress[id]=0;});saveGame();}
function checkQuestsUpdate(){var t=getTodayKey();if(questsDate!==t)generateQuests();}
function addQuestProgress(sn,am){if(!quests||quests.length===0)return;quests.forEach(function(id){var ty=QUEST_TYPES[id];if(!ty)return;if(ty.stat!==sn)return;var ck="clicker-quest-claimed-"+questsDate+"-"+id;try{if(localStorage.getItem(ck)==="1")return;}catch(e){}questProgress[id]=(questProgress[id]||0)+am;});}
function isQuestClaimed(id){var ck="clicker-quest-claimed-"+questsDate+"-"+id;try{return localStorage.getItem(ck)==="1";}catch(e){return false;}}
function claimQuest(id){var ty=QUEST_TYPES[id];if(!ty)return;if(isQuestClaimed(id))return;var p=questProgress[id]||0;if(p<ty.goal)return;var ck="clicker-quest-claimed-"+questsDate+"-"+id;try{localStorage.setItem(ck,"1");}catch(e){}if(ty.rewardType==="💎")addCrystals(ty.reward);else if(ty.rewardType==="🌑")shards+=ty.reward;else if(ty.rewardType==="💰"){coins+=ty.reward;totalEarned+=ty.reward;}playSound("achievement");vibrate(15);renderQuests();updateUI();saveGame();}
function renderQuests(){var l=$("quests-list"),te=$("quests-timer");if(!l)return;checkQuestsUpdate();if(te){var now=new Date();var r=new Date();r.setHours(6,0,0,0);if(now.getHours()>=6)r.setDate(r.getDate()+1);var dm=r-now;var h=Math.floor(dm/(1000*60*60));var m=Math.floor((dm%(1000*60*60))/(1000*60));te.textContent="⏰ Сброс через "+h+" ч "+m+" мин";}l.innerHTML="";if(!quests||quests.length===0)generateQuests();quests.forEach(function(id){var ty=QUEST_TYPES[id];if(!ty)return;var p=questProgress[id]||0;var ic=isQuestClaimed(id);var dn=p>=ty.goal;var cl="quest-card";if(ic)cl+=" claimed";else if(dn)cl+=" done";var d=document.createElement("div");d.className=cl;var pc=Math.min(100,(p/ty.goal)*100);var rt="Награда: "+ty.reward+" "+ty.rewardType;var bh="";if(ic)bh='<div class="quest-claimed-label">✅ Получено</div>';else if(dn)bh='<button class="quest-claim-btn" data-id="'+id+'">🎁 Забрать награду</button>';else bh='<button class="quest-claim-btn" disabled>Ещё не выполнено</button>';d.innerHTML='<div class="quest-header">'+'<div class="quest-icon">'+ty.icon+'</div>'+'<div class="quest-name">'+ty.name+'</div>'+'<div class="quest-progress-text">'+formatNumber(p)+" / "+formatNumber(ty.goal)+'</div>'+'</div>'+'<div class="quest-progress-bar">'+'<div class="quest-progress-fill" style="width:'+pc+'%"></div>'+'</div>'+'<div class="quest-reward">'+rt+'</div>'+bh;l.appendChild(d);});document.querySelectorAll(".quest-claim-btn").forEach(function(b){b.onclick=function(){var id=b.dataset.id;if(id)claimQuest(id);};});}

// === ЛИДЕРБОРД ===
function submitLeaderboardScore(){var b=$("leader-submit");if(!b)return;if(!db){alert("❌ Лидерборд не подключён.");return;}if(!hasProfile()){alert("❌ Сначала задай ник!");showProfileModal();return;}ensureProfileId();var n=profile.nickname;var s=Math.floor(totalEarned);var id=profile.id;b.disabled=true;b.textContent="Отправка...";db.ref("leaderboard/"+id).set({name:n,score:s,id:id,timestamp:Date.now()}).then(function(){alert("✅ Рекорд отправлен!\n\nНик: "+n+"\nОчки: "+formatNumber(s));b.disabled=false;b.textContent="📤 Отправить рекорд";loadLeaderboard();}).catch(function(e){alert("❌ "+e.message);b.disabled=false;b.textContent="📤 Отправить рекорд";});}
function loadLeaderboard(){var l=$("leaders-list");if(!l)return;if(!db){l.innerHTML='<p style="text-align:center;color:#ff5252;padding:20px;">Лидерборд не подключён</p>';return;}l.innerHTML='<p class="leaders-loading">Загрузка...</p>';db.ref("leaderboard").orderByChild("score").limitToLast(25).once("value").then(function(sn){var e=[];sn.forEach(function(cs){var d=cs.val();e.push({name:d.name||"Аноним",score:d.score||0,id:d.id||""});});if(e.length===0){l.innerHTML='<p style="text-align:center;color:#aaa;padding:20px;">Пока нет рекордов!</p>';return;}e.sort(function(a,b){return b.score-a.score;});if(hasProfile()&&profile.id){var mr=-1;for(var ri=0;ri<e.length;ri++){if(e[ri].id===profile.id){mr=ri+1;break;}}if(mr>=1&&mr<=3){var key="leader_top"+mr;if(!unlocked[key]){unlocked[key]=true;checkAchievements();saveGame();}}}var h="";var md=["🥇","🥈","🥉"];e.slice(0,25).forEach(function(en,i){var r=i+1;var rc=r<=3?" rank-"+r:"";var m=r<=3?md[r-1]:r;h+='<div class="leader-row'+rc+'">'+'<div class="leader-rank">'+m+'</div>'+'<div class="leader-name">'+escapeHtml(en.name)+'</div>'+'<div class="leader-score">'+formatNumber(en.score)+'</div>'+'</div>';});l.innerHTML=h;}).catch(function(e){l.innerHTML='<p style="text-align:center;color:#ff5252;padding:20px;">'+e.message+'</p>';});}
function escapeHtml(t){var d=document.createElement("div");d.textContent=t;return d.innerHTML;}

// === КОЛЕСО ===
function getTodayKeyWheel(){var d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();}
function checkWheelReset(){var t=getTodayKeyWheel();if(wheelLastResetDay!==t){wheelFreeUsed=false;wheelPaidUsed=false;wheelLastResetDay=t;}}
function renderWheel(){checkWheelReset();var r=$("wheel-rotor");if(r&&!r.hasChildNodes()){var R=140,cx=150,cy=150;for(var i=0;i<12;i++){var a1=(Math.PI*2/12)*i-Math.PI/2;var a2=(Math.PI*2/12)*(i+1)-Math.PI/2;var x1=cx+R*Math.cos(a1),y1=cy+R*Math.sin(a1);var x2=cx+R*Math.cos(a2),y2=cy+R*Math.sin(a2);var cs=["#4caf50","#4fc3f7","#9c27b0","#4caf50","#666","#4fc3f7","#4caf50","#9c27b0","#b71c1c","#4fc3f7","#b71c1c","#b71c1c"];var p=document.createElementNS("http://www.w3.org/2000/svg","path");p.setAttribute("d","M "+cx+" "+cy+" L "+x1+" "+y1+" A "+R+" "+R+" 0 0 1 "+x2+" "+y2+" Z");p.setAttribute("fill",cs[i]);p.setAttribute("stroke","#16213e");p.setAttribute("stroke-width","2");r.appendChild(p);var mA=(a1+a2)/2;var tx=cx+(R*0.65)*Math.cos(mA),ty=cy+(R*0.65)*Math.sin(mA);var xt=document.createElementNS("http://www.w3.org/2000/svg","text");xt.setAttribute("x",tx);xt.setAttribute("y",ty);xt.setAttribute("text-anchor","middle");xt.setAttribute("dominant-baseline","middle");xt.setAttribute("fill","#fff");xt.setAttribute("font-size","10");xt.setAttribute("font-weight","bold");xt.textContent=WHEEL_SECTORS[i].label;r.appendChild(xt);}}var fb=$("wheel-spin-free"),pb=$("wheel-spin-paid");if(fb){if(wheelFreeUsed){fb.disabled=true;fb.textContent="🎁 Завтра";}else{fb.disabled=false;fb.textContent="🎁 Крутить бесплатно";}}if(pb){if(wheelFreeUsed&&!wheelPaidUsed){var pr=getWheelPrice();pb.disabled=false;pb.textContent="💰 Крутить за "+pr.text;}else if(!wheelFreeUsed){pb.disabled=true;pb.textContent="💰 Сначала бесплатный";}else{pb.disabled=true;pb.textContent="💰 Завтра";}}var te=$("wheel-timer");if(te){if(wheelFreeUsed&&wheelPaidUsed){te.textContent="Следующие спины — завтра в 9:00";}else if(!wheelFreeUsed){te.textContent="1 бесплатный + 1 платный спин в день";}else{te.textContent="Доступен платный спин";}}}
function getWheelPrice(){if(coins<1e18)return {key:"qa",text:"1 Qa",value:1e15};if(coins<1e21)return {key:"qi",text:"1 Qi",value:1e18};return {key:"sx",text:"1 Sx",value:1e21};}
function openWheel(){var o=$("wheel-overlay");if(!o)return;$("wheel-result").textContent="";renderWheel();o.classList.remove("hidden");syncScrollLock();}
function closeWheel(){var o=$("wheel-overlay");if(o)o.classList.add("hidden");syncScrollLock();}
function spinWheel(isFree){if(wheelSpinning)return;var pr;if(!isFree){checkWheelReset();if(!wheelFreeUsed){alert("Сначала бесплатный спин!");return;}if(wheelPaidUsed){alert("Платный спин использован!");return;}pr=getWheelPrice();if(coins<pr.value){alert("Недостаточно монет!\nНужно: "+pr.text);return;}coins-=pr.value;wheelPaidUsed=true;}else{checkWheelReset();if(wheelFreeUsed){alert("Бесплатный спин использован!");return;}wheelFreeUsed=true;}wheelSpinning=true;if(!unlocked.wheel_first){unlocked.wheel_first=true;checkAchievements();}var si=Math.floor(Math.random()*12);var r=$("wheel-rotor");if(!r){wheelSpinning=false;return;}var sa=360/12;var tr=-(si*sa+sa/2);var tt=360*5+((tr%360)+360)%360;var cr=window.__wheelRot||0;var fr=cr+tt;window.__wheelRot=fr;r.style.transition="transform 5s cubic-bezier(.17,.67,.3,1)";r.style.transformOrigin="150px 150px";r.style.transform="rotate("+fr+"deg)";playSound("ui");setTimeout(function(){var s=WHEEL_SECTORS[si];applyWheelReward(s);wheelSpinning=false;renderWheel();saveGame();},5100);}
function applyWheelReward(s){var r=$("wheel-result");var t="";if(s.type==="coins"){var g=Math.floor(coins*s.value);if(s.value<0){g=Math.floor(coins*Math.abs(s.value));coins=Math.max(0,coins-g);t="💀 Потеряно "+formatNumber(g)+"!";}else{coins+=g;totalEarned+=g;t="💰 +"+formatNumber(g)+"!";}}else if(s.type==="gems"){addCrystals(s.value);t="💎 +"+s.value+"!";}else if(s.type==="shards"){shards+=s.value;t="🌑 +"+s.value+"!";}else if(s.type==="negGems"){var l=Math.min(crystals,Math.abs(s.value));crystals-=l;t="💀 −"+l+"!";}else if(s.type==="negShards"){var ls=Math.min(shards,Math.abs(s.value));shards-=ls;t="💀 −"+ls+"!";}else if(s.type==="negCoins"){var lc=Math.floor(coins*Math.abs(s.value));coins=Math.max(0,coins-lc);t="💀 −"+formatNumber(lc)+"!";}else{t="❌ Пусто!";}if(r)r.textContent=t;playSound(s.type==="empty"?"ui":"achievement");updateUI();}

// === ЕЖЕДНЕВКА ===
function getTodayKeyDaily(){var d=new Date();if(d.getHours()<9)d.setDate(d.getDate()-1);return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();}
function renderDailyWheel(){var r=$("daily-wheel-rotor");if(r&&!r.hasChildNodes()){var R=140,cx=150,cy=150;var cs=["#2e7d32","#4caf50","#1976d2","#42a5f5","#e91e63","#9c27b0","#e0c25a"];for(var i=0;i<7;i++){var a1=(Math.PI*2/7)*i-Math.PI/2;var a2=(Math.PI*2/7)*(i+1)-Math.PI/2;var x1=cx+R*Math.cos(a1),y1=cy+R*Math.sin(a1);var x2=cx+R*Math.cos(a2),y2=cy+R*Math.sin(a2);var p=document.createElementNS("http://www.w3.org/2000/svg","path");p.setAttribute("d","M "+cx+" "+cy+" L "+x1+" "+y1+" A "+R+" "+R+" 0 0 1 "+x2+" "+y2+" Z");p.setAttribute("fill",cs[i]);p.setAttribute("stroke","#16213e");p.setAttribute("stroke-width","2");r.appendChild(p);var mA=(a1+a2)/2;var tx=cx+(R*0.7)*Math.cos(mA),ty=cy+(R*0.7)*Math.sin(mA);var xt=document.createElementNS("http://www.w3.org/2000/svg","text");xt.setAttribute("x",tx);xt.setAttribute("y",ty);xt.setAttribute("text-anchor","middle");xt.setAttribute("dominant-baseline","middle");xt.setAttribute("fill","#fff");xt.setAttribute("font-size","12");xt.setAttribute("font-weight","bold");xt.textContent=DAILY_PRIZES[i].label;r.appendChild(xt);}}var sb=$("daily-spin"),te=$("daily-timer");var t=getTodayKeyDaily();if(sb){if(dailyLastUsed===t){sb.disabled=true;sb.textContent="✅ Сегодня получено";}else{sb.disabled=false;sb.textContent="🎁 Крутить!";}}if(te){if(dailyLastUsed===t){te.textContent="Следующая награда — завтра в 9:00";}else{te.textContent="1 бесплатный спин в день!";}}}
function openDaily(){var o=$("daily-overlay");if(!o)return;$("daily-result").textContent="";renderDailyWheel();o.classList.remove("hidden");syncScrollLock();}
function closeDaily(){var o=$("daily-overlay");if(o)o.classList.add("hidden");syncScrollLock();}
function spinDaily(){if(dailySpinning)return;var t=getTodayKeyDaily();if(dailyLastUsed===t){alert("Сегодня уже крутил! Завтра.");return;}dailySpinning=true;var pi=Math.floor(Math.random()*7);var r=$("daily-wheel-rotor");if(!r){dailySpinning=false;return;}var sa=360/7;var tr=-(pi*sa+sa/2);var tt=360*5+((tr%360)+360)%360;var cr=window.__dailyRot||0;var fr=cr+tt;window.__dailyRot=fr;r.style.transition="transform 5s cubic-bezier(.17,.67,.3,1)";r.style.transformOrigin="150px 150px";r.style.transform="rotate("+fr+"deg)";playSound("ui");setTimeout(function(){var p=DAILY_PRIZES[pi];applyDailyReward(p);dailyLastUsed=t;if(!unlocked.daily_first){unlocked.daily_first=true;checkAchievements();}dailySpinning=false;renderDailyWheel();saveGame();},5100);}
function applyDailyReward(p){var r=$("daily-result");var t="";if(p.type==="coins"){coins+=p.value;totalEarned+=p.value;t="💰 +"+formatNumber(p.value)+"!";}else if(p.type==="gems"){addCrystals(p.value);t="💎 +"+p.value+"!";}else if(p.type==="shards"){shards+=p.value;t="🌑 +"+p.value+"!";}else if(p.type==="boost"){var ids=["boost2","boost3","boost5"];var bi=ids[Math.floor(Math.random()*3)];addBoosterToStorage(bi);t="⚡ Бустер ×"+BOOSTERS[bi].mult+"!";}if(r)r.textContent=t;playSound("achievement");updateUI();}

// === МИНИ-ИГРА ===
function openMinigame(){var o=$("minigame-overlay");if(!o)return;resetMinigameUI();o.classList.remove("hidden");syncScrollLock();}
function closeMinigame(){var o=$("minigame-overlay");if(o)o.classList.add("hidden");if(minigameTimerInterval){clearInterval(minigameTimerInterval);minigameTimerInterval=null;}minigameActive=false;syncScrollLock();}
function resetMinigameUI(){minigameTaps=0;minigameTimer=MINIGAME_DURATION;minigameActive=false;$("minigame-count").textContent="0";$("minigame-timer").textContent="10.0";$("minigame-timer").classList.remove("urgent");$("minigame-result").textContent="";$("minigame-result").className="";$("minigame-best-val").textContent=minigameBest;var sb=$("minigame-start");if(sb){sb.disabled=false;sb.textContent="▶️ Начать";}var tb=$("minigame-tap-btn");if(tb)tb.disabled=true;var ti=$("minigame-timer-info");if(ti){var n=Date.now();var l=MINIGAME_COOLDOWN-(n-minigameLastUsed);if(l<=0){ti.textContent="Можно играть!";}else{var m=Math.floor(l/60000),s=Math.floor((l%60000)/1000);ti.textContent="Следующая игра через "+m+"м "+s+"с";}}}
function startMinigame(){var n=Date.now();if(n-minigameLastUsed<MINIGAME_COOLDOWN){var l=MINIGAME_COOLDOWN-(n-minigameLastUsed);var m=Math.floor(l/60000),s=Math.floor((l%60000)/1000);alert("Рано! Через "+m+"м "+s+"с");return;}minigameActive=true;minigameTaps=0;minigameTimer=MINIGAME_DURATION;minigameLastUsed=n;$("minigame-count").textContent="0";$("minigame-result").textContent="";$("minigame-result").className="";var sb=$("minigame-start");if(sb){sb.disabled=true;sb.textContent="⏳ Играем...";}var tb=$("minigame-tap-btn");if(tb)tb.disabled=false;playSound("ui");if(minigameTimerInterval)clearInterval(minigameTimerInterval);minigameTimerInterval=setInterval(function(){minigameTimer-=0.1;if(minigameTimer<=0){minigameTimer=0;finishMinigame();return;}$("minigame-timer").textContent=minigameTimer.toFixed(1);if(minigameTimer<=3){$("minigame-timer").classList.add("urgent");}},100);}
function tapMinigame(){if(!minigameActive)return;minigameTaps++;$("minigame-count").textContent=minigameTaps;playSound("click");}
function finishMinigame(){minigameActive=false;if(minigameTimerInterval){clearInterval(minigameTimerInterval);minigameTimerInterval=null;}var tb=$("minigame-tap-btn");if(tb)tb.disabled=true;var sb=$("minigame-start");if(sb){sb.disabled=false;sb.textContent="🔁 Ещё раз";}var r=$("minigame-result");var nr=false;if(minigameTaps>minigameBest){minigameBest=minigameTaps;nr=true;}$("minigame-best-val").textContent=minigameBest;var rw=0;if(minigameTaps>=120)rw=50;else if(minigameTaps>=80)rw=25;else if(minigameTaps>=50)rw=10;else if(minigameTaps>=30)rw=5;if(rw>0){addCrystals(rw);updateUI();}if(nr){if(r){r.textContent="🎉 НОВЫЙ РЕКОРД! "+minigameTaps+" тапов! +"+rw+" 💎";r.className="win";}}else{if(r){r.textContent="Тапов: "+minigameTaps+". "+(rw>0?("Награда: +"+rw+" 💎"):"Попробуй ещё!");r.className="";}}playSound(rw>0?"achievement":"ui");checkAchievements();saveGame();resetMinigameUI();}

// === ГЛОБАЛЬНЫЕ УЛУЧШЕНИЯ ===
function buildGlobalEffectText(gu){var t=gu.amount*gu.count;if(gu.count===0)return "Сейчас: не активно";if(gu.effect==="click")return "Сейчас: +"+t;if(gu.effect==="bloodShard")return "Сейчас: +"+(t*100).toFixed(0)+"%";if(gu.effect==="absoluteMult"||gu.effect==="genesisMult")return "Сейчас: +"+(t*100).toFixed(0)+"%";return "";}
function renderGlobalShop(){var l=$("global-shop-list");if(!l)return;l.innerHTML="";for(var id in globalUpgrades){var gu=globalUpgrades[id];var im=gu.count>=gu.maxLevel;var d=document.createElement("div");d.className="item";var nc=im?"—":formatNumber(gu.cost);var bh=im?'<button class="buy" disabled style="background:#4caf50;color:#fff">✓ Максимум</button>':'<button class="buy" data-gid="'+id+'">Купить: '+nc+'</button>';var et=buildGlobalEffectText(gu);d.innerHTML='<div class="info">'+'<div class="name">'+gu.name+'</div>'+'<div class="desc">'+gu.desc+'</div>'+'<div class="owned">Уровень: <span id="gowned-'+id+'">'+gu.count+'</span> / '+gu.maxLevel+'</div>'+'<div class="owned" style="color:#4fc3f7">'+et+'</div>'+'</div>'+'<div class="right">'+bh+'</div>';l.appendChild(d);}document.querySelectorAll(".buy[data-gid]").forEach(function(b){b.onclick=function(){var id=b.dataset.gid;var gu=globalUpgrades[id];if(!gu)return;if(gu.count>=gu.maxLevel)return;if(coins>=gu.cost){coins-=gu.cost;gu.count++;gu.cost=Math.floor(gu.baseCost*Math.pow(GLOBAL_UPGRADE_COST_MULT,gu.count));playSound("ui");vibrate(10);updateUI();renderGlobalShop();checkAchievements();saveGame();}};});}
function updateGlobalShopUI(){for(var id in globalUpgrades){var gu=globalUpgrades[id];var el=$("gowned-"+id);if(el)el.textContent=gu.count;var b=document.querySelector('.buy[data-gid="'+id+'"]');if(b){if(gu.count>=gu.maxLevel){b.disabled=true;b.textContent="✓ Максимум";b.style.background="#4caf50";b.style.color="#fff";}else{b.disabled=coins<gu.cost;}}}}

// === ГУЛАУ ===
function startGulau(){gulauActive=true;gulauTimer=15*60;$("gulau-info").style.display="block";updateGulauTimer();}
function updateGulauTimer(){var e=$("gulau-timer");if(e&&gulauActive){var m=Math.floor(gulauTimer/60);var s=gulauTimer%60;e.textContent=m+":"+(s<10?"0":"")+s;}}
function endGulau(){gulauActive=false;gulauTimer=0;$("gulau-info").style.display="none";}
// === ЭКСПОРТ/ИМПОРТ ===
function exportSave(){
try{
var r=localStorage.getItem(SAVE_KEY);
if(!r){alert("Нет сохранения.");return;}
var d=JSON.parse(r);
d.exportDate=Date.now();
try{var sr=localStorage.getItem("clicker-skins");if(sr)d._skins=JSON.parse(sr);}catch(e){}
try{var pr=localStorage.getItem("clicker-used-promos");if(pr)d._usedPromos=JSON.parse(pr);}catch(e){}
try{var str=localStorage.getItem("clicker-settings");if(str)d._settings=JSON.parse(str);}catch(e){}
d._boostersStorage={};for(var b in BOOSTERS){d._boostersStorage[b]=BOOSTERS[b].storage||0;}
d._emojiSkinsOwned={};for(var es in EMOJI_SKINS){d._emojiSkinsOwned[es]=EMOJI_SKINS[es].owned||false;}
d._skinsOwned={};for(var s in skins){d._skinsOwned[s]=skins[s].owned||false;}
d._bgOwned={};for(var bg in BACKGROUNDS){d._bgOwned[bg]=BACKGROUNDS[bg].owned||false;}
d._activeBg=activeBg;d._activeSkin=activeSkin;d._activeEmojiSkin=activeEmojiSkin;
d._dailyLastUsed=dailyLastUsed;d._minigameBest=minigameBest;d._minigameLastUsed=minigameLastUsed;
var j=JSON.stringify(d);
var enc=btoa(unescape(encodeURIComponent(j)));
var bx=$("export-box"),tx=$("export-text");
if(bx&&tx){tx.value=enc;bx.classList.remove("hidden");}
}catch(e){alert("Ошибка экспорта: "+e.message);}}
function copyExport(){var t=$("export-text");if(!t)return;t.select();t.setSelectionRange(0,999999);try{document.execCommand("copy");alert("✅ Скопировано!");}catch(e){try{navigator.clipboard.writeText(t.value);alert("✅ Скопировано!");}catch(err){alert("Не удалось скопировать.");}}}
function importSave(){
var t=$("import-text"),r=$("import-result");if(!t||!r)return;
var c=t.value.trim();r.className="";
if(!c){r.textContent="Вставьте код.";r.classList.add("error");return;}
try{
var j=decodeURIComponent(escape(atob(c)));
var d=JSON.parse(j);
if(!d||typeof d.coins==="undefined")throw new Error("Неверный формат");
if(!confirm("⚠️ Текущий прогресс будет заменён.\nПродолжить?"))return;
window.__resetting=true;
if(d._skins){try{localStorage.setItem("clicker-skins",JSON.stringify(d._skins));}catch(e){}}
if(d._usedPromos){try{localStorage.setItem("clicker-used-promos",JSON.stringify(d._usedPromos));}catch(e){}}
else if(d.usedPromos){try{localStorage.setItem("clicker-used-promos",JSON.stringify(d.usedPromos));}catch(e){}}
if(d._settings){try{localStorage.setItem("clicker-settings",JSON.stringify(d._settings));}catch(e){}}
if(d._boostersStorage)d.boostersStorage=d._boostersStorage;
if(d._emojiSkinsOwned)d.emojiSkinsOwned=d._emojiSkinsOwned;
if(d._skinsOwned)d.skinsOwned=d._skinsOwned;
if(d._bgOwned)d.bgOwned=d._bgOwned;
if(d._activeBg)d.activeBg=d._activeBg;
if(d._activeSkin)d.activeSkin=d._activeSkin;
if(d._activeEmojiSkin!==undefined)d.activeEmojiSkin=d._activeEmojiSkin;
if(d._dailyLastUsed)d.dailyLastUsed=d._dailyLastUsed;
if(typeof d._minigameBest==="number")d.minigameBest=d._minigameBest;
if(d._minigameLastUsed)d.minigameLastUsed=d._minigameLastUsed;
delete d._skins;delete d._usedPromos;delete d._settings;
delete d._boostersStorage;delete d._emojiSkinsOwned;delete d._skinsOwned;
delete d._bgOwned;delete d._activeBg;delete d._activeSkin;delete d._activeEmojiSkin;
delete d._dailyLastUsed;delete d._minigameBest;delete d._minigameLastUsed;
localStorage.setItem(SAVE_KEY,JSON.stringify(d));
r.textContent="✅ Прогресс загружен! Перезагрузка...";r.classList.add("success");
setTimeout(function(){location.reload();},800);
}catch(e){r.textContent="❌ Ошибка: "+e.message;r.classList.add("error");}}

// === ЕЖЕДНЕВНЫЙ БОНУС ===
function checkDailyBonus(){if(!settings.showDaily)return;var l=localStorage.getItem("lastDaily");var s=parseInt(localStorage.getItem("dailyStreak")||"0");var n=Date.now();var day=24*60*60*1000;if(!l||n-parseInt(l)>=day){if(l&&n-parseInt(l)>2*day)s=0;s+=1;var b=Math.max(100,Math.floor(getCPS()*60));coins+=b;totalEarned+=b;var t="🎁 Ежедневный бонус (день "+s+"): "+formatNumber(b)+" монет!";if(s%7===0){addCrystals(5);t+="\n💎 +5 кристаллов!";}localStorage.setItem("lastDaily",n.toString());localStorage.setItem("dailyStreak",s.toString());setTimeout(function(){alert(t);updateUI();},500);}}

// === ИВЕНТЫ ===
var EVENTS={
rain:{name:"💰 Монетный дождь",mult:1.5,duration:180,color:"#4caf50"},
storm:{name:"⚡ Молниеносный потенциал",mult:1.8,duration:120,color:"#ffc107"},
fast:{name:"🏃 Быстрый способ",mult:1.3,duration:300,color:"#2196f3"},
income:{name:"💵 Заработок",mult:1.2,duration:240,color:"#9c27b0"}};
function getSlotStartMs(n){var d=new Date(n);var sm=Math.floor(d.getMinutes()/15)*15;d.setMinutes(sm,0,0);return d.getTime();}
function getEventKeyForSlot(s){var k=Object.keys(EVENTS);var i=Math.abs(s/1000|0)%k.length;return k[i];}
function startEventByKey(k,sl){if(!EVENTS[k])return;var e=EVENTS[k];currentEventKey=k;eventMultiplier=e.mult;eventName=e.name;eventTimer=sl;var b=$("event-banner");if(b){b.style.background="linear-gradient(135deg, "+e.color+", #000)";b.classList.remove("hidden");}updateEventBanner();updateUI();}
function endEvent(){eventTimer=0;eventMultiplier=1;eventName="";currentEventKey="";var b=$("event-banner");if(b)b.classList.add("hidden");updateUI();saveGame();}
function updateEventBanner(){var b=$("event-banner");if(!b)return;if(!currentEventKey||eventTimer<=0){b.classList.add("hidden");return;}var e=EVENTS[currentEventKey];if(!e){b.classList.add("hidden");return;}var m=Math.floor(eventTimer/60);var s=eventTimer%60;b.textContent=e.name+" x"+e.mult+" — "+m+":"+(s<10?"0":"")+s;b.classList.remove("hidden");}
function updateEvent(){var n=Date.now();var P=15*60*1000;var ss=getSlotStartMs(n);var any=false,ak=null,asl=0;var slots=[ss,ss-P];for(var i=0;i<slots.length;i++){var sl=slots[i];var k=getEventKeyForSlot(sl);var e=EVENTS[k];if(!e)continue;var em=sl+e.duration*1000;if(n>=sl&&n<em){var sec=Math.floor((em-n)/1000);if(sec>0){any=true;ak=k;asl=sec;break;}}}if(any){if(currentEventKey!==ak){startEventByKey(ak,asl);}else{eventTimer=asl;updateEventBanner();}}else{if(currentEventKey||eventTimer>0){endEvent();}}}

// === КРОВАВАЯ ЛУНА ===
function isBloodMoonTime(){var d=new Date();var m=d.getMinutes();var h=d.getHours();return (h%3===0)&&(m<30);}
function startBloodMoon(){bloodMoonActive=true;var d=new Date();var m=d.getMinutes();var s=d.getSeconds();bloodMoonTimer=Math.max(0,(30-m)*60-s);document.body.classList.add("blood-moon");$("blood-info").style.display="block";var b=document.createElement("div");b.className="blood-banner";b.innerHTML="🌕 КРОВАВАЯ ЛУНА 🌕<br>Доход x2!";b.id="blood-banner";document.body.appendChild(b);setTimeout(function(){var x=$("blood-banner");if(x)x.remove();},5000);playSound("ui");updateUI();}
function endBloodMoon(){bloodMoonActive=false;bloodMoonTimer=0;document.body.classList.remove("blood-moon");$("blood-info").style.display="none";var b=$("blood-banner");if(b)b.remove();}
function updateBloodMoon(){var it=isBloodMoonTime();if(it&&!bloodMoonActive)startBloodMoon();if(!it&&bloodMoonActive)endBloodMoon();if(bloodMoonActive){var d=new Date();var m=d.getMinutes();var s=d.getSeconds();bloodMoonTimer=(30-m)*60-s;var t=$("blood-timer");if(t){var mm=Math.floor(bloodMoonTimer/60);var ss=bloodMoonTimer%60;t.textContent=mm+":"+(ss<10?"0":"")+ss;}}}

// === КРАЖА ===
function getTheftKey(){var d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getHours();}
function isTheftTime(){var d=new Date();var h=d.getHours();var m=d.getMinutes();return (h===11||h===19)&&(m<10);}
function saveTheftState(){try{localStorage.setItem("clicker-theft-state",JSON.stringify({active:theftActive,timer:theftTimer,lost:theftTotalLost,key:lastTheftKey,savedAt:Date.now()}));}catch(e){}}
function clearTheftState(){try{localStorage.removeItem("clicker-theft-state");}catch(e){}}
function loadTheftState(){try{var r=localStorage.getItem("clicker-theft-state");if(!r)return false;var d=JSON.parse(r);if(!d||!d.active)return false;if(d.key!==getTheftKey()){clearTheftState();return false;}if(d.timer<=0){clearTheftState();return false;}var el=Math.floor((Date.now()-(d.savedAt||Date.now()))/1000);var rem=d.timer-el;if(rem<=0){clearTheftState();return false;}startTheft(rem,d.lost||0);return true;}catch(e){return false;}}
function startTheft(rt,rl){if(theftActive)return;theftActive=true;theftTotalLost=rl||0;theftTimer=(typeof rt==="number"&&rt>0)?rt:THEFT_DURATION;if(theftTickTimer)clearInterval(theftTickTimer);theftTickTimer=setInterval(function(){if(!theftActive)return;theftTimer--;if(theftTimer<=0){endTheft();return;}if(theftTimer%THEFT_TICK_INTERVAL===0){var l=Math.floor(coins*THEFT_PERCENT);if(l>0){coins-=l;theftTotalLost+=l;showTheftLossPopup(l);updateUI();saveTheftState();}}updateTheftBanner();},1000);var b=$("theft-banner");if(!b){b=document.createElement("div");b.id="theft-banner";b.className="blood-banner";b.style.background="linear-gradient(135deg,#4a0000,#8b0000,#b71c1c)";b.style.top="auto";b.style.bottom="20px";b.innerHTML="🚨 КРАЖА! 🚨<br><span id='theft-timer-txt'>10:00</span> · Украдено: <span id='theft-lost-txt'>0</span>";document.body.appendChild(b);}if(!rt){playSound("alarm");var p=document.createElement("div");p.className="achievement-popup";p.style.background="linear-gradient(135deg,#8b0000,#b71c1c)";p.style.color="#fff";p.textContent="🚨 КРАЖА началась! Потеряно будет ~22% монет.";document.body.appendChild(p);setTimeout(function(){p.remove();},5000);}saveTheftState();}
function endTheft(){theftActive=false;if(theftTickTimer){clearInterval(theftTickTimer);theftTickTimer=null;}clearTheftState();var b=$("theft-banner");if(b)b.remove();var p=document.createElement("div");p.className="achievement-popup";p.style.background="linear-gradient(135deg,#4a0000,#b71c1c)";p.style.color="#fff";p.textContent="🚨 Кража закончилась. Всего украдено: "+formatNumber(theftTotalLost);document.body.appendChild(p);setTimeout(function(){p.remove();},6000);theftTotalLost=0;updateUI();saveGame();}
function updateTheftBanner(){var t=$("theft-timer-txt"),l=$("theft-lost-txt");if(t){var m=Math.floor(theftTimer/60);var s=theftTimer%60;t.textContent=m+":"+(s<10?"0":"")+s;}if(l)l.textContent=formatNumber(theftTotalLost);}
function showTheftLossPopup(a){var p=document.createElement("div");p.className="achievement-popup";p.style.background="linear-gradient(135deg,#4a0000,#b71c1c)";p.style.color="#fff";p.style.top="60px";p.style.left="auto";p.style.right="20px";p.style.transform="none";p.textContent="🚨 −"+formatNumber(a);document.body.appendChild(p);setTimeout(function(){p.remove();},2500);}
function updateTheft(){var n=new Date();var h=n.getHours();var m=n.getMinutes();var s=n.getSeconds();var it=(h===11||h===19)&&(m<10);if(it){var el=m*60+s;var rem=THEFT_DURATION-el;var k=getTheftKey();if(!theftActive){if(rem>0){lastTheftKey=k;startTheft(rem,0);}}else{if(rem>0&&theftTimer!==rem){theftTimer=rem;updateTheftBanner();}}}else{if(theftActive)endTheft();}}
function restoreTheftIfNeeded(){if(theftRestored)return;theftRestored=true;loadTheftState();}

// === ПРОМОКОДЫ ===
var INFINITE_PROMOS=["PHOENIX_SECRET","DRAGON15"];
var ADMIN_PROMO="#%₽223300HAI";
var ADMIN_PASSWORD="keyisloked";
var ADMIN_IDS=["u_1790687044368_j0ic"];
var adminState={boost:{active:false,mult:1,endsAt:0,label:""},listeners:{boost:null,messages:null},giftsProcessed:false,lastCmdTime:0,promoUnlocked:false};

var PROMOS={
"BLOOD":{reward:function(){shards+=10;return "🌑 +10!";}},
"CRYSTAL":{reward:function(){addCrystals(20);return "💎 +20!";}},
"GOLD2024":{reward:function(){coins+=100000;totalEarned+=100000;return "💰 +100K!";}},
"SECRET":{reward:function(){skins.ruby.owned=true;saveSkins();renderSkins();return "🔴 Ruby!";}},
"ARTEM":{reward:function(){addCrystals(50);shards+=5;return "💎 +50, 🌑 +5!";}},
"#GULAU":{reward:function(){startGulau();return "🔥 #Gulau!";}},
"CHEST":{reward:function(){resetChestCooldown();return "🎁 Сундук!";}},
"#PAHAN":{reward:function(){unlockPahan();return "🔥 Pahan!";}},
"COINS":{reward:function(){coins+=1000000;totalEarned+=1000000;return "💰 +1M!";}},
"MONEY":{reward:function(){coins+=100000000;totalEarned+=100000000;return "💰 +100M!";}},
"GOLD":{reward:function(){coins+=1000000000;totalEarned+=1000000000;return "💰 +1B!";}},
"GEMS":{reward:function(){addCrystals(25);return "💎 +25!";}},
"DIAMOND":{reward:function(){addCrystals(50);return "💎 +50!";}},
"BLOOD2":{reward:function(){shards+=15;return "🌑 +15!";}},
"SHARDS":{reward:function(){shards+=30;return "🌑 +30!";}},
"LEGEND":{reward:function(){coins+=10000000;totalEarned+=10000000;addCrystals(10);shards+=5;return "🏆 +10M!";}},
"SMILE":{reward:function(){smileSkinUnlocked=true;smileSkinActive=true;renderSmileSkins();updateDepositSideButton();var m=$("modal-deposit");if(m&&!m.classList.contains("hidden"))renderDeposit();return "🎭 Смайлик!";}},
"#GENNADII":{reward:function(){skins.gennadii.owned=true;saveSkins();renderSkins();return "🔥 GENNADII!";}},
"KROCHLUPIC":{reward:function(){var a=3.5e27;coins+=a;totalEarned+=a;return "💰 +3.5 Oc!";}},
"SUPERKROCH":{reward:function(){var a=4.5e30;coins+=a;totalEarned+=a;return "💰 +4.5 No!";}},
"DRAGON15":{reward:function(){
if(!hasProfile()){return "❌ Сначала задай ник!";}
if(petTotalCount()>=PET_STORAGE_MAX){return "❌ Хранилище заполнено!";}
var id=petGenerateId();
petsState.storage.push({id:id,type:"dragon",tempExpiresAt:Date.now()+15*60*1000});
petRenderAll();saveGame();
setTimeout(function(){for(var i=0;i<petsState.storage.length;i++){var p=petsState.storage[i];if(p.id===id&&p.tempExpiresAt){petsState.storage.splice(i,1);petRenderAll();saveGame();var pp=document.createElement("div");pp.className="achievement-popup";pp.style.background="linear-gradient(135deg,#8b0000,#c62828)";pp.style.color="#fff";pp.textContent="⏰ Дракончик исчез!";document.body.appendChild(pp);setTimeout(function(){pp.remove();},4000);break;}}},15*60*1000);
return "🐉 Дракончик на 15 минут!";
}},
"PHOENIX_SECRET":{reward:function(){
if(ADMIN_IDS.indexOf(profile.id)===-1){return "❌ Неверный код";}
if(!hasProfile()){return "❌ Сначала задай ник!";}
if(petTotalCount()>=PET_STORAGE_MAX){return "❌ Хранилище заполнено!";}
petsState.storage.push({id:petGenerateId(),type:"phoenix"});
petRenderAll();saveGame();
try{playSound("achievement");vibrate(60);}catch(e){}
return "🦅 Феникс!";
}}};

PROMOS[ADMIN_PROMO]={reward:function(){
if(!hasProfile()){return "❌ Сначала задай ник!";}
adminState.promoUnlocked=true;
try{localStorage.setItem("clicker-admin-unlocked","1");}catch(e){}
adminSetup();
return "🔓 Админ-функция разблокирована. Зайди в Настройки → Дополнительные.";
}};

function loadAdminState(){try{if(localStorage.getItem("clicker-admin-unlocked")==="1"){adminState.promoUnlocked=true;}}catch(e){}}

function activatePromo(){
var i=$("promo-input"),r=$("promo-result");if(!i||!r)return;
var raw=i.value.trim();var c=raw.toUpperCase();r.className="";
if(!c){r.textContent="Введите код.";r.classList.add("error");return;}
if(!PROMOS[c]){var alt=c.indexOf("#")===0?c.slice(1):("#"+c);if(PROMOS[alt])c=alt;}
if(!PROMOS[c]&&PROMOS[raw])c=raw;
if(usedPromos[c]){r.textContent="Уже использован.";r.classList.add("error");return;}
if(!PROMOS[c]){r.textContent="Неверный код.";r.classList.add("error");return;}
var t=PROMOS[c].reward();
if(INFINITE_PROMOS.indexOf(c)===-1&&c!==ADMIN_PROMO&&t.indexOf("❌")!==0){usedPromos[c]=true;try{localStorage.setItem("clicker-used-promos",JSON.stringify(usedPromos));}catch(e){}}
r.textContent=t;
if(t.indexOf("❌")!==0)r.classList.add("success");else r.classList.add("error");
i.value="";
playSound("achievement");vibrate(20);updateUI();renderSkins();saveGame();}

// === PAHAN ===
function unlockPahan(){pahanUnlocked=true;updatePahanButton();saveGame();}
function updatePahanButton(){var b=$("pahan-btn");if(!b)return;if(!pahanUnlocked)b.classList.add("hidden");else b.classList.remove("hidden");}
function activatePahan(){if(!pahanUnlocked)return;if(pahanActive)return;pahanActive=true;pahanTimer=PAHAN_DURATION;var b=$("pahan-btn");if(b){b.classList.add("hidden");b.disabled=true;}playSound("achievement");var p=document.createElement("div");p.className="achievement-popup";p.textContent="🔥 Pahan запущен на 10 секунд!";document.body.appendChild(p);setTimeout(function(){p.remove();},3000);if(pahanTickInterval)clearInterval(pahanTickInterval);pahanTickInterval=setInterval(function(){if(!pahanActive)return;coins+=PAHAN_REWARD_PER_TAP;totalEarned+=PAHAN_REWARD_PER_TAP;totalTaps+=1;addQuestProgress("taps",1);addQuestProgress("earn",PAHAN_REWARD_PER_TAP);updateUI();},500);if(pahanTimerInterval)clearInterval(pahanTimerInterval);pahanTimerInterval=setInterval(function(){if(!pahanActive){clearInterval(pahanTimerInterval);pahanTimerInterval=null;return;}pahanTimer--;if(pahanTimer<=0){clearInterval(pahanTimerInterval);pahanTimerInterval=null;stopPahan();}},1000);}
function stopPahan(){pahanActive=false;pahanTimer=0;if(pahanTickInterval){clearInterval(pahanTickInterval);pahanTickInterval=null;}if(pahanTimerInterval){clearInterval(pahanTimerInterval);pahanTimerInterval=null;}pahanUnlocked=false;updatePahanButton();var p=document.createElement("div");p.className="achievement-popup";p.textContent="⏸️ Pahan остановлен.";document.body.appendChild(p);setTimeout(function(){p.remove();},2500);saveGame();}

// === ЛОГО-СЕКРЕТ ===
function setupLogoSecret(){var l=$("logo");if(!l)return;l.onclick=function(){if(Date.now()<logoCooldown)return;logoClicks++;if(logoClickTimer)clearTimeout(logoClickTimer);logoClickTimer=setTimeout(function(){logoClicks=0;},1500);if(logoClicks>=7){logoClicks=0;logoCooldown=Date.now()+10*60*1000;shards+=5;addCrystals(1);l.style.transition="transform 0.3s, color 0.3s";l.style.transform="scale(1.2)";l.style.color="#ff1744";setTimeout(function(){l.style.transform="scale(1)";l.style.color="";},400);var p=document.createElement("div");p.className="achievement-popup";p.textContent="🌑 Секрет! +5 🌑, +1 💎";document.body.appendChild(p);setTimeout(function(){p.remove();},3000);playSound("achievement");vibrate(15);updateUI();saveGame();}};}

// === КЛИКЕР 67 ===
var SECRET_TAPS_NEEDED=6767,SECRET_ACTIVATION_COST=67000000000000000000;
function setupAdvancedButton(){var b=$("advanced-btn");if(!b)return;b.onclick=function(){var s=confirm("⚠️ Уверены?");if(!s)return;var r=confirm("⚠️⚠️ Точно?");if(!r)return;openSecretMenu();};}
function openSecretMenu(){var m=$("modal-secret");if(!m)return;var sm=$("modal-settings");if(sm)sm.classList.add("hidden");updateSecretUI();m.classList.remove("hidden");syncScrollLock();}
function updateSecretUI(){var l=$("secret-locked"),u=$("secret-unlocked"),t=$("secret-taps"),p=$("secret-progress"),tb=$("secret-toggle"),s=$("secret-status");if(!l||!u)return;if(secretUnlocked){l.style.display="none";u.style.display="block";if(secretAutoClicker){tb.textContent="🔥 Активировать ещё (67 Qa)";tb.disabled=true;var m=Math.floor(secretAutoClickerTimer/60);var ss=secretAutoClickerTimer%60;s.textContent="🔥 Автокликер активен — 67/сек. Осталось: "+m+":"+(ss<10?"0":"")+ss;s.style.color="#4caf50";}else{tb.textContent="🔥 Активировать (67 Qa)";tb.disabled=coins<SECRET_ACTIVATION_COST;s.textContent="Разблокирован. Активация: 67 Qa за 30 минут.";s.style.color="#aaa";}}else{l.style.display="block";u.style.display="none";if(t)t.textContent=formatNumber(totalTaps);var pc=Math.min(100,(totalTaps/SECRET_TAPS_NEEDED)*100);if(p)p.style.width=pc+"%";}}
function tryUnlockSecret(){if(secretUnlocked)return;if(totalTaps<SECRET_TAPS_NEEDED){var l=SECRET_TAPS_NEEDED-totalTaps;alert("❌ Ещё рано!\nНужно "+formatNumber(SECRET_TAPS_NEEDED)+" тапов.\nОсталось: "+formatNumber(l));return;}secretUnlocked=true;playSound("achievement");var p=document.createElement("div");p.className="achievement-popup";p.textContent="🔥 Кликер 67 разблокирован!";document.body.appendChild(p);setTimeout(function(){p.remove();},4000);updateSecretUI();saveGame();}
function activateSecretAutoClicker(){if(!secretUnlocked)return;if(secretAutoClicker)return;if(coins<SECRET_ACTIVATION_COST){alert("❌ Нужно 67 Qa!");return;}coins-=SECRET_ACTIVATION_COST;secretAutoClicker=true;secretAutoClickerTimer=30*60;startSecretAutoClicker();playSound("achievement");updateSecretUI();updateUI();saveGame();}
function startSecretAutoClicker(){if(secretClickerInterval)return;secretClickerInterval=setInterval(function(){if(!checkTapLimit())return;var v=getClickValue();var a=v*2;coins+=a;totalEarned+=a;totalTaps+=gulauActive?10:2;var sc=0.02+globalUpgrades.bloodLuck.count*globalUpgrades.bloodLuck.amount;if(bloodMoonActive&&Math.random()<sc)shards+=1;updateUI();},30);}
function stopSecretAutoClicker(){if(secretClickerInterval){clearInterval(secretClickerInterval);secretClickerInterval=null;}secretAutoClicker=false;secretAutoClickerTimer=0;}

// === УТИЛИТЫ ===
function formatTime(s){if(s<60)return s+" с";if(s<3600)return Math.floor(s/60)+" мин";var h=Math.floor(s/3600);var m=Math.floor((s%3600)/60);return h+" ч "+m+" мин";}
function getCPS(){var c=0;for(var id in upgrades){if(upgrades[id].effect==="auto"){var a=upgrades[id].count*upgrades[id].amount;if(id==="genesis"){a*=1+globalUpgrades.genesisBoost.count*globalUpgrades.genesisBoost.amount;}else if(id==="absolute"){a*=1+globalUpgrades.absoluteBoost.count*globalUpgrades.absoluteBoost.amount;}c+=a;}}var mb=bloodMoonActive?2:1;var pb=1+(typeof petGetIncomeBonus==="function"?petGetIncomeBonus():0);var sb=(typeof superEventActive!=="undefined"&&superEventActive)?superEventCoinMult:1;var ab=(typeof adminGetBoostMult==="function")?adminGetBoostMult():1;var cb=1;if(typeof clanGetBonus==="function")cb=1+clanGetBonus();return c*goldenMultiplier*mb*eventMultiplier*crystalBoostMultiplier*getItemBonus()*pb*sb*ab*cb;}
function getClickValue(){var b=coinsPerClick+getCPS()*0.05+globalUpgrades.superClicker.count;var mb=bloodMoonActive?2:1;var pb=1+(typeof petGetIncomeBonus==="function"?petGetIncomeBonus():0);var sb=(typeof superEventActive!=="undefined"&&superEventActive)?superEventTapMult:1;var ab=(typeof adminGetBoostMult==="function")?adminGetBoostMult():1;return b*goldenMultiplier*mb*eventMultiplier*crystalBoostMultiplier*getItemBonus()*pb*sb*ab;}

// === ЗОЛОТАЯ МОНЕТКА ===
function spawnGoldenCoin(){if(!settings.showGolden)return;if($("golden-coin"))return;var c=document.createElement("div");c.id="golden-coin";c.textContent="🪙";c.style.left=Math.random()*Math.max(0,window.innerWidth-80)+"px";c.style.top=Math.random()*Math.max(0,window.innerHeight-80)+"px";c.onclick=function(){goldenMultiplier=7;goldenTimer=30;var t="🌟 x7 доход на 30 сек!";if(Math.random()<0.2){addCrystals(1);t="🌟 x7 + 💎 1!";}var b=document.createElement("div");b.id="golden-bonus";b.textContent=t;document.body.appendChild(b);playSound("ui");c.remove();addQuestProgress("golden",1);updateUI();saveGame();};document.body.appendChild(c);setTimeout(function(){if(c.parentNode)c.remove();},8000);}

// === СЕКРЕТНЫЙ ЗОЛОТОЙ ТАП ===
var goldenSecretTimer=null,goldenSecretActive=false,_lastGoldenSecretSlot=-1;
function startGoldenSecretSchedule(){if(goldenSecretTimer)clearInterval(goldenSecretTimer);goldenSecretTimer=setInterval(function(){if(goldenSecretActive)return;var d=new Date();var m=d.getMinutes();var h=d.getHours();if(m===0||m===30){var sl=h*2+(m===30?1:0);if(sl!==_lastGoldenSecretSlot){_lastGoldenSecretSlot=sl;activateGoldenSecret();}}},5000);}
function activateGoldenSecret(){if(goldenSecretActive)return;goldenSecretActive=true;var b=$("click-btn");if(b)b.classList.add("golden-tap");setTimeout(function(){deactivateGoldenSecret();},30*1000);}
function deactivateGoldenSecret(){goldenSecretActive=false;var b=$("click-btn");if(b)b.classList.remove("golden-tap");}
function onGoldenSecretTap(){if(!goldenSecretActive)return false;goldenSecretActive=false;var b=$("click-btn");if(b)b.classList.remove("golden-tap");addCrystals(1);if(!unlocked._goldenSecretCount)unlocked._goldenSecretCount=0;unlocked._goldenSecretCount++;var p=document.createElement("div");p.className="achievement-popup";p.style.background="linear-gradient(135deg,#ffd54f,#ff8f00)";p.style.color="#1a1a2e";p.textContent="✨ +1 💎 (всего: "+unlocked._goldenSecretCount+")";document.body.appendChild(p);setTimeout(function(){p.remove();},3500);playSound("achievement");updateUI();checkAchievements();saveGame();return true;}

// === ЭФФЕКТЫ ===
function showFloatPlus(x,y,a,ic){if(!settings.showFloat)return;var e=document.createElement("div");e.className="float-plus";if(ic){e.classList.add("crit");e.textContent="+"+formatNumber(a)+"!";}else{if(a<1000)e.classList.add("color-small");else if(a<1000000)e.classList.add("color-medium");else if(a<1000000000)e.classList.add("color-large");else e.classList.add("color-huge");e.textContent="+"+formatNumber(a);}e.style.left=x+"px";e.style.top=y+"px";document.body.appendChild(e);setTimeout(function(){e.remove();},900);}
function spawnTapParticles(x,y){var n=Date.now();if(window.__lastParticleTime&&n-window.__lastParticleTime<250)return;window.__lastParticleTime=n;var c=settings.lowParticles?2:(3+Math.floor(Math.random()*2));for(var i=0;i<c;i++){var p=document.createElement("div");p.className="tap-particle";p.textContent="⭐";var an=(Math.PI*2/c)*i+(Math.random()*0.6-0.3);var d=40+Math.random()*35;p.style.setProperty("--dx",(Math.cos(an)*d)+"px");p.style.setProperty("--dy",(Math.sin(an)*d)+"px");p.style.setProperty("--rot",(Math.random()*720-360)+"deg");p.style.left=x+"px";p.style.top=y+"px";p.style.fontSize=(10+Math.random()*6)+"px";document.body.appendChild(p);setTimeout(function(){p.remove();},600);}}
function pulseCounter(){var e=$("counter");if(!e)return;var n=Date.now();if(window.__pulseCooldown&&n-window.__pulseCooldown<200&&n>=window.__pulseCooldown)return;window.__pulseCooldown=n;e.classList.remove("pulse");void e.offsetWidth;e.classList.add("pulse");setTimeout(function(){e.classList.remove("pulse");},200);}
function setCoinsAnimated(n){var e=$("coins");if(!e)return;var c=lastDisplayedCoins;if(n<=c){e.textContent=formatNumber(n);lastDisplayedCoins=n;return;}var d=n-c;if(d<50){e.textContent=formatNumber(n);lastDisplayedCoins=n;return;}var st=Math.min(12,Math.max(3,Math.floor(d/500)+3));var s=0;var sv=c;if(window.__coinsAnimInterval){clearInterval(window.__coinsAnimInterval);window.__coinsAnimInterval=null;}window.__coinsAnimInterval=setInterval(function(){s++;if(s>=st){e.textContent=formatNumber(n);lastDisplayedCoins=n;clearInterval(window.__coinsAnimInterval);window.__coinsAnimInterval=null;return;}var v=sv+(d*(s/st));e.textContent=formatNumber(v);lastDisplayedCoins=v;},50);}
function showShardDrop(x,y){var e=document.createElement("div");e.className="shard-drop";e.textContent="🌑 +1!";e.style.left=x+"px";e.style.top=y+"px";document.body.appendChild(e);setTimeout(function(){e.remove();},1500);}

// === ДОСТИЖЕНИЯ ===
var achFilter="all";
function isAchievementKey(k){return k.charAt(0)!=="_";}
function renderAchievements(){var l=$("achievements-list");if(!l)return;l.innerHTML="";var c={bronze:0,silver:0,gold:0,none:0,ub:0,us:0,ug:0,un:0};achievements.forEach(function(a){var t=a.tier||"none";var tk=t==="bronze"?"bronze":t==="silver"?"silver":t==="gold"?"gold":"none";c[tk]++;if(unlocked[a.id]){var uk=t==="bronze"?"ub":t==="silver"?"us":t==="gold"?"ug":"un";c[uk]++;}});var s=document.createElement("div");s.className="ach-summary";s.innerHTML='<div class="ach-sum-item bronze">🥉 <b>'+c.ub+' / '+c.bronze+'</b></div>'+'<div class="ach-sum-item silver">🥈 <b>'+c.us+' / '+c.silver+'</b></div>'+'<div class="ach-sum-item gold">🥇 <b>'+c.ug+' / '+c.gold+'</b></div>';l.appendChild(s);achievements.forEach(function(a){if(achFilter!=="all"&&(a.tier||"none")!==achFilter)return;var d=document.createElement("div");var cl="achievement";if(unlocked[a.id])cl+=" unlocked";if(a.tier)cl+=" tier-"+a.tier;d.className=cl;var tb=a.tier==="gold"?"🥇":a.tier==="silver"?"🥈":a.tier==="bronze"?"🥉":"";var rw=a.tier==="gold"?5:a.tier==="silver"?3:1;d.innerHTML='<div class="icon">'+a.icon+'</div>'+'<div class="info">'+'<div class="title">'+(tb?tb+" ":"")+a.title+'</div>'+'<div class="desc">'+a.desc+' · +'+rw+' 💎</div>'+'</div>';l.appendChild(d);});}
function setupAchFilters(){var bs=document.querySelectorAll(".ach-filter");bs.forEach(function(b){b.onclick=function(){bs.forEach(function(x){x.classList.remove("active");});b.classList.add("active");achFilter=b.dataset.tier||"all";renderAchievements();};});}
function checkAchievements(){if(window.__checkingAch)return;window.__checkingAch=true;try{var d=false;achievements.forEach(function(a){if(!unlocked[a.id]&&a.check()){unlocked[a.id]=true;var rw=a.tier==="gold"?5:a.tier==="silver"?3:1;addCrystals(rw);showAchievementPopup(a,rw);d=true;}});if(d)saveGame();}finally{window.__checkingAch=false;}}
function showAchievementPopup(a,rw){var tb=a.tier==="gold"?"🥇":a.tier==="silver"?"🥈":a.tier==="bronze"?"🥉":"";var p=document.createElement("div");p.className="achievement-popup";p.textContent=(tb?tb+" ":"")+a.icon+" "+a.title+" (+"+rw+" 💎)";document.body.appendChild(p);playSound("achievement");vibrate(20);setTimeout(function(){p.remove();},2500);}

// === МАГАЗИН ===
function buildCpsLine(u){var un=(u.effect==="click")?"/тап":"/сек";var c=u.count*u.amount;var im=u.count>=UPGRADE_MAX_LEVEL;if(im)return "<b>"+formatNumber(c)+un+"</b>";return "<b>"+formatNumber(c)+un+"</b> → "+formatNumber(c+u.amount)+un;}
function renderShop(){var l=$("shop-list");if(!l)return;l.innerHTML="";var ms=[50,100,250,500];for(var id in upgrades){var u=upgrades[id];var d=document.createElement("div");d.className="item";var im=u.count>=UPGRADE_MAX_LEVEL;var mh="";ms.forEach(function(m){if(u.count>=m)mh+='<span class="milestone-badge">🏅</span>';});var um=u.buyMult||1;var mb='<div class="mult-row">';mb+='<button class="mult-btn'+(um===1?" active":"")+'" data-mult="1" data-uid="'+id+'">×1</button>';if(u.unlocked10){mb+='<button class="mult-btn'+(um===10?" active":"")+'" data-mult="10" data-uid="'+id+'">×10</button>';}else{mb+='<button class="mult-btn locked" data-unlock10="'+id+'">×10 🔒'+BUY_UNLOCK_10+'💎</button>';}if(u.unlocked25){mb+='<button class="mult-btn'+(um===25?" active":"")+'" data-mult="25" data-uid="'+id+'">×25</button>';}else{mb+='<button class="mult-btn locked" data-unlock25="'+id+'">×25 🔒'+BUY_UNLOCK_25+'💎</button>';}mb+='</div>';var bh=im?'<button class="buy" data-id="'+id+'" disabled style="background:#4caf50;color:#fff">✓ Максимум</button>':'<div class="buy-wrap">'+mb+'<button class="buy" data-id="'+id+'">Купить ×'+um+'</button></div>';var cl=im?'':' • 💰 <span id="cost-'+id+'">'+formatNumber(u.cost)+'</span>';d.innerHTML='<div class="info"><div class="name">'+u.name+' '+mh+'</div><div class="desc">'+u.desc+'</div><div class="cps-info" id="cpsline-'+id+'">'+buildCpsLine(u)+'</div></div><div class="right"><div class="owned">Куплено: <span id="owned-'+id+'">0</span> / '+UPGRADE_MAX_LEVEL+cl+'</div>'+bh+'</div>';l.appendChild(d);}document.querySelectorAll(".buy[data-id]").forEach(function(b){b.onclick=function(){var id=b.dataset.id;var u=upgrades[id];if(!u)return;if(u.count>=UPGRADE_MAX_LEVEL)return;var m=u.buyMult||1;if(u.count+m>UPGRADE_MAX_LEVEL)m=UPGRADE_MAX_LEVEL-u.count;var tc=0;for(var i=0;i<m;i++){tc+=Math.floor(u.baseCost*Math.pow(UPGRADE_COST_MULT,u.count+i));}if(coins<tc){alert("Недостаточно монет!\nНужно: "+formatNumber(tc)+"\nУ вас: "+formatNumber(coins));return;}coins-=tc;for(var i=0;i<m;i++){u.count++;if(u.effect==="click")coinsPerClick+=u.amount;}u.cost=u.count>=UPGRADE_MAX_LEVEL?Infinity:Math.floor(u.baseCost*Math.pow(UPGRADE_COST_MULT,u.count));var ie=b.closest(".item");if(ie){ie.classList.remove("just-bought");void ie.offsetWidth;ie.classList.add("just-bought");setTimeout(function(){ie.classList.remove("just-bought");},600);}addQuestProgress("upgrades",m);playSound("ui");vibrate(10);updateUI();checkRewardTab();saveGame();};});document.querySelectorAll(".mult-btn[data-mult]").forEach(function(b){b.onclick=function(e){e.stopPropagation();var m=parseInt(b.dataset.mult);var id=b.dataset.uid;var u=upgrades[id];if(!u)return;if(m===10&&!u.unlocked10)return;if(m===25&&!u.unlocked25)return;u.buyMult=m;renderShop();saveGame();};});document.querySelectorAll(".mult-btn[data-unlock10]").forEach(function(b){b.onclick=function(e){e.stopPropagation();var id=b.dataset.unlock10;var u=upgrades[id];if(!u||u.unlocked10)return;if(crystals<BUY_UNLOCK_10){alert("Недостаточно кристаллов! Нужно "+BUY_UNLOCK_10+" 💎");return;}if(!confirm("Разблокировать ×10 за "+BUY_UNLOCK_10+" 💎?"))return;crystals-=BUY_UNLOCK_10;u.unlocked10=true;u.buyMult=10;playSound("ui");vibrate(10);updateUI();renderShop();saveGame();};});document.querySelectorAll(".mult-btn[data-unlock25]").forEach(function(b){b.onclick=function(e){e.stopPropagation();var id=b.dataset.unlock25;var u=upgrades[id];if(!u||u.unlocked25)return;if(crystals<BUY_UNLOCK_25){alert("Недостаточно кристаллов! Нужно "+BUY_UNLOCK_25+" 💎");return;}if(!confirm("Разблокировать ×25 за "+BUY_UNLOCK_25+" 💎?"))return;crystals-=BUY_UNLOCK_25;u.unlocked25=true;u.buyMult=25;playSound("ui");vibrate(10);updateUI();renderShop();saveGame();};});}

// === ЛИЧНЫЙ РЕКОРД ===
function checkPersonalRecord(){var n=Date.now();if(n-lastRecordCheck<3000)return;lastRecordCheck=n;if(coins>personalBestCoins){personalBestCoins=coins;saveGame();}}

// === UI ===
var _lastBannerCheck=0,_lastNoteCheck=0;
function updateUI(){setCoinsAnimated(coins);$("cps").textContent=formatNumber(getCPS())+(goldenMultiplier>1?" (x7!)":"");$("crystals").textContent=crystals;var s=$("shards");if(s)s.textContent=shards;var ib=$("item-bonus");if(ib)ib.textContent="+"+Math.round((getItemBonus()-1)*100)+"%";var n=Date.now();if(n-lastShopUpdate>500||n<lastShopUpdate){lastShopUpdate=n;for(var id in upgrades){var u=upgrades[id];var o=$("owned-"+id),c=$("cost-"+id);if(o)o.textContent=u.count;if(c)c.textContent=formatNumber(u.cost);var cl=$("cpsline-"+id);if(cl)cl.innerHTML=buildCpsLine(u);var b=document.querySelector('.buy[data-id="'+id+'"]');if(b){if(u.count>=UPGRADE_MAX_LEVEL){b.disabled=true;b.textContent="✓ Максимум";b.style.background="#4caf50";b.style.color="#fff";}else{b.disabled=coins<u.cost;}}}updateGlobalShopUI();}var sm=$("modal-secret");if(sm&&!sm.classList.contains("hidden"))updateSecretUI();if(n-_lastNoteCheck>5000){_lastNoteCheck=n;checkNotesUnlock();}var dm=$("modal-deposit");if(dm&&!dm.classList.contains("hidden")){var db2=$("deposit-buy-btn");if(db2&&depositUnlocked&&depositLevel<25){var nd=DEPOSIT_LEVELS[depositLevel].cost;db2.disabled=coins<nd;}}if(typeof dmUpdateSideBadge==="function")dmUpdateSideBadge();if(n-_lastBannerCheck>5000){_lastBannerCheck=n;if(typeof checkBannersUnlock==="function")checkBannersUnlock();}}
function updateStats(){$("stat-coins").textContent=formatNumber(coins);$("stat-earned").textContent=formatNumber(totalEarned);$("stat-taps").textContent=formatNumber(totalTaps);$("stat-cps").textContent=formatNumber(getCPS());$("stat-per-click").textContent=formatNumber(getClickValue());$("stat-crystals").textContent=crystals;var ss=$("stat-shards");if(ss)ss.textContent=shards;var st=$("stat-shards-total");if(st)st.textContent=formatNumber(totalShardsEarned);var tm=$("stat-time");if(tm)tm.textContent=formatTime(totalPlayTime);var ac=0;for(var id in unlocked){if(!isAchievementKey(id))continue;if(unlocked[id])ac++;}$("stat-ach").textContent=ac;var tt=$("stat-ach-total");if(tt)tt.textContent=achievements.length;var rr=$("stat-record");if(rr)rr.textContent=formatNumber(personalBestCoins);var mg=$("stat-minigame");if(mg)mg.textContent=minigameBest;}

// === ПЕЧЕНЬКА ===
function getTodayKeyFortune(){var d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();}
function updateFortuneButton(){var b=$("fortune-btn");if(!b)return;var l=localStorage.getItem(FORTUNE_KEY)||"";var t=getTodayKeyFortune();if(l===t){b.disabled=true;b.textContent="🥠 До завтра";b.classList.remove("available");}else{b.disabled=false;b.textContent="🥠 Что сегодня?";b.classList.add("available");}}
function showFortune(){var b=$("fortune-btn");if(!b||b.disabled)return;var l=localStorage.getItem(FORTUNE_KEY)||"";var t=getTodayKeyFortune();if(l===t)return;localStorage.setItem(FORTUNE_KEY,t);var tx=FORTUNES[Math.floor(Math.random()*FORTUNES.length)];var p=document.createElement("div");p.className="fortune-popup";p.innerHTML='<div class="fortune-emoji">🥠</div>'+'<div class="fortune-label">Печенька говорит:</div>'+'<div class="fortune-text">«'+tx+'»</div>'+'<button class="fortune-close">Спасибо, печенька!</button>';document.body.appendChild(p);playSound("ui");p.querySelector(".fortune-close").onclick=function(){p.remove();};setTimeout(function(){if(p.parentNode)p.remove();},30000);updateFortuneButton();}

// === ТАП ===
$("click-btn").onclick=function(e){if(!checkTapLimit())return;var cd=getGeneratorCooldownMs();var n=Date.now();if(generatorLevel<20&&cd>50&&n-lastClickTime<cd)return;lastClickTime=n;$("click-btn").classList.remove("tap-ready");if(goldenSecretActive){onGoldenSecretTap();}var v=getClickValue();coins+=v;totalEarned+=v;var tt=gulauActive?5:1;totalTaps+=tt;addQuestProgress("taps",tt);var r=e.target.getBoundingClientRect();var x=r.left+r.width/2+(Math.random()*40-20);var y=r.top+r.height/2;spawnTapRing(x,y);spawnTapWave(x,y);var ic=Math.random()<0.05;if(ic){v*=2;coins+=v;totalEarned+=v;spawnScreenShake();}showFloatPlus(x,y,v,ic);spawnTapParticles(x,y);pulseCounter();var sc=0.01+globalUpgrades.bloodLuck.count*globalUpgrades.bloodLuck.amount;if(typeof petGetShardTapBonus==="function")sc+=petGetShardTapBonus();if(typeof superEventActive!=="undefined"&&superEventActive)sc+=superEventShardBonus;if(bloodMoonActive&&Math.random()<sc){shards+=1;showShardDrop(x,y);}var pg=(typeof petGetGemTapChance==="function")?petGetGemTapChance():0;if(pg>0&&Math.random()<pg){addCrystals(1);var gp=document.createElement("div");gp.className="float-plus color-huge";gp.textContent="+1 💎";gp.style.left=x+"px";gp.style.top=y+"px";document.body.appendChild(gp);setTimeout(function(){gp.remove();},800);}playSound("click");if(window.__coinsAnimInterval){clearInterval(window.__coinsAnimInterval);window.__coinsAnimInterval=null;}lastDisplayedCoins=coins;$("coins").textContent=formatNumber(coins);$("cps").textContent=formatNumber(getCPS())+(goldenMultiplier>1?" (x7!)":"");resetAlarmTimer();if(typeof khrPetHookTap==="function")khrPetHookTap();};

var fb=$("fortune-btn");if(fb)fb.onclick=function(){playSound("ui");showFortune();};
var dsb=$("deposit-side-btn");if(dsb)dsb.onclick=function(){playSound("ui");renderDeposit();$("modal-deposit").classList.remove("hidden");syncScrollLock();updateDepositSideButton();};
var gb=$("generator-btn");if(gb)gb.onclick=function(){playSound("ui");renderGenerator();$("modal-generator").classList.remove("hidden");syncScrollLock();};

// === СУНДУК ===
var CHEST_COOLDOWN=60*60*1000;
function resetChestCooldown(){try{localStorage.removeItem("lastChest");}catch(e){}updateChestButton();}
function updateChestButton(){var b=$("chest-btn");if(!b)return;var l=parseInt(localStorage.getItem("lastChest")||"0");var left=CHEST_COOLDOWN-(Date.now()-l);if(left<=0){b.disabled=false;b.textContent="🎁 Сундук";}else{b.disabled=true;var m=Math.floor(left/60000);var s=Math.floor((left%60000)/1000);b.textContent="🎁 "+m+"м "+s+"с";}}
function getChestRewards(){var c=getCPS();return {coins:Math.max(500,Math.floor(c*1800)),crystals:5+Math.floor(Math.random()*11),shards:15+Math.floor(Math.random()*26),booster:["boost2","boost3","boost5"][Math.floor(Math.random()*3)]};}
var cb=$("chest-btn");if(cb)cb.onclick=function(){var l=parseInt(localStorage.getItem("lastChest")||"0");if(Date.now()-l<CHEST_COOLDOWN)return;var r=getChestRewards();openChestAnimation(r.crystals,r.coins,r.shards,r.booster,function(){addCrystals(r.crystals);coins+=r.coins;totalEarned+=r.coins;shards+=r.shards;if(r.booster)addBoosterToStorage(r.booster);chestsOpened++;localStorage.setItem("lastChest",Date.now().toString());addQuestProgress("chest",1);updateUI();updateChestButton();checkAchievements();saveGame();});};

var wb=$("wheel-btn");if(wb)wb.onclick=function(){playSound("ui");openWheel();};
var wc=$("wheel-close");if(wc)wc.onclick=function(){playSound("ui");closeWheel();};
var wf=$("wheel-spin-free");if(wf)wf.onclick=function(){spinWheel(true);};
var wp=$("wheel-spin-paid");if(wp)wp.onclick=function(){spinWheel(false);};
var db2=$("daily-btn");if(db2)db2.onclick=function(){playSound("ui");openDaily();};
var dc=$("daily-close");if(dc)dc.onclick=function(){playSound("ui");closeDaily();};
var dsp=$("daily-spin");if(dsp)dsp.onclick=function(){spinDaily();};
var mb2=$("minigame-btn");if(mb2)mb2.onclick=function(){playSound("ui");openMinigame();};
var mc=$("minigame-close");if(mc)mc.onclick=function(){playSound("ui");closeMinigame();};
var ms=$("minigame-start");if(ms)ms.onclick=function(){startMinigame();};
var mt=$("minigame-tap-btn");if(mt)mt.onclick=function(){tapMinigame();};

function openChestAnimation(cr,co,sh,bo,onC){var o=$("chest-overlay"),s=$("chest-scene"),r=$("chest-rewards"),b=$("chest-collect");if(!o||!s||!r||!b){onC();return;}o.classList.remove("hidden");syncScrollLock();s.classList.remove("shaking","opened");r.innerHTML="";b.classList.add("hidden");b.onclick=null;playSound("chest");vibrate(30);setTimeout(function(){s.classList.add("shaking");setTimeout(function(){s.classList.remove("shaking");var f=document.createElement("div");f.className="chest-flash";document.body.appendChild(f);setTimeout(function(){f.remove();},400);s.classList.add("opened");var h="";h+='<div class="chest-reward-item">💎 +'+cr+'</div>';h+='<div class="chest-reward-item delay-1">💰 +'+formatNumber(co)+'</div>';h+='<div class="chest-reward-item delay-2">🌑 +'+sh+'</div>';if(bo&&BOOSTERS[bo]){h+='<div class="chest-reward-item delay-3">⚡ ×'+BOOSTERS[bo].mult+'</div>';}r.innerHTML=h;setTimeout(function(){b.classList.remove("hidden");b.onclick=function(){b.onclick=null;o.classList.add("hidden");syncScrollLock();onC();};},2200);},1500);},500);}

document.querySelectorAll(".tab-btn").forEach(function(b){b.onclick=function(){playSound("ui");var tab=b.dataset.tab;var m=$("modal-"+tab);if(m){if(tab==="stats")updateStats();if(tab==="skins"){renderSkins();renderEmojiSkins();renderBackgrounds();renderSmileSkins();}if(tab==="achievements")renderAchievements();if(tab==="items"){renderItems();renderCrystalShop();renderGlobalShop();}if(tab==="leaders"){updateLeaderboardName();loadLeaderboard();}if(tab==="quests")renderQuests();if(tab==="note")renderNoteList();if(tab==="boosters")renderBoosters();if(tab==="friends")openFriendsModal();m.classList.remove("hidden");syncScrollLock();}};});
document.querySelectorAll(".modal-close").forEach(function(b){b.onclick=function(){playSound("ui");var id=b.dataset.close;var e=$(id);if(e)e.classList.add("hidden");syncScrollLock();};});
document.querySelectorAll(".modal").forEach(function(m){m.onclick=function(e){if(e.target===m){m.classList.add("hidden");syncScrollLock();}};});
document.querySelectorAll(".items-tab").forEach(function(b){b.onclick=function(){document.querySelectorAll(".items-tab").forEach(function(x){x.classList.remove("active");});b.classList.add("active");var tab=b.dataset.itab;var s=$("shop-list"),g=$("global-shop-list");if(tab==="upgrades"){s.style.display="block";g.style.display="none";}else{s.style.display="none";g.style.display="block";renderGlobalShop();}};});

var optF=$("opt-float"),optG=$("opt-golden"),optD=$("opt-daily"),optS=$("opt-sound"),optM=$("opt-music"),optL=$("opt-lowparticles"),optK=$("opt-krohlupic");
if(optF)optF.onchange=function(){settings.showFloat=this.checked;saveSettings();};
if(optG)optG.onchange=function(){settings.showGolden=this.checked;saveSettings();};
if(optD)optD.onchange=function(){settings.showDaily=this.checked;saveSettings();};
if(optS)optS.onchange=function(){settings.sound=this.checked;saveSettings();};
if(optM)optM.onchange=function(){settings.music=this.checked;saveSettings();if(settings.music)playMusic();else stopMusic();};
if(optL)optL.onchange=function(){settings.lowParticles=this.checked;document.body.classList.toggle("low-particles",settings.lowParticles);saveSettings();applyBackground();};
if(optK)optK.onchange=function(){settings.krohlupic=this.checked;khrState.enabled=this.checked;if(this.checked){if(typeof khrPetInit==="function")khrPetInit();}else{var e=document.getElementById("krohlupic-pet");if(e)e.classList.add("hidden");document.body.classList.add("no-krohlupic");khrPetState.visible=false;}saveSettings();};

var pb=$("promo-btn");if(pb)pb.onclick=activatePromo;
var pi=$("promo-input");if(pi)pi.addEventListener("keydown",function(e){if(e.key==="Enter")activatePromo();});
var eb=$("export-btn");if(eb)eb.onclick=exportSave;
var cp=$("copy-btn");if(cp)cp.onclick=copyExport;
var ec=$("export-close");if(ec)ec.onclick=function(){var b=$("export-box");if(b)b.classList.add("hidden");};
var ib2=$("import-btn");if(ib2)ib2.onclick=function(){var b=$("import-box");if(b)b.classList.toggle("hidden");};
var il=$("import-load");if(il)il.onclick=importSave;
var ic=$("import-cancel");if(ic)ic.onclick=function(){var b=$("import-box");if(b)b.classList.add("hidden");};
var rc=$("reward-claim");if(rc)rc.onclick=claimReward;
var ls=$("leader-submit");if(ls)ls.onclick=submitLeaderboardScore;
var su=$("secret-unlock");if(su)su.onclick=tryUnlockSecret;
var stg=$("secret-toggle");if(stg)stg.onclick=activateSecretAutoClicker;

setupAdvancedButton();setupProfileSave();setupProfileCopy();setupTutorial();setupNoteBack();setupAchFilters();
var pfb=$("profile-side-btn");if(pfb)pfb.onclick=function(){playSound("ui");showProfileModal();};
var pnb=$("pahan-btn");if(pnb)pnb.onclick=function(){playSound("ui");activatePahan();};
updatePahanButton();

function setupResetButton(){var b=$("settings-reset");if(!b)return;var s=0;var tm=null;b.onclick=function(e){e.preventDefault();e.stopPropagation();s++;if(s===1){b.textContent="⚠️ Нажмите ещё раз (1/2)";b.style.background="#ff5722";if(tm)clearTimeout(tm);tm=setTimeout(function(){s=0;b.textContent="Сбросить весь прогресс";b.style.background="#b33a3a";},3000);return;}if(s===2){clearTimeout(tm);b.textContent="🗑️ Удаляю...";b.style.background="#8a0000";try{window.__resetting=true;coins=0;coinsPerClick=1;totalEarned=0;totalShardsEarned=0;totalTaps=0;totalPlayTime=0;crystals=0;goldenMultiplier=1;goldenTimer=0;shards=0;bloodMoonActive=false;bloodMoonTimer=0;eventMultiplier=1;eventTimer=0;eventName="";currentEventKey="";crystalBoostMultiplier=1;crystalBoostTimer=0;crystalBoostName="";unlocked={};ownedItems={};chestsOpened=0;personalBestCoins=0;secretUnlocked=false;secretAutoClicker=false;secretAutoClickerTimer=0;depositUnlocked=false;depositLevel=0;generatorLevel=1;generatorTimer=GENERATOR_DURATION;lastDepositTimeKey="";smileSkinUnlocked=false;smileSkinActive=false;gulauActive=false;gulauTimer=0;bossActive=false;bossHP=150;bossTimeLeft=45;bossRewardClaimed=false;rewardClaimed=false;rewardTabShown=false;noteShown=false;note1Shown=false;note2Shown=false;note3Shown=false;note4Shown=false;note5Shown=false;note6Shown=false;note7Shown=false;notesUnlocked={};pahanUnlocked=false;pahanActive=false;pahanTimer=0;quests=[];questsDate="";questsClaimed=0;questProgress={};theftActive=false;theftTimer=0;theftTotalLost=0;lastTheftKey="";wheelFreeUsed=false;wheelPaidUsed=false;wheelLastResetDay="";dailyLastUsed="";minigameBest=0;minigameLastUsed=0;goldenSecretActive=false;activeBg="base";for(var b_ in BOOSTERS){BOOSTERS[b_].storage=0;}for(var bg_ in BACKGROUNDS){BACKGROUNDS[bg_].owned=(bg_==="base");}for(var es_ in EMOJI_SKINS){EMOJI_SKINS[es_].owned=false;}activeEmojiSkin=null;if(bossTimerInterval){clearInterval(bossTimerInterval);bossTimerInterval=null;}if(pahanTickInterval){clearInterval(pahanTickInterval);pahanTickInterval=null;}if(pahanTimerInterval){clearInterval(pahanTimerInterval);pahanTimerInterval=null;}if(theftTickTimer){clearInterval(theftTickTimer);theftTickTimer=null;}if(minigameTimerInterval){clearInterval(minigameTimerInterval);minigameTimerInterval=null;}stopSecretAutoClicker();for(var u_ in upgrades){upgrades[u_].count=0;upgrades[u_].cost=upgrades[u_].baseCost;upgrades[u_].unlocked10=false;upgrades[u_].unlocked25=false;upgrades[u_].buyMult=1;}for(var g_ in globalUpgrades){globalUpgrades[g_].count=0;globalUpgrades[g_].cost=globalUpgrades[g_].baseCost;}for(var sk_ in skins){skins[sk_].owned=(sk_==="gold");}activeSkin="gold";applyBackground();try{localStorage.removeItem(SAVE_KEY);localStorage.removeItem("lastDaily");localStorage.removeItem("dailyStreak");localStorage.removeItem("clicker-settings");localStorage.removeItem("clicker-skins");localStorage.removeItem("lastChest");localStorage.removeItem(FORTUNE_KEY);localStorage.removeItem("clicker-theft-state");localStorage.removeItem("clicker-used-promos");localStorage.removeItem("clicker-lang");localStorage.removeItem("fnfLastPlayed");localStorage.removeItem("clicker-shortid-cache");localStorage.removeItem("clicker-banners");localStorage.removeItem("clicker-season");localStorage.removeItem("clicker-admin-unlocked");}catch(err){}setTimeout(function(){alert("✅ Прогресс сброшен! Перезагрузка...");location.reload();},300);}catch(err){alert("❌ Ошибка: "+err.message);b.textContent="Сбросить весь прогресс";b.style.background="#b33a3a";s=0;window.__resetting=false;}}};}

// === СТРАНИЦЫ ===
var currentPage=1,totalPages=2;
function showPage(n){if(n<1)n=totalPages;if(n>totalPages)n=1;currentPage=n;document.querySelectorAll(".page").forEach(function(p,i){if(i+1===n)p.classList.add("page-active");else p.classList.remove("page-active");});document.querySelectorAll(".page-dot").forEach(function(d){if(parseInt(d.dataset.page)===n)d.classList.add("active");else d.classList.remove("active");});var a=$("almanac-btn");if(a){if(n===2)a.classList.remove("hidden");else a.classList.add("hidden");}if(bgCanvas)resizeBgCanvas();window.scrollTo({top:0,behavior:"smooth"});}
function nextPage(){showPage(currentPage+1);}
function prevPage(){showPage(currentPage-1);}
var pp=$("page-prev"),pn=$("page-next");if(pp)pp.onclick=prevPage;if(pn)pn.onclick=nextPage;
document.querySelectorAll(".page-dot").forEach(function(d){d.onclick=function(){var n=parseInt(d.dataset.page);if(n)showPage(n);};});
var tsX=0,teX=0,tsY=0,teY=0;
document.addEventListener("touchstart",function(e){tsX=e.changedTouches[0].screenX;tsY=e.changedTouches[0].screenY;},{passive:true});
document.addEventListener("touchend",function(e){teX=e.changedTouches[0].screenX;teY=e.changedTouches[0].screenY;var dx=teX-tsX,dy=teY-tsY;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5){if(document.querySelector(".modal:not(.hidden)"))return;if(dx<0)nextPage();else prevPage();}},{passive:true});
window.addEventListener("resize",resizeBgCanvas);
window.addEventListener("orientationchange",function(){setTimeout(resizeBgCanvas,200);});

// === КРОХЛЮПИК ===
var khrPetState={visible:false,mood:"normal",lastTap:Date.now(),lastMoodChange:0,idleTimer:null};
function khrPetInit(){var e=document.getElementById("krohlupic-pet");if(!e)return;if(!settings.krohlupic){e.classList.add("hidden");document.body.classList.add("no-krohlupic");return;}e.classList.remove("hidden");document.body.classList.remove("no-krohlupic");khrPetState.visible=true;e.onclick=khrPetOnClick;setInterval(khrPetUpdateMood,5000);khrPetUpdateMood();}
function khrPetOnClick(){var e=document.getElementById("krohlupic-pet-img");if(!e)return;e.classList.remove("happy");void e.offsetWidth;e.classList.add("happy");setTimeout(function(){e.classList.remove("happy");},400);try{playSound("ui");vibrate(10);}catch(e){}if(typeof khrShow==="function"&&typeof KHR_QUOTES!=="undefined"){var p=["cute_1","cute_2","cute_3","cute_4","cute_5"];var c=p[Math.floor(Math.random()*p.length)];khrShow(c,KHR_QUOTES[c]);}}
function khrPetUpdateMood(){if(!khrPetState.visible)return;var e=document.getElementById("krohlupic-pet"),i=document.getElementById("krohlupic-pet-img"),h=document.getElementById("krohlupic-pet-hint");if(!e||!i)return;var n=Date.now();var idle=(n-khrPetState.lastTap)/60000;var nm="normal";if(coins<100)nm="sad";else if(idle>10)nm="sleep";else if(idle>3)nm="normal";if(idle>2&&idle<10)e.classList.add("miss-you");else e.classList.remove("miss-you");if(nm!==khrPetState.mood){i.classList.remove("happy","sad","sleep");if(nm!=="normal")i.classList.add(nm);khrPetState.mood=nm;}if(h){if(idle>5&&Math.random()<0.3)h.style.display="block";else if(Math.random()<0.1)h.style.display="none";}}
function khrPetHookTap(){khrPetState.lastTap=Date.now();var i=document.getElementById("krohlupic-pet-img");if(i){i.classList.remove("happy");void i.offsetWidth;i.classList.add("happy");setTimeout(function(){i.classList.remove("happy");},400);}}
var KHR_QUOTES={coins_100:"Смотри, у нас уже 100!",coins_1k:"1000 монет! Я так горд.",coins_100k:"100K? Быстро растёшь!",coins_1m:"Миллион! Справишься.",coins_1b:"Миллиард. Стулья в офисе появились!",coins_1t:"Триллион… Это много?",coins_1qa:"Квадриллион! Ты спишь?",coins_1qi:"Квинтиллион. Боюсь произносить.",coins_1sp:"Дошёл.",coins_1no:"Как... Это же не должно быть.",taps_10:"Раз, два, три...",taps_100:"Ты стараешься. Ценю.",taps_1k:"Палец не болит?",taps_10k:"10 000! Ты машина?",taps_100k:"Лапки устали смотреть.",taps_1m:"Миллион тапов. Не знаю, что сказать.",up_farm:"Ферма! Монеты идут сами!",up_factory:"Фабрика работает!",up_bank:"Банк! Скоро кредиты.",up_space:"Космос! Там другие кликеры.",up_galaxy:"Вселенную строишь!",up_genesis:"Генезис… Начало?",ach_first:"Достижение! Молодец.",ach_50:"Половина достижений! Упорный.",ach_all:"Собрал всё. Горд. И напуган.",ev_theft_start:"Кража! Прячь монеты!",ev_theft_end:"Фух. Обошлось.",ev_bloodmoon:"Луна красная! Доход ×2!",note_found:"Ещё записка? Кто пишет?",cute_1:"Ты хороший.",cute_2:"Люблю смотреть, как ты тапаешь.",cute_3:"Вкус на апгрейды — топ.",cute_4:"С тобой в одной команде — класс.",cute_5:"Заяц-программист из меня так себе.",strange_1:"Помнишь, откуда я появился? Я — нет.",strange_2:"Кажется, за тобой наблюдают.",strange_3:"Будто кто-то тапает не здесь.",strange_4:"Тот из записок. Я его почти помню.",strange_5:"Если исчезну — не ищи меня.",strange_6:"Эта кнопка никогда не закончится.",strange_7:"Не заходи в комнату 9.",back_1:"Ты вернулся! Я думал, меня бросили.",back_2:"Привет. Смотрел на кнопку.",back_3:"Ты долго не заходил. Скучал."};
var khrState={enabled:true,lastShown:0,timer:null,shownProgress:{},shownStrange:{},lastStrange:0,snapshotTheftActive:false,snapshotBloodMoon:false};
function khrShow(key,text){if(!khrState.enabled)return;var n=Date.now();if(n-khrState.lastShown<5000)return;khrState.lastShown=n;var old=document.querySelector(".krohlupic-bubble");if(old)old.remove();var b=document.createElement("div");b.className="krohlupic-bubble";b.innerHTML='<div class="krohlupic-avatar"><img src="krohlupic.jpg" alt="🐰" onerror="this.style.display=\'none\';this.parentNode.textContent=\'🐰\';"></div>'+'<div class="krohlupic-text">'+text+'</div>';var tr=document.getElementById("tap-row");if(tr&&tr.parentNode)tr.parentNode.insertBefore(b,tr);else document.body.appendChild(b);setTimeout(function(){b.classList.add("show");},30);setTimeout(function(){b.classList.remove("show");setTimeout(function(){if(b.parentNode)b.remove();},500);},9000);}
function khrEventCheck(){if(!khrState.enabled)return;if(!khrState.snapshotTheftActive&&theftActive){khrState.snapshotTheftActive=true;khrShow("ev_theft_start",KHR_QUOTES.ev_theft_start);return;}if(khrState.snapshotTheftActive&&!theftActive){khrState.snapshotTheftActive=false;khrShow("ev_theft_end",KHR_QUOTES.ev_theft_end);return;}if(!khrState.snapshotBloodMoon&&bloodMoonActive){khrState.snapshotBloodMoon=true;khrShow("ev_bloodmoon",KHR_QUOTES.ev_bloodmoon);return;}if(khrState.snapshotBloodMoon&&!bloodMoonActive){khrState.snapshotBloodMoon=false;}}
function khrPickReply(){var pool=[];var cp=[["coins_1k",1e3],["coins_100k",1e5],["coins_1m",1e6],["coins_1b",1e9],["coins_1t",1e12],["coins_1qa",1e15],["coins_1qi",1e18],["coins_1sp",1e24],["coins_1no",1e30]];for(var i=cp.length-1;i>=0;i--){if(coins>=cp[i][1]&&!khrState.shownProgress[cp[i][0]]){pool.push({key:cp[i][0],w:5});break;}}if(coins>=100&&!khrState.shownProgress.coins_100)pool.push({key:"coins_100",w:2});var tp=[["taps_100",100],["taps_1k",1000],["taps_10k",10000],["taps_100k",100000],["taps_1m",1e6]];for(var i=tp.length-1;i>=0;i--){if(totalTaps>=tp[i][1]&&!khrState.shownProgress[tp[i][0]]){pool.push({key:tp[i][0],w:4});break;}}if(totalTaps>=10&&!khrState.shownProgress.taps_10)pool.push({key:"taps_10",w:2});var upP=[["up_farm","farm"],["up_factory","factory"],["up_bank","bank"],["up_space","space"],["up_galaxy","galaxy"],["up_genesis","genesis"]];for(var i=0;i<upP.length;i++){if(upgrades[upP[i][1]]&&upgrades[upP[i][1]].count>0&&!khrState.shownProgress[upP[i][0]])pool.push({key:upP[i][0],w:3});}var ac=0;for(var k in unlocked){if(!isAchievementKey(k))continue;if(unlocked[k])ac++;}if(ac>=1&&!khrState.shownProgress.ach_first)pool.push({key:"ach_first",w:3});if(ac>=50&&!khrState.shownProgress.ach_50)pool.push({key:"ach_50",w:4});if(ac>=achievements.length-2&&!khrState.shownProgress.ach_all)pool.push({key:"ach_all",w:5});var nc=0;for(var n in notesUnlocked)if(notesUnlocked[n])nc++;if(nc>=1&&!khrState.shownProgress.note_found)pool.push({key:"note_found",w:4});var ck=["cute_1","cute_2","cute_3","cute_4","cute_5"];for(var i=0;i<ck.length;i++){if(!khrState.shownProgress[ck[i]])pool.push({key:ck[i],w:3});}if(pool.length===0)pool.push({key:ck[Math.floor(Math.random()*ck.length)],w:1});var n=Date.now();if(n-khrState.lastStrange>30*60*1000){var sk=["strange_1","strange_2","strange_3","strange_4","strange_5","strange_6","strange_7"];var av=[];for(var i=0;i<sk.length;i++){if(!khrState.shownStrange[sk[i]])av.push(sk[i]);}if(av.length>0){var s=av[Math.floor(Math.random()*av.length)];pool.push({key:s,w:1,isStrange:true});}}var tt=0;for(var i=0;i<pool.length;i++)tt+=pool[i].w;var r=Math.random()*tt;var acc=0;var ch=pool[0];for(var i=0;i<pool.length;i++){acc+=pool[i].w;if(r<=acc){ch=pool[i];break;}}khrShow(ch.key,KHR_QUOTES[ch.key]);if(ch.isStrange){khrState.shownStrange[ch.key]=true;khrState.lastStrange=Date.now();}else{khrState.shownProgress[ch.key]=true;}}
function khrScheduleNext(){if(khrState.timer)clearTimeout(khrState.timer);var d=45000+Math.random()*75000;khrState.timer=setTimeout(function(){khrPickReply();khrScheduleNext();},d);}
setTimeout(function(){khrState.enabled=settings.krohlupic!==false;khrState.snapshotTheftActive=theftActive;khrState.snapshotBloodMoon=bloodMoonActive;if(totalPlayTime>60){setTimeout(function(){if(!khrState.enabled)return;var bk=["back_1","back_2","back_3"];var b=bk[Math.floor(Math.random()*bk.length)];khrShow("back_"+Date.now(),KHR_QUOTES[b]);khrScheduleNext();},2000);}else{khrScheduleNext();}setInterval(khrEventCheck,2000);},5000);

// === СУПЕР-ИВЕНТ ===
var SUPER_EVENT_PHASES=[{start:0,end:180,name:"🌋 Вспышка",coinMult:3,tapMult:1,shardBonus:0},{start:180,end:420,name:"👆 Шторм тапов",coinMult:1,tapMult:5,shardBonus:0},{start:420,end:600,name:"💰 Золотой час",coinMult:7,tapMult:1,shardBonus:0},{start:600,end:1200,name:"🩸 Кровавая ярость",coinMult:1,tapMult:5,shardBonus:0.25},{start:1200,end:1800,name:"🌑 Финал",coinMult:8,tapMult:1,shardBonus:0}];
var SUPER_EVENT_DURATION=1800;var superEventActive=false;var superEventPhaseIdx=-1;var superEventSecondsLeft=0;var superEventKey="";var superEventCoinMult=1;var superEventTapMult=1;var superEventShardBonus=0;
function getSuperEventWindow(){var d=new Date();if(d.getDay()!==1)return null;if(d.getHours()!==9)return null;var m=d.getMinutes();if(m>=30)return null;return {key:d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),elapsed:m*60+d.getSeconds()};}
function getSuperEventPhase(el){for(var i=0;i<SUPER_EVENT_PHASES.length;i++){var p=SUPER_EVENT_PHASES[i];if(el>=p.start&&el<p.end)return {idx:i,name:p.name,coinMult:p.coinMult,tapMult:p.tapMult,shardBonus:p.shardBonus};}return null;}
function startSuperEvent(k){superEventActive=true;superEventKey=k;document.body.classList.add("super-storm");playSound("alarm");vibrate(80);var p=document.createElement("div");p.className="super-event-popup";p.innerHTML='<div class="super-event-title">🌪️ КРОВАВЫЙ ШТОРМ</div><div class="super-event-sub">Начался супер-ивент!<br>30 минут усиления!</div>';document.body.appendChild(p);setTimeout(function(){p.classList.add("show");},30);setTimeout(function(){p.classList.remove("show");setTimeout(function(){p.remove();},500);},5000);}
function endSuperEvent(){superEventActive=false;superEventPhaseIdx=-1;superEventCoinMult=1;superEventTapMult=1;superEventShardBonus=0;superEventSecondsLeft=0;document.body.classList.remove("super-storm");var b=document.getElementById("super-event-banner");if(b)b.classList.remove("show");}
function updateSuperEventBanner(){var b=document.getElementById("super-event-banner");if(!b){b=document.createElement("div");b.id="super-event-banner";b.className="hidden";document.body.appendChild(b);}if(!superEventActive||superEventPhaseIdx<0){b.classList.remove("show");return;}b.classList.add("show");var ph=SUPER_EVENT_PHASES[superEventPhaseIdx];var m=Math.floor(superEventSecondsLeft/60);var s=superEventSecondsLeft%60;b.innerHTML='<span class="super-event-label">🌪️ ШТОРМ</span> '+ph.name+' <span class="super-event-time">'+m+':'+(s<10?"0":"")+s+'</span>';}
function updateSuperEvent(){var i=getSuperEventWindow();if(!i){if(superEventActive)endSuperEvent();return;}var ph=getSuperEventPhase(i.elapsed);if(!ph){if(superEventActive)endSuperEvent();return;}if(!superEventActive||superEventKey!==i.key){startSuperEvent(i.key);}if(superEventPhaseIdx!==ph.idx){superEventPhaseIdx=ph.idx;superEventCoinMult=ph.coinMult;superEventTapMult=ph.tapMult;superEventShardBonus=ph.shardBonus;}superEventSecondsLeft=SUPER_EVENT_DURATION-i.elapsed;updateSuperEventBanner();}

// === ПИТОМЦЫ ===
var petsState={xp:0,food:{strawberry:0,banana:0,orange:0},storage:[],active:null,nest:null,hunger:100,hungerLastTick:Date.now(),xpLastTick:Date.now(),nextId:1};
function petGetActive(){return petsState.active;}
function petGenerateId(){return petsState.nextId++;}
function petTotalCount(){return petsState.storage.length+(petsState.active?1:0);}
function petRollType(){var r=Math.random();var a=0;var ids=["hamster","kitten","fox","penguin","wolf","dragon","phoenix"];for(var i=0;i<ids.length;i++){a+=PET_TYPES[ids[i]].chance;if(r<=a)return ids[i];}return "hamster";}
function petBuyEgg(){if(crystals<PET_EGG_PRICE){alert("Недостаточно кристаллов!\nНужно: "+PET_EGG_PRICE+" 💎");return;}if(petsState.nest){alert("Гнездо занято!");return;}if(petTotalCount()>=PET_STORAGE_MAX){alert("Максимум питомцев!");return;}crystals-=PET_EGG_PRICE;petsState.nest={stage:"incubating",startedAt:Date.now(),taps:0,type:null};playSound("ui");vibrate(10);petRenderAll();updateUI();saveGame();}
function petProcessNest(){if(!petsState.nest)return;var n=Date.now();var el=n-petsState.nest.startedAt;if(petsState.nest.stage==="incubating"){if(el>=PET_EGG_INCUBATE){petsState.nest.stage="ready_hatch";petsState.nest.taps=0;petsState.nest.type=petRollType();playSound("ui");petRenderAll();saveGame();}}else if(petsState.nest.stage==="growing"){if(el>=PET_EGG_GROW){petsState.nest.stage="ready_collect";playSound("ui");petRenderAll();saveGame();}}}
function petHatchTap(){if(!petsState.nest)return;if(petsState.nest.stage!=="ready_hatch")return;petsState.nest.taps++;var t=$("nest-egg-tap-target");if(t){t.classList.remove("tapped");void t.offsetWidth;t.classList.add("tapped");}playSound("click");var d=document.querySelectorAll(".tap-dot");d.forEach(function(x,i){if(i<petsState.nest.taps)x.classList.add("filled");});if(petsState.nest.taps>=PET_EGG_HATCH_TAPS){setTimeout(function(){if(!petsState.nest)return;petsState.nest.stage="growing";petsState.nest.startedAt=Date.now();playSound("achievement");vibrate(30);petRenderAll();saveGame();},350);}else{petRenderAll();saveGame();}}
function petCollectTap(){if(!petsState.nest)return;if(petsState.nest.stage!=="ready_collect")return;var t=petsState.nest.type;if(petsState.storage.length>=PET_STORAGE_MAX){alert("Хранилище заполнено!");return;}petsState.storage.push({id:petGenerateId(),type:t});petsState.nest=null;if(t==="dragon")unlocked._petHasDragon=true;if(t==="phoenix")unlocked._petHasPhoenix=true;var pt=PET_TYPES[t];playSound("achievement");vibrate(40);var p=document.createElement("div");p.className="achievement-popup";p.textContent=pt.emoji+" "+pt.name+" в хранилище!";document.body.appendChild(p);setTimeout(function(){p.remove();},4000);petRenderAll();updateUI();saveGame();}
function petActivate(id){var idx=-1;for(var i=0;i<petsState.storage.length;i++){if(petsState.storage[i].id===id){idx=i;break;}}if(idx<0)return;var pt=petsState.storage[idx];petsState.storage.splice(idx,1);if(petsState.active){petsState.storage.push(petsState.active);}petsState.active=pt;if(typeof pt.hunger!=="number")pt.hunger=PET_HUNGER_MAX;petsState.hunger=pt.hunger;petsState.hungerLastTick=Date.now();petsState.xpLastTick=Date.now();playSound("ui");vibrate(10);petRenderAll();updateUI();saveGame();}
function petDeactivate(){if(!petsState.active)return;if(petsState.storage.length>=PET_STORAGE_MAX){alert("Хранилище заполнено!");return;}petsState.active.hunger=petsState.hunger;petsState.storage.push(petsState.active);petsState.active=null;petsState.hunger=PET_HUNGER_MAX;playSound("ui");petRenderAll();updateUI();saveGame();}
function petSell(id){for(var i=0;i<petsState.storage.length;i++){if(petsState.storage[i].id===id){var p=petsState.storage[i];var t=PET_TYPES[p.type];if(!confirm("Продать "+t.emoji+" "+t.name+" за "+t.sellPrice+" 🌑?"))return;shards+=t.sellPrice;petsState.storage.splice(i,1);playSound("ui");vibrate(10);petRenderAll();updateUI();saveGame();return;}}}
function petFeed(fid){var p=petGetActive();if(!p){alert("Нет активного питомца!");return;}var f=FOOD_TYPES[fid];if(!f)return;if(petsState.food[fid]<=0){alert("Нет "+f.emoji+" в инвентаре!");return;}petsState.food[fid]--;petsState.hunger=Math.min(PET_HUNGER_MAX,petsState.hunger+f.hunger);petsState.xp+=FOOD_CASHBACK;if(!unlocked._petFeedCount)unlocked._petFeedCount=0;unlocked._petFeedCount++;playSound("eat");vibrate(10);petRenderAll();updateUI();saveGame();checkAchievements();}
function petBuyFood(fid){var f=FOOD_TYPES[fid];if(!f)return;if(petsState.xp<f.price){alert("Недостаточно опыта!\nНужно: "+f.price+" ⭐");return;}petsState.xp-=f.price;petsState.food[fid]++;petsState.xp+=FOOD_CASHBACK;playSound("ui");petRenderAll();updateUI();saveGame();}
function petKillFromHunger(){var p=petGetActive();if(!p)return;var t=PET_TYPES[p.type];petsState.active=null;petsState.hunger=PET_HUNGER_MAX;playSound("alarm");vibrate(100);var pp=document.createElement("div");pp.className="achievement-popup";pp.style.background="linear-gradient(135deg,#4a0000,#b71c1c)";pp.style.color="#fff";pp.textContent="💀 "+t.deathMsg;document.body.appendChild(pp);setTimeout(function(){pp.remove();},7000);petRenderAll();updateUI();saveGame();}
function petTickHunger(){var p=petGetActive();if(!p)return;var n=Date.now();var el=n-petsState.hungerLastTick;if(el<PET_HUNGER_DROP_ONLINE)return;var d=Math.floor(el/PET_HUNGER_DROP_ONLINE);petsState.hungerLastTick+=d*PET_HUNGER_DROP_ONLINE;petsState.hunger=Math.max(0,petsState.hunger-d);p.hunger=petsState.hunger;if(petsState.hunger<=0)petKillFromHunger();}
function petTickXP(){var p=petGetActive();if(!p)return;if(petsState.hunger<=0)return;var n=Date.now();var el=n-petsState.xpLastTick;if(el<PET_XP_INTERVAL)return;var t=Math.floor(el/PET_XP_INTERVAL);petsState.xpLastTick+=t*PET_XP_INTERVAL;petsState.xp+=t;petRenderTopBar();}
function petGetIncomeBonus(){var p=petGetActive();if(!p||petsState.hunger<=0)return 0;return PET_TYPES[p.type].bonus.income||0;}
function petGetGemTapChance(){var p=petGetActive();if(!p||petsState.hunger<=0)return 0;return PET_TYPES[p.type].bonus.gemTap||0;}
function petGetShardTapBonus(){var p=petGetActive();if(!p||petsState.hunger<=0)return 0;return PET_TYPES[p.type].bonus.shardTap||0;}
function petRenderTopBar(){var x=$("pets-xp");if(x)x.textContent=petsState.xp;["strawberry","banana","orange"].forEach(function(f){var e=$("food-"+f+"-count");if(e)e.textContent=petsState.food[f];var fe=$("feed-"+f+"-count");if(fe)fe.textContent=petsState.food[f];});}
function petRenderNest(){var e1=$("nest-empty"),e2=$("nest-incubating"),e3=$("nest-growing"),e4=$("nest-ready-hatch"),e5=$("nest-ready-collect");if(!e1)return;[e1,e2,e3,e4,e5].forEach(function(x){if(x)x.classList.add("hidden");});if(!petsState.nest){e1.classList.remove("hidden");return;}var n=Date.now();var el=n-petsState.nest.startedAt;var st=petsState.nest.stage;if(st==="incubating"){e2.classList.remove("hidden");var l=Math.max(0,PET_EGG_INCUBATE-el);var ts=Math.floor(l/1000);var m=Math.floor(ts/60);var s=ts%60;var t=$("nest-incubate-timer");if(t)t.textContent=m+":"+(s<10?"0":"")+s;var b=$("nest-incubate-bar");if(b)b.style.width=Math.min(100,(el/PET_EGG_INCUBATE)*100)+"%";var eg=$("nest-egg-visual");if(eg){var p=Math.min(1,el/PET_EGG_INCUBATE);eg.style.fontSize=(40+p*55)+"px";}}
else if(st==="ready_hatch"){e4.classList.remove("hidden");var d=document.querySelectorAll(".tap-dot");d.forEach(function(x,i){if(i<petsState.nest.taps)x.classList.add("filled");else x.classList.remove("filled");});}
else if(st==="growing"){e3.classList.remove("hidden");var l2=Math.max(0,PET_EGG_GROW-el);var ts2=Math.floor(l2/1000);var m2=Math.floor(ts2/60);var s2=ts2%60;var t2=$("nest-grow-timer");if(t2)t2.textContent=m2+":"+(s2<10?"0":"")+s2;var b2=$("nest-grow-bar");if(b2)b2.style.width=Math.min(100,(el/PET_EGG_GROW)*100)+"%";var bb=$("nest-baby-visual");if(bb){var p2=Math.min(1,el/PET_EGG_GROW);bb.style.fontSize=(55+p2*30)+"px";}}
else if(st==="ready_collect"){e5.classList.remove("hidden");}
var buy=$("buy-egg-btn");if(buy)buy.disabled=petTotalCount()>=PET_STORAGE_MAX;}
function petRenderActive(){var e=$("active-pet-empty"),c=$("active-pet-card");if(!e||!c)return;var p=petGetActive();if(!p){e.textContent="Нет активного питомца";e.classList.remove("hidden");c.classList.add("hidden");return;}e.classList.add("hidden");c.classList.remove("hidden");var t=PET_TYPES[p.type];var n=$("active-pet-name-big");if(n)n.textContent=t.name;var em=$("active-pet-emoji-big");if(em)em.textContent=t.emoji;var r=$("active-pet-rarity-big");if(r)r.textContent=t.rarityLabel;var bt=[];if(t.bonus.income)bt.push("+"+Math.round(t.bonus.income*100)+"% доход");if(t.bonus.gemTap)bt.push("+"+(t.bonus.gemTap*100).toFixed(2)+"% гем");if(t.bonus.shardTap)bt.push("+"+(t.bonus.shardTap*100).toFixed(1)+"% осколок");var bo=$("active-pet-bonus-big");if(bo)bo.textContent=bt.join(" · ");var hv=$("active-pet-hunger-value");if(hv)hv.textContent=Math.floor(petsState.hunger)+" / "+PET_HUNGER_MAX;var hf=$("active-pet-hunger-fill-big");if(hf){hf.style.width=Math.max(0,(petsState.hunger/PET_HUNGER_MAX)*100)+"%";hf.classList.remove("warn","danger");if(petsState.hunger<=20)hf.classList.add("danger");else if(petsState.hunger<=50)hf.classList.add("warn");}document.querySelectorAll(".feed-btn").forEach(function(b){var f=b.dataset.food;b.disabled=petsState.food[f]<=0;});var d=$("pet-deactivate-btn");if(d)d.onclick=petDeactivate;}
function petRenderStorage(){var l=$("pets-storage-list"),e=$("pets-storage-empty"),c=$("storage-count");if(!l||!e)return;if(c)c.textContent=petTotalCount();if(petsState.storage.length===0){e.textContent="Пусто";e.classList.remove("hidden");l.innerHTML="";return;}e.classList.add("hidden");l.innerHTML="";petsState.storage.forEach(function(p){var t=PET_TYPES[p.type];var d=document.createElement("div");d.className="pet-card "+t.rarity;var bt=[];if(t.bonus.income)bt.push("+"+Math.round(t.bonus.income*100)+"% доход");if(t.bonus.gemTap)bt.push("+"+(t.bonus.gemTap*100).toFixed(2)+"% гем");if(t.bonus.shardTap)bt.push("+"+(t.bonus.shardTap*100).toFixed(1)+"% осколок");var a='<button class="pet-card-btn pet-activate-btn" data-activate="'+p.id+'">⭐ Активировать</button>';a+='<button class="pet-card-btn pet-sell-btn" data-sell="'+p.id+'">💰 Продать ('+t.sellPrice+'🌑)</button>';d.innerHTML='<div class="pet-card-emoji">'+t.emoji+'</div>'+'<div class="pet-card-info">'+'<div class="pet-card-name">'+t.name+'</div>'+'<div class="pet-card-rarity '+t.rarity+'">'+t.rarityLabel+'</div>'+'<div class="pet-card-bonus">'+bt.join(" · ")+'</div>'+'</div>'+'<div class="pet-card-actions">'+a+'</div>';if(p.tempExpiresAt){var r=Math.max(0,Math.floor((p.tempExpiresAt-Date.now())/1000));var m=Math.floor(r/60);var s=r%60;var tt=document.createElement("div");tt.style.cssText="font-size:11px;color:#ff5252;font-weight:bold;margin-top:2px;text-align:center;background:rgba(255,82,82,.15);border-radius:4px;padding:2px 6px;display:inline-block";tt.textContent="⏰ "+m+":"+(s<10?"0":"")+s;var info=d.querySelector(".pet-card-info");if(info)info.appendChild(tt);}l.appendChild(d);});l.querySelectorAll("[data-activate]").forEach(function(b){b.onclick=function(){petActivate(parseInt(b.dataset.activate));};});l.querySelectorAll("[data-sell]").forEach(function(b){b.onclick=function(){petSell(parseInt(b.dataset.sell));};});}
function petRenderInfo(){var l=$("pet-info-list");if(!l)return;l.innerHTML="";for(var id in PET_TYPES){var t=PET_TYPES[id];var bt=[];if(t.bonus.income)bt.push("+"+Math.round(t.bonus.income*100)+"% доход");if(t.bonus.gemTap)bt.push("+"+(t.bonus.gemTap*100).toFixed(2)+"% гем");if(t.bonus.shardTap)bt.push("+"+(t.bonus.shardTap*100).toFixed(1)+"% осколок");var d=document.createElement("div");d.className="pet-info-item";d.innerHTML='<div class="pet-info-emoji">'+t.emoji+'</div>'+'<div class="pet-info-text">'+'<b>'+t.name+'</b> · '+t.rarityLabel+'<br>'+bt.join(" · ")+'<br>Цена продажи: '+t.sellPrice+' 🌑'+'<div class="pet-info-chance">Шанс: '+Math.round(t.chance*100)+'%</div>'+'</div>';l.appendChild(d);}}
function petRenderIndicator(){var i=$("active-pet-indicator");if(!i)return;var p=petGetActive();if(!p){i.classList.add("hidden");return;}i.classList.remove("hidden");var t=PET_TYPES[p.type];var em=$("active-pet-emoji-small");if(em)em.textContent=t.emoji;var f=$("active-pet-hunger-fill-small");if(f){f.style.width=Math.max(0,(petsState.hunger/PET_HUNGER_MAX)*100)+"%";f.classList.remove("warn","danger");if(petsState.hunger<=20)f.classList.add("danger");else if(petsState.hunger<=50)f.classList.add("warn");}}
function petRenderAll(){petRenderTopBar();petRenderNest();petRenderActive();petRenderStorage();petRenderIndicator();}
function petInitUI(){var b=$("buy-egg-btn");if(b)b.onclick=petBuyEgg;var e=$("nest-egg-tap-target");if(e)e.onclick=petHatchTap;var c=$("nest-collect-tap-target");if(c)c.onclick=petCollectTap;document.querySelectorAll(".feed-btn").forEach(function(b){b.onclick=function(){petFeed(b.dataset.food);};});document.querySelectorAll(".food-buy-btn").forEach(function(b){b.onclick=function(){petBuyFood(b.dataset.food);};});var i=$("active-pet-indicator");if(i)i.onclick=function(){if(currentPage!==2)showPage(2);};var a=$("almanac-btn");if(a)a.onclick=function(){playSound("ui");var m=$("modal-almanac");if(m){m.classList.remove("hidden");syncScrollLock();}};var ac=document.querySelector('[data-close="modal-almanac"]');if(ac)ac.onclick=function(){var m=$("modal-almanac");if(m){m.classList.add("hidden");syncScrollLock();}};petRenderInfo();petRenderAll();}
function petLoadFromSave(d){if(!d)return;try{if(typeof d._petsXp==="number")petsState.xp=d._petsXp;if(d._petsFood){petsState.food.strawberry=d._petsFood.strawberry||0;petsState.food.banana=d._petsFood.banana||0;petsState.food.orange=d._petsFood.orange||0;}if(d._petsStorage)petsState.storage=d._petsStorage;if(d._petsActive)petsState.active=d._petsActive;if(typeof d._petsNextId==="number")petsState.nextId=d._petsNextId;if(d._petsNest)petsState.nest=d._petsNest;if(typeof d._petsHunger==="number")petsState.hunger=d._petsHunger;if(typeof d._petsHungerLastTick==="number")petsState.hungerLastTick=d._petsHungerLastTick;if(typeof d._petsXpLastTick==="number")petsState.xpLastTick=d._petsXpLastTick;if(petsState.active&&d.lastTime){var sa=Math.floor((Date.now()-d.lastTime)/1000);if(sa>0){var dr=Math.floor(sa/(5*60));petsState.hunger=Math.max(5,petsState.hunger-dr);if(typeof petsState.active.hunger==="number")petsState.active.hunger=petsState.hunger;}}petsState.hungerLastTick=Date.now();petsState.xpLastTick=Date.now();}catch(e){console.warn("pet load err:",e);}}
function petSaveToSave(d){d._petsXp=petsState.xp;d._petsFood={strawberry:petsState.food.strawberry,banana:petsState.food.banana,orange:petsState.food.orange};d._petsStorage=petsState.storage;d._petsActive=petsState.active;d._petsNextId=petsState.nextId;d._petsNest=petsState.nest;d._petsHunger=petsState.hunger;d._petsHungerLastTick=petsState.hungerLastTick;d._petsXpLastTick=petsState.xpLastTick;}
setInterval(function(){petProcessNest();petTickHunger();petTickXP();if(currentPage===2){petRenderNest();petRenderActive();}petRenderIndicator();},1000);
setTimeout(function(){petInitUI();},3000);

// === ПОДПИСКА ===
var SESSION_COUNT_KEY="clicker-session-count";
function subscribeBannerIncrementSession(){var c=0;try{c=parseInt(localStorage.getItem(SESSION_COUNT_KEY)||"0");if(!isFinite(c)||c<0)c=0;c++;localStorage.setItem(SESSION_COUNT_KEY,c.toString());}catch(e){c=1;}return c;}
function subscribeBannerShouldShow(c){return c>0&&c%10===0;}
function subscribeBannerShow(){var e=document.getElementById("subscribe-banner");if(!e)return;e.classList.remove("hidden");try{lockScroll();}catch(e){}try{playSound("ui");}catch(e){}try{vibrate(15);}catch(e){}}
function subscribeBannerHide(){var e=document.getElementById("subscribe-banner");if(e)e.classList.add("hidden");try{unlockScroll();}catch(e){}}
function subscribeBannerSetup(){var b=document.getElementById("subscribe-banner-close");if(b)b.onclick=subscribeBannerHide;document.addEventListener("keydown",function(e){if(e.key==="Escape"){var el=document.getElementById("subscribe-banner");if(el&&!el.classList.contains("hidden"))subscribeBannerHide();}});}
function subscribeBannerInit(){try{subscribeBannerSetup();var c=subscribeBannerIncrementSession();if(subscribeBannerShouldShow(c)){setTimeout(function(){subscribeBannerShow();},2500);}}catch(e){}}

// === ХУКИ ===
function installV89CpsClanBonus(){if(window.__v89CpsPatched)return;window.__v89CpsPatched=true;var o=window.getCPS;window.getCPS=function(){var b=o();var cb=(typeof clanGetBonus==="function")?clanGetBonus():0;return b*(1+cb);};}
function hookSeasonAccumulators(){setInterval(updateSeasonTick,1000);setInterval(pushSeasonToFirebase,60000);window.addEventListener("beforeunload",pushSeasonToFirebase);}

// === ПЕРЕХВАТ ALERT/CONFIRM/PROMPT ===
(function(){var _oa=window.alert,_oc=window.confirm,_op=window.prompt;function tr(m){if(typeof m!=="string")return m;if(currentLang!=="en")return m;var map=[["Недостаточно монет!","Not enough coins!"],["Недостаточно кристаллов!","Not enough crystals!"],["Недостаточно осколков!","Not enough shards!"],["Недостаточно опыта!","Not enough XP!"],["Нужно:","Need:"],["У вас:","You have:"],["монет!","coins!"],["монет","coins"],["кристаллов!","crystals!"],["кристаллов","crystals"],["осколков!","shards!"],["осколков","shards"],["Этот скин только через промокод!","Promo only!"],["Хранилище заполнено!","Storage is full!"],["Firebase не подключён","Firebase not connected"],["Сначала задай ник!","Set a nickname first"],["❌ Лидерборд не подключён.","❌ Leaderboard not connected."],["❌ Сначала задай ник!","❌ Set a nickname first!"],["✅ Рекорд отправлен!","✅ Score submitted!"],["Ник:","Name:"],["Очки:","Score:"],["⛔ Обнаружен автокликер! −50% монет","⛔ Auto-clicker! −50% coins"],["💎 Лимит 1000! Излишек","💎 Limit 1000! Overflow"],["💎 Лимит 1000!","💎 Limit 1000!"],["😭 Смайлик упал:","😭 Smiley dropped:"],["💰 Получено","💰 Got"],["💰 Вложено","💰 Invested"],["Бустер ×","Booster ×"],["добавлен в хранилище","added to storage"],["Нет бустеров!","No boosters!"],["Активен другой бустер!","Another booster active!"],["Сначала купите вклад!","Buy deposit first!"],["Вклад на максимуме!","Deposit at max!"],["Буст уже активен!","Booster already active!"],["Гнездо занято!","Nest busy!"],["Максимум питомцев!","Max pets!"],["Хранилище заполнено! Продай","Storage full! Sell"],["Нет активного питомца!","No active pet!"],["Нет ","No "],[" в инвентаре!"," in inventory!"],["Это твой лот","Your lot"],["Это не твой лот","Not your lot"],["Лот не найден","Lot not found"],["Лот уже продан","Lot sold"],["Лот истёк","Lot expired"],["Комната не найдена","Room not found"],["Комната не существует","Room missing"],["Комната уже не доступна","Room unavailable"],["Комната уже занята","Room taken"],["Это твоя комната","Your room"],["Код должен быть 4 символа","Code must be 4 chars"],["Рано! Следующая игра через","Too early! Next game in"],["Рано! Следующая битва через","Too early! Next battle in"],["Битва уже идёт!","Battle in progress!"],["Сегодня уже крутил! Завтра.","Already spun today! Tomorrow."],["Сначала бесплатный спин!","Use free spin first!"],["Платный спин использован!","Paid spin used!"],["Бесплатный спин использован!","Free spin used!"],["🎁 Ты уже дарил сегодня этому другу!","🎁 Already gave today!"],["Возвращайся завтра.","Come back tomorrow."],["Нужно минимум 100 монет для подарка!","Need 100+ coins to gift!"],["Удалить из друзей?","Remove from friends?"],["Слишком часто! Подожди","Too often! Wait"],["сек.","sec."],["У тебя уже максимум друзей","Max friends"],["Заявка не найдена","Request not found"],["Это не твой друг","Not your friend"],["Это ты 🙂","That's you 🙂"],["Игрок не найден","Player not found"],["Неверный формат ID","Invalid ID"],["Кикнуть игрока из клана?","Kick player?"],["Выйти из клана?","Leave clan?"],["Распустить клан? Это действие необратимо!","Disband? Cannot be undone!"],["Ты владелец, в клане есть другие. Распустить клан?","Owner, others present. Disband?"],["Только владелец или офицер может редактировать","Only owner/officer can edit"],["Нет доступа","Access denied"],["Название от 3 до 20 символов","Name 3-20 chars"],["Название содержит недопустимые слова","Name has bad words"],["Описание содержит недопустимые слова","Description has bad words"],["Только владелец может менять тип","Only owner can change type"],["✅ Клан обновлён","✅ Clan updated"],["Сообщение содержит запрещённые слова","Message has forbidden words"],["Слишком быстро","Too fast"],["Слишком часто","Too often"],["Очистить историю? У всех участников.","Clear history? For everyone."],["⚠️ Уверены?","⚠️ Sure?"],["⚠️⚠️ Точно?","⚠️⚠️ Really?"],["Нет сохранения.","No save."],["Ошибка экспорта:","Export error:"],["✅ Скопировано!","✅ Copied!"],["Не удалось скопировать.","Copy failed."],["Вставьте код.","Paste code."],["Неверный формат","Invalid format"],["⚠️ Текущий прогресс будет заменён.","⚠️ Progress will be replaced."],["Продолжить?","Continue?"],["✅ Прогресс загружен! Перезагрузка...","✅ Loaded! Reloading..."],["❌ Ошибка:","❌ Error:"],["❌ Неверный пароль","❌ Wrong password"],["✅ Прогресс сброшен! Перезагрузка...","✅ Reset! Reloading..."],["Отправить подарок всем игрокам?","Gift to all?"],["Включить глобальный буст для всех?","Global boost for all?"],["Запустить глобальный ивент для всех?","Global event for all?"],["Нет игроков","No players"],["Синтаксис:","Syntax:"],["Укажи число > 0","Enter number > 0"],["Неизвестный тип:","Unknown type:"],["❌ Неизвестная команда. Напиши help","❌ Unknown cmd. Type help"],["❌ Нет доступа","❌ Access denied"],["🎁 Подарки: +","🎁 Gifts: +"],["монет от","coins from"],["🎁 Подарок от админа:","🎁 Admin gift:"],["Питомец не найден","Pet not found"],["Ты владелец","You are owner"],["Введите код.","Enter code."],["Уже использован.","Already used."],["Неверный код.","Invalid code."],["❌ Сначала задай ник!","❌ Set nickname!"],["❌ Хранилище заполнено!","❌ Storage full!"],["❌ Неверный код","❌ Invalid code"],["🐉 Дракончик на 15 минут!","🐉 Dragon for 15 min!"],["🦅 Феникс!","🦅 Phoenix!"],["⏰ Дракончик исчез!","⏰ Dragon gone!"],["⏸️ Pahan остановлен.","⏸️ Pahan stopped."],["🔥 Pahan запущен на 10 секунд!","🔥 Pahan started for 10s!"],["🔓 Админ-функция разблокирована. Зайди в Настройки → Дополнительные.","🔓 Admin unlocked. Go to Settings → Advanced."],["❌ Ещё рано!","❌ Too early!"],["тапов.","taps."],["Осталось:","Left:"],["🔥 Кликер 67 разблокирован!","🔥 Clicker 67 unlocked!"],["❌ Нужно 67 Qa!","❌ Need 67 Qa!"]];for(var i=0;i<map.length;i++){if(m.indexOf(map[i][0])!==-1){m=m.split(map[i][0]).join(map[i][1]);}}return m;}
window.alert=function(m){return _oa.call(window,tr(m));};
window.confirm=function(m){return _oc.call(window,tr(m));};
window.prompt=function(m,d){return _op.call(window,tr(m),d);};})();

// === АВТО-ЛОКАЛИЗАЦИЯ ДАННЫХ ===
var _originalData=null;
function _snapshotOriginalData(){if(_originalData)return;_originalData={ach:{},up:{},items:{},pets:{},notes:{},quests:{},boosters:{},crystalItems:{},backgrounds:{},skins:{},emojiSkins:{},events:{},banners:{},globalUp:{}};achievements.forEach(function(a){_originalData.ach[a.id]={title:a.title,desc:a.desc};});for(var u in upgrades){_originalData.up[u]={name:upgrades[u].name,desc:upgrades[u].desc};}for(var i in ITEMS){_originalData.items[i]={name:ITEMS[i].name,desc:ITEMS[i].desc};}for(var p in PET_TYPES){_originalData.pets[p]={name:PET_TYPES[p].name};}for(var n in NOTES_DATA){_originalData.notes[n]={title:NOTES_DATA[n].title,text:NOTES_DATA[n].text};}for(var q in QUEST_TYPES){_originalData.quests[q]={name:QUEST_TYPES[q].name};}for(var b in BOOSTERS){_originalData.boosters[b]={name:BOOSTERS[b].name,desc:BOOSTERS[b].desc};}for(var c in CRYSTAL_ITEMS){_originalData.crystalItems[c]={name:CRYSTAL_ITEMS[c].name,desc:CRYSTAL_ITEMS[c].desc};}for(var bg in BACKGROUNDS){_originalData.backgrounds[bg]={name:BACKGROUNDS[bg].name};}for(var s in skins){_originalData.skins[s]={name:skins[s].name};}for(var es in EMOJI_SKINS){_originalData.emojiSkins[es]={name:EMOJI_SKINS[es].name};}for(var ev in EVENTS){_originalData.events[ev]={name:EVENTS[ev].name};}for(var bn in BANNERS){if(typeof BANNERS!=="undefined")_originalData.banners[bn]={name:BANNERS[bn].name,desc:BANNERS[bn].desc};}for(var g in globalUpgrades){_originalData.globalUp[g]={name:globalUpgrades[g].name,desc:globalUpgrades[g].desc};}}
function applyLocalizationToData(){if(typeof t!=="function")return;_snapshotOriginalData();achievements.forEach(function(a){var tk="ach."+a.id+".title",dk="ach."+a.id+".desc";var tv=t(tk),dv=t(dk);a.title=(tv!==tk)?tv:_originalData.ach[a.id].title;a.desc=(dv!==dk)?dv:_originalData.ach[a.id].desc;});for(var u in upgrades){var nk="up."+u,dk="up."+u+".desc";var nv=t(nk),dv=t(dk);upgrades[u].name=(nv!==nk)?nv:_originalData.up[u].name;upgrades[u].desc=(dv!==dk)?dv:_originalData.up[u].desc;}for(var i in ITEMS){var nk2="item."+i,dk2="item."+i+".desc";var nv2=t(nk2),dv2=t(dk2);ITEMS[i].name=(nv2!==nk2)?nv2:_originalData.items[i].name;ITEMS[i].desc=(dv2!==dk2)?dv2:_originalData.items[i].desc;}for(var p in PET_TYPES){var nk3="pets.name_"+p,nv3=t(nk3);PET_TYPES[p].name=(nv3!==nk3)?nv3:_originalData.pets[p].name;var rk="pets.rarity_"+PET_TYPES[p].rarity;var rv=t(rk);if(rv!==rk)PET_TYPES[p].rarityLabel=rv;var dmk="petdeath."+p,dmv=t(dmk);if(dmv!==dmk)PET_TYPES[p].deathMsg=dmv;}for(var n in NOTES_DATA){var tk2="note."+n+".title",pk2="note."+n+".text";var tv2=t(tk2),pv2=t(pk2);NOTES_DATA[n].title=(tv2!==tk2)?tv2:_originalData.notes[n].title;NOTES_DATA[n].text=(pv2!==pk2)?pv2:_originalData.notes[n].text;}for(var q in QUEST_TYPES){var nk4="quest."+q+".name",nv4=t(nk4);QUEST_TYPES[q].name=(nv4!==nk4)?nv4:_originalData.quests[q].name;}for(var b in BOOSTERS){var bnk="booster."+b,bdk="booster."+b+".desc";var bnv=t(bnk),bdv=t(bdk);BOOSTERS[b].name=(bnv!==bnk)?bnv:_originalData.boosters[b].name;BOOSTERS[b].desc=(bdv!==bdk)?bdv:_originalData.boosters[b].desc;}for(var c in CRYSTAL_ITEMS){var cnk="crystal."+c,cdk="crystal."+c+".desc";var cnv=t(cnk),cdv=t(cdk);CRYSTAL_ITEMS[c].name=(cnv!==cnk)?cnv:_originalData.crystalItems[c].name;CRYSTAL_ITEMS[c].desc=(cdv!==cdk)?cdv:_originalData.crystalItems[c].desc;}for(var bg in BACKGROUNDS){var bgnk="bg."+bg,bgnv=t(bgnk);BACKGROUNDS[bg].name=(bgnv!==bgnk)?bgnv:_originalData.backgrounds[bg].name;}for(var s in skins){var snk="skins.name_"+s,snv=t(snk);skins[s].name=(snv!==snk)?snv:_originalData.skins[s].name;}for(var es in EMOJI_SKINS){var esnk="skins.name_"+es,esnv=t(esnk);EMOJI_SKINS[es].name=(esnv!==esnk)?esnv:_originalData.emojiSkins[es].name;}for(var ev in EVENTS){var evnk="event."+ev,evnv=t(evnk);EVENTS[ev].name=(evnv!==evnk)?evnv:_originalData.events[ev].name;}if(typeof BANNERS!=="undefined"){for(var bn in BANNERS){var bnnk="banner."+bn+".name",bndk="banner."+bn+".desc";var bnnv=t(bnnk),bndv=t(bndk);BANNERS[bn].name=(bnnv!==bnnk)?bnnv:_originalData.banners[bn].name;BANNERS[bn].desc=(bndv!==bndk)?bndv:_originalData.banners[bn].desc;}}for(var g in globalUpgrades){var gnk="globalup."+g,gdk="globalup."+g+".desc";var gnv=t(gnk),gdv=t(gdk);if(_originalData.globalUp[g]){globalUpgrades[g].name=(gnv!==gnk)?gnv:_originalData.globalUp[g].name;globalUpgrades[g].desc=(gdv!==gdk)?gdv:_originalData.globalUp[g].desc;}}if(typeof FORTUNES!=="undefined"&&FORTUNES.length){if(!window._originalFortunes)window._originalFortunes=FORTUNES.slice();for(var fi=0;fi<FORTUNES.length;fi++){var fk="fortune."+(fi+1);var fv=t(fk);FORTUNES[fi]=(fv!==fk)?fv:window._originalFortunes[fi];}}if(typeof KHR_QUOTES!=="undefined"){if(!window._originalKhr){window._originalKhr={};for(var _k in KHR_QUOTES)window._originalKhr[_k]=KHR_QUOTES[_k];}for(var _q in KHR_QUOTES){var _ky="khrquote."+_q;var _v=t(_ky);if(_v!==_ky)KHR_QUOTES[_q]=_v;else KHR_QUOTES[_q]=window._originalKhr[_q];}}console.log("[i18n] Data localized → "+currentLang);}
function _rerenderAll(){try{if(typeof renderShop==="function")renderShop();if(typeof renderGlobalShop==="function")renderGlobalShop();if(typeof renderAchievements==="function")renderAchievements();if(typeof renderItems==="function")renderItems();if(typeof renderCrystalShop==="function")renderCrystalShop();if(typeof petRenderAll==="function")petRenderAll();if(typeof renderNoteList==="function")renderNoteList();if(typeof renderQuests==="function")renderQuests();if(typeof renderBackgrounds==="function")renderBackgrounds();if(typeof renderSkins==="function")renderSkins();if(typeof renderEmojiSkins==="function")renderEmojiSkins();if(typeof renderBoosters==="function")renderBoosters();if(typeof updateGeneratorButton==="function")updateGeneratorButton();if(typeof renderDeposit==="function")renderDeposit();if(typeof renderSmileSkins==="function")renderSmileSkins();}catch(e){}}
window.addEventListener("langchange",function(){setTimeout(function(){applyLocalizationToData();_rerenderAll();},80);});

// === ИНТЕРВАЛЫ ===
setInterval(function(){var i=getCPS();coins+=i;totalEarned+=i;if(i>0)addQuestProgress("earn",i);updateUI();checkRewardTab();checkNoteTab();checkPersonalRecord();},1000);
setInterval(function(){totalPlayTime++;checkQuestsUpdate();},1000);
setInterval(updateEvent,1000);
setInterval(updateSuperEvent,1000);
setInterval(updateBloodMoon,1000);
setInterval(updateTheft,1000);
setInterval(updateChestButton,1000);
setInterval(updateDepositHunger,1000);
setInterval(updateCrystalBoostTimer,1000);
setInterval(updateGeneratorTimer,1000);
setInterval(checkDepositTimeTick,5000);
setInterval(function(){if(gulauActive){gulauTimer--;if(gulauTimer<=0)endGulau();else updateGulauTimer();}},1000);
setInterval(function(){if(secretAutoClicker&&secretAutoClickerTimer>0){secretAutoClickerTimer--;if(secretAutoClickerTimer<=0){secretAutoClickerTimer=0;stopSecretAutoClicker();updateSecretUI();saveGame();}else{var m=$("modal-secret");if(m&&!m.classList.contains("hidden"))updateSecretUI();}}},1000);
setInterval(saveGame,5000);
window.addEventListener("beforeunload",function(){saveGame();});
var _lastAchCheck=0;
setInterval(function(){if(Date.now()-_lastAchCheck>5000){_lastAchCheck=Date.now();checkAchievements();}},1000);
var _lastGoldenMinute=-1;
setInterval(function(){var d=new Date();var m=d.getMinutes();if(m%2===0&&m!==_lastGoldenMinute){_lastGoldenMinute=m;spawnGoldenCoin();}},5000);
setInterval(function(){if(goldenTimer>0){goldenTimer--;if(goldenTimer===0){goldenMultiplier=1;var b=$("golden-bonus");if(b)b.remove();}}},1000);
setInterval(function(){if(shards>lastShardsForTracking)totalShardsEarned+=(shards-lastShardsForTracking);lastShardsForTracking=shards;},500);
var _saveIndicatorTimer=null;
setInterval(function(){var _si=document.getElementById("save-indicator");if(!_si)return;_si.classList.add("show");if(_saveIndicatorTimer)clearTimeout(_saveIndicatorTimer);_saveIndicatorTimer=setTimeout(function(){_si.classList.remove("show");},900);},5*60*1000);

// === СТАРТ ===
initFirebase();
initSounds();
loadSettings();
loadAdminState();
if(!hasLangPref()){currentLang=detectBrowserLang();}else{loadLangPref();}
applyLang();
applyLocalizationToData();
setupLangSwitch();
setupLangChoice();
loadSkins();
loadProfile();
ensureProfileId();
loadGame();
restoreTheftIfNeeded();
if(!quests||quests.length===0)generateQuests();else checkQuestsUpdate();
renderShop();
renderGlobalShop();
var _gsl=$("global-shop-list");if(_gsl)_gsl.style.display="none";
applySkin();
applyBackground();
startBgAnimation();
updateEvent();
updateSuperEvent();
updateBloodMoon();
updateUI();
renderAchievements();
updateChestButton();
updateFortuneButton();
checkAchievements();
setupLogoSecret();
setupResetButton();
setupBossSecret();
setupAlarm();
checkRewardTab();
checkNoteTab();
updateDepositSideButton();
updatePahanButton();
updateBoostBanner();
updateGeneratorButton();
renderSmileSkins();
renderEmojiSkins();
renderBackgrounds();
renderNoteList();
startCooldownUI();
startGoldenSecretSchedule();
setupAchFilters();
document.addEventListener("visibilitychange",function(){if(document.hidden)saveGame();});
(function(){var a=$("almanac-btn");if(a)a.classList.add("hidden");})();
if(!hasProfile()){if(!hasLangPref()){setTimeout(function(){showLangChoiceModal();},600);}else{setTimeout(function(){showProfileModal();},800);}}
else{updateLeaderboardName();try{var td=localStorage.getItem(TUTORIAL_DONE_KEY);if(!td){setTimeout(function(){startTutorial();},1200);}}catch(e){setTimeout(function(){startTutorial();},1200);}}
setTimeout(function(){if(typeof socialInit==="function")socialInit();},200);
setTimeout(function(){subscribeBannerInit();},3000);
setTimeout(function(){khrPetInit();},5500);
setTimeout(function(){if(typeof processIncomingGifts==="function")processIncomingGifts();},2500);
(function(){var fr=document.getElementById("activity-row-3");if(fr)fr.style.display="none";var nc=0,nt=null;function h(){nc++;if(nt)clearTimeout(nt);nt=setTimeout(function(){nc=0;},2000);if(nc>=5){nc=0;if(nt)clearTimeout(nt);setTimeout(function(){try{playSound("achievement");vibrate(40);}catch(e){}if(typeof fnfOpen==="function")fnfOpen();},200);}}var p=document.getElementById("page-prev"),n=document.getElementById("page-next");if(p)p.addEventListener("click",h);if(n)n.addEventListener("click",h);})();
if("serviceWorker" in navigator){window.addEventListener("load",function(){navigator.serviceWorker.register("service-worker.js").catch(function(e){});});}

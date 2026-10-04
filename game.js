// ===== КЭШ DOM =====
var $el={};
function $(id){if(!$el[id]||!$el[id].isConnected)$el[id]=document.getElementById(id);return $el[id];}

// === СОСТОЯНИЕ ===
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
var buyMultiplier=1;
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

// === КОЛЕСО ===
var WHEEL_SECTORS=[
{type:"coins",value:0.05,label:"+5% 💰"},{type:"gems",value:15,label:"+15 💎"},
{type:"shards",value:20,label:"+20 🌑"},{type:"coins",value:0.15,label:"+15% 💰"},
{type:"empty",value:0,label:"Пусто ❌"},{type:"gems",value:30,label:"+30 💎"},
{type:"coins",value:0.25,label:"+25% 💰"},{type:"shards",value:50,label:"+50 🌑"},
{type:"negCoins",value:-0.15,label:"−15% 💰"},{type:"gems",value:50,label:"+50 💎"},
{type:"negGems",value:-5,label:"−5 💎"},{type:"negShards",value:-10,label:"−10 🌑"}];
var wheelSpinning=false,wheelFreeUsed=false,wheelPaidUsed=false,wheelLastResetDay="";

// === РУЛЕТКА ===
var DAILY_PRIZES=[
{type:"coins",value:500,label:"💰 500"},{type:"coins",value:5000,label:"💰 5K"},
{type:"gems",value:5,label:"💎 5"},{type:"gems",value:15,label:"💎 15"},
{type:"shards",value:20,label:"🌑 20"},{type:"boost",value:1,label:"⚡ Буст"},
{type:"gems",value:25,label:"💎 25"}];
var dailySpinning=false,dailyLastUsed="";

// === МИНИ-ИГРА ===
var minigameActive=false,minigameTaps=0,minigameTimer=10,minigameTimerInterval=null,minigameBest=0;
var minigameLastUsed=0;
var MINIGAME_COOLDOWN=60*60*1000;
var MINIGAME_DURATION=10;

// === ГЛОБАЛЬНЫЕ УЛУЧШЕНИЯ ===
var globalUpgrades={
superClicker:{id:"superClicker",name:"🌟 Супер кликер",desc:"+1 к базовому клику за уровень",cost:1500,baseCost:1500,count:0,maxLevel:5,effect:"click",amount:1},
bloodLuck:{id:"bloodLuck",name:"🩸 Кровавая удача",desc:"+1% к шансу кровавого осколка в Кровавую луну",cost:10000,baseCost:10000,count:0,maxLevel:5,effect:"bloodShard",amount:0.01},
absoluteBoost:{id:"absoluteBoost",name:"🔱 Воля Абсолюта",desc:"+5% к прибыли от Абсолюта",cost:100000000000000000000,baseCost:100000000000000000000,count:0,maxLevel:5,effect:"absoluteMult",amount:0.05},
genesisBoost:{id:"genesisBoost",name:"💠 Эхо Генезиса",desc:"+3% к прибыли от Генезиса",cost:1000000000000000000000,baseCost:1000000000000000000000,count:0,maxLevel:5,effect:"genesisMult",amount:0.03}};

// === БУСТЕРЫ ===
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

// === ФОНЫ ===
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

// === КВЕСТЫ ===
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

// === СКИНЫ ===
var SKIN_PRICE=5;
var skins={
gold:{name:"Золотистый",bg:"radial-gradient(circle at 30% 30%, #fff59d, #f9a825)",owned:true},
blue:{name:"Синий",bg:"radial-gradient(circle at 30% 30%, #90caf9, #1565c0)",owned:false},
green:{name:"Зелёный",bg:"radial-gradient(circle at 30% 30%, #a5d6a7, #2e7d32)",owned:false},
diamond:{name:"Алмазный",bg:"radial-gradient(circle at 30% 30%, #e1f5fe, #0277bd)",owned:false},
ruby:{name:"Рубиновый",bg:"radial-gradient(circle at 30% 30%, #ff8a80, #b71c1c)",owned:false},
gennadii:{name:"GENNADII",special:true,secret:true,owned:false}};
var activeSkin="gold";

// === ЭМОДЗИ-СКИНЫ ===
var EMOJI_SKINS={
heart:{id:"heart",emoji:"❤️",name:"Сердечко",cost:10,anim:"pulse",owned:false},
fire_heart:{id:"fire_heart",emoji:"❤️‍🔥",name:"Огненное сердце",cost:10,anim:"pulse-shake",owned:false},
shield:{id:"shield",emoji:"🛡",name:"Щит",cost:10,anim:"bounce",owned:false},
candy:{id:"candy",emoji:"🍬",name:"Конфета",cost:10,anim:"wobble",owned:false}};
var activeEmojiSkin=null;

// === ПРЕДМЕТЫ ===
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

// === УЛУЧШЕНИЯ ===
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
}

// === ДОСТИЖЕНИЯ ===
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
{id:"earn_1m",icon:"📈",title:"Первая прибыль",desc:"Заработайте 1M за всё время",tier:"bronze",check:function(){return totalEarned>=1000000;}},
{id:"first_million",icon:"🎯",title:"Первый миллион!",desc:"Особая цель: заработать 1M",tier:"gold",check:function(){return totalEarned>=1000000;}},
{id:"earn_1b",icon:"💼",title:"Оборот",desc:"Заработайте 1B за всё время",tier:"silver",check:function(){return totalEarned>=1000000000;}},
{id:"first_up",icon:"🔧",title:"Улучшатель",desc:"Купите первое улучшение",tier:"bronze",check:function(){return upgrades.clicker.count>=1;}},
{id:"farm_10",icon:"🌾",title:"Фермер",desc:"Купите 10 ферм",tier:"bronze",check:function(){return upgrades.farm.count>=10;}},
{id:"factory_5",icon:"🏭",title:"Промышленник",desc:"Купите 5 фабрик",tier:"silver",check:function(){return upgrades.factory.count>=5;}},
{id:"bank_5",icon:"🏦",title:"Банкир",desc:"Купите 5 банков",tier:"silver",check:function(){return upgrades.bank.count>=5;}},
{id:"space_1",icon:"🚀",title:"Космонавт",desc:"Купите космостанцию",tier:"silver",check:function(){return upgrades.space.count>=1;}},
{id:"quantum_1",icon:"⚛️",title:"Квантовый скачок",desc:"Купите квантовый компьютер",tier:"silver",check:function(){return upgrades.quantum.count>=1;}},
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
{id:"deposit_5",icon:"😕",title:"Смайлик ур. 5",desc:"Поднимите вклад до 5 уровня",check:function(){return depositLevel>=5;}},
{id:"deposit_10",icon:"😂",title:"Смайлик ур. 10",desc:"Поднимите вклад до 10 уровня",check:function(){return depositLevel>=10;}},
{id:"deposit_15",icon:"🤩",title:"Смайлик ур. 15",desc:"Поднимите вклад до 15 уровня",check:function(){return depositLevel>=15;}},
{id:"deposit_20",icon:"🤑",title:"Смайлик ур. 20",desc:"Поднимите вклад до 20 уровня",check:function(){return depositLevel>=20;}},
{id:"deposit_25",icon:"✨",title:"Смайлик ур. 25",desc:"Достигните максимума вклада",check:function(){return depositLevel>=25;}},
{id:"gen_10",icon:"⚡",title:"Генератор ур. 10",desc:"Прокачайте генератор до 10",check:function(){return generatorLevel>=10;}},
{id:"gen_25",icon:"💥",title:"Генератор ур. 25",desc:"Прокачайте генератор до 25",check:function(){return generatorLevel>=25;}},
{id:"gen_50",icon:"🚀",title:"Генератор ур. 50",desc:"Достигните максимума генератора",check:function(){return generatorLevel>=50;}},
{id:"cps_100",icon:"⚡",title:"Электростанция",desc:"100 монет в секунду",tier:"bronze",check:function(){return getCPS()>=100;}},
{id:"cps_10k",icon:"🌩️",title:"Гроза",desc:"10K монет в секунду",tier:"bronze",check:function(){return getCPS()>=10000;}},
{id:"cps_1m",icon:"🌪️",title:"Ураган",desc:"1M монет в секунду",tier:"silver",check:function(){return getCPS()>=1000000;}},
{id:"cps_100m",icon:"🌊",title:"Цунами",desc:"100M монет в секунду",tier:"silver",check:function(){return getCPS()>=100000000;}},
{id:"cps_1b",icon:"🌀",title:"Космический шторм",desc:"1B монет в секунду",tier:"gold",check:function(){return getCPS()>=1000000000;}},
{id:"cps_1t",icon:"💫",title:"Сингулярность",desc:"1T монет в секунду",tier:"gold",check:function(){return getCPS()>=1000000000000;}},
{id:"cps_1qa",icon:"🌌",title:"Бог скорости",desc:"1Qa монет в секунду",tier:"gold",check:function(){return getCPS()>=1000000000000000;}},
{id:"crystals_10",icon:"💎",title:"Первые капли",desc:"Накопите 10 кристаллов",tier:"bronze",check:function(){return crystals>=10;}},
{id:"crystals_50",icon:"💠",title:"Коллекционер",desc:"Накопите 50 кристаллов",tier:"bronze",check:function(){return crystals>=50;}},
{id:"crystals_200",icon:"🔷",title:"Богач",desc:"Накопите 200 кристаллов",tier:"silver",check:function(){return crystals>=200;}},
{id:"crystals_500",icon:"💠",title:"Сокровищница",desc:"Накопите 500 кристаллов",tier:"silver",check:function(){return crystals>=500;}},
{id:"crystals_800",icon:"👑",title:"Алмазный лорд",desc:"Накопите 800 кристаллов",tier:"gold",check:function(){return crystals>=800;}},
{id:"crystals_1000",icon:"🏆",title:"Максимум",desc:"Достигните лимита кристаллов",tier:"gold",check:function(){return crystals>=1000;}},
{id:"shards_25",icon:"🩸",title:"Первая кровь",desc:"Накопите 25 осколков",tier:"bronze",check:function(){return shards>=25;}},
{id:"shards_100",icon:"💀",title:"Кровопийца",desc:"Накопите 100 осколков",tier:"bronze",check:function(){return shards>=100;}},
{id:"shards_500",icon:"🌑",title:"Владыка крови",desc:"Накопите 500 осколков",tier:"silver",check:function(){return shards>=500;}},
{id:"shards_1000",icon:"🩸",title:"Кровавый барон",desc:"Накопите 1 000 осколков",tier:"silver",check:function(){return shards>=1000;}},
{id:"shards_5k",icon:"👹",title:"Кровавый король",desc:"Накопите 5 000 осколков",tier:"gold",check:function(){return shards>=5000;}},
{id:"shards_10k",icon:"😈",title:"Кровавый император",desc:"Накопите 10 000 осколков",tier:"gold",check:function(){return shards>=10000;}},
{id:"shards_50k",icon:"💀",title:"Кровавый бог",desc:"Накопите 50 000 осколков",tier:"gold",check:function(){return shards>=50000;}},
{id:"time_10m",icon:"⏰",title:"10 минут",desc:"Проведите в игре 10 минут",tier:"bronze",check:function(){return totalPlayTime>=600;}},
{id:"time_1h",icon:"⏱️",title:"1 час",desc:"Проведите в игре 1 час",tier:"bronze",check:function(){return totalPlayTime>=3600;}},
{id:"time_6h",icon:"🕐",title:"6 часов",desc:"Проведите в игре 6 часов",tier:"silver",check:function(){return totalPlayTime>=21600;}},
{id:"time_12h",icon:"🕛",title:"12 часов",desc:"Проведите в игре 12 часов",tier:"silver",check:function(){return totalPlayTime>=43200;}},
{id:"time_24h",icon:"📅",title:"Сутки в игре",desc:"Проведите в игре 24 часа",tier:"silver",check:function(){return totalPlayTime>=86400;}},
{id:"time_week",icon:"📆",title:"Неделя в игре",desc:"Проведите в игре 7 дней",tier:"gold",check:function(){return totalPlayTime>=604800;}},
{id:"time_month",icon:"🗓️",title:"Живая легенда",desc:"Проведите в игре 30 дней",tier:"gold",check:function(){return totalPlayTime>=2592000;}},
{id:"leader_top3",icon:"🥉",title:"В топ-3",desc:"Войти в топ-3 лидерборда",tier:"bronze",check:function(){return unlocked.leader_top3===true;}},
{id:"leader_top2",icon:"🥈",title:"Серебро",desc:"Занять 2 место в лидерборде",tier:"silver",check:function(){return unlocked.leader_top2===true;}},
{id:"leader_top1",icon:"🥇",title:"Золото",desc:"Возглавить лидерборд",tier:"gold",check:function(){return unlocked.leader_top1===true;}},
{id:"chest_1",icon:"🎁",title:"Первый сундук",desc:"Откройте сундук",tier:"bronze",check:function(){return chestsOpened>=1;}},
{id:"chest_10",icon:"🗝️",title:"Кладоискатель",desc:"Откройте 10 сундуков",tier:"silver",check:function(){return chestsOpened>=10;}},
{id:"chest_100",icon:"💰",title:"Сундук-мастер",desc:"Откройте 100 сундуков",tier:"gold",check:function(){return chestsOpened>=100;}},
{id:"super_clicker_max",icon:"🌟",title:"Супер кликер",desc:"Прокачайте Супер кликер до максимума",tier:"gold",check:function(){return globalUpgrades.superClicker.count>=5;}},
{id:"wheel_first",icon:"🎡",title:"Первое вращение",desc:"Крутите колесо фортуны",tier:"bronze",check:function(){return unlocked.wheel_first===true;}},
{id:"bg_all",icon:"🖼️",title:"Коллекционер фонов",desc:"Купите все 8 фонов",tier:"gold",check:function(){return unlocked.bg_all===true;}},
{id:"daily_first",icon:"📅",title:"Первый ежедневный спин",desc:"Крутите ежедневную рулетку",tier:"bronze",check:function(){return unlocked.daily_first===true;}},
{id:"minigame_50",icon:"⏱️",title:"Скоростной палец",desc:"50 тапов за 10 секунд в мини-игре",tier:"bronze",check:function(){return minigameBest>=50;}},
{id:"minigame_80",icon:"💨",title:"Турбо-палец",desc:"80 тапов за 10 секунд в мини-игре",tier:"silver",check:function(){return minigameBest>=80;}},
{id:"minigame_120",icon:"🔥",title:"Бог скорости",desc:"120 тапов за 10 секунд в мини-игре",tier:"gold",check:function(){return minigameBest>=120;}},
{id:"pet_first",icon:"🐹",title:"Первый питомец",desc:"Вырасти первого питомца",tier:"bronze",check:function(){return (typeof petTotalCount==="function"&&petTotalCount()>=1);}},
{id:"pet_active",icon:"⭐",title:"Верный друг",desc:"Активируй питомца",tier:"bronze",check:function(){return (typeof petGetActive==="function"&&petGetActive()!==null);}},
{id:"pet_feed_10",icon:"🍓",title:"Заботливый",desc:"Покорми питомца 10 раз",tier:"silver",check:function(){return (unlocked._petFeedCount||0)>=10;}},
{id:"pet_dragon",icon:"🐉",title:"Дракончик",desc:"Получи эпического Дракончика",tier:"gold",check:function(){return unlocked._petHasDragon===true;}},
{id:"golden_secret_10",icon:"✨",title:"Охотник за удачей",desc:"Поймайте 10 секретных золотых тапов",tier:"silver",check:function(){return (unlocked._goldenSecretCount||0)>=10;}},
{id:"golden_secret_50",icon:"🌟",title:"Мастер удачи",desc:"Поймайте 50 секретных золотых тапов",tier:"gold",check:function(){return (unlocked._goldenSecretCount||0)>=50;}}
];

var SAVE_KEY="clicker-save";
var PROFILE_KEY="clicker-profile";
var firebaseConfig={databaseURL:"https://clickerup-80939-default-rtdb.firebaseio.com/"};
var db=null;

// === ЗАПИСКИ ===
var NOTES_DATA={
note4:{icon:"📜",title:"Записка №4",preview:"«Я соглашаюсь с условиями и вступаю в компанию…»",text:"«Я {NICK} соглашаюсь с условиями и вступаю в компанию Krochlupic-Up!»",sign:"— Контракт",unlocked:false},
note1:{icon:"📜",title:"Записка №1",preview:"«Он заставляет меня нажимать эту чёртову кнопку…»",text:"«Он заставляет меня нажимать эту чёртову кнопку. Я устал. Сутки напролёт я сижу здесь и нажимаю её — ради денег. Лишь это поможет…»",sign:"— ???",unlocked:false},
note5:{icon:"📜",title:"Записка №5",preview:"«Дорогой дневник, знаю это глупо…»",text:"«Дорогой дневник, знаю это глупо, но... Хотя, зачем мне делиться своими переживаниями с бумажкой?»",sign:"— ???",unlocked:false},
note2:{icon:"📜",title:"Записка №2",preview:"«Сначала… Как по мне, всё выглядит красиво…»",text:"«Сначала.. Как по мне, всё выглядит красиво, и.. Так правильно, столько существ объединились.. Но мне не даёт покоя один факт, зачем это всё, в чем смысл такого бизнеса?»",sign:"— ???",unlocked:false},
note6:{icon:"📜",title:"Записка №6",preview:"«Он такой милый, никогда не видел рас…»",text:"«Он такой милый, никогда не видел рас, которые были такими очаровательными!»",sign:"— ???",unlocked:false},
note3:{icon:"📜",title:"Записка №3",preview:"«Дорогой дневник, я наконец-то нашёл работу!»",text:"«Дорогой дневник, я наконец-то нашел работу!\nЭта студия самая богатая в этом городе, и.. подозреваю что в этом мире!\nДумаю ничего не случится, ведь если в такой студии работают миллионы людей.. И не людей, то и для меня это место станет настоящим домом»",sign:"— ???",unlocked:false},
note7:{icon:"📜",title:"Записка №7",preview:"«Я слышал крик, у выхода из здания…»",text:"«Я слышал крик, у выхода из здания, вчера.. а сегодня.. он пропал.. его похитили! Это точно!»",sign:"— ???",unlocked:false}};

var FORTUNES=[
"Сегодня удача на твоей стороне. Тапай смелее!","Один тап — и мир изменится. Может, именно этот?",
"Смайлик сегодня доволен тобой. Не подведи его.","Хороший день для покупки улучшений.",
"Если что-то не получается — просто тапай ещё.","Кровавая луна знает о тебе больше, чем ты думаешь.",
"Он смотрит. Он всегда смотрит.","Кристаллы приходят к терпеливым.",
"Сегодня ты найдёшь то, что давно искал.","Не все кликеры одинаково полезны. Некоторые — судьба.",
"Записки — не просто текст. Это предупреждение.","Ты слишком много тапаешь. Но это не точно.",
"Пахан одобряет твой выбор.","Иногда лучший ход — остановиться. Но не сегодня.",
"Сегодня хороший день для рекорда.","Твой смайлик мечтает о 25 уровне.",
"Кровавые осколки любят настойчивых.","Если увидишь золотую монетку — не зевай.",
"Один клик отделяет тебя от величия.","Сегодня можно всё. Даже купить скин.",
"Тайна ближе, чем кажется. Просто копай глубже.","Не забывай про сундук. Он ждёт.",
"Что-то хорошее случится через 67 тапов.","Сегодня звезда по имени Ты восходит.",
"Мир — это кликер. Ты — его игрок.","Слушай музыку. Она знает ритм удачи.",
"Не все секреты нужно искать. Некоторые найдут тебя.","Сегодня никто не догонит тебя в лидерборде.",
"День, когда сбывается загаданное на 228 тапе.","Улыбнись смайлику — и он улыбнётся тебе.",
"Тот, кто читает это, уже победитель.","Два клика — и ты ближе к цели.",
"Жизнь как сундук: откроешь — узнаешь.","Кристаллы — это застывшее время. Береги их.",
"Сегодня лучше, чем вчера. И это факт.","Кто-то наблюдает за твоими успехами. Продолжай.",
"Хорошее предсказание всегда сбывается. Это — хорошее.","Не всё золото, что блестит. Но монетка точно твоя."
];
var FORTUNE_KEY="clicker-last-fortune-day";

var _fmtCache={};
var _fmtCacheCount=0;
function formatNumber(n){
if(!isFinite(n)||isNaN(n))return "0";
n=Math.floor(n);
var cached=_fmtCache[n];
if(cached!==undefined)return cached;
var result;
if(n<1000)result=n.toString();
else if(n<1000000)result=(n/1000).toFixed(1)+"K";
else if(n<1000000000)result=(n/1000000).toFixed(2)+"M";
else if(n<1000000000000)result=(n/1000000000).toFixed(2)+"B";
else if(n<1000000000000000)result=(n/1000000000000).toFixed(2)+"T";
else if(n<1000000000000000000)result=(n/1000000000000000).toFixed(2)+"Qa";
else if(n<1000000000000000000000)result=(n/1000000000000000000).toFixed(2)+"Qi";
else if(n<1000000000000000000000000)result=(n/1000000000000000000000).toFixed(2)+"Sx";
else if(n<1000000000000000000000000000)result=(n/1000000000000000000000000).toFixed(2)+"Sp";
else if(n<1000000000000000000000000000000)result=(n/1000000000000000000000000000).toFixed(2)+"Oc";
else if(n<1000000000000000000000000000000000)result=(n/1000000000000000000000000000000).toFixed(2)+"No";
else if(n<1000000000000000000000000000000000000)result=(n/1000000000000000000000000000000000).toFixed(2)+"Dc";
else result=n.toExponential(2);
_fmtCache[n]=result;
_fmtCacheCount++;
if(_fmtCacheCount>5000){_fmtCache={};_fmtCacheCount=0;}
return result;
}

function vibrate(ms){try{if(navigator.vibrate)navigator.vibrate(ms);}catch(e){}}

function lockScroll(){document.body.classList.add("no-scroll");}
function unlockScroll(){document.body.classList.remove("no-scroll");}
function syncScrollLock(){
var anyOpen=document.querySelector(".modal:not(.hidden), #chest-overlay:not(.hidden), #wheel-overlay:not(.hidden), #daily-overlay:not(.hidden), #minigame-overlay:not(.hidden), #offline-popup:not(.hidden), #alarm-overlay:not(.hidden), #tutorial-overlay:not(.hidden)");
if(anyOpen)lockScroll();else unlockScroll();
}

function initFirebase(){
try{
if(typeof firebase==="undefined"){console.warn("Firebase SDK не загружен");return;}
firebase.initializeApp(firebaseConfig);
db=firebase.database();
console.log("Firebase подключён");
}catch(e){console.warn("Firebase не подключён:",e);}}

function checkTapLimit(){
var now=Date.now();
var newArr=[];
for(var i=0;i<tapTimestamps.length;i++){if(now-tapTimestamps[i]<TAP_WINDOW)newArr.push(tapTimestamps[i]);}
tapTimestamps=newArr;
if(tapTimestamps.length>=TAP_LIMIT){
tapViolations.push(now);
var newViol=[];
for(var j=0;j<tapViolations.length;j++){if(now-tapViolations[j]<VIOLATION_WINDOW)newViol.push(tapViolations[j]);}
tapViolations=newViol;
if(tapViolations.length>=VIOLATION_THRESHOLD){
tapViolations=[];tapTimestamps=[];
var lost=Math.floor(coins*0.5);coins-=lost;
var popup=document.createElement("div");
popup.className="achievement-popup";
popup.style.background="linear-gradient(135deg, #b71c1c, #ff5252)";
popup.style.color="white";
popup.textContent="⛔ Обнаружен автокликер! −50% монет ("+formatNumber(lost)+")";
document.body.appendChild(popup);
setTimeout(function(){popup.remove();},5000);
saveGame();
}
return false;
}
tapTimestamps.push(now);
return true;
}

function addCrystals(amount){
if(!isFinite(amount)||amount<=0)return;
var space=crystalsMax-crystals;
if(space<=0){var conv=amount*1e15;coins+=conv;totalEarned+=conv;showCrystalConvert(amount);return;}
if(amount<=space){crystals+=amount;}
else{var overflow=amount-space;crystals=crystalsMax;var conv2=overflow*1e15;coins+=conv2;totalEarned+=conv2;showCrystalConvert(overflow);}}
function showCrystalConvert(amount){
if(!isFinite(amount)||amount<=0)return;
var popup=document.createElement("div");
popup.className="achievement-popup";
popup.textContent="💎 Лимит 1000! "+amount+" 💎 → "+formatNumber(amount*1e15)+" монет";
document.body.appendChild(popup);
setTimeout(function(){popup.remove();},3500);}

// === СОХРАНЕНИЕ ===
function saveGame(){
if(window.__resetting)return;
var data={coins:coins,coinsPerClick:coinsPerClick,totalEarned:totalEarned,totalShardsEarned:totalShardsEarned,totalTaps:totalTaps,totalPlayTime:totalPlayTime,buyMultiplier:buyMultiplier,crystals:crystals,chestsOpened:chestsOpened,personalBestCoins:personalBestCoins,lastTheftKey:lastTheftKey,unlocked:unlocked,lastTime:Date.now(),shards:shards,eventMultiplier:eventMultiplier,eventTimer:eventTimer,eventName:eventName,currentEventKey:currentEventKey,crystalBoostMultiplier:crystalBoostMultiplier,crystalBoostTimer:crystalBoostTimer,crystalBoostName:crystalBoostName,usedPromos:usedPromos,ownedItems:ownedItems,secretUnlocked:secretUnlocked,secretAutoClicker:secretAutoClicker,secretAutoClickerTimer:secretAutoClickerTimer,depositUnlocked:depositUnlocked,depositLevel:depositLevel,lastDepositTimeKey:lastDepositTimeKey,generatorLevel:generatorLevel,generatorTimer:generatorTimer,smileSkinUnlocked:smileSkinUnlocked,smileSkinActive:smileSkinActive,gulauActive:gulauActive,gulauTimer:gulauTimer,rewardClaimed:rewardClaimed,bossRewardClaimed:bossRewardClaimed,noteShown:noteShown,notesUnlocked:notesUnlocked,note4Shown:note4Shown,note5Shown:note5Shown,note6Shown:note6Shown,note7Shown:note7Shown,pahanUnlocked:pahanUnlocked,quests:quests,questsDate:questsDate,questsClaimed:questsClaimed,questProgress:questProgress,boostersStorage:{},upgrades:{},globalUpgrades:{},wheelState:{freeUsed:wheelFreeUsed,paidUsed:wheelPaidUsed,lastResetDay:wheelLastResetDay},activeBg:activeBg,bgOwned:{},emojiSkinsOwned:{},dailyLastUsed:dailyLastUsed,minigameBest:minigameBest,minigameLastUsed:minigameLastUsed,skinsOwned:{},activeSkin:activeSkin,activeEmojiSkin:activeEmojiSkin};
for(var bid in BOOSTERS){data.boostersStorage[bid]=BOOSTERS[bid].storage;}
for(var id in upgrades){data.upgrades[id]={count:upgrades[id].count,unlocked10:!!upgrades[id].unlocked10,unlocked25:!!upgrades[id].unlocked25};}
for(var gid in globalUpgrades){data.globalUpgrades[gid]={count:globalUpgrades[gid].count};}
for(var bgid in BACKGROUNDS){data.bgOwned[bgid]=BACKGROUNDS[bgid].owned;}
for(var esid in EMOJI_SKINS){data.emojiSkinsOwned[esid]=EMOJI_SKINS[esid].owned;}
for(var sid in skins){data.skinsOwned[sid]=skins[sid].owned;}
if(typeof petSaveToSave==="function")petSaveToSave(data);
localStorage.setItem(SAVE_KEY,JSON.stringify(data));
try{localStorage.setItem("clicker-used-promos",JSON.stringify(usedPromos));}catch(e){}
saveSkins();}

// === ПРОФИЛЬ ===
function saveProfile(){try{localStorage.setItem(PROFILE_KEY,JSON.stringify(profile));}catch(e){}}
function loadProfile(){
try{
var raw=localStorage.getItem(PROFILE_KEY);
if(raw){var data=JSON.parse(raw);profile.nickname=data.nickname||"";profile.id=data.id||"";profile.createdAt=data.createdAt||0;}
}catch(e){}}
function hasProfile(){return profile.nickname&&profile.nickname.length>=2;}
function generateProfileId(){
var ts=Date.now();var chars="abcdefghijklmnopqrstuvwxyz0123456789";var rand="";
for(var i=0;i<4;i++){rand+=chars[Math.floor(Math.random()*chars.length)];}
return "u_"+ts+"_"+rand;
}
function ensureProfileId(){if(!profile.id&&hasProfile()){profile.id=generateProfileId();saveProfile();}}
function showProfileModal(){
var modal=$("modal-profile");if(!modal)return;
modal.classList.remove("hidden");syncScrollLock();
var input=$("profile-name-input");
if(input){input.value=profile.nickname||"";if(hasProfile()){input.setAttribute("readonly","readonly");}else{input.removeAttribute("readonly");}}
setTimeout(function(){if(input&&!hasProfile())input.focus();},300);
}
function setupProfileSave(){
var btn=$("profile-save-btn"),input=$("profile-name-input"),err=$("profile-error");
if(!btn||!input)return;
btn.onclick=function(){
if(hasProfile()){$("modal-profile").classList.add("hidden");syncScrollLock();return;}
var name=input.value.trim();
if(!name||name.length<2){if(err)err.textContent="Ник должен быть хотя бы 2 символа";return;}
if(name.length>15){if(err)err.textContent="Ник не длиннее 15 символов";return;}
if(!/^[a-zA-Zа-яА-Я0-9_ ]+$/.test(name)){if(err)err.textContent="Только буквы, цифры, пробел и _";return;}
profile.nickname=name;profile.id=generateProfileId();profile.createdAt=Date.now();
saveProfile();
if(err)err.textContent="";
$("modal-profile").classList.add("hidden");syncScrollLock();
updateLeaderboardName();
setTimeout(function(){startTutorial();},500);
saveGame();
};
}
function setupProfileCopy(){
var btn=$("profile-copy-btn"),input=$("profile-name-input");
if(!btn||!input)return;
btn.onclick=function(){
var name=input.value.trim();
if(!name){alert("Ник пустой");return;}
try{
if(navigator.clipboard&&navigator.clipboard.writeText){
navigator.clipboard.writeText(name).then(function(){var old=btn.textContent;btn.textContent="✅";setTimeout(function(){btn.textContent=old;},1000);}).catch(function(){input.select();document.execCommand("copy");var old=btn.textContent;btn.textContent="✅";setTimeout(function(){btn.textContent=old;},1000);});
}else{input.select();document.execCommand("copy");var old=btn.textContent;btn.textContent="✅";setTimeout(function(){btn.textContent=old;},1000);}
}catch(e){}
};
}
function updateLeaderboardName(){var input=$("leader-name");if(input){input.value=profile.nickname||"";}}

// === ОБУЧЕНИЕ ===
function startTutorial(){
if(tutorialActive)return;
tutorialActive=true;tutorialStep=0;
var overlay=$("tutorial-overlay");if(!overlay)return;
overlay.classList.remove("hidden");syncScrollLock();
renderTutorialStep();
}
function renderTutorialStep(){
var textEl=$("tutorial-text"),nextBtn=$("tutorial-next");if(!textEl||!nextBtn)return;
textEl.textContent=TUTORIAL_STEPS[tutorialStep];
nextBtn.textContent=(tutorialStep===TUTORIAL_STEPS.length-1)?"Завершить ✓":"Далее ▶";
}
function nextTutorialStep(){tutorialStep++;if(tutorialStep>=TUTORIAL_STEPS.length){endTutorial();return;}renderTutorialStep();}
function endTutorial(){
tutorialActive=false;tutorialStep=0;
var overlay=$("tutorial-overlay");if(overlay)overlay.classList.add("hidden");
syncScrollLock();
try{localStorage.setItem(TUTORIAL_DONE_KEY,"1");}catch(e){}
}
function setupTutorial(){
var nextBtn=$("tutorial-next"),skipBtn=$("tutorial-skip");
if(nextBtn)nextBtn.onclick=nextTutorialStep;
if(skipBtn)skipBtn.onclick=endTutorial;
}

// === ЗАПИСКИ ===
function unlockNote(id){
if(notesUnlocked[id])return;
notesUnlocked[id]=true;
if(NOTES_DATA[id])NOTES_DATA[id].unlocked=true;
var tab=$("tab-note");if(tab)tab.classList.remove("hidden");
renderNoteList();saveGame();
}
function renderNoteList(){
var list=$("note-list");if(!list)return;
list.innerHTML="";
var anyUnlocked=false;
for(var id in NOTES_DATA){
var n=NOTES_DATA[id];
if(!notesUnlocked[id])continue;
anyUnlocked=true;
var div=document.createElement("div");
div.className="note-list-item";
div.innerHTML='<div class="note-list-icon">'+n.icon+'</div>'+'<div class="note-list-info">'+'<div class="note-list-title">'+n.title+'</div>'+'<div class="note-list-preview">'+n.preview+'</div>'+'</div>';
div.onclick=function(noteId){return function(){showNoteDetail(noteId);};}(id);
list.appendChild(div);
}
if(!anyUnlocked){list.innerHTML='<p style="text-align:center;color:#d4c5a0;font-size:13px;">Пока нет записок. Их можно найти в игре…</p>';}}
function showNoteDetail(id){
var n=NOTES_DATA[id];if(!n)return;
$("note-list-view").style.display="none";
$("note-detail-view").style.display="block";
var text=n.text;
if(id==="note4"){
var nick=(profile.nickname&&profile.nickname.length>0)?profile.nickname:"Аноним";
text=text.replace("{NICK}",nick);
}
$("note-detail-text").textContent=text;
$("note-detail-sign").textContent=n.sign;
}
function setupNoteBack(){
var btn=$("note-back");
if(btn)btn.onclick=function(){
$("note-list-view").style.display="block";
$("note-detail-view").style.display="none";
};
}
function showNotePopup(text){
var popup=document.createElement("div");
popup.className="achievement-popup";
popup.textContent=text;
popup.style.background="linear-gradient(135deg, #d4c5a0, #8b7355)";
popup.style.color="#1a1a2e";
document.body.appendChild(popup);
setTimeout(function(){popup.remove();},5000);
}
function checkNotesUnlock(){
if(!note4Shown&&coins>=1000000){
note4Shown=true;unlockNote("note4");
showNotePopup("📜 Первая записка появилась...");
playSound("achievement");saveGame();
}
if(!note5Shown&&coins>=1000000000000){
note5Shown=true;unlockNote("note5");
showNotePopup("📜 Ещё одна записка...");
playSound("achievement");saveGame();
}
if(!note6Shown&&depositLevel>=25){
note6Shown=true;unlockNote("note6");
showNotePopup("📜 Странная записка о смайлике...");
playSound("achievement");saveGame();
}
if(!note7Shown&&totalEarned>=1e32){
note7Shown=true;unlockNote("note7");
showNotePopup("📜 Тревожная записка...");
playSound("achievement");saveGame();
}
if(!note1Shown&&coins>=1000000000000000000){
note1Shown=true;unlockNote("note1");noteShown=true;
showNotePopup("📜 Странная записка появилась в игре...");
playSound("achievement");saveGame();
}
// ФИКС: note2 — 1 Sp (1e24)
if(!note2Shown&&coins>=1000000000000000000000000){
note2Shown=true;unlockNote("note2");
showNotePopup("📜 Ещё одна записка появилась в игре...");
playSound("achievement");saveGame();
}
if(!note3Shown&&coins>=2e31){
note3Shown=true;unlockNote("note3");
showNotePopup("📜 Третья записка появилась в игре...");
playSound("achievement");saveGame();
}}
function checkNoteTab(){
var tab=$("tab-note");if(!tab)return;
var anyNote=false;
for(var k in notesUnlocked){if(notesUnlocked[k]){anyNote=true;break;}}
if(anyNote){tab.classList.remove("hidden");}
else{tab.classList.add("hidden");}}
// === ЗАГРУЗКА ===
function loadGame(){
var raw=localStorage.getItem(SAVE_KEY);
if(!raw)return;
try{
var data=JSON.parse(raw);
coins=data.coins||0;coinsPerClick=data.coinsPerClick||1;totalEarned=data.totalEarned||0;
totalShardsEarned=data.totalShardsEarned||0;
totalTaps=data.totalTaps||0;totalPlayTime=data.totalPlayTime||0;
buyMultiplier=data.buyMultiplier||1;
lastDisplayedCoins=coins;
chestsOpened=data.chestsOpened||0;
personalBestCoins=data.personalBestCoins||coins;
lastTheftKey=data.lastTheftKey||"";
dailyLastUsed=data.dailyLastUsed||"";
minigameBest=data.minigameBest||0;
minigameLastUsed=data.minigameLastUsed||0;
var loadedCrystals=data.crystals||0;
if(loadedCrystals>crystalsMax){
var overflow=loadedCrystals-crystalsMax;var conv=overflow*1e15;coins+=conv;totalEarned+=conv;crystals=crystalsMax;
setTimeout(function(){var popup=document.createElement("div");popup.className="achievement-popup";popup.textContent="💎 Лимит 1000! Излишек "+overflow+" 💎 → "+formatNumber(conv)+" монет";document.body.appendChild(popup);setTimeout(function(){popup.remove();},5000);},2000);
}else{crystals=loadedCrystals;}
if(data.unlocked){for(var u in data.unlocked)unlocked[u]=data.unlocked[u];}
if(data.upgrades){for(var id2 in data.upgrades){if(upgrades[id2]){upgrades[id2].count=data.upgrades[id2].count;upgrades[id2].unlocked10=!!data.upgrades[id2].unlocked10;upgrades[id2].unlocked25=!!data.upgrades[id2].unlocked25;}}}
for(var rid in upgrades){
var ru=upgrades[rid];
if(ru.count>=UPGRADE_MAX_LEVEL){ru.count=UPGRADE_MAX_LEVEL;ru.cost=Infinity;}
else{ru.cost=Math.floor(ru.baseCost*Math.pow(UPGRADE_COST_MULT,ru.count));}
}
if(data.globalUpgrades){for(var gid in data.globalUpgrades){if(globalUpgrades[gid]){globalUpgrades[gid].count=data.globalUpgrades[gid].count||0;}}}
for(var ggid in globalUpgrades){var gu=globalUpgrades[ggid];gu.cost=Math.floor(gu.baseCost*Math.pow(GLOBAL_UPGRADE_COST_MULT,gu.count));}
if(data.boostersStorage){for(var bid in data.boostersStorage){if(BOOSTERS[bid])BOOSTERS[bid].storage=data.boostersStorage[bid]||0;}}
if(data.bgOwned){for(var bgid in data.bgOwned){if(BACKGROUNDS[bgid])BACKGROUNDS[bgid].owned=!!data.bgOwned[bgid];}}
if(data.activeBg&&BACKGROUNDS[data.activeBg])activeBg=data.activeBg;
if(data.emojiSkinsOwned){for(var esid in data.emojiSkinsOwned){if(EMOJI_SKINS[esid])EMOJI_SKINS[esid].owned=!!data.emojiSkinsOwned[esid];}}
if(data.skinsOwned){for(var sid in data.skinsOwned){if(skins[sid])skins[sid].owned=!!data.skinsOwned[sid];}}
if(data.activeSkin&&skins[data.activeSkin])activeSkin=data.activeSkin;
if(data.activeEmojiSkin&&EMOJI_SKINS[data.activeEmojiSkin])activeEmojiSkin=data.activeEmojiSkin;
else if(data.activeEmojiSkin===null)activeEmojiSkin=null;
if(data.wheelState){wheelFreeUsed=data.wheelState.freeUsed||false;wheelPaidUsed=data.wheelState.paidUsed||false;wheelLastResetDay=data.wheelState.lastResetDay||"";}
if(data.lastTime){
var secondsAway=Math.floor((Date.now()-data.lastTime)/1000);
var capped=Math.min(secondsAway,8*3600);
var earned=Math.floor(getCPS()*capped);
if(earned>0){
coins+=earned;totalEarned+=earned;
$("offline-amount").textContent=formatNumber(earned);
var missedParts=[];
var lastChest=parseInt(localStorage.getItem("lastChest")||"0");
var chestCdLeft=3600000-(Date.now()-lastChest);
if(lastChest>0&&chestCdLeft<=0&&secondsAway>=3600){missedParts.push("🎁 Сундук был готов");}
var totalBoosters=0;for(var bb in BOOSTERS){totalBoosters+=(BOOSTERS[bb].storage||0);}
if(totalBoosters>0){missedParts.push("📦 Бустеров в хранилище: <b>"+totalBoosters+"</b>");}
if(data.depositUnlocked&&data.depositLevel>=1&&data.depositLevel<=5&&secondsAway>=600){missedParts.push("😭 Смайлик был голоден");}
var todayKey=new Date().toDateString();
var lastDay=localStorage.getItem("lastOfflineDay")||"";
if(lastDay&&lastDay!==todayKey&&secondsAway>=3600){missedParts.push("📜 Задания обновились");}
localStorage.setItem("lastOfflineDay",todayKey);
var missedEl=$("offline-missed");
if(missedEl){if(missedParts.length>0){missedEl.innerHTML=missedParts.join("<br>");missedEl.classList.remove("hidden");}else{missedEl.classList.add("hidden");}}
$("offline-popup").classList.remove("hidden");syncScrollLock();
playSound("achievement");
$("offline-close").onclick=function(){$("offline-popup").classList.add("hidden");syncScrollLock();saveGame();};
}
if(data.depositUnlocked&&data.depositLevel>=1&&data.depositLevel<=5){var hungerPenalty=Math.floor(DEPOSIT_HUNGRY_RATE*capped);if(hungerPenalty>0)coins=Math.max(0,coins-hungerPenalty);}}
shards=data.shards||0;
lastShardsForTracking=shards;
eventMultiplier=1;eventTimer=0;eventName="";currentEventKey="";
crystalBoostMultiplier=data.crystalBoostMultiplier||1;crystalBoostTimer=data.crystalBoostTimer||0;crystalBoostName=data.crystalBoostName||"";
try{var globalPromos=localStorage.getItem("clicker-used-promos");if(globalPromos)usedPromos=JSON.parse(globalPromos);else if(data.usedPromos)usedPromos=data.usedPromos;}catch(e){if(data.usedPromos)usedPromos=data.usedPromos;}
if(data.ownedItems){ownedItems=data.ownedItems;for(var oid in ownedItems){if(ownedItems[oid]===true)ownedItems[oid]=1;if(ownedItems[oid]===false)delete ownedItems[oid];}}
secretUnlocked=data.secretUnlocked||false;secretAutoClicker=data.secretAutoClicker||false;secretAutoClickerTimer=data.secretAutoClickerTimer||0;
depositUnlocked=data.depositUnlocked||false;depositLevel=data.depositLevel||0;
lastDepositTimeKey=data.lastDepositTimeKey||"";
generatorLevel=data.generatorLevel||1;
if(generatorLevel<1)generatorLevel=1;
if(generatorLevel>GENERATOR_MAX_LEVEL)generatorLevel=GENERATOR_MAX_LEVEL;
generatorTimer=GENERATOR_DURATION;
smileSkinUnlocked=data.smileSkinUnlocked||false;
smileSkinActive=data.smileSkinActive||false;
if(!smileSkinUnlocked)smileSkinActive=false;
gulauActive=data.gulauActive||false;gulauTimer=data.gulauTimer||0;
rewardClaimed=data.rewardClaimed||false;bossRewardClaimed=data.bossRewardClaimed||false;noteShown=data.noteShown||false;pahanUnlocked=data.pahanUnlocked||false;
if(data.notesUnlocked){for(var nid in data.notesUnlocked){if(data.notesUnlocked[nid]){notesUnlocked[nid]=true;if(NOTES_DATA[nid])NOTES_DATA[nid].unlocked=true;}}}
if(notesUnlocked["note1"])note1Shown=true;
if(notesUnlocked["note2"])note2Shown=true;
if(notesUnlocked["note3"])note3Shown=true;
if(notesUnlocked["note4"])note4Shown=true;
if(notesUnlocked["note5"])note5Shown=true;
if(notesUnlocked["note6"])note6Shown=true;
if(notesUnlocked["note7"])note7Shown=true;
quests=data.quests||[];questsDate=data.questsDate||"";questsClaimed=data.questsClaimed||0;questProgress=data.questProgress||{};
if(gulauActive&&gulauTimer>0){$("gulau-info").style.display="block";updateGulauTimer();}
if(secretUnlocked&&secretAutoClicker&&secretAutoClickerTimer>0){setTimeout(function(){startSecretAutoClicker();},500);}
if(crystalBoostTimer>0&&crystalBoostMultiplier>1){document.body.classList.add("boost-active");}
if(typeof petLoadFromSave==="function")petLoadFromSave(data);
setTimeout(checkDailyBonus,3000);
checkRewardTab();checkNoteTab();updateDepositSideButton();updatePahanButton();updateBoostBanner();
applyOfflineDepositDrop();
updateEvent();
updateSuperEvent();
updateBloodMoon();
updateTheft();
lastDisplayedCoins=coins;
}catch(e){console.warn("Ошибка загрузки:",e);}}

// === ВРЕМЯ ВКЛАДА ===
function getTimeKey(){
var d=new Date();
var y=d.getFullYear();var m=("0"+(d.getMonth()+1)).slice(-2);var day=("0"+d.getDate()).slice(-2);
var h=("0"+d.getHours()).slice(-2);
var half=Math.floor(d.getMinutes()/30)*30;
var hh=("0"+half).slice(-2);
return y+"-"+m+"-"+day+"-"+h+"-"+hh;
}
function getTimeKeyValue(key){
var parts=key.split("-");
return new Date(parseInt(parts[0]),parseInt(parts[1])-1,parseInt(parts[2]),parseInt(parts[3]),parseInt(parts[4])).getTime();
}
function applyOfflineDepositDrop(){
if(!depositUnlocked||depositLevel<1)return;
var nowKey=getTimeKey();
if(!lastDepositTimeKey){lastDepositTimeKey=nowKey;saveGame();return;}
if(lastDepositTimeKey===nowKey)return;
var lastMs=getTimeKeyValue(lastDepositTimeKey);
var nowMs=getTimeKeyValue(nowKey);
var HALF=30*60*1000;
var ticks=Math.floor((nowMs-lastMs)/HALF);
if(ticks<=0){lastDepositTimeKey=nowKey;saveGame();return;}
if(ticks>500)ticks=500;
var totalDrop=0;
for(var i=0;i<ticks;i++){var drop=Math.random()<0.5?1:3;totalDrop+=drop;}
var before=depositLevel;
depositLevel=Math.max(1,depositLevel-totalDrop);
if(depositLevel!==before){setTimeout(function(){var popup=document.createElement("div");popup.className="achievement-popup";popup.textContent="😭 Смайлик упал: "+before+" → "+depositLevel;document.body.appendChild(popup);setTimeout(function(){popup.remove();},4000);},1500);}
lastDepositTimeKey=nowKey;
saveGame();
}
function checkDepositTimeTick(){
if(!depositUnlocked)return;
var nowKey=getTimeKey();
if(!lastDepositTimeKey){lastDepositTimeKey=nowKey;return;}
if(lastDepositTimeKey===nowKey)return;
var lastMs=getTimeKeyValue(lastDepositTimeKey);
var nowMs=getTimeKeyValue(nowKey);
var HALF=30*60*1000;
var ticks=Math.floor((nowMs-lastMs)/HALF);
if(ticks<=0){lastDepositTimeKey=nowKey;return;}
var totalDrop=0;
for(var i=0;i<ticks;i++){var drop=Math.random()<0.5?1:3;totalDrop+=drop;}
var before=depositLevel;
depositLevel=Math.max(1,depositLevel-totalDrop);
lastDepositTimeKey=nowKey;
if(depositLevel!==before){
updateDepositSideButton();
var modal=$("modal-deposit");if(modal&&!modal.classList.contains("hidden"))renderDeposit();
var popup=document.createElement("div");popup.className="achievement-popup";popup.textContent="😭 Смайлик упал: "+before+" → "+depositLevel;
document.body.appendChild(popup);setTimeout(function(){popup.remove();},4000);
saveGame();
}}

// === НАСТРОЙКИ ===
function loadSettings(){
var raw=localStorage.getItem("clicker-settings");
if(raw){try{var data=JSON.parse(raw);settings.showFloat=data.showFloat!==false;settings.showGolden=data.showGolden!==false;settings.showDaily=data.showDaily!==false;settings.sound=data.sound!==false;settings.music=data.music===true;settings.lowParticles=data.lowParticles===true;settings.krohlupic=data.krohlupic!==false;}catch(e){}}
var el1=$("opt-float"),el2=$("opt-golden"),el3=$("opt-daily"),el4=$("opt-sound"),el5=$("opt-music"),el6=$("opt-lowparticles"),el7=$("opt-krohlupic");
if(el1)el1.checked=settings.showFloat;if(el2)el2.checked=settings.showGolden;if(el3)el3.checked=settings.showDaily;if(el4)el4.checked=settings.sound;if(el5)el5.checked=settings.music;if(el6)el6.checked=settings.lowParticles;if(el7)el7.checked=settings.krohlupic;
document.body.classList.toggle("low-particles",settings.lowParticles);}
function saveSettings(){localStorage.setItem("clicker-settings",JSON.stringify(settings));}

// === ЗВУКИ ===
var sounds={},bgMusic=null,bgMusic2=null,currentMusicIndex=0;
function initSounds(){
var names=["click","ui","achievement","chest","boss","eat"];
names.forEach(function(n){try{sounds[n]=new Audio("sounds/"+n+".mp3");sounds[n].volume=0.4;}catch(e){}});
try{bgMusic=new Audio("sounds/music.mp3");bgMusic.loop=false;bgMusic.volume=0.25;bgMusic.addEventListener("ended",function(){playNextMusic();});}catch(e){}
try{bgMusic2=new Audio("sounds/music2.mp3");bgMusic2.loop=false;bgMusic2.volume=0.25;bgMusic2.addEventListener("ended",function(){playNextMusic();});}catch(e){}
try{alarmSound=new Audio("sounds/alarm.mp3");alarmSound.loop=true;alarmSound.volume=0.5;}catch(e){}}
function playSound(name){
if(!settings.sound)return;
var snd=sounds[name];if(!snd)return;
var now=Date.now();
if(!snd._lastPlay)snd._lastPlay=0;
if(now-snd._lastPlay<80)return;
snd._lastPlay=now;
try{snd.currentTime=0;snd.play();}catch(e){}
}
function playMusic(){if(!settings.music)return;var track=(currentMusicIndex===0)?bgMusic:bgMusic2;if(!track)return;try{track.currentTime=0;track.play().catch(function(){});}catch(e){}}
function playNextMusic(){if(!settings.music)return;var other=(currentMusicIndex===0)?bgMusic2:bgMusic;if(other){try{other.pause();other.currentTime=0;}catch(e){}}currentMusicIndex=1-currentMusicIndex;var track=(currentMusicIndex===0)?bgMusic:bgMusic2;if(!track)return;try{track.currentTime=0;track.play().catch(function(){});}catch(e){}}
function stopMusic(){try{if(bgMusic)bgMusic.pause();}catch(e){}try{if(bgMusic2)bgMusic2.pause();}catch(e){}}
function unlockAudio(){
for(var n in sounds){try{var p=sounds[n].play();if(p&&p.then){p.then(function(){sounds[n].pause();sounds[n].currentTime=0;}).catch(function(){});}}catch(e){}}
if(settings.music)playMusic();
document.removeEventListener("touchstart",unlockAudio);document.removeEventListener("click",unlockAudio);}
document.addEventListener("touchstart",unlockAudio,{once:true,passive:true});
document.addEventListener("click",unlockAudio,{once:true});
function handleVisibilityChange(){if(document.hidden)stopMusic();else{if(settings.music)playMusic();}}
document.addEventListener("visibilitychange",handleVisibilityChange);
window.addEventListener("pagehide",stopMusic);
window.addEventListener("blur",stopMusic);
window.addEventListener("beforeunload",stopMusic);

// === ФОНЫ ===
function applyBackground(){
document.body.classList.remove("bg-space","bg-flame","bg-ocean","bg-sakura","bg-ice","bg-bloodmoon","bg-volcano","bg-nebula","has-bg");
if(activeBg==="base"){bgParticles=[];return;}
var bg=BACKGROUNDS[activeBg];if(!bg)return;
document.body.classList.add("has-bg",bg.cls);
bgParticles=[];
var pt=bg.particles;
var baseCount=pt==="stars"?60:pt==="snow"?40:pt==="petals"?30:pt==="bubbles"?25:pt==="sparks"?35:pt==="lava"?30:pt==="nebula"?15:20;
var count=settings.lowParticles?Math.floor(baseCount*0.4):baseCount;
for(var i=0;i<count;i++){bgParticles.push({x:Math.random()*100,y:Math.random()*100,size:pt==="stars"?Math.random()*1.8+0.6:Math.random()*3+1.5,speed:pt==="sparks"?0.4+Math.random()*0.4:0.15+Math.random()*0.35,drift:Math.random()*0.3-0.15,rot:Math.random()*Math.PI*2,rotSpeed:Math.random()*0.04-0.02,alpha:0.4+Math.random()*0.6});}}
function renderBgParticles(){
if(!bgCanvas||!bgCtx)return;
bgFrameCounter++;
if(bgFrameCounter%2!==0){bgAnimFrame=requestAnimationFrame(renderBgParticles);return;}
var W=bgCanvas.width,H=bgCanvas.height;
bgCtx.clearRect(0,0,W,H);
if(activeBg==="base"){bgAnimFrame=requestAnimationFrame(renderBgParticles);return;}
var pt=BACKGROUNDS[activeBg].particles;
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
var px=(p.x/100)*W,py=(p.y/100)*H,sz=p.size;
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
bgAnimFrame=requestAnimationFrame(renderBgParticles);
}
function resizeBgCanvas(){if(!bgCanvas)return;bgCanvas.width=window.innerWidth;bgCanvas.height=window.innerHeight;}
function startBgAnimation(){
if(!bgCanvas){bgCanvas=$("bg-canvas");if(bgCanvas)bgCtx=bgCanvas.getContext("2d");}
resizeBgCanvas();
if(bgAnimFrame)cancelAnimationFrame(bgAnimFrame);
bgFrameCounter=0;
renderBgParticles();
}
function renderBackgrounds(){
var list=$("bg-list");if(!list)return;
list.innerHTML="";
for(var id in BACKGROUNDS){
var bg=BACKGROUNDS[id];
var div=document.createElement("div");
var classes="skin-item";
if(activeBg===id)classes+=" active";
if(!bg.owned)classes+=" locked";
div.className=classes;div.dataset.bgid=id;
var priceText="";
if(activeBg===id)priceText='<div class="skin-price">✓ Активен</div>';
else if(bg.owned)priceText='<div class="skin-price">Нажмите</div>';
else priceText='<div class="skin-price">'+bg.cost+' 💎</div>';
div.innerHTML='<div class="bg-preview '+id+'"></div>'+'<div class="skin-name">'+bg.name+'</div>'+priceText;
list.appendChild(div);}
document.querySelectorAll("[data-bgid]").forEach(function(el){el.onclick=function(){
var id=el.dataset.bgid;var bg=BACKGROUNDS[id];
if(bg.owned){if(activeBg===id&&id!=="base"){activeBg="base";}else{activeBg=id;}playSound("ui");applyBackground();startBgAnimation();renderBackgrounds();saveGame();return;}
if(crystals<bg.cost){alert("Недостаточно кристаллов!\nНужно: "+bg.cost+" 💎\nУ вас: "+crystals+" 💎");return;}
crystals-=bg.cost;bg.owned=true;activeBg=id;
playSound("ui");vibrate(10);applyBackground();startBgAnimation();renderBackgrounds();updateUI();
var allOwned=true;var count=0;
for(var bid in BACKGROUNDS){if(bid==="base")continue;if(BACKGROUNDS[bid].owned)count++;else allOwned=false;}
if(allOwned&&count===8&&!unlocked.bg_all){unlocked.bg_all=true;checkAchievements();}
saveGame();};});}

// === СКИНЫ ===
function loadSkins(){
var raw=localStorage.getItem("clicker-skins");
if(raw){try{var data=JSON.parse(raw);
if(data.owned){for(var id in data.owned){if(skins[id])skins[id].owned=data.owned[id];}}
if(data.active&&skins[data.active])activeSkin=data.active;
if(data.emojiOwned){for(var eid in data.emojiOwned){if(EMOJI_SKINS[eid])EMOJI_SKINS[eid].owned=data.emojiOwned[eid];}}
if(data.activeEmoji&&EMOJI_SKINS[data.activeEmoji])activeEmojiSkin=data.activeEmoji;
if(data.activeEmoji===null)activeEmojiSkin=null;
}catch(e){}}}
function saveSkins(){
var ownedData={};for(var id in skins){ownedData[id]=skins[id].owned;}
var emojiOwned={};for(var eid in EMOJI_SKINS){emojiOwned[eid]=EMOJI_SKINS[eid].owned;}
try{localStorage.setItem("clicker-skins",JSON.stringify({owned:ownedData,active:activeSkin,emojiOwned:emojiOwned,activeEmoji:activeEmojiSkin}));}catch(e){}
}
function applySkin(){
var btn=$("click-btn");if(!btn)return;
btn.classList.remove("skin-gennadii");
btn.classList.remove("has-emoji","skin-heart","skin-fire_heart","skin-shield","skin-candy");
var emojiEl=btn.querySelector(".emoji-skin-display");
if(emojiEl)emojiEl.remove();
if(activeEmojiSkin&&EMOJI_SKINS[activeEmojiSkin]&&EMOJI_SKINS[activeEmojiSkin].owned){
var es=EMOJI_SKINS[activeEmojiSkin];
btn.classList.add("has-emoji","skin-"+es.id);
btn.style.background="";btn.style.boxShadow="";
var span=document.createElement("span");span.className="emoji-skin-display";span.textContent=es.emoji;
btn.appendChild(span);
return;}
var skin=skins[activeSkin];
if(activeSkin==="gennadii"&&skin.owned){btn.classList.add("skin-gennadii");btn.style.background="";btn.style.boxShadow="";return;}
if(skin.image)btn.style.background="url('"+skin.image+"') center / cover no-repeat";
else btn.style.background=skin.bg;
btn.style.boxShadow="0 6px 0 rgba(0, 0, 0, 0.4)";}
function renderSkins(){
var list=$("skins-list");if(!list)return;list.innerHTML="";
for(var id in skins){var skin=skins[id];
if(skin.secret&&!skin.owned)continue;
var div=document.createElement("div");
var classes="skin-item";
if(activeEmojiSkin===null&&activeSkin===id)classes+=" active";
if(!skin.owned)classes+=" locked";
div.className=classes;div.dataset.id=id;
var previewStyle,previewText;
if(skin.special&&id==="gennadii"){previewStyle="background:radial-gradient(circle at 50% 50%, #f4a8c0 0%, #f4a8c0 40%, #e8d7b8 42%, #e8d7b8 100%);";previewText="";}
else if(skin.image){previewStyle="background:url('"+skin.image+"') center / cover no-repeat;";previewText="";}
else{previewStyle="background:"+skin.bg+";";previewText="ТАП";}
var priceText="";
if(activeEmojiSkin===null&&activeSkin===id)priceText='<div class="skin-price">✓ Выбран</div>';
else if(skin.owned)priceText='<div class="skin-price">Нажмите</div>';
else if(skin.special)priceText='<div class="skin-price">Только промокод</div>';
else priceText='<div class="skin-price">'+SKIN_PRICE+' 💎</div>';
div.innerHTML='<div class="skin-preview" style="'+previewStyle+'">'+previewText+'</div>'+'<div class="skin-name">'+skin.name+'</div>'+priceText;
list.appendChild(div);}
document.querySelectorAll(".skin-item[data-id]").forEach(function(el){el.onclick=function(){
var id=el.dataset.id;var skin=skins[id];
if(skin.owned){activeSkin=id;activeEmojiSkin=null;playSound("ui");saveSkins();applySkin();renderSkins();renderEmojiSkins();return;}
if(skin.special){alert("Этот скин можно получить только через промокод!");return;}
if(crystals<SKIN_PRICE){alert("Недостаточно кристаллов!\nНужно: "+SKIN_PRICE+" 💎\nУ вас: "+crystals+" 💎");return;}
crystals-=SKIN_PRICE;skin.owned=true;activeSkin=id;activeEmojiSkin=null;playSound("ui");vibrate(10);addQuestProgress("skin",1);saveSkins();applySkin();renderSkins();renderEmojiSkins();updateUI();saveGame();};});}
function renderEmojiSkins(){
var list=$("emoji-skins-list");if(!list)return;list.innerHTML="";
for(var id in EMOJI_SKINS){
var es=EMOJI_SKINS[id];
var div=document.createElement("div");
var classes="skin-item";
if(activeEmojiSkin===id)classes+=" active";
if(!es.owned)classes+=" locked";
div.className=classes;div.dataset.eid=id;
var priceText="";
if(activeEmojiSkin===id)priceText='<div class="skin-price">✓ Выбран</div>';
else if(es.owned)priceText='<div class="skin-price">Нажмите</div>';
else priceText='<div class="skin-price">'+es.cost+' 💎</div>';
div.innerHTML='<div class="skin-preview" style="font-size:38px;background:#0e1a30;color:#fff">'+es.emoji+'</div>'+'<div class="skin-name">'+es.name+'</div>'+priceText;
list.appendChild(div);}
document.querySelectorAll("[data-eid]").forEach(function(el){el.onclick=function(){
var id=el.dataset.eid;var es=EMOJI_SKINS[id];
if(es.owned){activeEmojiSkin=(activeEmojiSkin===id)?null:id;playSound("ui");saveSkins();applySkin();renderSkins();renderEmojiSkins();return;}
if(crystals<es.cost){alert("Недостаточно кристаллов!\nНужно: "+es.cost+" 💎\nУ вас: "+crystals+" 💎");return;}
crystals-=es.cost;es.owned=true;activeEmojiSkin=id;playSound("ui");vibrate(10);saveSkins();applySkin();renderSkins();renderEmojiSkins();updateUI();saveGame();};});}
function renderSmileSkins(){
var list=$("smile-skins-list");if(!list)return;list.innerHTML="";
var div=document.createElement("div");
var isActive=smileSkinActive,isUnlocked=smileSkinUnlocked;
var classes="skin-item";
if(isActive)classes+=" active";
if(!isUnlocked)classes+=" locked";
div.className=classes;
var priceText="";
if(!isUnlocked)priceText='<div class="skin-price">Только промокод</div>';
else if(isActive)priceText='<div class="skin-price">✓ Включён</div>';
else priceText='<div class="skin-price">Нажмите чтобы включить</div>';
div.innerHTML='<div class="smile-skin-preview blood"><span>😈</span></div>'+'<div class="skin-name">Кровавая мутация</div>'+priceText;
list.appendChild(div);
div.onclick=function(){
if(!smileSkinUnlocked){alert("Этот скин можно получить только через промокод!");return;}
smileSkinActive=!smileSkinActive;
playSound("ui");renderSmileSkins();updateDepositSideButton();
var modal=$("modal-deposit");if(modal&&!modal.classList.contains("hidden"))renderDeposit();
saveGame();};}
function getItemBonus(){
var sum=0;for(var id in ITEMS){var lvl=ownedItems[id]||0;if(typeof lvl==="boolean")lvl=lvl?1:0;if(lvl>0){sum+=ITEMS[id].bonuses[lvl-1];}}
return 1+sum;}

// === ПРЕДМЕТЫ ===
function renderItems(){
var list=$("items-list"),shardsEl=$("items-shards"),crystalsEl=$("items-crystals");
if(!list)return;if(shardsEl)shardsEl.textContent=shards;if(crystalsEl)crystalsEl.textContent=crystals;
list.innerHTML="";
for(var id in ITEMS){
var item=ITEMS[id];var lvl=ownedItems[id]||0;if(typeof lvl==="boolean")lvl=lvl?1:0;
var isMax=lvl>=ITEM_MAX_LEVEL;var currentBonus=lvl>0?item.bonuses[lvl-1]:0;var nextBonus=!isMax?item.bonuses[lvl]:0;
var nextCost=!isMax?Math.round(item.cost*ITEM_PRICE_MULT[lvl]):0;var canBuy=!isMax&&shards>=nextCost;
var div=document.createElement("div");div.className="item-card"+(lvl>0?" owned":"");
var effectLine="";
if(lvl===0)effectLine="Не куплено · Ур. 0/3";
else if(isMax)effectLine="Максимум · Ур. 3/3 · +"+Math.round(currentBonus*100)+"%";
else effectLine="Ур. "+lvl+"/3 · +"+Math.round(currentBonus*100)+"% → +"+Math.round(nextBonus*100)+"%";
var btnText="";
if(isMax)btnText="✓ Максимум";else if(lvl===0)btnText=nextCost+" 🌑";else btnText="Улучшить: "+nextCost+" 🌑";
var btnClass="item-buy"+(isMax?" owned-btn":"")+(btnText.length>10?" long-btn":"");
div.innerHTML='<div class="item-icon">'+item.icon+'</div>'+'<div class="item-info">'+'<div class="item-name">'+item.name+'</div>'+'<div class="item-desc">'+item.desc+'</div>'+'<div class="item-effect">'+effectLine+'</div>'+'</div>'+'<button class="'+btnClass+'" data-id="'+id+'"'+(isMax||!canBuy?' disabled':'')+'>'+btnText+'</button>';
list.appendChild(div);}
document.querySelectorAll(".item-buy").forEach(function(btn){btn.onclick=function(){
var id=btn.dataset.id;var item=ITEMS[id];var lvl=ownedItems[id]||0;if(typeof lvl==="boolean")lvl=lvl?1:0;
if(lvl>=ITEM_MAX_LEVEL)return;var cost=Math.round(item.cost*ITEM_PRICE_MULT[lvl]);
if(shards<cost){alert("Недостаточно осколков!\nНужно: "+cost+" 🌑\nУ вас: "+shards+" 🌑");return;}
shards-=cost;ownedItems[id]=lvl+1;playSound("ui");vibrate(10);addQuestProgress("item",1);renderItems();updateUI();saveGame();};});}

// === МАГАЗИН ЗА КРИСТАЛЛЫ ===
function renderCrystalShop(){
var list=$("crystal-list");if(!list)return;list.innerHTML="";
for(var id in CRYSTAL_ITEMS){
var item=CRYSTAL_ITEMS[id];var disabled=false;var statusText="";var btnText=item.cost+' 💎';
if(id==="boost2"||id==="boost3"||id==="boost5"){statusText="В хранилище: "+(BOOSTERS[id]?BOOSTERS[id].storage:0);}
else if(id==="coinsBag"){var gain=Math.floor(getCPS()*3600);statusText=gain>0?("Даст "+formatNumber(gain)+" монет"):"CPS пока 0";}
else if(id==="depositUp"){if(!depositUnlocked||depositLevel>=25){disabled=true;statusText=!depositUnlocked?"Сначала купите вклад":"Вклад на максимуме";}else{statusText="Ур. "+depositLevel+" → "+(depositLevel+1);}}
else if(id==="chest"){statusText="Сразу откроется";}
var div=document.createElement("div");div.className="item-card";
div.innerHTML='<div class="item-icon">'+item.icon+'</div>'+'<div class="item-info">'+'<div class="item-name">'+item.name+'</div>'+'<div class="item-desc">'+item.desc+'</div>'+'<div class="item-effect">'+statusText+'</div>'+'</div>'+'<button class="item-buy crystal-buy" data-id="'+id+'"'+(disabled?' disabled':'')+'>'+btnText+'</button>';
list.appendChild(div);}
document.querySelectorAll(".crystal-buy").forEach(function(btn){if(btn.disabled){btn.onclick=null;return;}btn.onclick=function(){buyCrystalItem(btn.dataset.id);};});}
function buyCrystalItem(id){
var item=CRYSTAL_ITEMS[id];if(!item)return;
if(id==="depositUp"){if(!depositUnlocked){alert("Сначала купите вклад в модалке смайлика!");return;}if(depositLevel>=25){alert("Вклад уже на максимуме (25 ур.)!");return;}}
if(id==="boost2"||id==="boost3"||id==="boost5"){if(crystalBoostTimer>0&&crystalBoostMultiplier>1){alert("Буст уже активен, дождись окончания!");return;}}
if(crystals<item.cost){alert("Недостаточно кристаллов!\nНужно: "+item.cost+" 💎\nУ вас: "+crystals+" 💎");return;}
crystals-=item.cost;
if(id==="coinsBag"){var gain=Math.floor(getCPS()*3600);coins+=gain;totalEarned+=gain;alert("💰 Получено "+formatNumber(gain)+" монет!");}
else if(id==="boost2"||id==="boost3"||id==="boost5"){addBoosterToStorage(id);}
else if(id==="chest"){var r=getChestRewards();openChestAnimation(r.crystals,r.coins,r.shards,r.booster,function(){addCrystals(r.crystals);coins+=r.coins;totalEarned+=r.coins;shards+=r.shards;if(r.booster)addBoosterToStorage(r.booster);chestsOpened++;addQuestProgress("chest",1);updateUI();updateChestButton();checkAchievements();saveGame();});}
else if(id==="depositUp"){depositLevel++;lastDepositTimeKey=getTimeKey();playSound("eat");addQuestProgress("deposit",1);updateDepositSideButton();}
playSound("ui");vibrate(10);updateBoostBanner();updateUI();renderCrystalShop();saveGame();}

// === БУСТЕРЫ ===
function addBoosterToStorage(id){
if(!BOOSTERS[id])return;
BOOSTERS[id].storage=(BOOSTERS[id].storage||0)+1;
showBoosterAddedPopup(id);saveGame();
var mb=$("modal-boosters");if(mb&&!mb.classList.contains("hidden"))renderBoosters();
}
function showBoosterAddedPopup(id){
var b=BOOSTERS[id];if(!b)return;
var popup=document.createElement("div");popup.className="achievement-popup";
popup.textContent=b.icon+" Бустер ×"+b.mult+" добавлен в хранилище";
document.body.appendChild(popup);setTimeout(function(){popup.remove();},3000);
}
function activateBooster(id){
var b=BOOSTERS[id];if(!b)return;
if(!b.storage||b.storage<=0){alert("Нет бустеров в наличии!");return;}
if(crystalBoostTimer>0&&crystalBoostMultiplier>1){alert("Активен другой бустер — дождись окончания!");return;}
b.storage--;crystalBoostMultiplier=b.mult;crystalBoostTimer=b.duration;crystalBoostName=b.icon+" Буст ×"+b.mult;
playSound("ui");updateBoostBanner();updateUI();renderCrystalShop();renderBoosters();saveGame();
}
function renderBoosters(){
var list=$("boosters-list"),banner=$("booster-active-banner");
if(!list)return;
if(banner){if(crystalBoostTimer>0&&crystalBoostMultiplier>1){var m=Math.floor(crystalBoostTimer/60),s=crystalBoostTimer%60;banner.textContent="⚡ Активен ×"+crystalBoostMultiplier+" — осталось "+m+":"+(s<10?"0":"")+s;banner.classList.remove("hidden");}else{banner.classList.add("hidden");}}
list.innerHTML="";
for(var id in BOOSTERS){
var b=BOOSTERS[id];var count=b.storage||0;
var isActive=(crystalBoostTimer>0&&crystalBoostMultiplier===b.mult);
var isAnotherActive=(crystalBoostTimer>0&&crystalBoostMultiplier>1&&!isActive);
var classes="booster-card";
if(count<=0)classes+=" empty";
if(isActive)classes+=" active-booster";
var div=document.createElement("div");div.className=classes;
var btnText="Активировать";var btnDisabled=false;
if(count<=0){btnText="Нет в наличии";btnDisabled=true;}
else if(isAnotherActive){btnText="Активен другой";btnDisabled=true;}
else if(isActive){btnText="Уже активен";btnDisabled=true;}
div.innerHTML='<div class="booster-icon">'+b.icon+'</div>'+'<div class="booster-info">'+'<div class="booster-name">'+b.name+'</div>'+'<div class="booster-desc">'+b.desc+'</div>'+'<div class="booster-count">📦 В наличии: '+count+'</div>'+'</div>'+'<button class="booster-activate-btn" data-bid="'+id+'"'+(btnDisabled?' disabled':'')+'>'+btnText+'</button>';
list.appendChild(div);}
document.querySelectorAll(".booster-activate-btn").forEach(function(btn){if(btn.disabled){btn.onclick=null;return;}btn.onclick=function(){activateBooster(btn.dataset.bid);};});}
function updateBoostBanner(){
var banner=$("boost-banner");if(!banner)return;
if(crystalBoostTimer>0&&crystalBoostMultiplier>1){var m=Math.floor(crystalBoostTimer/60),s=crystalBoostTimer%60;banner.textContent=crystalBoostName+" — "+m+":"+(s<10?"0":"")+s;banner.classList.remove("hidden");document.body.classList.add("boost-active");}
else{banner.classList.add("hidden");document.body.classList.remove("boost-active");}}
function updateCrystalBoostTimer(){if(crystalBoostTimer>0){crystalBoostTimer--;if(crystalBoostTimer<=0){crystalBoostTimer=0;crystalBoostMultiplier=1;crystalBoostName="";}updateBoostBanner();var mb=$("modal-boosters");if(mb&&!mb.classList.contains("hidden"))renderBoosters();}}

// === ГЕНЕРАТОР ===
function getGeneratorCPS(){if(generatorLevel<1)return 1;return Math.max(1,Math.floor(generatorLevel/2.5));}
function getGeneratorCooldownMs(){return Math.round(1000/getGeneratorCPS());}
function getGeneratorCost(){if(generatorLevel>=GENERATOR_MAX_LEVEL)return Infinity;return Math.round(GENERATOR_BASE_COST*Math.pow(GENERATOR_COST_MULT,generatorLevel-1));}
function upgradeGenerator(){
if(generatorLevel>=GENERATOR_MAX_LEVEL)return;
var cost=getGeneratorCost();
if(coins<cost){alert("Недостаточно монет!\nНужно: "+formatNumber(cost)+"\nУ вас: "+formatNumber(coins));return;}
coins-=cost;generatorLevel++;generatorTimer=GENERATOR_DURATION;
playSound("ui");vibrate(10);updateGeneratorButton();renderGenerator();updateUI();saveGame();}
function updateGeneratorTimer(){
generatorTimer--;
if(generatorTimer<=0){
generatorTimer=GENERATOR_DURATION;
var drops=[1,2,3,5];var drop=drops[Math.floor(Math.random()*drops.length)];
var before=generatorLevel;
generatorLevel=Math.max(1,generatorLevel-drop);
if(generatorLevel!==before){updateGeneratorButton();var modal=$("modal-generator");if(modal&&!modal.classList.contains("hidden"))renderGenerator();showGeneratorDropPopup(drop);}}
updateGeneratorButton();}
function showGeneratorDropPopup(drop){var popup=document.createElement("div");popup.className="achievement-popup";popup.textContent="⚡ Генератор упал на "+drop+" ур. (сейчас "+generatorLevel+")";document.body.appendChild(popup);setTimeout(function(){popup.remove();},3000);}
function updateGeneratorButton(){var btn=$("generator-btn");if(!btn)return;var cps=getGeneratorCPS();var cpsText=(cps<1)?("1 тап / "+(1/cps).toFixed(1)+" сек"):(cps+" тап/сек");btn.textContent="⚡ Генератор: Ур. "+generatorLevel+" ("+cpsText+")";}
function renderGenerator(){
var content=$("generator-content");if(!content)return;
var cps=getGeneratorCPS();var isMax=generatorLevel>=GENERATOR_MAX_LEVEL;var nextCost=isMax?0:getGeneratorCost();
var m=Math.floor(generatorTimer/60),s=generatorTimer%60;
var cpsText=(cps<1)?("1 тап за "+(1/cps).toFixed(1)+" сек"):(cps+" тапов/сек");
var progressPercent=(generatorTimer/GENERATOR_DURATION)*100;
var html='<div class="generator-emoji">⚡</div>'+'<div class="generator-level">Уровень '+generatorLevel+' / '+GENERATOR_MAX_LEVEL+'</div>'+'<div class="generator-stat">Скорость: <b>'+cpsText+'</b></div>'+'<div class="generator-stat">До падения: <b>'+m+':'+(s<10?"0":"")+s+'</b></div>'+'<div class="generator-bar"><div class="generator-bar-fill" style="width:'+progressPercent+'%"></div></div>'+'<div class="generator-warning">⚠️ Раз в 3 минуты уровень падает на 1–5</div>';
if(!isMax){html+='<div class="deposit-desc">Улучшить: <b>'+formatNumber(nextCost)+'</b> монет</div>'+'<button id="generator-upgrade-btn" class="deposit-btn" type="button">⚡ Улучшить</button>';}
else{html+='<div class="deposit-happy">✨ Максимальный уровень!</div>';}
content.innerHTML=html;
var btn=$("generator-upgrade-btn");if(btn){btn.disabled=coins<nextCost;btn.onclick=upgradeGenerator;}}
var cooldownInterval=null;
function startCooldownUI(){
if(cooldownInterval)return;
cooldownInterval=setInterval(function(){
var btn=$("click-btn");if(!btn)return;
if(generatorLevel>=20){btn.classList.remove("cooldown");btn.classList.add("tap-ready");var txtOff=$("tap-cooldown-text");if(txtOff)txtOff.textContent="";return;}
var cd=getGeneratorCooldownMs();var elapsed=Date.now()-lastClickTime;var left=cd-elapsed;
if(left>0){var secLeft=(left/1000).toFixed(1);var txt=$("tap-cooldown-text");if(txt)txt.textContent="⌛ "+secLeft;btn.classList.add("cooldown");btn.classList.remove("tap-ready");}
else{btn.classList.remove("cooldown");btn.classList.add("tap-ready");var txt2=$("tap-cooldown-text");if(txt2)txt2.textContent="";}
},100);}

// === ВКЛАД ===
function getCurrentDepositEmoji(){if(!depositUnlocked||depositLevel<1)return "❓";var lvl=DEPOSIT_LEVELS[depositLevel-1];return lvl?lvl.emoji:"❓";}
function updateDepositSideButton(){
var btn=$("deposit-side-btn");if(!btn)return;
btn.classList.remove("lvl-hungry","lvl-mid","lvl-happy","lvl-max");
if(!depositUnlocked){btn.textContent="❓";return;}
btn.textContent=getCurrentDepositEmoji();
if(depositLevel<=5)btn.classList.add("lvl-hungry");else if(depositLevel<=15)btn.classList.add("lvl-mid");else if(depositLevel<25)btn.classList.add("lvl-happy");else btn.classList.add("lvl-max");}
function renderDeposit(){
var content=$("deposit-content");if(!content)return;
if(!depositUnlocked){
content.innerHTML='<div class="deposit-emoji">❓</div>'+'<div class="deposit-desc">Купите вклад за <b>1 Qa</b> монет, чтобы открыть смайлика.</div>'+'<div class="deposit-desc" style="color:#aaa;font-size:13px;">Смайлик будет расти с каждым вложением.</div>'+'<button id="deposit-buy-btn" class="deposit-btn" type="button">💰 Купить вклад за 1 Qa</button>';
var btn=$("deposit-buy-btn");
if(btn){btn.disabled=coins<DEPOSIT_LEVELS[0].cost;btn.onclick=function(){if(depositUnlocked)return;if(coins<DEPOSIT_LEVELS[0].cost)return;coins-=DEPOSIT_LEVELS[0].cost;depositUnlocked=true;depositLevel=1;lastDepositTimeKey=getTimeKey();playSound("eat");vibrate(10);renderDeposit();updateDepositSideButton();updateUI();saveGame();};}
return;}
var emoji=getCurrentDepositEmoji();var isHungry=depositLevel<=5;var isMax=depositLevel>=25;
var skinClass="";
if(smileSkinActive&&smileSkinUnlocked){skinClass=" skin-blood";if(depositLevel>=21)skinClass+=" gold-spark";}
var emojiHtml;
if(smileSkinActive&&smileSkinUnlocked){emojiHtml='<div class="deposit-emoji'+skinClass+(isHungry?' hungry':'')+'" id="deposit-emoji-el"><span class="emoji-inner">'+emoji+'</span></div>';}
else{emojiHtml='<div class="deposit-emoji'+(isHungry?' hungry':'')+'" id="deposit-emoji-el">'+emoji+'</div>';}
var html=emojiHtml+'<div class="deposit-level">Уровень '+depositLevel+' / 25</div>';
if(isHungry)html+='<div class="deposit-warning">😭 Голодный! Ест 5M монет в секунду</div>';
else if(isMax)html+='<div class="deposit-happy">✨ Полный вклад! Смайлик сыт и доволен.</div>';
else html+='<div class="deposit-happy">Смайлик доволен</div>';
if(!isMax){var nextCost=DEPOSIT_LEVELS[depositLevel].cost;html+='<div class="deposit-desc">Следующий уровень: <b>'+formatNumber(nextCost)+'</b> монет</div>'+'<button id="deposit-buy-btn" class="deposit-btn" type="button">💰 Вложить '+formatNumber(nextCost)+'</button>';}
else{html+='<div class="deposit-desc" style="color:#4caf50;">Достигнут максимум!</div>';}
content.innerHTML=html;
var btn2=$("deposit-buy-btn");
if(btn2){var need=DEPOSIT_LEVELS[depositLevel].cost;btn2.disabled=coins<need;btn2.onclick=function(){var currentNeed=DEPOSIT_LEVELS[depositLevel].cost;if(depositLevel>=25)return;if(coins<currentNeed)return;coins-=currentNeed;depositLevel++;lastDepositTimeKey=getTimeKey();playSound("eat");vibrate(10);addQuestProgress("deposit",1);updateDepositSideButton();updateUI();renderDeposit();saveGame();};}
var emojiEl=$("deposit-emoji-el");if(emojiEl){emojiEl.style.cursor="pointer";emojiEl.onclick=bossEmojiClick;}}
function updateDepositHunger(){
if(!depositUnlocked){var hi=$("hungry-info");if(hi)hi.style.display="none";return;}
if(depositLevel<=5){var hi2=$("hungry-info");if(hi2)hi2.style.display="block";var eaten=Math.min(coins,DEPOSIT_HUNGRY_RATE);if(eaten>0)coins-=eaten;}
else{var hi3=$("hungry-info");if(hi3)hi3.style.display="none";}}

// === БОСС ===
function setupBossSecret(){
var emoji=$("boss-emoji");
if(emoji){emoji.onclick=function(){if(!bossActive)return;if(bossClickCooldown>0)return;bossClickCooldown=0.05;bossHP--;if(bossHP<0)bossHP=0;updateBossUI();emoji.classList.remove("hurt");void emoji.offsetWidth;emoji.classList.add("hurt");if(bossHP<=0)winBoss();};}
var startBtn=$("boss-start");if(startBtn)startBtn.onclick=function(){startBoss();};}
function startBoss(){
bossActive=true;bossHP=bossMaxHP;bossTimeLeft=45.0;
$("boss-result").textContent="";$("boss-result").className="";
$("boss-start").style.display="none";updateBossUI();
if(bossTimerInterval)clearInterval(bossTimerInterval);
bossTimerInterval=setInterval(function(){if(!bossActive)return;bossTimeLeft-=0.05;bossClickCooldown-=0.05;if(bossClickCooldown<0)bossClickCooldown=0;if(bossTimeLeft<=0){bossTimeLeft=0;loseBoss();}updateBossUI();},50);}
function updateBossUI(){var fill=$("boss-hp-fill"),text=$("boss-hp-text"),timer=$("boss-timer");if(fill)fill.style.width=(bossHP/bossMaxHP*100)+"%";if(text)text.textContent=bossHP+" / "+bossMaxHP;if(timer)timer.textContent="⏱ "+bossTimeLeft.toFixed(1)+" с";}
function winBoss(){
bossActive=false;if(bossTimerInterval){clearInterval(bossTimerInterval);bossTimerInterval=null;}
var res=$("boss-result");
if(!bossRewardClaimed){bossRewardClaimed=true;shards+=25;if(res){res.textContent="🏆 Победа! +25 🌑 кровавых осколков!";res.className="win";}}
else{if(res){res.textContent="🏆 Победа! (награда уже получена ранее)";res.className="win";}}
$("boss-start").style.display="block";$("boss-start").textContent="🔁 Ещё раз";
playSound("achievement");vibrate(50);updateUI();saveGame();}
function loseBoss(){
bossActive=false;if(bossTimerInterval){clearInterval(bossTimerInterval);bossTimerInterval=null;}
var penalty=10000000000000000000;var lost=Math.min(coins,penalty);coins-=lost;
var res=$("boss-result");if(res){res.textContent="💀 Провал! −"+formatNumber(lost)+" монет.";res.className="lose";}
$("boss-start").style.display="block";$("boss-start").textContent="🔁 Попробовать снова";
playSound("ui");updateUI();saveGame();}
function bossEmojiClick(){bossClickCount++;if(bossClickTimer)clearTimeout(bossClickTimer);bossClickTimer=setTimeout(function(){bossClickCount=0;},1500);if(bossClickCount>=3){bossClickCount=0;openBossModal();}}
function openBossModal(){
var modal=$("modal-boss");if(!modal)return;
var depositModal=$("modal-deposit");if(depositModal)depositModal.classList.add("hidden");
bossActive=false;bossHP=bossMaxHP;bossTimeLeft=45.0;
$("boss-result").textContent="";$("boss-result").className="";
$("boss-start").style.display="block";$("boss-start").textContent="🔥 Начать бой";
updateBossUI();modal.classList.remove("hidden");syncScrollLock();playSound("boss");}

// === ТРЕВОГА ===
function resetAlarmTimer(){if(alarmTimeout)clearTimeout(alarmTimeout);alarmTimeout=setTimeout(triggerAlarm,ALARM_TIME);}
function triggerAlarm(){if(alarmActive)return;alarmActive=true;alarmClicks=0;updateAlarmCounter();var overlay=$("alarm-overlay");if(overlay)overlay.classList.remove("hidden");syncScrollLock();if(alarmSound&&settings.sound){try{alarmSound.currentTime=0;alarmSound.play().catch(function(){});}catch(e){}}}
function stopAlarm(){alarmActive=false;var overlay=$("alarm-overlay");if(overlay)overlay.classList.add("hidden");syncScrollLock();if(alarmSound){try{alarmSound.pause();alarmSound.currentTime=0;}catch(e){}}resetAlarmTimer();}
function updateAlarmCounter(){var c=$("alarm-counter");if(c)c.textContent=alarmClicks+" / 5";}
function setupAlarm(){var overlay=$("alarm-overlay");if(!overlay)return;overlay.onclick=function(){if(!alarmActive)return;alarmClicks++;updateAlarmCounter();playSound("ui");if(alarmClicks>=5)stopAlarm();};resetAlarmTimer();}

// === НАГРАДА ===
function checkRewardTab(){
var tab=$("tab-reward");if(!tab)return;
if(rewardClaimed){tab.classList.add("hidden");return;}
if(upgrades.clicker.count>=228){
if(!rewardTabShown){tab.classList.remove("hidden");rewardTabShown=true;var popup=document.createElement("div");popup.className="achievement-popup";popup.textContent="🏅 Ты прокачал Кликер до 228! Открой вкладку «Награда»!";document.body.appendChild(popup);setTimeout(function(){popup.remove();},5000);playSound("achievement");}}
else{tab.classList.add("hidden");rewardTabShown=false;}}
function claimReward(){
if(rewardClaimed)return;
shards+=25;
rewardClaimed=true;
var res=$("reward-result");if(res){res.textContent="🎉 Ты получил +25 🌑 кровавых осколков!";res.style.color="#4caf50";}
var btn=$("reward-claim");if(btn){btn.disabled=true;btn.textContent="✅ Получено";}
playSound("achievement");vibrate(20);updateUI();saveGame();
setTimeout(function(){var tab=$("tab-reward");if(tab)tab.classList.add("hidden");var modal=$("modal-reward");if(modal)modal.classList.add("hidden");syncScrollLock();},2000);}

// === КВЕСТЫ ===
function getTodayKey(){var d=new Date();if(d.getHours()<6)d.setDate(d.getDate()-1);return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();}
function generateQuests(){
var availableKeys=[];
for(var key in QUEST_TYPES){
if(key==="buy_skin"){var hasUnownedSkin=false;for(var sid in skins){if(!skins[sid].owned&&!skins[sid].special){hasUnownedSkin=true;break;}}if(!hasUnownedSkin)continue;}
if(key==="deposit_up"){if(depositLevel>=25)continue;}
if(key==="prestige_item"){var hasUnownedItem=false;for(var iid in ITEMS){var lv=ownedItems[iid]||0;if(typeof lv==="boolean")lv=lv?1:0;if(lv<ITEM_MAX_LEVEL){hasUnownedItem=true;break;}}if(!hasUnownedItem)continue;}
availableKeys.push(key);}
var chosen=[];
while(chosen.length<3&&availableKeys.length>0){var idx=Math.floor(Math.random()*availableKeys.length);chosen.push(availableKeys[idx]);availableKeys.splice(idx,1);}
quests=chosen;questsDate=getTodayKey();questsClaimed=0;questProgress={};
quests.forEach(function(id){questProgress[id]=0;});saveGame();}
function checkQuestsUpdate(){var today=getTodayKey();if(questsDate!==today)generateQuests();}
function addQuestProgress(statName,amount){
if(!quests||quests.length===0)return;
quests.forEach(function(id){var type=QUEST_TYPES[id];if(!type)return;if(type.stat!==statName)return;
var claimedKey="clicker-quest-claimed-"+questsDate+"-"+id;
try{if(localStorage.getItem(claimedKey)==="1")return;}catch(e){}
questProgress[id]=(questProgress[id]||0)+amount;});}
function isQuestClaimed(id){var claimedKey="clicker-quest-claimed-"+questsDate+"-"+id;try{return localStorage.getItem(claimedKey)==="1";}catch(e){return false;}}
function claimQuest(id){
var type=QUEST_TYPES[id];if(!type)return;if(isQuestClaimed(id))return;
var progress=questProgress[id]||0;if(progress<type.goal)return;
var claimedKey="clicker-quest-claimed-"+questsDate+"-"+id;try{localStorage.setItem(claimedKey,"1");}catch(e){}
if(type.rewardType==="💎")addCrystals(type.reward);
else if(type.rewardType==="🌑")shards+=type.reward;
else if(type.rewardType==="💰"){coins+=type.reward;totalEarned+=type.reward;}
playSound("achievement");vibrate(15);renderQuests();updateUI();saveGame();}
function renderQuests(){
var list=$("quests-list"),timerEl=$("quests-timer");if(!list)return;
checkQuestsUpdate();
if(timerEl){var now=new Date();var reset=new Date();reset.setHours(6,0,0,0);if(now.getHours()>=6)reset.setDate(reset.getDate()+1);var diffMs=reset-now;var hours=Math.floor(diffMs/(1000*60*60));var mins=Math.floor((diffMs%(1000*60*60))/(1000*60));timerEl.textContent="⏰ Сброс через "+hours+" ч "+mins+" мин";}
list.innerHTML="";if(!quests||quests.length===0)generateQuests();
quests.forEach(function(id){
var type=QUEST_TYPES[id];if(!type)return;
var progress=questProgress[id]||0;var isClaimed=isQuestClaimed(id);var isDone=progress>=type.goal;
var classes="quest-card";if(isClaimed)classes+=" claimed";else if(isDone)classes+=" done";
var div=document.createElement("div");div.className=classes;
var percent=Math.min(100,(progress/type.goal)*100);var rewardText="Награда: "+type.reward+" "+type.rewardType;
var buttonHtml="";
if(isClaimed)buttonHtml='<div class="quest-claimed-label">✅ Получено</div>';
else if(isDone)buttonHtml='<button class="quest-claim-btn" data-id="'+id+'">🎁 Забрать награду</button>';
else buttonHtml='<button class="quest-claim-btn" disabled>Ещё не выполнено</button>';
div.innerHTML='<div class="quest-header">'+'<div class="quest-icon">'+type.icon+'</div>'+'<div class="quest-name">'+type.name+'</div>'+'<div class="quest-progress-text">'+formatNumber(progress)+" / "+formatNumber(type.goal)+'</div>'+'</div>'+'<div class="quest-progress-bar">'+'<div class="quest-progress-fill" style="width:'+percent+'%"></div>'+'</div>'+'<div class="quest-reward">'+rewardText+'</div>'+buttonHtml;
list.appendChild(div);});
document.querySelectorAll(".quest-claim-btn").forEach(function(btn){btn.onclick=function(){var id=btn.dataset.id;if(id)claimQuest(id);};});}

// === ЛИДЕРБОРД ===
function submitLeaderboardScore(){
var submitBtn=$("leader-submit");if(!submitBtn)return;
if(!db){alert("❌ Лидерборд не подключён.");return;}
if(!hasProfile()){alert("❌ Сначала задай ник в профиле!");showProfileModal();return;}
ensureProfileId();
var name=profile.nickname;var score=Math.floor(totalEarned);var entryId=profile.id;
submitBtn.disabled=true;submitBtn.textContent="Отправка...";
db.ref("leaderboard/"+entryId).set({name:name,score:score,id:entryId,timestamp:Date.now()}).then(function(){
alert("✅ Рекорд отправлен!\n\nНик: "+name+"\nID: "+entryId+"\nОчки: "+formatNumber(score));
submitBtn.disabled=false;submitBtn.textContent="📤 Отправить рекорд";loadLeaderboard();
}).catch(function(err){alert("❌ Ошибка: "+err.message);submitBtn.disabled=false;submitBtn.textContent="📤 Отправить рекорд";});}
function loadLeaderboard(){
var list=$("leaders-list");if(!list)return;
if(!db){list.innerHTML='<p style="text-align:center;color:#ff5252;padding:20px;">Лидерборд не подключён</p>';return;}
list.innerHTML='<p class="leaders-loading">Загрузка...</p>';
db.ref("leaderboard").orderByChild("score").limitToLast(25).once("value").then(function(snapshot){
var entries=[];snapshot.forEach(function(cs){var data=cs.val();entries.push({name:data.name||"Аноним",score:data.score||0,id:data.id||""});});
if(entries.length===0){list.innerHTML='<p style="text-align:center;color:#aaa;padding:20px;">Пока нет рекордов. Будь первым! 🏆</p>';return;}
entries.sort(function(a,b){return b.score-a.score;});
if(hasProfile()&&profile.id){var myRank=-1;for(var ri=0;ri<entries.length;ri++){if(entries[ri].id===profile.id){myRank=ri+1;break;}}if(myRank>=1&&myRank<=3){var key="leader_top"+myRank;if(!unlocked[key]){unlocked[key]=true;checkAchievements();saveGame();}}}
var html="";var medals=["🥇","🥈","🥉"];
entries.slice(0,25).forEach(function(entry,index){
var rank=index+1;var rankClass=rank<=3?" rank-"+rank:"";var medal=rank<=3?medals[rank-1]:rank;
var displayName=entry.name;if(entry.id){displayName=entry.name+" ("+entry.id+")";}
html+='<div class="leader-row'+rankClass+'">'+'<div class="leader-rank">'+medal+'</div>'+'<div class="leader-name">'+escapeHtml(displayName)+'</div>'+'<div class="leader-score">'+formatNumber(entry.score)+'</div>'+'</div>';
});
list.innerHTML=html;}).catch(function(err){list.innerHTML='<p style="text-align:center;color:#ff5252;padding:20px;">Ошибка загрузки: '+err.message+'</p>';});}
function escapeHtml(text){var div=document.createElement("div");div.textContent=text;return div.innerHTML;}

// === КОЛЕСО ===
function getTodayKeyWheel(){var d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();}
function checkWheelReset(){var today=getTodayKeyWheel();if(wheelLastResetDay!==today){wheelFreeUsed=false;wheelPaidUsed=false;wheelLastResetDay=today;}}
function renderWheel(){
checkWheelReset();
var rotor=$("wheel-rotor");
if(rotor&&!rotor.hasChildNodes()){
var R=140,cx=150,cy=150;
for(var i=0;i<12;i++){
var a1=(Math.PI*2/12)*i-Math.PI/2;var a2=(Math.PI*2/12)*(i+1)-Math.PI/2;
var x1=cx+R*Math.cos(a1),y1=cy+R*Math.sin(a1);var x2=cx+R*Math.cos(a2),y2=cy+R*Math.sin(a2);
var colors=["#4caf50","#4fc3f7","#9c27b0","#4caf50","#666","#4fc3f7","#4caf50","#9c27b0","#b71c1c","#4fc3f7","#b71c1c","#b71c1c"];
var path=document.createElementNS("http://www.w3.org/2000/svg","path");
path.setAttribute("d","M "+cx+" "+cy+" L "+x1+" "+y1+" A "+R+" "+R+" 0 0 1 "+x2+" "+y2+" Z");
path.setAttribute("fill",colors[i]);path.setAttribute("stroke","#16213e");path.setAttribute("stroke-width","2");
rotor.appendChild(path);
var midA=(a1+a2)/2;var tx=cx+(R*0.65)*Math.cos(midA),ty=cy+(R*0.65)*Math.sin(midA);
var txt=document.createElementNS("http://www.w3.org/2000/svg","text");
txt.setAttribute("x",tx);txt.setAttribute("y",ty);txt.setAttribute("text-anchor","middle");txt.setAttribute("dominant-baseline","middle");
txt.setAttribute("fill","#fff");txt.setAttribute("font-size","10");txt.setAttribute("font-weight","bold");
txt.textContent=WHEEL_SECTORS[i].label;
rotor.appendChild(txt);}}
var freeBtn=$("wheel-spin-free"),paidBtn=$("wheel-spin-paid");
if(freeBtn){if(wheelFreeUsed){freeBtn.disabled=true;freeBtn.textContent="🎁 Завтра";}else{freeBtn.disabled=false;freeBtn.textContent="🎁 Крутить бесплатно";}}
if(paidBtn){
if(wheelFreeUsed&&!wheelPaidUsed){var price=getWheelPrice();paidBtn.disabled=false;paidBtn.textContent="💰 Крутить за "+price.text;}
else if(!wheelFreeUsed){paidBtn.disabled=true;paidBtn.textContent="💰 Сначала бесплатный";}
else{paidBtn.disabled=true;paidBtn.textContent="💰 Завтра";}}
var timerEl=$("wheel-timer");
if(timerEl){if(wheelFreeUsed&&wheelPaidUsed){timerEl.textContent="Следующие спины — завтра в 9:00";}else if(!wheelFreeUsed){timerEl.textContent="1 бесплатный + 1 платный спин в день";}else{timerEl.textContent="Доступен платный спин";}}}
function getWheelPrice(){if(coins<1e18)return {key:"qa",text:"1 Qa",value:1e15};if(coins<1e21)return {key:"qi",text:"1 Qi",value:1e18};return {key:"sx",text:"1 Sx",value:1e21};}
function openWheel(){var overlay=$("wheel-overlay");if(!overlay)return;$("wheel-result").textContent="";renderWheel();overlay.classList.remove("hidden");syncScrollLock();}
function closeWheel(){var overlay=$("wheel-overlay");if(overlay)overlay.classList.add("hidden");syncScrollLock();}
function spinWheel(isFree){
if(wheelSpinning)return;
var price;
if(!isFree){checkWheelReset();if(!wheelFreeUsed){alert("Сначала используй бесплатный спин!");return;}if(wheelPaidUsed){alert("Платный спин уже использован!");return;}price=getWheelPrice();if(coins<price.value){alert("Недостаточно монет!\nНужно: "+price.text);return;}coins-=price.value;wheelPaidUsed=true;}
else{checkWheelReset();if(wheelFreeUsed){alert("Бесплатный спин уже использован!");return;}wheelFreeUsed=true;}
wheelSpinning=true;
if(!unlocked.wheel_first){unlocked.wheel_first=true;checkAchievements();}
var sectorIdx=Math.floor(Math.random()*12);
var rotor=$("wheel-rotor");if(!rotor){wheelSpinning=false;return;}
var sectorAngle=360/12;
var targetRotation=sectorIdx*sectorAngle+sectorAngle/2;
var totalRotation=360*5+((targetRotation%360)+360)%360;
var currentRot=window.__wheelRot||0;var fullRot=currentRot+totalRotation;window.__wheelRot=fullRot;
rotor.style.transition="transform 5s cubic-bezier(.17,.67,.3,1)";
rotor.style.transformOrigin="150px 150px";
rotor.style.transform="rotate("+fullRot+"deg)";
playSound("ui");
setTimeout(function(){var sector=WHEEL_SECTORS[sectorIdx];applyWheelReward(sector);wheelSpinning=false;renderWheel();saveGame();},5100);}
function applyWheelReward(sector){
var resultEl=$("wheel-result");var text="";
if(sector.type==="coins"){var gain=Math.floor(coins*sector.value);if(sector.value<0){gain=Math.floor(coins*Math.abs(sector.value));coins=Math.max(0,coins-gain);text="💀 Потеряно "+formatNumber(gain)+" монет!";}else{coins+=gain;totalEarned+=gain;text="💰 Получено "+formatNumber(gain)+" монет!";}}
else if(sector.type==="gems"){addCrystals(sector.value);text="💎 +"+sector.value+" кристаллов!";}
else if(sector.type==="shards"){shards+=sector.value;text="🌑 +"+sector.value+" осколков!";}
else if(sector.type==="negGems"){var lost=Math.min(crystals,Math.abs(sector.value));crystals-=lost;text="💀 −"+lost+" кристаллов!";}
else if(sector.type==="negShards"){var lostS=Math.min(shards,Math.abs(sector.value));shards-=lostS;text="💀 −"+lostS+" осколков!";}
else if(sector.type==="negCoins"){var lostC=Math.floor(coins*Math.abs(sector.value));coins=Math.max(0,coins-lostC);text="💀 −"+formatNumber(lostC)+" монет!";}
else{text="❌ Пусто. В следующий раз повезёт!";}
if(resultEl)resultEl.textContent=text;
playSound(sector.type==="empty"?"ui":"achievement");updateUI();}

// === ЕЖЕДНЕВКА ===
function getTodayKeyDaily(){var d=new Date();if(d.getHours()<9)d.setDate(d.getDate()-1);return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();}
function renderDailyWheel(){
var rotor=$("daily-wheel-rotor");
if(rotor&&!rotor.hasChildNodes()){
var R=140,cx=150,cy=150;
var colors=["#2e7d32","#4caf50","#1976d2","#42a5f5","#e91e63","#9c27b0","#e0c25a"];
for(var i=0;i<7;i++){
var a1=(Math.PI*2/7)*i-Math.PI/2;var a2=(Math.PI*2/7)*(i+1)-Math.PI/2;
var x1=cx+R*Math.cos(a1),y1=cy+R*Math.sin(a1);var x2=cx+R*Math.cos(a2),y2=cy+R*Math.sin(a2);
var path=document.createElementNS("http://www.w3.org/2000/svg","path");
path.setAttribute("d","M "+cx+" "+cy+" L "+x1+" "+y1+" A "+R+" "+R+" 0 0 1 "+x2+" "+y2+" Z");
path.setAttribute("fill",colors[i]);path.setAttribute("stroke","#16213e");path.setAttribute("stroke-width","2");
rotor.appendChild(path);
var midA=(a1+a2)/2;var tx=cx+(R*0.7)*Math.cos(midA),ty=cy+(R*0.7)*Math.sin(midA);
var txt=document.createElementNS("http://www.w3.org/2000/svg","text");
txt.setAttribute("x",tx);txt.setAttribute("y",ty);txt.setAttribute("text-anchor","middle");txt.setAttribute("dominant-baseline","middle");
txt.setAttribute("fill","#fff");txt.setAttribute("font-size","12");txt.setAttribute("font-weight","bold");
txt.textContent=DAILY_PRIZES[i].label;
rotor.appendChild(txt);}}
var spinBtn=$("daily-spin"),timerEl=$("daily-timer");
var today=getTodayKeyDaily();
if(spinBtn){if(dailyLastUsed===today){spinBtn.disabled=true;spinBtn.textContent="✅ Сегодня получено";}else{spinBtn.disabled=false;spinBtn.textContent="🎁 Крутить!";}}
if(timerEl){if(dailyLastUsed===today){timerEl.textContent="Следующая награда — завтра в 9:00";}else{timerEl.textContent="1 бесплатный спин в день!";}}}
function openDaily(){var overlay=$("daily-overlay");if(!overlay)return;$("daily-result").textContent="";renderDailyWheel();overlay.classList.remove("hidden");syncScrollLock();}
function closeDaily(){var overlay=$("daily-overlay");if(overlay)overlay.classList.add("hidden");syncScrollLock();}
function spinDaily(){
if(dailySpinning)return;
var today=getTodayKeyDaily();
if(dailyLastUsed===today){alert("Сегодня уже крутил! Завтра снова.");return;}
dailySpinning=true;
var prizeIdx=Math.floor(Math.random()*7);
var rotor=$("daily-wheel-rotor");if(!rotor){dailySpinning=false;return;}
var sectorAngle=360/7;
var targetRotation=prizeIdx*sectorAngle+sectorAngle/2;
var totalRotation=360*5+((targetRotation%360)+360)%360;
var currentRot=window.__dailyRot||0;var fullRot=currentRot+totalRotation;window.__dailyRot=fullRot;
rotor.style.transition="transform 5s cubic-bezier(.17,.67,.3,1)";
rotor.style.transformOrigin="150px 150px";
rotor.style.transform="rotate("+fullRot+"deg)";
playSound("ui");
setTimeout(function(){var prize=DAILY_PRIZES[prizeIdx];applyDailyReward(prize);dailyLastUsed=today;if(!unlocked.daily_first){unlocked.daily_first=true;checkAchievements();}dailySpinning=false;renderDailyWheel();saveGame();},5100);}
function applyDailyReward(prize){
var resultEl=$("daily-result");var text="";
if(prize.type==="coins"){coins+=prize.value;totalEarned+=prize.value;text="💰 Получено "+formatNumber(prize.value)+" монет!";}
else if(prize.type==="gems"){addCrystals(prize.value);text="💎 +"+prize.value+" кристаллов!";}
else if(prize.type==="shards"){shards+=prize.value;text="🌑 +"+prize.value+" осколков!";}
else if(prize.type==="boost"){var ids=["boost2","boost3","boost5"];var bid=ids[Math.floor(Math.random()*3)];addBoosterToStorage(bid);text="⚡ Бустер ×"+BOOSTERS[bid].mult+" добавлен в хранилище!";}
if(resultEl)resultEl.textContent=text;
playSound("achievement");updateUI();}

// === МИНИ-ИГРА ===
function openMinigame(){var overlay=$("minigame-overlay");if(!overlay)return;resetMinigameUI();overlay.classList.remove("hidden");syncScrollLock();}
function closeMinigame(){var overlay=$("minigame-overlay");if(overlay)overlay.classList.add("hidden");if(minigameTimerInterval){clearInterval(minigameTimerInterval);minigameTimerInterval=null;}minigameActive=false;syncScrollLock();}
function resetMinigameUI(){
minigameTaps=0;minigameTimer=MINIGAME_DURATION;minigameActive=false;
$("minigame-count").textContent="0";$("minigame-timer").textContent="10.0";$("minigame-timer").classList.remove("urgent");
$("minigame-result").textContent="";$("minigame-result").className="";$("minigame-best-val").textContent=minigameBest;
var startBtn=$("minigame-start");if(startBtn){startBtn.disabled=false;startBtn.textContent="▶️ Начать";}
var tapBtn=$("minigame-tap-btn");if(tapBtn)tapBtn.disabled=true;
var timerInfo=$("minigame-timer-info");
if(timerInfo){var now=Date.now();var left=MINIGAME_COOLDOWN-(now-minigameLastUsed);if(left<=0){timerInfo.textContent="Можно играть!";}else{var mins=Math.floor(left/60000),secs=Math.floor((left%60000)/1000);timerInfo.textContent="Следующая игра через "+mins+"м "+secs+"с";}}}
function startMinigame(){
var now=Date.now();
if(now-minigameLastUsed<MINIGAME_COOLDOWN){var left=MINIGAME_COOLDOWN-(now-minigameLastUsed);var mins=Math.floor(left/60000),secs=Math.floor((left%60000)/1000);alert("Рано! Следующая игра через "+mins+"м "+secs+"с");return;}
minigameActive=true;minigameTaps=0;minigameTimer=MINIGAME_DURATION;minigameLastUsed=now;
$("minigame-count").textContent="0";$("minigame-result").textContent="";$("minigame-result").className="";
var startBtn=$("minigame-start");if(startBtn){startBtn.disabled=true;startBtn.textContent="⏳ Играем...";}
var tapBtn=$("minigame-tap-btn");if(tapBtn)tapBtn.disabled=false;
playSound("ui");
if(minigameTimerInterval)clearInterval(minigameTimerInterval);
minigameTimerInterval=setInterval(function(){minigameTimer-=0.1;if(minigameTimer<=0){minigameTimer=0;finishMinigame();return;}$("minigame-timer").textContent=minigameTimer.toFixed(1);if(minigameTimer<=3){$("minigame-timer").classList.add("urgent");}},100);}
function tapMinigame(){if(!minigameActive)return;minigameTaps++;$("minigame-count").textContent=minigameTaps;playSound("click");}
function finishMinigame(){
minigameActive=false;
if(minigameTimerInterval){clearInterval(minigameTimerInterval);minigameTimerInterval=null;}
var tapBtn=$("minigame-tap-btn");if(tapBtn)tapBtn.disabled=true;
var startBtn=$("minigame-start");if(startBtn){startBtn.disabled=false;startBtn.textContent="🔁 Ещё раз";}
var resultEl=$("minigame-result");
var isNewRecord=false;
if(minigameTaps>minigameBest){minigameBest=minigameTaps;isNewRecord=true;}
$("minigame-best-val").textContent=minigameBest;
var reward=0;
if(minigameTaps>=120)reward=50;
else if(minigameTaps>=80)reward=25;
else if(minigameTaps>=50)reward=10;
else if(minigameTaps>=30)reward=5;
if(reward>0){addCrystals(reward);updateUI();}
if(isNewRecord){if(resultEl){resultEl.textContent="🎉 НОВЫЙ РЕКОРД! "+minigameTaps+" тапов! +"+reward+" 💎";resultEl.className="win";}}
else{if(resultEl){resultEl.textContent="Тапов: "+minigameTaps+". "+(reward>0?("Награда: +"+reward+" 💎"):"Попробуй ещё!");resultEl.className="";}}
playSound(reward>0?"achievement":"ui");checkAchievements();saveGame();resetMinigameUI();}

// === ГЛОБАЛЬНЫЕ УЛУЧШЕНИЯ ===
function buildGlobalEffectText(gu){
var total=gu.amount*gu.count;
if(gu.count===0)return "Сейчас: не активно";
if(gu.effect==="click")return "Сейчас: +"+total+" к клику";
if(gu.effect==="bloodShard")return "Сейчас: +"+(total*100).toFixed(0)+"% к шансу";
if(gu.effect==="absoluteMult"||gu.effect==="genesisMult")return "Сейчас: +"+(total*100).toFixed(0)+"% к прибыли";
return "";}
function renderGlobalShop(){
var list=$("global-shop-list");if(!list){console.warn("global-shop-list не найден");return;}
list.innerHTML="";
for(var id in globalUpgrades){
var gu=globalUpgrades[id];
var isMax=gu.count>=gu.maxLevel;
var div=document.createElement("div");div.className="item";
var nextCost=isMax?"—":formatNumber(gu.cost);
var btnHtml=isMax?'<button class="buy" disabled style="background:#4caf50;color:#fff">✓ Максимум</button>':'<button class="buy" data-gid="'+id+'">Купить: '+nextCost+'</button>';
var effectText=buildGlobalEffectText(gu);
div.innerHTML='<div class="info">'+'<div class="name">'+gu.name+'</div>'+'<div class="desc">'+gu.desc+'</div>'+'<div class="owned">Уровень: <span id="gowned-'+id+'">'+gu.count+'</span> / '+gu.maxLevel+'</div>'+'<div class="owned" style="color:#4fc3f7">'+effectText+'</div>'+'</div>'+'<div class="right">'+btnHtml+'</div>';
list.appendChild(div);}
document.querySelectorAll(".buy[data-gid]").forEach(function(btn){btn.onclick=function(){var id=btn.dataset.gid;var gu=globalUpgrades[id];if(!gu)return;if(gu.count>=gu.maxLevel)return;if(coins>=gu.cost){coins-=gu.cost;gu.count++;gu.cost=Math.floor(gu.baseCost*Math.pow(GLOBAL_UPGRADE_COST_MULT,gu.count));playSound("ui");vibrate(10);updateUI();renderGlobalShop();checkAchievements();saveGame();}};});}
function updateGlobalShopUI(){
for(var id in globalUpgrades){var gu=globalUpgrades[id];var el=$("gowned-"+id);if(el)el.textContent=gu.count;var btn=document.querySelector('.buy[data-gid="'+id+'"]');if(btn){if(gu.count>=gu.maxLevel){btn.disabled=true;btn.textContent="✓ Максимум";btn.style.background="#4caf50";btn.style.color="#fff";}else{btn.disabled=coins<gu.cost;}}}}

// === ГУЛАУ ===
function startGulau(){gulauActive=true;gulauTimer=15*60;$("gulau-info").style.display="block";updateGulauTimer();}
function updateGulauTimer(){var el=$("gulau-timer");if(el&&gulauActive){var m=Math.floor(gulauTimer/60);var s=gulauTimer%60;el.textContent=m+":"+(s<10?"0":"")+s;}}
function endGulau(){gulauActive=false;gulauTimer=0;$("gulau-info").style.display="none";}

// === ЭКСПОРТ/ИМПОРТ ===
function exportSave(){
try{
var raw=localStorage.getItem(SAVE_KEY);
if(!raw){alert("Нет сохранения для экспорта.");return;}
var data=JSON.parse(raw);
data.exportDate=Date.now();
try{var skinsRaw=localStorage.getItem("clicker-skins");if(skinsRaw)data._skins=JSON.parse(skinsRaw);}catch(e){}
try{var promosRaw=localStorage.getItem("clicker-used-promos");if(promosRaw)data._usedPromos=JSON.parse(promosRaw);}catch(e){}
try{var settingsRaw=localStorage.getItem("clicker-settings");if(settingsRaw)data._settings=JSON.parse(settingsRaw);}catch(e){}
data._boostersStorage={};for(var bid in BOOSTERS){data._boostersStorage[bid]=BOOSTERS[bid].storage||0;}
data._emojiSkinsOwned={};for(var esid in EMOJI_SKINS){data._emojiSkinsOwned[esid]=EMOJI_SKINS[esid].owned||false;}
data._skinsOwned={};for(var sid in skins){data._skinsOwned[sid]=skins[sid].owned||false;}
data._bgOwned={};for(var bgid in BACKGROUNDS){data._bgOwned[bgid]=BACKGROUNDS[bgid].owned||false;}
data._activeBg=activeBg;data._activeSkin=activeSkin;data._activeEmojiSkin=activeEmojiSkin;
data._dailyLastUsed=dailyLastUsed;data._minigameBest=minigameBest;data._minigameLastUsed=minigameLastUsed;
var json=JSON.stringify(data);
var encoded=btoa(unescape(encodeURIComponent(json)));
var box=$("export-box"),text=$("export-text");
if(box&&text){text.value=encoded;box.classList.remove("hidden");}
}catch(e){alert("Ошибка экспорта: "+e.message);}}
function copyExport(){var text=$("export-text");if(!text)return;text.select();text.setSelectionRange(0,999999);try{document.execCommand("copy");alert("✅ Скопировано!");}catch(e){try{navigator.clipboard.writeText(text.value);alert("✅ Скопировано!");}catch(err){alert("Не удалось скопировать. Выделите текст и скопируйте вручную.");}}}
function importSave(){
var text=$("import-text"),result=$("import-result");if(!text||!result)return;
var code=text.value.trim();result.className="";
if(!code){result.textContent="Вставьте код сохранения.";result.classList.add("error");return;}
try{
var json=decodeURIComponent(escape(atob(code)));
var data=JSON.parse(json);
if(!data||typeof data.coins==="undefined")throw new Error("Неверный формат");
if(!confirm("⚠️ Текущий прогресс будет заменён.\nПродолжить?"))return;
window.__resetting=true;
if(data._skins){try{localStorage.setItem("clicker-skins",JSON.stringify(data._skins));}catch(e){}}
if(data._usedPromos){try{localStorage.setItem("clicker-used-promos",JSON.stringify(data._usedPromos));}catch(e){}}
else if(data.usedPromos){try{localStorage.setItem("clicker-used-promos",JSON.stringify(data.usedPromos));}catch(e){}}
if(data._settings){try{localStorage.setItem("clicker-settings",JSON.stringify(data._settings));}catch(e){}}
if(data._boostersStorage)data.boostersStorage=data._boostersStorage;
if(data._emojiSkinsOwned)data.emojiSkinsOwned=data._emojiSkinsOwned;
if(data._skinsOwned)data.skinsOwned=data._skinsOwned;
if(data._bgOwned)data.bgOwned=data._bgOwned;
if(data._activeBg)data.activeBg=data._activeBg;
if(data._activeSkin)data.activeSkin=data._activeSkin;
if(data._activeEmojiSkin!==undefined)data.activeEmojiSkin=data._activeEmojiSkin;
if(data._dailyLastUsed)data.dailyLastUsed=data._dailyLastUsed;
if(typeof data._minigameBest==="number")data.minigameBest=data._minigameBest;
if(data._minigameLastUsed)data.minigameLastUsed=data._minigameLastUsed;
delete data._skins;delete data._usedPromos;delete data._settings;
delete data._boostersStorage;delete data._emojiSkinsOwned;delete data._skinsOwned;
delete data._bgOwned;delete data._activeBg;delete data._activeSkin;delete data._activeEmojiSkin;
delete data._dailyLastUsed;delete data._minigameBest;delete data._minigameLastUsed;
localStorage.setItem(SAVE_KEY,JSON.stringify(data));
result.textContent="✅ Прогресс загружен! Перезагрузка...";result.classList.add("success");
setTimeout(function(){location.reload();},800);
}catch(e){result.textContent="❌ Ошибка: "+e.message;result.classList.add("error");}}

// === ЕЖЕДНЕВНЫЙ БОНУС ===
function checkDailyBonus(){
if(!settings.showDaily)return;var last=localStorage.getItem("lastDaily");var streak=parseInt(localStorage.getItem("dailyStreak")||"0");var now=Date.now();var oneDay=24*60*60*1000;
if(!last||now-parseInt(last)>=oneDay){
if(last&&now-parseInt(last)>2*oneDay)streak=0;
streak+=1;var bonus=Math.max(100,Math.floor(getCPS()*60));coins+=bonus;totalEarned+=bonus;
var text="🎁 Ежедневный бонус (день "+streak+"): "+formatNumber(bonus)+" монет!";
if(streak%7===0){addCrystals(5);text+="\n💎 +5 кристаллов за серию 7 дней!";}
localStorage.setItem("lastDaily",now.toString());localStorage.setItem("dailyStreak",streak.toString());
setTimeout(function(){alert(text);updateUI();},500);}}

// === ИВЕНТЫ ===
var EVENTS={
rain:{name:"💰 Монетный дождь",mult:1.5,duration:180,color:"#4caf50"},
storm:{name:"⚡ Молниеносный потенциал",mult:1.8,duration:120,color:"#ffc107"},
fast:{name:"🏃 Быстрый способ",mult:1.3,duration:300,color:"#2196f3"},
income:{name:"💵 Заработок",mult:1.2,duration:240,color:"#9c27b0"}};
function getSlotStartMs(now){var d=new Date(now);var slotMin=Math.floor(d.getMinutes()/15)*15;d.setMinutes(slotMin,0,0);return d.getTime();}
function getEventKeyForSlot(slotStartMs){var keys=Object.keys(EVENTS);var idx=Math.abs(slotStartMs/1000|0)%keys.length;return keys[idx];}
function startEventByKey(key,secondsLeft){
if(!EVENTS[key])return;
var ev=EVENTS[key];
currentEventKey=key;eventMultiplier=ev.mult;eventName=ev.name;eventTimer=secondsLeft;
var banner=$("event-banner");
if(banner){banner.style.background="linear-gradient(135deg, "+ev.color+", #000)";banner.classList.remove("hidden");}
updateEventBanner();updateUI();}
function endEvent(){eventTimer=0;eventMultiplier=1;eventName="";currentEventKey="";var banner=$("event-banner");if(banner)banner.classList.add("hidden");updateUI();saveGame();}
function updateEventBanner(){var banner=$("event-banner");if(!banner)return;if(!currentEventKey||eventTimer<=0){banner.classList.add("hidden");return;}var ev=EVENTS[currentEventKey];if(!ev){banner.classList.add("hidden");return;}var m=Math.floor(eventTimer/60);var s=eventTimer%60;banner.textContent=ev.name+" x"+ev.mult+" — "+m+":"+(s<10?"0":"")+s;banner.classList.remove("hidden");}
function updateEvent(){
var nowMs=Date.now();var PERIOD=15*60*1000;
var slotStart=getSlotStartMs(nowMs);
var anyActive=false;var activeKey=null;var activeSecondsLeft=0;
var slotsToCheck=[slotStart,slotStart-PERIOD];
for(var i=0;i<slotsToCheck.length;i++){
var slot=slotsToCheck[i];var key=getEventKeyForSlot(slot);var ev=EVENTS[key];if(!ev)continue;
var endMs=slot+ev.duration*1000;
if(nowMs>=slot&&nowMs<endMs){var secLeft=Math.floor((endMs-nowMs)/1000);if(secLeft>0){anyActive=true;activeKey=key;activeSecondsLeft=secLeft;break;}}
}
if(anyActive){if(currentEventKey!==activeKey){startEventByKey(activeKey,activeSecondsLeft);}else{eventTimer=activeSecondsLeft;updateEventBanner();}}
else{if(currentEventKey||eventTimer>0){endEvent();}}}

// === КРОВАВАЯ ЛУНА ===
function isBloodMoonTime(){var d=new Date();var mins=d.getMinutes();var h=d.getHours();return (h%3===0)&&(mins<30);}
function startBloodMoon(){
bloodMoonActive=true;
var d=new Date();var mins=d.getMinutes();var secs=d.getSeconds();
bloodMoonTimer=Math.max(0,(30-mins)*60-secs);
document.body.classList.add("blood-moon");$("blood-info").style.display="block";
var banner=document.createElement("div");banner.className="blood-banner";banner.innerHTML="🌕 КРОВАВАЯ ЛУНА 🌕<br>Доход x2!";banner.id="blood-banner";
document.body.appendChild(banner);setTimeout(function(){var b=$("blood-banner");if(b)b.remove();},5000);
playSound("ui");updateUI();}
function endBloodMoon(){bloodMoonActive=false;bloodMoonTimer=0;document.body.classList.remove("blood-moon");$("blood-info").style.display="none";var b=$("blood-banner");if(b)b.remove();}
function updateBloodMoon(){
var inTime=isBloodMoonTime();
if(inTime&&!bloodMoonActive)startBloodMoon();
if(!inTime&&bloodMoonActive)endBloodMoon();
if(bloodMoonActive){var d=new Date();var mins=d.getMinutes();var secs=d.getSeconds();bloodMoonTimer=(30-mins)*60-secs;
var timerEl=$("blood-timer");if(timerEl){var m=Math.floor(bloodMoonTimer/60);var s=bloodMoonTimer%60;timerEl.textContent=m+":"+(s<10?"0":"")+s;}}}

// === КРАЖА ===
function getTheftKey(){var d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getHours();}
function isTheftTime(){var d=new Date();var h=d.getHours();var m=d.getMinutes();return (h===11||h===19)&&(m<10);}
function saveTheftState(){try{localStorage.setItem("clicker-theft-state",JSON.stringify({active:theftActive,timer:theftTimer,lost:theftTotalLost,key:lastTheftKey,savedAt:Date.now()}));}catch(e){}}
function clearTheftState(){try{localStorage.removeItem("clicker-theft-state");}catch(e){}}
function loadTheftState(){
try{var raw=localStorage.getItem("clicker-theft-state");if(!raw)return false;var data=JSON.parse(raw);
if(!data||!data.active)return false;
if(data.key!==getTheftKey()){clearTheftState();return false;}
if(data.timer<=0){clearTheftState();return false;}
var elapsedSec=Math.floor((Date.now()-(data.savedAt||Date.now()))/1000);
var remaining=data.timer-elapsedSec;
if(remaining<=0){clearTheftState();return false;}
startTheft(remaining,data.lost||0);
return true;
}catch(e){return false;}}
function startTheft(resumeTimer,resumeLost){
if(theftActive)return;
theftActive=true;theftTotalLost=resumeLost||0;
theftTimer=(typeof resumeTimer==="number"&&resumeTimer>0)?resumeTimer:THEFT_DURATION;
if(theftTickTimer)clearInterval(theftTickTimer);
theftTickTimer=setInterval(function(){
if(!theftActive)return;
theftTimer--;
if(theftTimer<=0){endTheft();return;}
if(theftTimer%THEFT_TICK_INTERVAL===0){var lost=Math.floor(coins*THEFT_PERCENT);if(lost>0){coins-=lost;theftTotalLost+=lost;showTheftLossPopup(lost);updateUI();saveTheftState();}}
updateTheftBanner();
},1000);
var banner=$("theft-banner");
if(!banner){banner=document.createElement("div");banner.id="theft-banner";banner.className="blood-banner";banner.style.background="linear-gradient(135deg,#4a0000,#8b0000,#b71c1c)";banner.style.top="auto";banner.style.bottom="20px";banner.innerHTML="🚨 КРАЖА! 🚨<br><span id='theft-timer-txt'>10:00</span> · Украдено: <span id='theft-lost-txt'>0</span>";document.body.appendChild(banner);}
if(!resumeTimer){playSound("alarm");var popup=document.createElement("div");popup.className="achievement-popup";popup.style.background="linear-gradient(135deg,#8b0000,#b71c1c)";popup.style.color="#fff";popup.textContent="🚨 Ивент «КРАЖА» начался! Потеряно будет ~22% монет.";document.body.appendChild(popup);setTimeout(function(){popup.remove();},5000);}
saveTheftState();}
function endTheft(){
theftActive=false;
if(theftTickTimer){clearInterval(theftTickTimer);theftTickTimer=null;}
clearTheftState();
var banner=$("theft-banner");if(banner)banner.remove();
var popup=document.createElement("div");popup.className="achievement-popup";popup.style.background="linear-gradient(135deg,#4a0000,#b71c1c)";popup.style.color="#fff";popup.textContent="🚨 Кража закончилась. Всего украдено: "+formatNumber(theftTotalLost)+" монет";document.body.appendChild(popup);setTimeout(function(){popup.remove();},6000);
theftTotalLost=0;
updateUI();saveGame();}
function updateTheftBanner(){var t=$("theft-timer-txt"),l=$("theft-lost-txt");if(t){var m=Math.floor(theftTimer/60);var s=theftTimer%60;t.textContent=m+":"+(s<10?"0":"")+s;}if(l)l.textContent=formatNumber(theftTotalLost);}
function showTheftLossPopup(amount){var popup=document.createElement("div");popup.className="achievement-popup";popup.style.background="linear-gradient(135deg,#4a0000,#b71c1c)";popup.style.color="#fff";popup.style.top="60px";popup.style.left="auto";popup.style.right="20px";popup.style.transform="none";popup.textContent="🚨 −"+formatNumber(amount);document.body.appendChild(popup);setTimeout(function(){popup.remove();},2500);}
function updateTheft(){
var now=new Date();var h=now.getHours();var m=now.getMinutes();var s=now.getSeconds();
var inTime=(h===11||h===19)&&(m<10);
if(inTime){var elapsed=m*60+s;var remaining=THEFT_DURATION-elapsed;var key=getTheftKey();
if(!theftActive){if(remaining>0){lastTheftKey=key;startTheft(remaining,0);}}
else{if(remaining>0&&theftTimer!==remaining){theftTimer=remaining;updateTheftBanner();}}}
else{if(theftActive)endTheft();}}
function restoreTheftIfNeeded(){if(theftRestored)return;theftRestored=true;loadTheftState();}

// === ПРОМОКОДЫ ===
var PROMOS={
"BLOOD":{reward:function(){shards+=10;return "🌑 +10 кровавых осколков!";}},
"CRYSTAL":{reward:function(){addCrystals(20);return "💎 +20 кристаллов!";}},
"GOLD2024":{reward:function(){coins+=100000;totalEarned+=100000;return "💰 +100 000 монет!";}},
"SECRET":{reward:function(){skins.ruby.owned=true;saveSkins();renderSkins();return "🔴 Открыт скин «Рубиновый»!";}},
"ARTEM":{reward:function(){addCrystals(50);shards+=5;return "💎 +50 кристаллов и 🌑 +5 осколков!";}},
"#GULAU":{reward:function(){startGulau();return "🔥 #Gulau активирован! ×5 тапов на 15 минут!";}},
"CHEST":{reward:function(){resetChestCooldown();return "🎁 Сундук снова доступен!";}},
"#PAHAN":{reward:function(){unlockPahan();return "🔥 Автокликер от Pahi разблокирован! Смотри в Настройках.";}},
"COINS":{reward:function(){coins+=1000000;totalEarned+=1000000;return "💰 +1 000 000 монет!";}},
"MONEY":{reward:function(){coins+=100000000;totalEarned+=100000000;return "💰 +100 000 000 монет!";}},
"GOLD":{reward:function(){coins+=1000000000;totalEarned+=1000000000;return "💰 +1 000 000 000 монет!";}},
"GEMS":{reward:function(){addCrystals(25);return "💎 +25 кристаллов!";}},
"DIAMOND":{reward:function(){addCrystals(50);return "💎 +50 кристаллов!";}},
"BLOOD2":{reward:function(){shards+=15;return "🌑 +15 кровавых осколков!";}},
"SHARDS":{reward:function(){shards+=30;return "🌑 +30 кровавых осколков!";}},
"LEGEND":{reward:function(){coins+=10000000;totalEarned+=10000000;addCrystals(10);shards+=5;return "🏆 +10M монет, +10 💎, +5 🌑!";}},
"SMILE":{reward:function(){smileSkinUnlocked=true;smileSkinActive=true;renderSmileSkins();updateDepositSideButton();var modal=$("modal-deposit");if(modal&&!modal.classList.contains("hidden"))renderDeposit();return "🎭 Скин смайлика вклада открыт и активирован!";}},
"#GENNADII":{reward:function(){skins.gennadii.owned=true;saveSkins();renderSkins();return "🔥 Открыт эксклюзивный скин кнопки «GENNADII»!";}},
"KROCHLUPIC":{reward:function(){var amount=3.5e27;coins+=amount;totalEarned+=amount;return "💰 +3.5 Oc монет!";}},
"SUPERKROCH":{reward:function(){var amount=4.5e30;coins+=amount;totalEarned+=amount;return "💰 +4.5 No монет!";}}};
function activatePromo(){
var input=$("promo-input"),result=$("promo-result");if(!input||!result)return;
var code=input.value.trim().toUpperCase();result.className="";
if(!code){result.textContent="Введите код.";result.classList.add("error");return;}
if(!PROMOS[code]){var alt=code.indexOf("#")===0?code.slice(1):("#"+code);if(PROMOS[alt])code=alt;}
if(usedPromos[code]){result.textContent="Этот код уже использован.";result.classList.add("error");return;}
if(!PROMOS[code]){result.textContent="Неверный код.";result.classList.add("error");return;}
var text=PROMOS[code].reward();usedPromos[code]=true;result.textContent=text;result.classList.add("success");input.value="";
playSound("achievement");vibrate(20);updateUI();renderSkins();saveGame();}

// === PAHAN ===
function unlockPahan(){pahanUnlocked=true;updatePahanButton();saveGame();}
function updatePahanButton(){var btn=$("pahan-btn");if(!btn)return;if(!pahanUnlocked)btn.classList.add("hidden");else btn.classList.remove("hidden");}
function activatePahan(){
if(!pahanUnlocked)return;if(pahanActive)return;
pahanActive=true;pahanTimer=PAHAN_DURATION;
var btn=$("pahan-btn");if(btn){btn.classList.add("hidden");btn.disabled=true;}
playSound("achievement");
var popup=document.createElement("div");popup.className="achievement-popup";popup.textContent="🔥 Автокликер от Pahi запущен на 10 секунд!";
document.body.appendChild(popup);setTimeout(function(){popup.remove();},3000);
if(pahanTickInterval)clearInterval(pahanTickInterval);
pahanTickInterval=setInterval(function(){if(!pahanActive)return;coins+=PAHAN_REWARD_PER_TAP;totalEarned+=PAHAN_REWARD_PER_TAP;totalTaps+=1;addQuestProgress("taps",1);addQuestProgress("earn",PAHAN_REWARD_PER_TAP);updateUI();},500);
if(pahanTimerInterval)clearInterval(pahanTimerInterval);
pahanTimerInterval=setInterval(function(){if(!pahanActive){clearInterval(pahanTimerInterval);pahanTimerInterval=null;return;}pahanTimer--;
if(pahanTimer<=0){clearInterval(pahanTimerInterval);pahanTimerInterval=null;stopPahan();}},1000);}
function stopPahan(){
pahanActive=false;pahanTimer=0;
if(pahanTickInterval){clearInterval(pahanTickInterval);pahanTickInterval=null;}
if(pahanTimerInterval){clearInterval(pahanTimerInterval);pahanTimerInterval=null;}
pahanUnlocked=false;updatePahanButton();
var popup=document.createElement("div");popup.className="achievement-popup";popup.textContent="⏸️ Pahan остановлен. Автокликер использован.";
document.body.appendChild(popup);setTimeout(function(){popup.remove();},2500);
saveGame();}

// === ЛОГО-СЕКРЕТ ===
function setupLogoSecret(){
var logo=$("logo");if(!logo)return;
logo.onclick=function(){
if(Date.now()<logoCooldown)return;logoClicks++;
if(logoClickTimer)clearTimeout(logoClickTimer);
logoClickTimer=setTimeout(function(){logoClicks=0;},1500);
if(logoClicks>=7){logoClicks=0;logoCooldown=Date.now()+10*60*1000;shards+=5;addCrystals(1);
logo.style.transition="transform 0.3s, color 0.3s";logo.style.transform="scale(1.2)";logo.style.color="#ff1744";
setTimeout(function(){logo.style.transform="scale(1)";logo.style.color="";},400);
var popup=document.createElement("div");popup.className="achievement-popup";popup.textContent="🌑 Секрет активирован! +5 осколков, +1 кристалл";
document.body.appendChild(popup);setTimeout(function(){popup.remove();},3000);
playSound("achievement");vibrate(15);updateUI();saveGame();}};}

// === КЛИКЕР 67 ===
var SECRET_TAPS_NEEDED=6767,SECRET_ACTIVATION_COST=67000000000000000000;
function setupAdvancedButton(){var btn=$("advanced-btn");if(!btn)return;btn.onclick=function(){var sure=confirm("⚠️ Уверены, что хотите это видеть?");if(!sure)return;var reallySure=confirm("⚠️⚠️ Точно?");if(!reallySure)return;openSecretMenu();};}
function openSecretMenu(){var modal=$("modal-secret");if(!modal)return;var sm=$("modal-settings");if(sm)sm.classList.add("hidden");updateSecretUI();modal.classList.remove("hidden");syncScrollLock();}
function updateSecretUI(){
var locked=$("secret-locked"),unlockedEl=$("secret-unlocked"),tapsEl=$("secret-taps"),progressEl=$("secret-progress"),toggleBtn=$("secret-toggle"),statusEl=$("secret-status");
if(!locked||!unlockedEl)return;
if(secretUnlocked){locked.style.display="none";unlockedEl.style.display="block";
if(secretAutoClicker){toggleBtn.textContent="🔥 Активировать ещё (67 Qa)";toggleBtn.classList.remove("secret-on");toggleBtn.classList.add("secret-off");toggleBtn.disabled=true;var m=Math.floor(secretAutoClickerTimer/60);var s=secretAutoClickerTimer%60;statusEl.textContent="🔥 Автокликер активен — 67 кликов/сек. Осталось: "+m+":"+(s<10?"0":"")+s;statusEl.style.color="#4caf50";}
else{toggleBtn.textContent="🔥 Активировать (67 Qa)";toggleBtn.classList.remove("secret-off");toggleBtn.classList.add("secret-on");toggleBtn.disabled=coins<SECRET_ACTIVATION_COST;statusEl.textContent="Разблокирован. Активация: 67 Qa за 30 минут.";statusEl.style.color="#aaa";}}
else{locked.style.display="block";unlockedEl.style.display="none";if(tapsEl)tapsEl.textContent=formatNumber(totalTaps);var percent=Math.min(100,(totalTaps/SECRET_TAPS_NEEDED)*100);if(progressEl)progressEl.style.width=percent+"%";}}
function tryUnlockSecret(){
if(secretUnlocked)return;
if(totalTaps<SECRET_TAPS_NEEDED){var left=SECRET_TAPS_NEEDED-totalTaps;alert("❌ Ещё рано!\nНужно сделать "+formatNumber(SECRET_TAPS_NEEDED)+" тапов.\nОсталось: "+formatNumber(left));return;}
secretUnlocked=true;playSound("achievement");var popup=document.createElement("div");popup.className="achievement-popup";popup.textContent="🔥 Кликер 67 разблокирован!";document.body.appendChild(popup);setTimeout(function(){popup.remove();},4000);updateSecretUI();saveGame();}
function activateSecretAutoClicker(){if(!secretUnlocked)return;if(secretAutoClicker)return;if(coins<SECRET_ACTIVATION_COST){alert("❌ Недостаточно монет!\nНужно: 67 Qa\nУ вас: "+formatNumber(coins));return;}coins-=SECRET_ACTIVATION_COST;secretAutoClicker=true;secretAutoClickerTimer=30*60;startSecretAutoClicker();playSound("achievement");updateSecretUI();updateUI();saveGame();}
function startSecretAutoClicker(){if(secretClickerInterval)return;secretClickerInterval=setInterval(function(){if(!checkTapLimit())return;var value=getClickValue();var add=value*2;coins+=add;totalEarned+=add;var tapsToAdd=gulauActive?10:2;totalTaps+=tapsToAdd;var shardChanceAC=0.02+globalUpgrades.bloodLuck.count*globalUpgrades.bloodLuck.amount;if(bloodMoonActive&&Math.random()<shardChanceAC)shards+=1;updateUI();},30);}
function stopSecretAutoClicker(){if(secretClickerInterval){clearInterval(secretClickerInterval);secretClickerInterval=null;}secretAutoClicker=false;secretAutoClickerTimer=0;}

// === УТИЛИТЫ ===
function formatTime(seconds){if(seconds<60)return seconds+" с";if(seconds<3600)return Math.floor(seconds/60)+" мин";var h=Math.floor(seconds/3600);var m=Math.floor((seconds%3600)/60);return h+" ч "+m+" мин";}
function getCPS(){
var cps=0;
for(var id in upgrades){if(upgrades[id].effect==="auto"){var amount=upgrades[id].count*upgrades[id].amount;if(id==="genesis"){amount*=1+globalUpgrades.genesisBoost.count*globalUpgrades.genesisBoost.amount;}else if(id==="absolute"){amount*=1+globalUpgrades.absoluteBoost.count*globalUpgrades.absoluteBoost.amount;}cps+=amount;}}
var moonBonus=bloodMoonActive?2:1;
var petBonus=1+(typeof petGetIncomeBonus==="function"?petGetIncomeBonus():0);
var superBonus=(typeof superEventActive!=="undefined"&&superEventActive)?superEventCoinMult:1;
return cps*goldenMultiplier*moonBonus*eventMultiplier*crystalBoostMultiplier*getItemBonus()*petBonus*superBonus;}
function getClickValue(){
var base=coinsPerClick+getCPS()*0.05+globalUpgrades.superClicker.count;
var moonBonus=bloodMoonActive?2:1;
var petBonus=1+(typeof petGetIncomeBonus==="function"?petGetIncomeBonus():0);
var superBonus=(typeof superEventActive!=="undefined"&&superEventActive)?superEventTapMult:1;
return base*goldenMultiplier*moonBonus*eventMultiplier*crystalBoostMultiplier*getItemBonus()*petBonus*superBonus;}

// === ЗОЛОТАЯ МОНЕТКА ===
function spawnGoldenCoin(){
if(!settings.showGolden)return;if($("golden-coin"))return;
var coin=document.createElement("div");coin.id="golden-coin";coin.textContent="🪙";
coin.style.left=Math.random()*Math.max(0,window.innerWidth-80)+"px";coin.style.top=Math.random()*Math.max(0,window.innerHeight-80)+"px";
coin.onclick=function(){goldenMultiplier=7;goldenTimer=30;var text="🌟 x7 доход на 30 секунд!";if(Math.random()<0.2){addCrystals(1);text="🌟 x7 доход + 💎 1 кристалл!";}var banner=document.createElement("div");banner.id="golden-bonus";banner.textContent=text;document.body.appendChild(banner);playSound("ui");coin.remove();addQuestProgress("golden",1);updateUI();saveGame();};
document.body.appendChild(coin);
setTimeout(function(){if(coin.parentNode)coin.remove();},8000);}

// === СЕКРЕТНЫЙ ЗОЛОТОЙ ТАП ===
var goldenSecretTimer=null,goldenSecretActive=false,_lastGoldenSecretSlot=-1;
function startGoldenSecretSchedule(){if(goldenSecretTimer)clearInterval(goldenSecretTimer);goldenSecretTimer=setInterval(function(){if(goldenSecretActive)return;var d=new Date();var m=d.getMinutes();var h=d.getHours();if(m===0||m===30){var slot=h*2+(m===30?1:0);if(slot!==_lastGoldenSecretSlot){_lastGoldenSecretSlot=slot;activateGoldenSecret();}}},5000);}
function activateGoldenSecret(){if(goldenSecretActive)return;goldenSecretActive=true;var btn=$("click-btn");if(btn)btn.classList.add("golden-tap");setTimeout(function(){deactivateGoldenSecret();},30*1000);}
function deactivateGoldenSecret(){goldenSecretActive=false;var btn=$("click-btn");if(btn)btn.classList.remove("golden-tap");}
function onGoldenSecretTap(){if(!goldenSecretActive)return false;goldenSecretActive=false;var btn=$("click-btn");if(btn)btn.classList.remove("golden-tap");addCrystals(1);if(!unlocked._goldenSecretCount)unlocked._goldenSecretCount=0;unlocked._goldenSecretCount++;var popup=document.createElement("div");popup.className="achievement-popup";popup.style.background="linear-gradient(135deg,#ffd54f,#ff8f00)";popup.style.color="#1a1a2e";popup.textContent="✨ Золотой тап! +1 💎 (всего: "+unlocked._goldenSecretCount+")";document.body.appendChild(popup);setTimeout(function(){popup.remove();},3500);playSound("achievement");updateUI();checkAchievements();saveGame();return true;}

// === ЭФФЕКТЫ ===
function showFloatPlus(x,y,amount){if(!settings.showFloat)return;var el=document.createElement("div");el.className="float-plus";if(amount<1000)el.classList.add("color-small");else if(amount<1000000)el.classList.add("color-medium");else if(amount<1000000000)el.classList.add("color-large");else el.classList.add("color-huge");el.textContent="+"+formatNumber(amount);el.style.left=x+"px";el.style.top=y+"px";document.body.appendChild(el);setTimeout(function(){el.remove();},800);}
function spawnTapParticles(x,y){var now=Date.now();if(window.__lastParticleTime&&now-window.__lastParticleTime<250)return;window.__lastParticleTime=now;var count=settings.lowParticles?2:(3+Math.floor(Math.random()*2));for(var i=0;i<count;i++){var p=document.createElement("div");p.className="tap-particle";p.textContent="⭐";var angle=(Math.PI*2/count)*i+(Math.random()*0.6-0.3);var dist=40+Math.random()*35;p.style.setProperty("--dx",(Math.cos(angle)*dist)+"px");p.style.setProperty("--dy",(Math.sin(angle)*dist)+"px");p.style.setProperty("--rot",(Math.random()*720-360)+"deg");p.style.left=x+"px";p.style.top=y+"px";p.style.fontSize=(10+Math.random()*6)+"px";document.body.appendChild(p);setTimeout(function(){p.remove();},600);}}
function pulseCounter(){var el=$("counter");if(!el)return;var nowPulse=Date.now();if(window.__pulseCooldown&&nowPulse-window.__pulseCooldown<200&&nowPulse>=window.__pulseCooldown)return;window.__pulseCooldown=nowPulse;el.classList.remove("pulse");void el.offsetWidth;el.classList.add("pulse");setTimeout(function(){el.classList.remove("pulse");},200);}
function setCoinsAnimated(newValue){var el=$("coins");if(!el)return;var current=lastDisplayedCoins;if(newValue<=current){el.textContent=formatNumber(newValue);lastDisplayedCoins=newValue;return;}var diff=newValue-current;if(diff<50){el.textContent=formatNumber(newValue);lastDisplayedCoins=newValue;return;}var steps=Math.min(12,Math.max(3,Math.floor(diff/500)+3));var step=0;var startValue=current;if(window.__coinsAnimInterval){clearInterval(window.__coinsAnimInterval);window.__coinsAnimInterval=null;}window.__coinsAnimInterval=setInterval(function(){step++;if(step>=steps){el.textContent=formatNumber(newValue);lastDisplayedCoins=newValue;clearInterval(window.__coinsAnimInterval);window.__coinsAnimInterval=null;return;}var v=startValue+(diff*(step/steps));el.textContent=formatNumber(v);lastDisplayedCoins=v;},50);}
function showShardDrop(x,y){var el=document.createElement("div");el.className="shard-drop";el.textContent="🌑 +1 осколок!";el.style.left=x+"px";el.style.top=y+"px";document.body.appendChild(el);setTimeout(function(){el.remove();},1500);}

// === ДОСТИЖЕНИЯ ===
var achFilter="all";
function isAchievementKey(key){return key.charAt(0)!=="_";}
function renderAchievements(){
var list=$("achievements-list");if(!list)return;list.innerHTML="";
var counts={bronze:0,silver:0,gold:0,none:0,ub:0,us:0,ug:0,un:0};
achievements.forEach(function(a){var tier=a.tier||"none";var totalKey=tier==="bronze"?"bronze":tier==="silver"?"silver":tier==="gold"?"gold":"none";counts[totalKey]++;if(unlocked[a.id]){var uKey=tier==="bronze"?"ub":tier==="silver"?"us":tier==="gold"?"ug":"un";counts[uKey]++;}});
var summary=document.createElement("div");summary.className="ach-summary";
summary.innerHTML='<div class="ach-sum-item bronze">🥉 Бронза: <b>'+counts.ub+' / '+counts.bronze+'</b></div>'+'<div class="ach-sum-item silver">🥈 Серебро: <b>'+counts.us+' / '+counts.silver+'</b></div>'+'<div class="ach-sum-item gold">🥇 Золото: <b>'+counts.ug+' / '+counts.gold+'</b></div>';
list.appendChild(summary);
achievements.forEach(function(a){
if(achFilter!=="all"&&(a.tier||"none")!==achFilter)return;
var div=document.createElement("div");var classes="achievement";
if(unlocked[a.id])classes+=" unlocked";
if(a.tier)classes+=" tier-"+a.tier;
div.className=classes;
var tierBadge=a.tier==="gold"?"🥇":a.tier==="silver"?"🥈":a.tier==="bronze"?"🥉":"";
var reward=a.tier==="gold"?5:a.tier==="silver"?3:1;
div.innerHTML='<div class="icon">'+a.icon+'</div>'+'<div class="info">'+'<div class="title">'+(tierBadge?tierBadge+" ":"")+a.title+'</div>'+'<div class="desc">'+a.desc+' · +'+reward+' 💎</div>'+'</div>';
list.appendChild(div);});}
function setupAchFilters(){var btns=document.querySelectorAll(".ach-filter");btns.forEach(function(btn){btn.onclick=function(){btns.forEach(function(b){b.classList.remove("active");});btn.classList.add("active");achFilter=btn.dataset.tier||"all";renderAchievements();};});}
function checkAchievements(){
var didUnlock=false;
achievements.forEach(function(a){
if(!unlocked[a.id]&&a.check()){
unlocked[a.id]=true;
var reward=a.tier==="gold"?5:a.tier==="silver"?3:1;
addCrystals(reward);
showAchievementPopup(a,reward);
didUnlock=true;
}
});
if(didUnlock)saveGame();
}
function showAchievementPopup(a,reward){var tierIcon=a.tier==="gold"?"🥇":a.tier==="silver"?"🥈":a.tier==="bronze"?"🥉":"";var popup=document.createElement("div");popup.className="achievement-popup";popup.textContent=(tierIcon?tierIcon+" ":"")+a.icon+" "+a.title+" (+"+reward+" 💎)";document.body.appendChild(popup);playSound("achievement");vibrate(20);setTimeout(function(){popup.remove();},2500);}

// === МАГАЗИН ===
function buildCpsLine(up){
var unit=(up.effect==="click")?"/тап":"/сек";
var current=up.count*up.amount;
var isMax=up.count>=UPGRADE_MAX_LEVEL;
if(isMax)return "<b>"+formatNumber(current)+unit+"</b>";
var next=current+up.amount;
return "<b>"+formatNumber(current)+unit+"</b> → "+formatNumber(next)+unit;}
function renderShop(){
var list=$("shop-list");if(!list)return;list.innerHTML="";
var milestones=[50,100,250,500];
for(var id in upgrades){var up=upgrades[id];var div=document.createElement("div");div.className="item";
var isMax=up.count>=UPGRADE_MAX_LEVEL;
var milestoneHtml="";
milestones.forEach(function(m){if(up.count>=m)milestoneHtml+='<span class="milestone-badge">🏅</span>';});
var multButtons='<div class="mult-row">';
multButtons+='<button class="mult-btn'+(buyMultiplier===1?" active":"")+'" data-mult="1" data-uid="'+id+'">×1</button>';
if(up.unlocked10){multButtons+='<button class="mult-btn'+(buyMultiplier===10?" active":"")+'" data-mult="10" data-uid="'+id+'">×10</button>';}
else{multButtons+='<button class="mult-btn locked" data-unlock10="'+id+'">×10 🔒'+BUY_UNLOCK_10+'💎</button>';}
if(up.unlocked25){multButtons+='<button class="mult-btn'+(buyMultiplier===25?" active":"")+'" data-mult="25" data-uid="'+id+'">×25</button>';}
else{multButtons+='<button class="mult-btn locked" data-unlock25="'+id+'">×25 🔒'+BUY_UNLOCK_25+'💎</button>';}
multButtons+='</div>';
var btnHtml=isMax?'<button class="buy" data-id="'+id+'" disabled style="background:#4caf50;color:#fff">✓ Максимум</button>':'<div class="buy-wrap">'+multButtons+'<button class="buy" data-id="'+id+'">Купить ×'+buyMultiplier+'</button></div>';
var costLine=isMax?'':' • 💰 <span id="cost-'+id+'">'+formatNumber(up.cost)+'</span>';
div.innerHTML='<div class="info">'+'<div class="name">'+up.name+' '+milestoneHtml+'</div>'+'<div class="desc">'+up.desc+'</div>'+'<div class="cps-info" id="cpsline-'+id+'">'+buildCpsLine(up)+'</div>'+'</div>'+'<div class="right">'+'<div class="owned">Куплено: <span id="owned-'+id+'">0</span> / '+UPGRADE_MAX_LEVEL+costLine+'</div>'+btnHtml+'</div>';
list.appendChild(div);}
document.querySelectorAll(".buy[data-id]").forEach(function(btn){btn.onclick=function(){
var id=btn.dataset.id;var up=upgrades[id];if(!up)return;
if(up.count>=UPGRADE_MAX_LEVEL)return;
var maxToBuy=buyMultiplier;
if(up.count+maxToBuy>UPGRADE_MAX_LEVEL)maxToBuy=UPGRADE_MAX_LEVEL-up.count;
var totalCost=0;
for(var i=0;i<maxToBuy;i++){totalCost+=Math.floor(up.baseCost*Math.pow(UPGRADE_COST_MULT,up.count+i));}
if(coins<totalCost){alert("Недостаточно монет!\nНужно: "+formatNumber(totalCost)+"\nУ вас: "+formatNumber(coins));return;}
coins-=totalCost;
for(var i=0;i<maxToBuy;i++){up.count++;if(up.effect==="click")coinsPerClick+=up.amount;}
up.cost=up.count>=UPGRADE_MAX_LEVEL?Infinity:Math.floor(up.baseCost*Math.pow(UPGRADE_COST_MULT,up.count));
addQuestProgress("upgrades",maxToBuy);playSound("ui");vibrate(10);updateUI();checkRewardTab();saveGame();
};});
document.querySelectorAll(".mult-btn[data-mult]").forEach(function(btn){btn.onclick=function(e){e.stopPropagation();var m=parseInt(btn.dataset.mult);var id=btn.dataset.uid;var up=upgrades[id];if(!up)return;if(m===10&&!up.unlocked10)return;if(m===25&&!up.unlocked25)return;buyMultiplier=m;renderShop();saveGame();};});
document.querySelectorAll(".mult-btn[data-unlock10]").forEach(function(btn){btn.onclick=function(e){e.stopPropagation();var id=btn.dataset.unlock10;var up=upgrades[id];if(!up)return;if(up.unlocked10)return;if(crystals<BUY_UNLOCK_10){alert("Недостаточно кристаллов!\nНужно: "+BUY_UNLOCK_10+" 💎\nУ вас: "+crystals+" 💎");return;}if(!confirm("Разблокировать ×10 для «"+up.name+"» за "+BUY_UNLOCK_10+" 💎?"))return;crystals-=BUY_UNLOCK_10;up.unlocked10=true;buyMultiplier=10;playSound("ui");vibrate(10);updateUI();renderShop();saveGame();};});
document.querySelectorAll(".mult-btn[data-unlock25]").forEach(function(btn){btn.onclick=function(e){e.stopPropagation();var id=btn.dataset.unlock25;var up=upgrades[id];if(!up)return;if(up.unlocked25)return;if(crystals<BUY_UNLOCK_25){alert("Недостаточно кристаллов!\nНужно: "+BUY_UNLOCK_25+" 💎\nУ вас: "+crystals+" 💎");return;}if(!confirm("Разблокировать ×25 для «"+up.name+"» за "+BUY_UNLOCK_25+" 💎?"))return;crystals-=BUY_UNLOCK_25;up.unlocked25=true;buyMultiplier=25;playSound("ui");vibrate(10);updateUI();renderShop();saveGame();};});}

// === ЛИЧНЫЙ РЕКОРД ===
function checkPersonalRecord(){var now=Date.now();if(now-lastRecordCheck<3000)return;lastRecordCheck=now;if(coins>personalBestCoins){personalBestCoins=coins;saveGame();}}

// === UI ===
function updateUI(){
setCoinsAnimated(coins);
$("cps").textContent=formatNumber(getCPS())+(goldenMultiplier>1?" (x7!)":"");
$("crystals").textContent=crystals;
var shardsEl=$("shards");if(shardsEl)shardsEl.textContent=shards;
var ib=$("item-bonus");if(ib)ib.textContent="+"+Math.round((getItemBonus()-1)*100)+"%";
var now=Date.now();
if(now-lastShopUpdate>500||now<lastShopUpdate){
lastShopUpdate=now;
for(var id in upgrades){var up=upgrades[id];var owned=$("owned-"+id),cost=$("cost-"+id);if(owned)owned.textContent=up.count;if(cost)cost.textContent=formatNumber(up.cost);var cpsLine=$("cpsline-"+id);if(cpsLine)cpsLine.innerHTML=buildCpsLine(up);var btn=document.querySelector('.buy[data-id="'+id+'"]');if(btn){if(up.count>=UPGRADE_MAX_LEVEL){btn.disabled=true;btn.textContent="✓ Максимум";btn.style.background="#4caf50";btn.style.color="#fff";}else{btn.disabled=coins<up.cost;}}}
updateGlobalShopUI();
}
var secretModal=$("modal-secret");if(secretModal&&!secretModal.classList.contains("hidden"))updateSecretUI();
var itemsModal=$("modal-items");if(itemsModal&&!itemsModal.classList.contains("hidden")){var shardsEl2=$("items-shards"),crystalsEl2=$("items-crystals");if(shardsEl2)shardsEl2.textContent=shards;if(crystalsEl2)crystalsEl2.textContent=crystals;}
checkNotesUnlock();
var depModal=$("modal-deposit");
if(depModal&&!depModal.classList.contains("hidden")){var depBtn=$("deposit-buy-btn");if(depBtn&&depositUnlocked&&depositLevel<25){var nD=DEPOSIT_LEVELS[depositLevel].cost;depBtn.disabled=coins<nD;}}}

// === СТАТИСТИКА ===
function updateStats(){
$("stat-coins").textContent=formatNumber(coins);$("stat-earned").textContent=formatNumber(totalEarned);$("stat-taps").textContent=formatNumber(totalTaps);$("stat-cps").textContent=formatNumber(getCPS());$("stat-per-click").textContent=formatNumber(getClickValue());$("stat-crystals").textContent=crystals;
var statShards=$("stat-shards");if(statShards)statShards.textContent=shards;
var statShardsTotal=$("stat-shards-total");if(statShardsTotal)statShardsTotal.textContent=formatNumber(totalShardsEarned);
var statTime=$("stat-time");if(statTime)statTime.textContent=formatTime(totalPlayTime);
var achCount=0;
for(var id in unlocked){if(!isAchievementKey(id))continue;if(unlocked[id])achCount++;}
$("stat-ach").textContent=achCount;
var totalEl=$("stat-ach-total");if(totalEl)totalEl.textContent=achievements.length;
var recEl=$("stat-record");if(recEl)recEl.textContent=formatNumber(personalBestCoins);
var mgEl=$("stat-minigame");if(mgEl)mgEl.textContent=minigameBest;}

// === ПЕЧЕНЬКА ===
function getTodayKeyFortune(){var d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();}
function updateFortuneButton(){var btn=$("fortune-btn");if(!btn)return;var last=localStorage.getItem(FORTUNE_KEY)||"";var today=getTodayKeyFortune();if(last===today){btn.disabled=true;btn.textContent="🥠 До завтра";btn.classList.remove("available");}else{btn.disabled=false;btn.textContent="🥠 Что сегодня?";btn.classList.add("available");}}
function showFortune(){
var btn=$("fortune-btn");if(!btn||btn.disabled)return;
var last=localStorage.getItem(FORTUNE_KEY)||"";var today=getTodayKeyFortune();
if(last===today)return;
localStorage.setItem(FORTUNE_KEY,today);
var text=FORTUNES[Math.floor(Math.random()*FORTUNES.length)];
var popup=document.createElement("div");popup.className="fortune-popup";
popup.innerHTML='<div class="fortune-emoji">🥠</div>'+'<div class="fortune-label">Печенька говорит:</div>'+'<div class="fortune-text">«'+text+'»</div>'+'<button class="fortune-close">Спасибо, печенька!</button>';
document.body.appendChild(popup);
playSound("ui");
popup.querySelector(".fortune-close").onclick=function(){popup.remove();};
setTimeout(function(){if(popup.parentNode)popup.remove();},30000);
updateFortuneButton();}

// === ТАП ===
$("click-btn").onclick=function(e){
if(!checkTapLimit())return;
var cd=getGeneratorCooldownMs();
var now=Date.now();
// ФИКС: при генераторе >= 20 кулдаун отключён
if(generatorLevel<20 && cd>50 && now-lastClickTime<cd)return;
lastClickTime=now;
$("click-btn").classList.remove("tap-ready");
if(goldenSecretActive){onGoldenSecretTap();}
var value=getClickValue();coins+=value;totalEarned+=value;
var tapsToAdd=gulauActive?5:1;totalTaps+=tapsToAdd;addQuestProgress("taps",tapsToAdd);
var rect=e.target.getBoundingClientRect();
var x=rect.left+rect.width/2+(Math.random()*40-20);var y=rect.top+rect.height/2;
showFloatPlus(x,y,value);spawnTapParticles(x,y);pulseCounter();
var shardChance=0.01+globalUpgrades.bloodLuck.count*globalUpgrades.bloodLuck.amount;
if(typeof petGetShardTapBonus==="function")shardChance+=petGetShardTapBonus();
if(typeof superEventActive!=="undefined"&&superEventActive)shardChance+=superEventShardBonus;
if(bloodMoonActive&&Math.random()<shardChance){shards+=1;showShardDrop(x,y);}
var petGemChance=(typeof petGetGemTapChance==="function")?petGetGemTapChance():0;
if(petGemChance>0&&Math.random()<petGemChance){addCrystals(1);var gemPopup=document.createElement("div");gemPopup.className="float-plus color-huge";gemPopup.textContent="+1 💎";gemPopup.style.left=x+"px";gemPopup.style.top=y+"px";document.body.appendChild(gemPopup);setTimeout(function(){gemPopup.remove();},800);}
playSound("click");
if(window.__coinsAnimInterval){clearInterval(window.__coinsAnimInterval);window.__coinsAnimInterval=null;}
lastDisplayedCoins=coins;
$("coins").textContent=formatNumber(coins);
$("cps").textContent=formatNumber(getCPS())+(goldenMultiplier>1?" (x7!)":"");
resetAlarmTimer();};

// === ОБРАБОТЧИКИ ===
var fortuneBtn=$("fortune-btn");if(fortuneBtn){fortuneBtn.onclick=function(){playSound("ui");showFortune();};}
var depositSideBtn=$("deposit-side-btn");if(depositSideBtn){depositSideBtn.onclick=function(){playSound("ui");renderDeposit();$("modal-deposit").classList.remove("hidden");syncScrollLock();updateDepositSideButton();};}
var generatorBtn=$("generator-btn");if(generatorBtn){generatorBtn.onclick=function(){playSound("ui");renderGenerator();$("modal-generator").classList.remove("hidden");syncScrollLock();};}

// === СУНДУК ===
var CHEST_COOLDOWN=60*60*1000;
function resetChestCooldown(){try{localStorage.removeItem("lastChest");}catch(e){}updateChestButton();}
function updateChestButton(){var btn=$("chest-btn");if(!btn)return;var last=parseInt(localStorage.getItem("lastChest")||"0");var left=CHEST_COOLDOWN-(Date.now()-last);if(left<=0){btn.disabled=false;btn.textContent="🎁 Сундук";}else{btn.disabled=true;var mins=Math.floor(left/60000);var secs=Math.floor((left%60000)/1000);btn.textContent="🎁 "+mins+"м "+secs+"с";}}
function getChestRewards(){var cps=getCPS();var coinsReward=Math.max(500,Math.floor(cps*1800));var crystalsReward=5+Math.floor(Math.random()*11);var shardsReward=15+Math.floor(Math.random()*26);var boosterRoll=Math.floor(Math.random()*3);var boosterIds=["boost2","boost3","boost5"];var booster=boosterIds[boosterRoll];return {coins:coinsReward,crystals:crystalsReward,shards:shardsReward,booster:booster};}
var chestBtn=$("chest-btn");
if(chestBtn){chestBtn.onclick=function(){
var last=parseInt(localStorage.getItem("lastChest")||"0");if(Date.now()-last<CHEST_COOLDOWN)return;
var r=getChestRewards();
openChestAnimation(r.crystals,r.coins,r.shards,r.booster,function(){
addCrystals(r.crystals);coins+=r.coins;totalEarned+=r.coins;shards+=r.shards;
if(r.booster)addBoosterToStorage(r.booster);
chestsOpened++;
localStorage.setItem("lastChest",Date.now().toString());addQuestProgress("chest",1);
updateUI();updateChestButton();checkAchievements();saveGame();});};}

// === КОЛЕСО ===
var wheelBtn=$("wheel-btn");if(wheelBtn){wheelBtn.onclick=function(){playSound("ui");openWheel();};}
var wheelCloseBtn=$("wheel-close");if(wheelCloseBtn){wheelCloseBtn.onclick=function(){playSound("ui");closeWheel();};}
var wheelFreeBtn=$("wheel-spin-free");if(wheelFreeBtn){wheelFreeBtn.onclick=function(){spinWheel(true);};}
var wheelPaidBtn=$("wheel-spin-paid");if(wheelPaidBtn){wheelPaidBtn.onclick=function(){spinWheel(false);};}

// === ЕЖЕДНЕВКА ===
var dailyBtn=$("daily-btn");if(dailyBtn){dailyBtn.onclick=function(){playSound("ui");openDaily();};}
var dailyCloseBtn=$("daily-close");if(dailyCloseBtn){dailyCloseBtn.onclick=function(){playSound("ui");closeDaily();};}
var dailySpinBtn=$("daily-spin");if(dailySpinBtn){dailySpinBtn.onclick=function(){spinDaily();};}

// === МИНИ-ИГРА ===
var minigameBtn=$("minigame-btn");if(minigameBtn){minigameBtn.onclick=function(){playSound("ui");openMinigame();};}
var minigameCloseBtn=$("minigame-close");if(minigameCloseBtn){minigameCloseBtn.onclick=function(){playSound("ui");closeMinigame();};}
var minigameStartBtn=$("minigame-start");if(minigameStartBtn){minigameStartBtn.onclick=function(){startMinigame();};}
var minigameTapBtn=$("minigame-tap-btn");if(minigameTapBtn){minigameTapBtn.onclick=function(){tapMinigame();};}

// === АНИМАЦИЯ СУНДУКА ===
function openChestAnimation(crystalsReward,coinsReward,shardsReward,boosterReward,onCollect){
var overlay=$("chest-overlay"),scene=$("chest-scene"),rewards=$("chest-rewards"),collectBtn=$("chest-collect");
if(!overlay||!scene||!rewards||!collectBtn){onCollect();return;}
overlay.classList.remove("hidden");syncScrollLock();
scene.classList.remove("shaking","opened");rewards.innerHTML="";collectBtn.classList.add("hidden");collectBtn.onclick=null;
playSound("chest");vibrate(30);
setTimeout(function(){scene.classList.add("shaking");
setTimeout(function(){scene.classList.remove("shaking");
var flash=document.createElement("div");flash.className="chest-flash";document.body.appendChild(flash);setTimeout(function(){flash.remove();},400);
scene.classList.add("opened");
var rewardHtml="";
rewardHtml+='<div class="chest-reward-item">💎 +'+crystalsReward+'</div>';
rewardHtml+='<div class="chest-reward-item delay-1">💰 +'+formatNumber(coinsReward)+'</div>';
rewardHtml+='<div class="chest-reward-item delay-2">🌑 +'+shardsReward+'</div>';
if(boosterReward&&BOOSTERS[boosterReward]){rewardHtml+='<div class="chest-reward-item delay-3">⚡ Бустер ×'+BOOSTERS[boosterReward].mult+'!</div>';}
rewards.innerHTML=rewardHtml;
setTimeout(function(){collectBtn.classList.remove("hidden");collectBtn.onclick=function(){collectBtn.onclick=null;overlay.classList.add("hidden");syncScrollLock();onCollect();};},2200);},1500);},500);}

// === ВКЛАДКИ ===
document.querySelectorAll(".tab-btn").forEach(function(btn){btn.onclick=function(){
playSound("ui");var tab=btn.dataset.tab;var modal=$("modal-"+tab);
if(modal){if(tab==="stats")updateStats();if(tab==="skins"){renderSkins();renderEmojiSkins();renderBackgrounds();renderSmileSkins();}if(tab==="achievements")renderAchievements();if(tab==="items"){renderItems();renderCrystalShop();renderGlobalShop();}if(tab==="leaders"){updateLeaderboardName();loadLeaderboard();}if(tab==="quests")renderQuests();if(tab==="note")renderNoteList();if(tab==="boosters")renderBoosters();modal.classList.remove("hidden");syncScrollLock();}};});
document.querySelectorAll(".modal-close").forEach(function(btn){btn.onclick=function(){playSound("ui");var id=btn.dataset.close;var el=$(id);if(el)el.classList.add("hidden");syncScrollLock();};});
document.querySelectorAll(".modal").forEach(function(modal){modal.onclick=function(e){if(e.target===modal){modal.classList.add("hidden");syncScrollLock();}};});

// === ПЕРЕКЛЮЧАТЕЛЬ МАГАЗИНА ===
document.querySelectorAll(".items-tab").forEach(function(btn){
btn.onclick=function(){
document.querySelectorAll(".items-tab").forEach(function(b){b.classList.remove("active");});
btn.classList.add("active");
var tab=btn.dataset.itab;
var shopList=$("shop-list"),globalList=$("global-shop-list");
if(tab==="upgrades"){shopList.style.display="block";globalList.style.display="none";}
else{shopList.style.display="none";globalList.style.display="block";renderGlobalShop();}
};
});

// === НАСТРОЙКИ ===
var optFloat=$("opt-float"),optGolden=$("opt-golden"),optDaily=$("opt-daily"),optSound=$("opt-sound"),optMusic=$("opt-music"),optLowP=$("opt-lowparticles"),optKhr=$("opt-krohlupic");
if(optFloat)optFloat.onchange=function(){settings.showFloat=this.checked;saveSettings();};
if(optGolden)optGolden.onchange=function(){settings.showGolden=this.checked;saveSettings();};
if(optDaily)optDaily.onchange=function(){settings.showDaily=this.checked;saveSettings();};
if(optSound)optSound.onchange=function(){settings.sound=this.checked;saveSettings();};
if(optMusic)optMusic.onchange=function(){settings.music=this.checked;saveSettings();if(settings.music)playMusic();else stopMusic();};
if(optLowP)optLowP.onchange=function(){settings.lowParticles=this.checked;document.body.classList.toggle("low-particles",settings.lowParticles);saveSettings();applyBackground();};
if(optKhr)optKhr.onchange=function(){settings.krohlupic=this.checked;khrState.enabled=this.checked;saveSettings();};
var promoBtn=$("promo-btn");if(promoBtn)promoBtn.onclick=activatePromo;
var promoInput=$("promo-input");if(promoInput)promoInput.addEventListener("keydown",function(e){if(e.key==="Enter")activatePromo();});
var exportBtn=$("export-btn");if(exportBtn)exportBtn.onclick=exportSave;
var copyBtn=$("copy-btn");if(copyBtn)copyBtn.onclick=copyExport;
var exportClose=$("export-close");if(exportClose)exportClose.onclick=function(){var box=$("export-box");if(box)box.classList.add("hidden");};
var importBtn=$("import-btn");if(importBtn)importBtn.onclick=function(){var box=$("import-box");if(box)box.classList.toggle("hidden");};
var importLoad=$("import-load");if(importLoad)importLoad.onclick=importSave;
var importCancel=$("import-cancel");if(importCancel)importCancel.onclick=function(){var box=$("import-box");if(box)box.classList.add("hidden");};
var rewardClaimBtn=$("reward-claim");if(rewardClaimBtn)rewardClaimBtn.onclick=claimReward;
var leaderSubmitBtn=$("leader-submit");if(leaderSubmitBtn)leaderSubmitBtn.onclick=submitLeaderboardScore;
var secretUnlockBtn=$("secret-unlock");if(secretUnlockBtn)secretUnlockBtn.onclick=tryUnlockSecret;
var secretToggleBtn=$("secret-toggle");if(secretToggleBtn)secretToggleBtn.onclick=activateSecretAutoClicker;

// === ИНИЦИАЛИЗАЦИЯ ===
setupAdvancedButton();
setupProfileSave();
setupProfileCopy();
setupTutorial();
setupNoteBack();
setupAchFilters();
var profileBtn=$("profile-side-btn");if(profileBtn){profileBtn.onclick=function(){playSound("ui");showProfileModal();};}
var pahanBtn=$("pahan-btn");if(pahanBtn){pahanBtn.onclick=function(){playSound("ui");activatePahan();};}
updatePahanButton();

// === СБРОС ===
function setupResetButton(){
var btn=$("settings-reset");if(!btn)return;
var step=0;var timer=null;
btn.onclick=function(e){
e.preventDefault();e.stopPropagation();step++;
if(step===1){btn.textContent="⚠️ Нажмите ещё раз (1/2)";btn.style.background="#ff5722";
if(timer)clearTimeout(timer);timer=setTimeout(function(){step=0;btn.textContent="Сбросить весь прогресс";btn.style.background="#b33a3a";},3000);return;}
if(step===2){clearTimeout(timer);btn.textContent="🗑️ Удаляю...";btn.style.background="#8a0000";
try{window.__resetting=true;
coins=0;coinsPerClick=1;totalEarned=0;totalShardsEarned=0;totalTaps=0;totalPlayTime=0;crystals=0;goldenMultiplier=1;goldenTimer=0;
shards=0;bloodMoonActive=false;bloodMoonTimer=0;
eventMultiplier=1;eventTimer=0;eventName="";currentEventKey="";
crystalBoostMultiplier=1;crystalBoostTimer=0;crystalBoostName="";
unlocked={};ownedItems={};chestsOpened=0;personalBestCoins=0;
secretUnlocked=false;secretAutoClicker=false;secretAutoClickerTimer=0;
depositUnlocked=false;depositLevel=0;generatorLevel=1;generatorTimer=GENERATOR_DURATION;
lastDepositTimeKey="";
smileSkinUnlocked=false;smileSkinActive=false;
gulauActive=false;gulauTimer=0;
bossActive=false;bossHP=150;bossTimeLeft=45;bossRewardClaimed=false;
rewardClaimed=false;rewardTabShown=false;noteShown=false;note1Shown=false;note2Shown=false;note3Shown=false;
note4Shown=false;note5Shown=false;note6Shown=false;note7Shown=false;
notesUnlocked={};
pahanUnlocked=false;pahanActive=false;pahanTimer=0;
quests=[];questsDate="";questsClaimed=0;questProgress={};
theftActive=false;theftTimer=0;theftTotalLost=0;lastTheftKey="";
wheelFreeUsed=false;wheelPaidUsed=false;wheelLastResetDay="";
dailyLastUsed="";
minigameBest=0;minigameLastUsed=0;
buyMultiplier=1;
goldenSecretActive=false;
activeBg="base";
for(var bid in BOOSTERS){BOOSTERS[bid].storage=0;}
for(var bgid in BACKGROUNDS){BACKGROUNDS[bgid].owned=(bgid==="base");}
for(var esid in EMOJI_SKINS){EMOJI_SKINS[esid].owned=false;}
activeEmojiSkin=null;
if(bossTimerInterval){clearInterval(bossTimerInterval);bossTimerInterval=null;}
if(pahanTickInterval){clearInterval(pahanTickInterval);pahanTickInterval=null;}
if(pahanTimerInterval){clearInterval(pahanTimerInterval);pahanTimerInterval=null;}
if(theftTickTimer){clearInterval(theftTickTimer);theftTickTimer=null;}
if(minigameTimerInterval){clearInterval(minigameTimerInterval);minigameTimerInterval=null;}
stopSecretAutoClicker();
for(var id in upgrades){upgrades[id].count=0;upgrades[id].cost=upgrades[id].baseCost;upgrades[id].unlocked10=false;upgrades[id].unlocked25=false;}
for(var gid in globalUpgrades){globalUpgrades[gid].count=0;globalUpgrades[gid].cost=globalUpgrades[gid].baseCost;}
for(var sid in skins){skins[sid].owned=(sid==="gold");}
activeSkin="gold";
applyBackground();
if(typeof petsState!=="undefined"){petsState.storage=[];petsState.active=null;petsState.nest=null;petsState.hunger=100;petsState.xp=0;petsState.food={strawberry:0,banana:0,orange:0};}
try{localStorage.removeItem(SAVE_KEY);localStorage.removeItem("lastDaily");localStorage.removeItem("dailyStreak");localStorage.removeItem("clicker-settings");localStorage.removeItem("clicker-skins");localStorage.removeItem("lastChest");localStorage.removeItem(FORTUNE_KEY);localStorage.removeItem("clicker-theft-state");localStorage.removeItem("clicker-used-promos");}catch(err){}
setTimeout(function(){alert("✅ Прогресс полностью сброшен! Страница перезагрузится.");location.reload();},300);
}catch(err){alert("❌ Ошибка: "+err.message);btn.textContent="Сбросить весь прогресс";btn.style.background="#b33a3a";step=0;window.__resetting=false;}}};}

// === СТРАНИЦЫ ===
var currentPage=1,totalPages=2;
function showPage(n){
if(n<1)n=totalPages;if(n>totalPages)n=1;currentPage=n;
document.querySelectorAll(".page").forEach(function(page,i){if(i+1===n)page.classList.add("page-active");else page.classList.remove("page-active");});
document.querySelectorAll(".page-dot").forEach(function(dot){if(parseInt(dot.dataset.page)===n)dot.classList.add("active");else dot.classList.remove("active");});
// ФИКС: Альманах только на 2-й странице
var almBtn=$("almanac-btn");
if(almBtn){
if(n===2)almBtn.classList.remove("hidden");
else almBtn.classList.add("hidden");
}
if(bgCanvas)resizeBgCanvas();window.scrollTo({top:0,behavior:"smooth"});}
function nextPage(){showPage(currentPage+1);}
function prevPage(){showPage(currentPage-1);}
var pagePrev=$("page-prev"),pageNext=$("page-next");
if(pagePrev)pagePrev.onclick=prevPage;if(pageNext)pageNext.onclick=nextPage;
document.querySelectorAll(".page-dot").forEach(function(dot){dot.onclick=function(){var n=parseInt(dot.dataset.page);if(n)showPage(n);};});

// === СВАЙПЫ ===
var touchStartX=0,touchEndX=0,touchStartY=0,touchEndY=0;
document.addEventListener("touchstart",function(e){touchStartX=e.changedTouches[0].screenX;touchStartY=e.changedTouches[0].screenY;},{passive:true});
document.addEventListener("touchend",function(e){
touchEndX=e.changedTouches[0].screenX;touchEndY=e.changedTouches[0].screenY;
var dx=touchEndX-touchStartX;var dy=touchEndY-touchStartY;
if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5){if(document.querySelector(".modal:not(.hidden)"))return;if(dx<0)nextPage();else prevPage();}
},{passive:true});
document.addEventListener("keydown",function(e){if(e.key==="ArrowLeft")prevPage();if(e.key==="ArrowRight")nextPage();});
window.addEventListener("resize",resizeBgCanvas);
window.addEventListener("orientationchange",function(){setTimeout(resizeBgCanvas,200);});

// === КРОХЛЮПИК ===
var KHR_QUOTES={coins_100:"Смотри, у нас уже 100! Это начало чего-то большого.",coins_1k:"1 000 монет! Я так горд. Правда. Я серьёзно.",coins_100k:"100K? Эй, а ты быстро растёшь!",coins_1m:"Миллион! Похоже, ты и вправду справишься.",coins_1b:"Миллиард. Знаешь, у нас даже стулья в офисе появились!",coins_1t:"Триллион… Неловко спрашивать, но это ведь много?",coins_1qa:"Квадриллион! Ты когда-нибудь спишь?",coins_1qi:"Квинтиллион. Я даже произносить это боюсь.",coins_1sp:"Я думал, мы никогда не дойдём. А ты взял — и дошёл.",coins_1no:"Но... Как... Это же цифра, которой не должно быть на балансе. Ох.",taps_10:"Раз, два, три... Ой, я не успеваю считать!",taps_100:"Ты так стараешься. Я это ценю.",taps_1k:"У тебя палец не болит? Мой бы болел.",taps_10k:"10 000! Ты машина, что ли?",taps_100k:"У меня лапки устали смотреть.",taps_1m:"Миллион тапов. Я даже не знаю, что сказать.",up_farm:"Ферма! Теперь монеты идут сами. Удобно!",up_factory:"Фабрика работает. Мы расширяемся, знаешь?",up_bank:"Банк! Скоро будем брать кредиты.",up_space:"Космос! Я слышал, там есть другие кликеры.",up_galaxy:"Ого. Ты строишь не бизнес, а вселенную.",up_genesis:"Генезис… Это начало. Или конец? Я не уверен.",ach_first:"Достижение! Ты молодец. Серьёзно.",ach_50:"Половина достижений! Ты упорный.",ach_all:"Ты... собрал всё. Я горд. И немного напуган.",ev_theft_start:"Кража! Прячь монеты! Скорее!",ev_theft_end:"Фух. Обошлось. Кажется.",ev_bloodmoon:"Смотри, луна красная! Доход ×2, но будь осторожен.",note_found:"Ещё одна записка? Кто их пишет?..",cute_1:"Я тут подумал... ты хороший.",cute_2:"Иногда мне нравится просто смотреть, как ты тапаешь.",cute_3:"У тебя отличный вкус на апгрейды, знаешь?",cute_4:"Мне нравится быть с тобой в одной команде.",cute_5:"Заяц-программист из меня так себе, но я стараюсь.",strange_1:"Слушай... а ты помнишь, откуда я появился? Я — нет. Странно.",strange_2:"Иногда мне кажется, что за тобой наблюдают. Но это, наверное, ничего.",strange_3:"Я вчера слышал звук. Такой, знаешь... будто кто-то тапает не здесь.",strange_4:"Тот, из записок. Он был тут раньше. Я его почти помню.",strange_5:"Если я однажды исчезну — не ищи меня. Просто продолжай тапать.",strange_6:"Кажется, эта кнопка никогда не заканчивается. Никогда. Понимаешь?",strange_7:"Не заходи в комнату 9. Ой. Забудь, что я сказал.",back_1:"Ты вернулся! А я уже думал, что меня одного здесь оставили.",back_2:"Ой! Привет. Я тут сидел, смотрел на кнопку. Она красивая.",back_3:"Ты долго не заходил. Я скучал. И монеты скучали."};
var khrState={enabled:true,lastShown:0,timer:null,shownProgress:{},shownStrange:{},lastStrange:0,snapshotTheftActive:false,snapshotBloodMoon:false};
function khrShow(key,text){
if(!khrState.enabled)return;
var now=Date.now();if(now-khrState.lastShown<5000)return;khrState.lastShown=now;
var old=document.querySelector(".krohlupic-bubble");if(old)old.remove();
var bubble=document.createElement("div");bubble.className="krohlupic-bubble";
bubble.innerHTML='<div class="krohlupic-avatar"><img src="krohlupic.png" alt="🐰" onerror="this.style.display=\'none\';this.parentNode.textContent=\'🐰\';"></div>'+'<div class="krohlupic-text">'+text+'</div>';
var tapRow=document.getElementById("tap-row");
if(tapRow&&tapRow.parentNode)tapRow.parentNode.insertBefore(bubble,tapRow);else document.body.appendChild(bubble);
setTimeout(function(){bubble.classList.add("show");},30);
setTimeout(function(){bubble.classList.remove("show");setTimeout(function(){if(bubble.parentNode)bubble.remove();},500);},9000);}
function khrEventCheck(){if(!khrState.enabled)return;if(!khrState.snapshotTheftActive&&theftActive){khrState.snapshotTheftActive=true;khrShow("ev_theft_start",KHR_QUOTES.ev_theft_start);return;}if(khrState.snapshotTheftActive&&!theftActive){khrState.snapshotTheftActive=false;khrShow("ev_theft_end",KHR_QUOTES.ev_theft_end);return;}if(!khrState.snapshotBloodMoon&&bloodMoonActive){khrState.snapshotBloodMoon=true;khrShow("ev_bloodmoon",KHR_QUOTES.ev_bloodmoon);return;}if(khrState.snapshotBloodMoon&&!bloodMoonActive){khrState.snapshotBloodMoon=false;}}
function khrPickReply(){
var pool=[];
var coinPairs=[["coins_1k",1e3],["coins_100k",1e5],["coins_1m",1e6],["coins_1b",1e9],["coins_1t",1e12],["coins_1qa",1e15],["coins_1qi",1e18],["coins_1sp",1e24],["coins_1no",1e30]];
for(var i=coinPairs.length-1;i>=0;i--){if(coins>=coinPairs[i][1]&&!khrState.shownProgress[coinPairs[i][0]]){pool.push({key:coinPairs[i][0],w:5});break;}}
if(coins>=100&&!khrState.shownProgress.coins_100)pool.push({key:"coins_100",w:2});
var tapPairs=[["taps_100",100],["taps_1k",1000],["taps_10k",10000],["taps_100k",100000],["taps_1m",1e6]];
for(var i=tapPairs.length-1;i>=0;i--){if(totalTaps>=tapPairs[i][1]&&!khrState.shownProgress[tapPairs[i][0]]){pool.push({key:tapPairs[i][0],w:4});break;}}
if(totalTaps>=10&&!khrState.shownProgress.taps_10)pool.push({key:"taps_10",w:2});
var upPairs=[["up_farm","farm"],["up_factory","factory"],["up_bank","bank"],["up_space","space"],["up_galaxy","galaxy"],["up_genesis","genesis"]];
for(var i=0;i<upPairs.length;i++){if(upgrades[upPairs[i][1]]&&upgrades[upPairs[i][1]].count>0&&!khrState.shownProgress[upPairs[i][0]])pool.push({key:upPairs[i][0],w:3});}
// ФИКС: не считаем служебные ключи как ачивки
var ac=0;for(var k in unlocked){if(!isAchievementKey(k))continue;if(unlocked[k])ac++;}
if(ac>=1&&!khrState.shownProgress.ach_first)pool.push({key:"ach_first",w:3});
if(ac>=50&&!khrState.shownProgress.ach_50)pool.push({key:"ach_50",w:4});
if(ac>=achievements.length-2&&!khrState.shownProgress.ach_all)pool.push({key:"ach_all",w:5});
var nc=0;for(var n in notesUnlocked)if(notesUnlocked[n])nc++;
if(nc>=1&&!khrState.shownProgress.note_found)pool.push({key:"note_found",w:4});
var cuteKeys=["cute_1","cute_2","cute_3","cute_4","cute_5"];
for(var i=0;i<cuteKeys.length;i++){if(!khrState.shownProgress[cuteKeys[i]])pool.push({key:cuteKeys[i],w:3});}
if(pool.length===0)pool.push({key:cuteKeys[Math.floor(Math.random()*cuteKeys.length)],w:1});
var now=Date.now();
if(now-khrState.lastStrange>30*60*1000){var strangeKeys=["strange_1","strange_2","strange_3","strange_4","strange_5","strange_6","strange_7"];var avail=[];for(var i=0;i<strangeKeys.length;i++){if(!khrState.shownStrange[strangeKeys[i]])avail.push(strangeKeys[i]);}if(avail.length>0){var s=avail[Math.floor(Math.random()*avail.length)];pool.push({key:s,w:1,isStrange:true});}}
if(pool.length===0)return;
var total=0;for(var i=0;i<pool.length;i++)total+=pool[i].w;
var r=Math.random()*total;var acc=0;var chosen=pool[0];
for(var i=0;i<pool.length;i++){acc+=pool[i].w;if(r<=acc){chosen=pool[i];break;}}
khrShow(chosen.key,KHR_QUOTES[chosen.key]);
if(chosen.isStrange){khrState.shownStrange[chosen.key]=true;khrState.lastStrange=Date.now();}else{khrState.shownProgress[chosen.key]=true;}}
function khrScheduleNext(){if(khrState.timer)clearTimeout(khrState.timer);var delay=45000+Math.random()*75000;khrState.timer=setTimeout(function(){khrPickReply();khrScheduleNext();},delay);}
setTimeout(function(){
khrState.enabled=settings.krohlupic!==false;
khrState.snapshotTheftActive=theftActive;
khrState.snapshotBloodMoon=bloodMoonActive;
if(totalPlayTime>60){setTimeout(function(){if(!khrState.enabled)return;var bk=["back_1","back_2","back_3"];var b=bk[Math.floor(Math.random()*bk.length)];khrShow("back_"+Date.now(),KHR_QUOTES[b]);khrScheduleNext();},2000);}
else{khrScheduleNext();}
setInterval(khrEventCheck,2000);
},5000);

// === СУПЕР-ИВЕНТ ===
var SUPER_EVENT_PHASES=[{start:0,end:180,name:"🌋 Вспышка",coinMult:3,tapMult:1,shardBonus:0},{start:180,end:420,name:"👆 Шторм тапов",coinMult:1,tapMult:5,shardBonus:0},{start:420,end:600,name:"💰 Золотой час",coinMult:7,tapMult:1,shardBonus:0},{start:600,end:1200,name:"🩸 Кровавая ярость",coinMult:1,tapMult:5,shardBonus:0.25},{start:1200,end:1800,name:"🌑 Финал",coinMult:8,tapMult:1,shardBonus:0}];
var SUPER_EVENT_DURATION=1800;
var superEventActive=false;
var superEventPhaseIdx=-1;
var superEventSecondsLeft=0;
var superEventKey="";
var superEventCoinMult=1;
var superEventTapMult=1;
var superEventShardBonus=0;
function getSuperEventWindow(){var d=new Date();if(d.getDay()!==1)return null;if(d.getHours()!==9)return null;var minutes=d.getMinutes();if(minutes>=30)return null;var key=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();var elapsed=minutes*60+d.getSeconds();return {key:key,elapsed:elapsed};}
function getSuperEventPhase(elapsed){for(var i=0;i<SUPER_EVENT_PHASES.length;i++){var p=SUPER_EVENT_PHASES[i];if(elapsed>=p.start&&elapsed<p.end)return {idx:i,name:p.name,coinMult:p.coinMult,tapMult:p.tapMult,shardBonus:p.shardBonus};}return null;}
function startSuperEvent(key){superEventActive=true;superEventKey=key;document.body.classList.add("super-storm");playSound("alarm");vibrate(80);var popup=document.createElement("div");popup.className="super-event-popup";popup.innerHTML='<div class="super-event-title">🌪️ КРОВАВЫЙ ШТОРМ</div><div class="super-event-sub">Начался супер-ивент!<br>30 минут усиления!</div>';document.body.appendChild(popup);setTimeout(function(){popup.classList.add("show");},30);setTimeout(function(){popup.classList.remove("show");setTimeout(function(){popup.remove();},500);},5000);}
function endSuperEvent(){superEventActive=false;superEventPhaseIdx=-1;superEventCoinMult=1;superEventTapMult=1;superEventShardBonus=0;superEventSecondsLeft=0;document.body.classList.remove("super-storm");var banner=document.getElementById("super-event-banner");if(banner)banner.classList.remove("show");}
function showSuperEventPhasePopup(phase){var popup=document.createElement("div");popup.className="achievement-popup";popup.style.background="linear-gradient(135deg,#8b0000,#ff1744)";popup.style.color="#fff";var text=phase.name;if(phase.coinMult>1)text+=" — ×"+phase.coinMult+" монет";if(phase.tapMult>1)text+=" — ×"+phase.tapMult+" тапов";if(phase.shardBonus>0)text+=" — +"+Math.round(phase.shardBonus*100)+"% осколок";popup.textContent="🌪️ Фаза "+(phase.idx+1)+"/5: "+text;document.body.appendChild(popup);setTimeout(function(){popup.remove();},5000);}
function updateSuperEventBanner(){var banner=document.getElementById("super-event-banner");if(!banner){banner=document.createElement("div");banner.id="super-event-banner";document.body.appendChild(banner);}if(!superEventActive||superEventPhaseIdx<0){banner.classList.remove("show");return;}banner.classList.add("show");var phase=SUPER_EVENT_PHASES[superEventPhaseIdx];var m=Math.floor(superEventSecondsLeft/60);var s=superEventSecondsLeft%60;var parts=phase.name;if(phase.coinMult>1)parts+=" ×"+phase.coinMult+"💰";if(phase.tapMult>1)parts+=" ×"+phase.tapMult+"👆";if(phase.shardBonus>0)parts+=" +"+Math.round(phase.shardBonus*100)+"%🌑";banner.innerHTML='<span class="super-event-label">🌪️ ШТОРМ</span> '+parts+' <span class="super-event-time">'+m+':'+(s<10?"0":"")+s+'</span>';}
function updateSuperEvent(){var info=getSuperEventWindow();if(!info){if(superEventActive)endSuperEvent();return;}var phase=getSuperEventPhase(info.elapsed);if(!phase){if(superEventActive)endSuperEvent();return;}if(!superEventActive||superEventKey!==info.key){startSuperEvent(info.key);}if(superEventPhaseIdx!==phase.idx){superEventPhaseIdx=phase.idx;superEventCoinMult=phase.coinMult;superEventTapMult=phase.tapMult;superEventShardBonus=phase.shardBonus;showSuperEventPhasePopup(phase);}superEventSecondsLeft=SUPER_EVENT_DURATION-info.elapsed;updateSuperEventBanner();}

// === ПИТОМЦЫ ===
var PET_TYPES={
hamster:{id:"hamster",emoji:"🐹",name:"Хомяк",rarity:"common",rarityLabel:"🟢 Обычный",chance:0.40,sellPrice:25,bonus:{income:0.15},deathMsg:"Твой Хомяк погиб от голода... Он был верным другом."},
kitten:{id:"kitten",emoji:"🐱",name:"Котёнок",rarity:"common",rarityLabel:"🟢 Обычный",chance:0.25,sellPrice:25,bonus:{gemTap:0.0002},deathMsg:"Твой Котёнок погиб от голода... Он мурлыкал до последнего."},
fox:{id:"fox",emoji:"🦊",name:"Лисёнок",rarity:"rare",rarityLabel:"🔵 Редкий",chance:0.20,sellPrice:100,bonus:{income:0.35,gemTap:0.0005},deathMsg:"Твой Лисёнок погиб от голода... Хитрый, но голодный."},
penguin:{id:"penguin",emoji:"🐧",name:"Пингвин",rarity:"rare",rarityLabel:"🔵 Редкий",chance:0.10,sellPrice:100,bonus:{shardTap:0.003},deathMsg:"Твой Пингвин погиб от голода... Ему не хватило рыбы."},
dragon:{id:"dragon",emoji:"🐉",name:"Дракончик",rarity:"epic",rarityLabel:"🟣 Эпический",chance:0.05,sellPrice:300,bonus:{income:0.45,gemTap:0.0015,shardTap:0.005},deathMsg:"Твой Дракончик погиб от голода... Даже драконы нуждаются в заботе."}};
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
var petsState={xp:0,food:{strawberry:0,banana:0,orange:0},storage:[],active:null,nest:null,hunger:100,hungerLastTick:Date.now(),xpLastTick:Date.now(),nextId:1};
function petGetActive(){return petsState.active;}
function petGenerateId(){var id=petsState.nextId++;return id;}
function petTotalCount(){return petsState.storage.length+(petsState.active?1:0);}
function petRollType(){var r=Math.random();var acc=0;var ids=["hamster","kitten","fox","penguin","dragon"];for(var i=0;i<ids.length;i++){acc+=PET_TYPES[ids[i]].chance;if(r<=acc)return ids[i];}return "hamster";}
function petBuyEgg(){
if(crystals<PET_EGG_PRICE){alert("Недостаточно кристаллов!\nНужно: "+PET_EGG_PRICE+" 💎\nУ вас: "+crystals+" 💎");return;}
if(petsState.nest){alert("Гнездо занято! Дождись завершения.");return;}
if(petTotalCount()>=PET_STORAGE_MAX){alert("Всего питомцев уже "+PET_STORAGE_MAX+"/"+PET_STORAGE_MAX+".\nПродай кого-то, чтобы освободить место.");return;}
crystals-=PET_EGG_PRICE;
petsState.nest={stage:"incubating",startedAt:Date.now(),taps:0,type:null};
playSound("ui");vibrate(10);petRenderAll();updateUI();saveGame();}
function petProcessNest(){
if(!petsState.nest)return;
var now=Date.now();var elapsed=now-petsState.nest.startedAt;
if(petsState.nest.stage==="incubating"){if(elapsed>=PET_EGG_INCUBATE){petsState.nest.stage="ready_hatch";petsState.nest.taps=0;petsState.nest.type=petRollType();playSound("ui");petRenderAll();saveGame();}}
else if(petsState.nest.stage==="growing"){if(elapsed>=PET_EGG_GROW){petsState.nest.stage="ready_collect";playSound("ui");petRenderAll();saveGame();}}}
function petHatchTap(){
if(!petsState.nest)return;
if(petsState.nest.stage!=="ready_hatch")return;
petsState.nest.taps++;
var tgt=$("nest-egg-tap-target");if(tgt){tgt.classList.remove("tapped");void tgt.offsetWidth;tgt.classList.add("tapped");}
playSound("click");
var dots=document.querySelectorAll(".tap-dot");dots.forEach(function(d,i){if(i<petsState.nest.taps)d.classList.add("filled");});
if(petsState.nest.taps>=PET_EGG_HATCH_TAPS){setTimeout(function(){if(!petsState.nest)return;petsState.nest.stage="growing";petsState.nest.startedAt=Date.now();playSound("achievement");vibrate(30);petRenderAll();saveGame();},350);}
else{petRenderAll();saveGame();}}
function petCollectTap(){
if(!petsState.nest)return;
if(petsState.nest.stage!=="ready_collect")return;
var t=petsState.nest.type;
if(petsState.storage.length>=PET_STORAGE_MAX){alert("Хранилище заполнено! Продай кого-то.");return;}
petsState.storage.push({id:petGenerateId(),type:t});
petsState.nest=null;
if(t==="dragon")unlocked._petHasDragon=true;
var pet=PET_TYPES[t];
playSound("achievement");vibrate(40);
var popup=document.createElement("div");popup.className="achievement-popup";popup.textContent=pet.emoji+" "+pet.name+" в хранилище!";
document.body.appendChild(popup);setTimeout(function(){popup.remove();},4000);
petRenderAll();updateUI();saveGame();}
function petActivate(id){
var idx=-1;for(var i=0;i<petsState.storage.length;i++){if(petsState.storage[i].id===id){idx=i;break;}}
if(idx<0)return;
var pet=petsState.storage[idx];petsState.storage.splice(idx,1);
if(petsState.active){petsState.storage.push(petsState.active);}
petsState.active=pet;petsState.hunger=PET_HUNGER_MAX;petsState.hungerLastTick=Date.now();petsState.xpLastTick=Date.now();
playSound("ui");vibrate(10);petRenderAll();updateUI();saveGame();}
function petDeactivate(){
if(!petsState.active)return;
if(petsState.storage.length>=PET_STORAGE_MAX){alert("Хранилище заполнено.");return;}
petsState.storage.push(petsState.active);petsState.active=null;petsState.hunger=PET_HUNGER_MAX;
playSound("ui");petRenderAll();updateUI();saveGame();}
function petSell(id){for(var i=0;i<petsState.storage.length;i++){if(petsState.storage[i].id===id){var pet=petsState.storage[i];var type=PET_TYPES[pet.type];if(!confirm("Продать "+type.emoji+" "+type.name+" за "+type.sellPrice+" 🌑?"))return;shards+=type.sellPrice;petsState.storage.splice(i,1);playSound("ui");vibrate(10);petRenderAll();updateUI();saveGame();return;}}}
function petFeed(foodId){
var pet=petGetActive();if(!pet){alert("Нет активного питомца!");return;}
var food=FOOD_TYPES[foodId];if(!food)return;
if(petsState.food[foodId]<=0){alert("Нет "+food.emoji+" в инвентаре!\nКупи в магазине еды.");return;}
petsState.food[foodId]--;petsState.hunger=Math.min(PET_HUNGER_MAX,petsState.hunger+food.hunger);petsState.xp+=FOOD_CASHBACK;
if(!unlocked._petFeedCount)unlocked._petFeedCount=0;unlocked._petFeedCount++;
playSound("eat");vibrate(10);petRenderAll();updateUI();saveGame();checkAchievements();}
function petBuyFood(foodId){
var food=FOOD_TYPES[foodId];if(!food)return;
if(petsState.xp<food.price){alert("Недостаточно опыта!\nНужно: "+food.price+" ⭐\nУ вас: "+petsState.xp+" ⭐");return;}
petsState.xp-=food.price;petsState.food[foodId]++;petsState.xp+=FOOD_CASHBACK;
playSound("ui");petRenderAll();updateUI();saveGame();}
function petKillFromHunger(){
var pet=petGetActive();if(!pet)return;
var type=PET_TYPES[pet.type];
petsState.active=null;petsState.hunger=PET_HUNGER_MAX;
playSound("alarm");vibrate(100);
var popup=document.createElement("div");popup.className="achievement-popup";popup.style.background="linear-gradient(135deg,#4a0000,#b71c1c)";popup.style.color="#fff";popup.textContent="💀 "+type.deathMsg;
document.body.appendChild(popup);setTimeout(function(){popup.remove();},7000);
petRenderAll();updateUI();saveGame();}
function petTickHunger(){
var pet=petGetActive();if(!pet)return;
var now=Date.now();var elapsed=now-petsState.hungerLastTick;
if(elapsed<PET_HUNGER_DROP_ONLINE)return;
var drops=Math.floor(elapsed/PET_HUNGER_DROP_ONLINE);
petsState.hungerLastTick+=drops*PET_HUNGER_DROP_ONLINE;
petsState.hunger=Math.max(0,petsState.hunger-drops);
if(petsState.hunger<=0)petKillFromHunger();}
function petTickXP(){
var pet=petGetActive();if(!pet)return;
if(petsState.hunger<=0)return;
var now=Date.now();var elapsed=now-petsState.xpLastTick;
if(elapsed<PET_XP_INTERVAL)return;
var ticks=Math.floor(elapsed/PET_XP_INTERVAL);
petsState.xpLastTick+=ticks*PET_XP_INTERVAL;
petsState.xp+=ticks;
petRenderTopBar();}
function petGetIncomeBonus(){var pet=petGetActive();if(!pet||petsState.hunger<=0)return 0;return PET_TYPES[pet.type].bonus.income||0;}
function petGetGemTapChance(){var pet=petGetActive();if(!pet||petsState.hunger<=0)return 0;return PET_TYPES[pet.type].bonus.gemTap||0;}
function petGetShardTapBonus(){var pet=petGetActive();if(!pet||petsState.hunger<=0)return 0;return PET_TYPES[pet.type].bonus.shardTap||0;}
function petRenderTopBar(){var xpEl=$("pets-xp");if(xpEl)xpEl.textContent=petsState.xp;["strawberry","banana","orange"].forEach(function(f){var el=$("food-"+f+"-count");if(el)el.textContent=petsState.food[f];var fe=$("feed-"+f+"-count");if(fe)fe.textContent=petsState.food[f];});}
function petRenderNest(){
var emptyEl=$("nest-empty"),incEl=$("nest-incubating"),growEl=$("nest-growing"),hatchEl=$("nest-ready-hatch"),collectEl=$("nest-ready-collect");
if(!emptyEl)return;
[emptyEl,incEl,growEl,hatchEl,collectEl].forEach(function(e){if(e)e.classList.add("hidden");});
if(!petsState.nest){emptyEl.classList.remove("hidden");return;}
var now=Date.now();var elapsed=now-petsState.nest.startedAt;var stage=petsState.nest.stage;
if(stage==="incubating"){incEl.classList.remove("hidden");var left=Math.max(0,PET_EGG_INCUBATE-elapsed);var totalSec=Math.floor(left/1000);var mm=Math.floor(totalSec/60);var ss=totalSec%60;var tEl=$("nest-incubate-timer");if(tEl)tEl.textContent=mm+":"+(ss<10?"0":"")+ss;var bEl=$("nest-incubate-bar");if(bEl)bEl.style.width=Math.min(100,(elapsed/PET_EGG_INCUBATE)*100)+"%";var egg=$("nest-egg-visual");if(egg){var progress=Math.min(1,elapsed/PET_EGG_INCUBATE);var size=40+progress*55;egg.style.fontSize=size+"px";}}
else if(stage==="ready_hatch"){hatchEl.classList.remove("hidden");var dots=document.querySelectorAll(".tap-dot");dots.forEach(function(d,i){if(i<petsState.nest.taps)d.classList.add("filled");else d.classList.remove("filled");});}
else if(stage==="growing"){growEl.classList.remove("hidden");var left2=Math.max(0,PET_EGG_GROW-elapsed);var totalSec2=Math.floor(left2/1000);var mm2=Math.floor(totalSec2/60);var ss2=totalSec2%60;var tEl2=$("nest-grow-timer");if(tEl2)tEl2.textContent=mm2+":"+(ss2<10?"0":"")+ss2;var bEl2=$("nest-grow-bar");if(bEl2)bEl2.style.width=Math.min(100,(elapsed/PET_EGG_GROW)*100)+"%";var baby=$("nest-baby-visual");if(baby){var progress2=Math.min(1,elapsed/PET_EGG_GROW);var size2=55+progress2*30;baby.style.fontSize=size2+"px";}}
else if(stage==="ready_collect"){collectEl.classList.remove("hidden");}
var buyBtn=$("buy-egg-btn");if(buyBtn)buyBtn.disabled=petTotalCount()>=PET_STORAGE_MAX;}
function petRenderActive(){
var emptyEl=$("active-pet-empty"),cardEl=$("active-pet-card");
if(!emptyEl||!cardEl)return;
var pet=petGetActive();
if(!pet){emptyEl.textContent="Нет активного питомца";emptyEl.classList.remove("hidden");cardEl.classList.add("hidden");return;}
emptyEl.classList.add("hidden");cardEl.classList.remove("hidden");
var type=PET_TYPES[pet.type];
var nameEl=$("active-pet-name-big");if(nameEl)nameEl.textContent=type.name;
var emojiEl=$("active-pet-emoji-big");if(emojiEl)emojiEl.textContent=type.emoji;
var rarEl=$("active-pet-rarity-big");if(rarEl)rarEl.textContent=type.rarityLabel;
var bonusText=[];
if(type.bonus.income)bonusText.push("+"+Math.round(type.bonus.income*100)+"% доход");
if(type.bonus.gemTap)bonusText.push("+"+(type.bonus.gemTap*100).toFixed(2)+"% гем");
if(type.bonus.shardTap)bonusText.push("+"+(type.bonus.shardTap*100).toFixed(1)+"% осколок");
var bonusEl=$("active-pet-bonus-big");if(bonusEl)bonusEl.textContent=bonusText.join(" · ");
var hungerVal=$("active-pet-hunger-value");if(hungerVal)hungerVal.textContent=Math.floor(petsState.hunger)+" / "+PET_HUNGER_MAX;
var hungerFill=$("active-pet-hunger-fill-big");
if(hungerFill){hungerFill.style.width=Math.max(0,(petsState.hunger/PET_HUNGER_MAX)*100)+"%";hungerFill.classList.remove("warn","danger");if(petsState.hunger<=20)hungerFill.classList.add("danger");else if(petsState.hunger<=50)hungerFill.classList.add("warn");}
document.querySelectorAll(".feed-btn").forEach(function(btn){var fid=btn.dataset.food;btn.disabled=petsState.food[fid]<=0;});
var deactBtn=$("pet-deactivate-btn");if(deactBtn)deactBtn.onclick=petDeactivate;}
function petRenderStorage(){
var list=$("pets-storage-list"),empty=$("pets-storage-empty"),countEl=$("storage-count");
if(!list||!empty)return;
if(countEl)countEl.textContent=petTotalCount();
if(petsState.storage.length===0){empty.textContent="Пусто";empty.classList.remove("hidden");list.innerHTML="";return;}
empty.classList.add("hidden");list.innerHTML="";
petsState.storage.forEach(function(pet){
var type=PET_TYPES[pet.type];
var div=document.createElement("div");div.className="pet-card "+type.rarity;
var bonusText=[];
if(type.bonus.income)bonusText.push("+"+Math.round(type.bonus.income*100)+"% доход");
if(type.bonus.gemTap)bonusText.push("+"+(type.bonus.gemTap*100).toFixed(2)+"% гем");
if(type.bonus.shardTap)bonusText.push("+"+(type.bonus.shardTap*100).toFixed(1)+"% осколок");
var actions='<button class="pet-card-btn pet-activate-btn" data-activate="'+pet.id+'">⭐ Активировать</button>';
actions+='<button class="pet-card-btn pet-sell-btn" data-sell="'+pet.id+'">💰 Продать ('+type.sellPrice+'🌑)</button>';
div.innerHTML='<div class="pet-card-emoji">'+type.emoji+'</div>'+'<div class="pet-card-info">'+'<div class="pet-card-name">'+type.name+'</div>'+'<div class="pet-card-rarity '+type.rarity+'">'+type.rarityLabel+'</div>'+'<div class="pet-card-bonus">'+bonusText.join(" · ")+'</div>'+'</div>'+'<div class="pet-card-actions">'+actions+'</div>';
list.appendChild(div);});
list.querySelectorAll("[data-activate]").forEach(function(btn){btn.onclick=function(){petActivate(parseInt(btn.dataset.activate));};});
list.querySelectorAll("[data-sell]").forEach(function(btn){btn.onclick=function(){petSell(parseInt(btn.dataset.sell));};});}
function petRenderInfo(){
var list=$("pet-info-list");if(!list)return;list.innerHTML="";
for(var id in PET_TYPES){var type=PET_TYPES[id];
var bonusText=[];
if(type.bonus.income)bonusText.push("+"+Math.round(type.bonus.income*100)+"% доход");
if(type.bonus.gemTap)bonusText.push("+"+(type.bonus.gemTap*100).toFixed(2)+"% шанс гема");
if(type.bonus.shardTap)bonusText.push("+"+(type.bonus.shardTap*100).toFixed(1)+"% шанс осколка");
var div=document.createElement("div");div.className="pet-info-item";
div.innerHTML='<div class="pet-info-emoji">'+type.emoji+'</div>'+'<div class="pet-info-text">'+'<b>'+type.name+'</b> · '+type.rarityLabel+'<br>'+bonusText.join(" · ")+'<br>Цена продажи: '+type.sellPrice+' 🌑'+'<div class="pet-info-chance">Шанс из яйца: '+Math.round(type.chance*100)+'%</div>'+'</div>';
list.appendChild(div);}}
function petRenderIndicator(){var ind=$("active-pet-indicator");if(!ind)return;var pet=petGetActive();if(!pet){ind.classList.add("hidden");return;}ind.classList.remove("hidden");var type=PET_TYPES[pet.type];var em=$("active-pet-emoji-small");if(em)em.textContent=type.emoji;var fill=$("active-pet-hunger-fill-small");if(fill){fill.style.width=Math.max(0,(petsState.hunger/PET_HUNGER_MAX)*100)+"%";fill.classList.remove("warn","danger");if(petsState.hunger<=20)fill.classList.add("danger");else if(petsState.hunger<=50)fill.classList.add("warn");}}
function petRenderAll(){petRenderTopBar();petRenderNest();petRenderActive();petRenderStorage();petRenderIndicator();}
function petInitUI(){
var buyBtn=$("buy-egg-btn");if(buyBtn)buyBtn.onclick=petBuyEgg;
var eggTap=$("nest-egg-tap-target");if(eggTap)eggTap.onclick=petHatchTap;
var collectTap=$("nest-collect-tap-target");if(collectTap)collectTap.onclick=petCollectTap;
document.querySelectorAll(".feed-btn").forEach(function(btn){btn.onclick=function(){petFeed(btn.dataset.food);};});
document.querySelectorAll(".food-buy-btn").forEach(function(btn){btn.onclick=function(){petBuyFood(btn.dataset.food);};});
var ind=$("active-pet-indicator");if(ind){ind.onclick=function(){if(currentPage!==2)showPage(2);};}
var almBtn=$("almanac-btn");if(almBtn)almBtn.onclick=function(){playSound("ui");var m=$("modal-almanac");if(m){m.classList.remove("hidden");syncScrollLock();}};
var almClose=document.querySelector('[data-close="modal-almanac"]');if(almClose)almClose.onclick=function(){var m=$("modal-almanac");if(m){m.classList.add("hidden");syncScrollLock();}};
petRenderInfo();petRenderAll();}
function petLoadFromSave(data){
if(!data)return;
try{
if(typeof data._petsXp==="number")petsState.xp=data._petsXp;
if(data._petsFood){petsState.food.strawberry=data._petsFood.strawberry||0;petsState.food.banana=data._petsFood.banana||0;petsState.food.orange=data._petsFood.orange||0;}
if(data._petsStorage)petsState.storage=data._petsStorage;
if(data._petsActive)petsState.active=data._petsActive;
if(typeof data._petsNextId==="number")petsState.nextId=data._petsNextId;
if(data._petsNest)petsState.nest=data._petsNest;
if(typeof data._petsHunger==="number")petsState.hunger=data._petsHunger;
if(typeof data._petsHungerLastTick==="number")petsState.hungerLastTick=data._petsHungerLastTick;
if(typeof data._petsXpLastTick==="number")petsState.xpLastTick=data._petsXpLastTick;
if(petsState.active&&data.lastTime){var secondsAway=Math.floor((Date.now()-data.lastTime)/1000);if(secondsAway>0){var drops=Math.floor(secondsAway/(5*60));petsState.hunger=Math.max(5,petsState.hunger-drops);}}
petsState.hungerLastTick=Date.now();
petsState.xpLastTick=Date.now();
}catch(e){console.warn("Ошибка загрузки питомцев:",e);}}
function petSaveToSave(data){
data._petsXp=petsState.xp;
data._petsFood={strawberry:petsState.food.strawberry,banana:petsState.food.banana,orange:petsState.food.orange};
data._petsStorage=petsState.storage;
data._petsActive=petsState.active;
data._petsNextId=petsState.nextId;
data._petsNest=petsState.nest;
data._petsHunger=petsState.hunger;
data._petsHungerLastTick=petsState.hungerLastTick;
data._petsXpLastTick=petsState.xpLastTick;}
// ФИКС: питомцы рендерятся только на 2-й странице
setInterval(function(){
petProcessNest();petTickHunger();petTickXP();
if(currentPage===2){petRenderNest();petRenderActive();}
petRenderIndicator();
},1000);
setTimeout(function(){petInitUI();},3000);

// === ИНТЕРВАЛЫ ===
setInterval(function(){var income=getCPS();coins+=income;totalEarned+=income;if(income>0)addQuestProgress("earn",income);updateUI();checkAchievements();checkRewardTab();checkNoteTab();checkPersonalRecord();},1000);
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
setInterval(function(){if(secretAutoClicker&&secretAutoClickerTimer>0){secretAutoClickerTimer--;if(secretAutoClickerTimer<=0){secretAutoClickerTimer=0;stopSecretAutoClicker();var popup=document.createElement("div");popup.className="achievement-popup";popup.textContent="⏸️ Кликер 67 остановлен.";document.body.appendChild(popup);setTimeout(function(){popup.remove();},4000);updateSecretUI();saveGame();}else{var modal=$("modal-secret");if(modal&&!modal.classList.contains("hidden"))updateSecretUI();}}},1000);
setInterval(saveGame,5000);
window.addEventListener("beforeunload",saveGame);
var _lastGoldenMinute=-1;
setInterval(function(){var d=new Date();var m=d.getMinutes();if(m%2===0&&m!==_lastGoldenMinute){_lastGoldenMinute=m;spawnGoldenCoin();}},5000);
setInterval(function(){if(goldenTimer>0){goldenTimer--;if(goldenTimer===0){goldenMultiplier=1;var b=$("golden-bonus");if(b)b.remove();}}},1000);
setInterval(function(){if(shards>lastShardsForTracking)totalShardsEarned+=(shards-lastShardsForTracking);lastShardsForTracking=shards;},500);
// ФИКС: дискета мигает раз в 5 минут
var _saveIndicatorTimer=null;
setInterval(function(){
var _si=document.getElementById("save-indicator");
if(!_si)return;
_si.classList.add("show");
if(_saveIndicatorTimer)clearTimeout(_saveIndicatorTimer);
_saveIndicatorTimer=setTimeout(function(){_si.classList.remove("show");},900);
},5*60*1000);

// === СТАРТ ===
initFirebase();
initSounds();
loadSettings();
loadSkins();
loadProfile();
ensureProfileId();
loadGame();
restoreTheftIfNeeded();
if(!quests||quests.length===0)generateQuests();
else checkQuestsUpdate();
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

// ФИКС: Альманах скрыт на первой странице
(function(){
var almBtn=$("almanac-btn");
if(almBtn)almBtn.classList.add("hidden");
})();

// === ПРОФИЛЬ И ОБУЧЕНИЕ ===
if(!hasProfile()){
setTimeout(function(){showProfileModal();},800);
}else{
updateLeaderboardName();
try{
var tutorialDone=localStorage.getItem(TUTORIAL_DONE_KEY);
if(!tutorialDone){setTimeout(function(){startTutorial();},1200);}
}catch(e){setTimeout(function(){startTutorial();},1200);}
}

// === SERVICE WORKER ===
if("serviceWorker" in navigator){window.addEventListener("load",function(){navigator.serviceWorker.register("service-worker.js").catch(function(e){console.warn("Service Worker не зарегистрирован:",e);});});}

const MDstyle  = document.createElement("style");
const CURRENT_URL = window.location.href
const backgroundColor = "black";
const __theme_color = "hsl(224, 100%, 55%)";
const __Big = "2rem";
const __small ="1rem";
const __accept = "rgb(7, 175, 7)";
const __decline = "rgb(190, 12, 12)";
const Random_CON = document.createElement("div");

async function WaitFor_one(Element) {
        return new Promise((resolve,reject)=>{
            const interval = setInterval(()=>{
                const item_search = document.querySelector(Element);
                if(item_search){
                    resolve(item_search);
                    clearInterval(interval);
                }
                else{
                    return;
                }

            },2000)
            
        })
};
 async function WaitFor_Mul(Elements) {
        return new Promise((resolve,reject)=>{
            const interval = setInterval(()=>{
                const items_search = document.querySelectorAll(Elements);
                if(items_search.length > 5){
                    resolve(items_search);
                    clearInterval(interval);
                }
                else{
                    return;
                }
                
            },2000)
            
        })
};
async function Set_IMG(){
    chrome.storage.local.get("Image",(result)=>{
        if(result.Image){
        const Body = WaitFor_one(".container-main");
        if(Body){
            MDstyle.innerHTML += `
            .container-main{
            background-image: url('${result.Image}');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            }
            `
        }
        }
       else{
        console.log("no image found")
       }
    })

}
async function UpdateSide_nav() {
const side_nav = await WaitFor_one("#navigation");
if(side_nav){
    MDstyle.innerHTML += `
    #navigation{
        backdrop-filter: blur(8px) !important;
        background: transparent !important;
        border-bottom-left-radius: 10px !important;
        border-bottom-right-radius: 10px !important;
        border: none !important;
        }
    
    `

}

};
async function UpdateFont() {
    MDstyle.innerHTML += `
    
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Sigmar&display=swap');
    *{
    font-family: 'Poppins' sans-serif !important;
    }
    
    `
}
async function top_NAV() {
    const header = await WaitFor_one("#header");
    if (header){
       MDstyle.innerHTML +=`
        
        #header{
        background: transparent !important;
        border-bottom-left-radius: 10px !important;
        border-bottom-right-radius: 10px !important;
        border: none !important;
        backdrop-filter: blur(11px) !important;
        }
       
        `

    }

};

async function _EXT_BTN(){
    const rightSection = await WaitFor_one(".icon-nav-settings");
    const a = document.createElement("a")
    const ImgURL = chrome.runtime.getURL("Icons/logo.png");
    if(rightSection){
        a.innerHTML = `
            <img src="${ImgURL}" alt="MDROBLOX" class="EXT_icon"></img>
            <style>
            .EXT_icon{
            width:30px ;
            height: 30px;
            border-radius: 20px;
            }
            </style>
        `
        a.addEventListener("click",(e)=>{
            e.target.style.transform = "scale(0.9)";
            const url = chrome.runtime.getURL("Setting/index.html");
            window.open(url,"_blank")
        })
        rightSection.after(a);
    }
}


 function WaitForCard(){
            return new Promise((resolve) => {
                const interval_1 = setInterval(()=> {
                    
                    const allGames =   document.querySelectorAll(".game-card-container");
                        if(allGames.length > Math.random()*100){
                                   clearInterval(interval_1)
                                  resolve(allGames)
                            }
                               
                        },500)
            
            });
        
        }
        
        async function random_pick(){
        
        if(CURRENT_URL.includes("home") || CURRENT_URL.includes("charts")){
        const allGames = await WaitForCard();
        const RANDOM_INDEX = Math.floor(Math.random() * allGames.length)
        
        console.log(RANDOM_INDEX)
        
        if(allGames){
                    console.log("Games found")
                    const selected_Game =  allGames[RANDOM_INDEX];
                    
                    const selected_game_name = selected_Game.querySelector(".game-card-name").innerHTML;
                    const selected_Game_url = selected_Game.querySelector(".game-card-link");
                    const GAME_URL = selected_Game_url ? selected_Game_url.href : null;
           async function waitImg(){
                return new Promise((resolve) => {
                    const interval_2 = setInterval(()=>{
                        const Game_IMG = selected_Game.querySelector("img");
                        if(Game_IMG){
                            resolve(Game_IMG.src)
                            clearInterval(interval_2)
                        }
                    },500)
                    
                })
            };
        
           
                    
                const Game_IMG = await waitImg()
                if(GAME_URL != null && Game_IMG != null){

                    Random_CON.id = "RandomGame"
                   Random_CON.innerHTML = `
        
              <img class="Random_img" src="${Game_IMG}"  alt="gameImg"></img>
               <div class="Randomcontents">
              
              <h1 style="color: white; font-size: ${__Big};">Game: </h1> <br> <p style="font-size:${__small}">${selected_game_name}</p>
                <a href="${selected_Game_url}" target="_parent" ><button id="Play_BTN">Play now 
                 <span class="-after-1"></span>
            <span class="-after-2"></span>
            <span class="-after-3"></span>
            <span class="-after-4"></span>
            <span class="-after-5"></span>
            <span class="-after-6"></span>
            <span class="-after-7"></span>
            <span class="-after-8"></span>
            <span class="-after-9"></span>
            <span class="-after-10"></span>
            </button>
            </a>
              </div>
             
             
                
                    <style>
                  
                    .Random_img{
                    width: auto;
                    height: auto;
                    text-align: center;
                    border-bottom-left-radius: 30px;
                    border-bottom-right-radius: 30px;
                    }
                    .Randomcontents{
                    
                    width: 50%;
                    height: auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    z-index: 30;
                    text-align: center;
                    border: none !important;
                    border-bottom-left-radius: 30px;
                    border-bottom-right-radius: 30px;
                    flex-direction: column;
                    
                    }
#Play_BTN{
width: 150px;
position: relative;
overflow: hidden;
background-color: ${__theme_color};
border-radius: 30px;
padding: 10px;
border: none;
margin: 10px;

transition: all 300ms 100ms ease-in-out;
                }
.-after-1,
.-after-2,
.-after-3,
.-after-4,
.-after-5,
.-after-6,
.-after-7,
.-after-8,
.-after-9,
.-after-10{
    content: '';
    position: absolute;
    z-index: 2;
    width: 20px;
    height: 20px;
    background-color:hsl(224, 100%, 65%) ;
    opacity: 0.8;
    border-radius: 50%;
}
.-after-1{
    top:80%;
    left: 1%;
    animation: moveBubbles 12s 100ms linear infinite ;
}
.-after-2{
    top:78%;
    left: 10%;
    animation: moveBubbles 19s 100ms linear infinite ;
}
.-after-3{
    top:80%;
    left: 20%;
    animation: moveBubbles 34s 100ms linear infinite ;
}
.-after-4{
    top:60%;
    left: 30%;
    animation: moveBubbles 7s 100ms linear infinite ;
}
.-after-5{
    top:76%;
    left: 70%;
    animation: moveBubbles 24s 100ms linear infinite ;
}
.-after-6{
    top: 65%;
    left: 90%;
    animation: moveBubbles 13s 100ms linear infinite ;
}
.-after-7{
    top: 60%;
    left: 80%;
    animation: moveBubbles 8s 100ms linear infinite ;
}
.-after-8{
    top:40%;
    right: 55%;
    animation: moveBubbles 11s 100ms linear infinite ;
}
.-after-9{
    top: 20%;
    right: 10%;
    animation: moveBubbles 10s 100ms linear infinite ;
}
.-after-10{
    top: 10%;
    right: 5%;
    animation: moveBubbles 18s 100ms linear infinite ;
}  

     #Play_BTN:hover{

 transform: scale(1.2);
             }

           #Play_BTN:active{

 transform: scale(0.9);
 background-color: white;
 color: black;
             }

@keyframes moveBubbles{
    0%{
        transform: translateY(350%);
    }
    100%{
        transform: translateY(-1000%);
    }
}

                    
                    </style>
        
                `;  
        document.body.prepend(Random_CON)
           
                }
                else{
                    Random_CON.innerHTML = `
                    <p>No game found</p>
                    `
                      document.body.prepend(Random_CON)
                }
                   
                    }
                    else{
                        console.log("could not find the games")
                    }
                    }
        
                    else{
                        return;
                    }
                    
            
        };
        
 async function makeEverything_T(){
    MDstyle.innerHTML +=`
      #RandomGame{
                    margin-top:80px;
                    width: 100%;
                    height: auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    z-index: 30;
                    border: none !important;
                    border-bottom-left-radius: 30px;
                    border-bottom-right-radius: 30px;
                    flex-direction: row;
                     background: transparent !important;
                    border-bottom-left-radius: 10px !important;
                    border-bottom-right-radius: 10px !important;
                    border: none !important;
                    position: sticky;
                    backdrop-filter: blur(10px) !important;
                        }

    .content{
    backdrop-filter: blur(20px) !important;
        background: transparent !important;
        border-bottom-left-radius: 10px !important;
        border-bottom-right-radius: 10px !important;
        border: none !important;

    }
        #content{
         backdrop-filter: blur(10px) !important;
        background: transparent !important;
       border-radius: 50px !important;
       padding:20px !important;
        border: none !important;
        overflow: auto !important;
        }
        .catalog-header{
         backdrop-filter: blur(11px) !important;
        background: transparent !important;
        border-bottom-left-radius: 10px !important;
        border-bottom-right-radius: 10px !important;
        border: none !important;
        }
        .section{
        backdrop-filter: blur(5px) !important;
        background: transparent !important;
       border-radius: 50px !important;
       padding:5px !important;
        border: 1px white !important;
        overflow: auto !important;
        }
        .search-bars{
        background: transparent !important;
       border-radius: 50px !important;
       padding:5px !important;
        border: 1px white !important;
        overflow: auto !important;
        }
       .topic-carousel{
        backdrop-filter: blur(10px) !important;
        background: transparent !important;
        border-bottom-left-radius: 10px !important;
        border-bottom-right-radius: 10px !important;
        border: none !important;
       }
        .section{
         backdrop-filter: blur(1px) !important;
        background: transparent !important;
        border-radius: 50px !important;
        border: none !important;
        }
        .slide-item-container{
        backdrop-filter: blur(2px) !important;
        background: transparent !important;
        border: none !important;
        }
        .profile-accoutrements-container{
         backdrop-filter: blur(4px) !important;
        background: transparent !important;
        border: none !important;
        }
        .row page-content{
         backdrop-filter: blur(2px) !important;
        background: transparent !important;
        border: none !important
        
        }
        .container-list {
          backdrop-filter: blur(2px) !important;
        background: transparent !important;
        border: none !important
        }
        .ng-scope{
        background: transparent !important;
        border: none !important
        }
        .item-list-container{
         backdrop-filter: blur(1px) !important;
        background: transparent !important;
        border: none !important
        }
        #profile-current-wearing-avatar > div{
         background: transparent !important;
        border: none !important
        }
        #horizontal-tabs,.section-content{
        backdrop-filter: blur(1px) !important;
        background: transparent !important;
        border: none !important;
        border-radius: 30px !important;
        }
        .profile-slide-container *{
         background: transparent !important;
        border: none !important
        }
        .icon-carousel-right{
        contents: > !important;
        border-radius: 10px !important;
        background: transparent !important;
        text-align: center !important;
         border: 1px solid white !important;
        }
          .icon-carousel-left{
        contents: < !important;
        border-radius: 10px !important;
        background: transparent !important;
        text-align: center !important;
        border: 1px solid white !important;
        }
        .btn-secondary-md{
         border-radius: 10px !important;
        background: transparent !important;
        text-align: center !important;
        border: 1px solid white !important;
        }
       .topic-container{
        backdrop-filter: blur(1px) !important;
        background: transparent !important;
        border: none !important;
        border-radius: 30px !important;
        }
        .avatar-card-container{
         backdrop-filter: blur(10px) !important;
        background: transparent !important;
        border: none !important;
        border-radius: 30px !important;
        }
        .nav-tabs{
        backdrop-filter: blur(1px) !important;
        background: transparent !important;
        border: none !important;
        border-radius: 30px !important;
         border: 1px solid white !important;
        }
    `
    chrome.storage.local.get("TextColor", (result)=>{
        if(result){
            const TextColor = result.TextColor;
            MDstyle.innerHTML += `
            *{
            color: ${TextColor};
            }
            `
        }

    })

 }       
async function  main() {
    
    await _EXT_BTN()
    chrome.storage.sync.get(["owns", "ActiveStatus","Game_status"],async (result)=>{
        if(result){
            if(result.owns && result.ActiveStatus == true){
                console.log(`%c MDRoblox %c`);
                await top_NAV();
                if((CURRENT_URL.includes("home") || CURRENT_URL.includes("charts")) && result.Game_status === true){
                    await random_pick();
                }
                await UpdateFont();
                await UpdateSide_nav();
                await Set_IMG();
                makeEverything_T();
                document.head.append(MDstyle);
                
            }
            else{
                console.log("MDroblox extension has disconnected")
            }
    }
    else{
            return;
        }
    });
}
main();
const MDstyle  = document.createElement("style");
const CURRENT_URL = window.location.href
const backgroundColor = "hsl(0, 0%, 10%)";
const __theme_color = "hsl(224, 100%, 55%)";
const __Big = "2rem";
const __small ="1rem";
const __accept = "rgb(7, 175, 7)";
const __decline = "rgb(190, 12, 12)";
let Active_styling = null ;
const Activate_STYLING = document.getElementById("Activate");
const Img_file = document.getElementById("IMG_FILE");
const Game_R = document.getElementById("Game_recommendation");
let Game_Check = null;
const ColorInput = document.getElementById("ColorInput")

async function Check__IUGGP() {
    chrome.storage.sync.get("owns",(result)=>{
        if(result){
            console.log("status: ",result.owns);
            if(result.owns === false) {
                const AUE = document.createElement("div");
                AUE.id = "Alert";
                AUE.innerHTML = `
                <h1>
                You do not own the game Pass!!!
                </h1>
                <div class="BTN_C">
               <a href="https://www.roblox.com/game-pass/1226339128/Unlock-MDRoblox" target="_blank"><button class="BTN_BUY">Buy now</button></a>
                </div>
                
                <style>
                #Alert{
                height: 100px;
                width: 100%;
                display:flex;
                flex-direction: row;
                background-color: ${backgroundColor};
                box-shadow: 0 0 10px black;
                padding :20px;
                gap: 10px;
                align-items: center;
                justify-content: space-between;
            }
                #h1{
                width: 50%;
                }
                .BTN_BUY{
                margin-right: 20px;
                background-color: ${__accept};
                border: none;
                border-radius: 50px;
                padding: 10px;
                cursor: pointer;
                color: white;
                font-size: ${__small};
                transition: all 40ms 100ms ease-in;
                }
                .BTN_BUY:hover{
                transform: scale(1.2);
                }
                .BTN_BUY:active{
                transform: scale(0.9);
                color: black;
                background-color: white;
                }
                </style>
                `
                document.body.append(AUE);
            }
            else{
                console.log("User owns the gamepass")
            }
        }
        else{
            console.log("failed to get status from storage")
        }

    })

};
async function Image_H(){
    Img_file.addEventListener("change",function(){
       const file = this.files[0];
       if(!file) return;
       const reader  = new FileReader();
       reader.onload = function (e) {
        const dataURL = e.target.result;
        chrome.storage.local.set({Image: dataURL},
            ()=> {console.log("image saved");}
        )
       };
       reader.readAsDataURL(file);
       
    });
   
};

async function G_C(){
if(Game_R.checked){
    Game_Check = true
    chrome.storage.sync.set({Game_status: Game_Check});

}
else{
     Game_Check = false
    chrome.storage.sync.set({Game_status: Game_Check});


}
};
Game_R.addEventListener("change",G_C);
async function RestorePrevGameST() {
    chrome.storage.sync.get("Game_status", (result)=>{
        if(result.Game_status){
            Game_R.checked = result.Game_status;
           
        }

    })

}

async function ST(){
    if(Activate_STYLING.checked){
Active_styling = true;
chrome.storage.sync.set({ActiveStatus: Active_styling});
}
    else{
    Active_styling = false
chrome.storage.sync.set({ActiveStatus: Active_styling});
}

};
Activate_STYLING.addEventListener("change", ST);
async function C() {
    chrome.storage.sync.get("ActiveStatus", (result)=>{
        if(result){
            Activate_STYLING.checked = result.ActiveStatus;
           
        }

    })

};


async function Save_TColor(){
ColorInput.addEventListener("keydown", (e)=>{
    if(e.key === "Enter" || e.key === "Return"){
        const Color_Data = ColorInput.value;
        console.log(Color_Data)
        chrome.storage.local.set({TextColor: Color_Data })
    }
    else{
        return;
    }

});
};


async function main() {
    await Check__IUGGP();
   await C();
   await Image_H();
   await RestorePrevGameST();
   await  Save_TColor();
};
main()
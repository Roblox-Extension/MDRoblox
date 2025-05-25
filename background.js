const GamePass_ID = 1226339128;
let Owns = null;
chrome.runtime.onInstalled.addListener(()=>{
    chrome.alarms.create("checkGamepassStatus",{periodInMinutes: 1});
});
async function GetID(){
const User_Fetch = await fetch("https://users.roblox.com/v1/users/authenticated",{credentials: "include"});
if(User_Fetch.ok){
    const User_JSON = await User_Fetch.json()
    if(User_JSON){
        chrome.storage.sync.set({
            id: User_JSON.id,
            DisplayName: User_JSON.displayName
        });
    }
}
else{
    console.log("could not fetch");
}

};

async function getUserName(){
    chrome.storage.sync.get("id", async (result) => {
    if (result.id && result.id > 0) {
        try {
            const GAMEPASSURL = await fetch(`https://inventory.roblox.com/v1/users/${result.id}/items/GamePass/${GamePass_ID}`, { credentials: "include" });
            if (GAMEPASSURL.ok) {
                const GAMEPASSURL_JSON = await GAMEPASSURL.json(); 
                if (GAMEPASSURL_JSON && GAMEPASSURL_JSON.data && GAMEPASSURL_JSON.data.length > 0) {
                    Owns = true; 
                } else {
                    Owns = false; 
                }
                chrome.storage.sync.set({ owns: Owns });
            } else {
                console.error("Failed to fetch GamePass data:", GAMEPASSURL.status);
            }
        } catch (error) {
            console.error("Error fetching GamePass data:", error);
        }
    } else {
        console.log("No ID retrieved");
    }
});}
chrome.alarms.onAlarm.addListener(async (alarm)=>{
    if (alarm.name === "checkGamepassStatus"){
        await GetID();
        await getUserName();
    }
});

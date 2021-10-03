import readline from "readline";
import checkMessage from "./checkMessage.js";
import crawler from "./crawler.js";

(() => {
    const rl = readline.createInterface({
        input : process.stdin,
        output : process.stdout,
    });
    
    console.log("Input format => stock name:market name")
    console.log("ex) TSLA:NASDAQ")
    console.log("If the format is not followed, an error occurs.")
    rl.setPrompt("> ")

    rl.on('line', (message) => {

        if(checkMessage(message) === true) {
            crawler(message);
        }
        
    }).on('close', () => {
        process.exit()
    })
})()
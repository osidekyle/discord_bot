require("dotenv").config()


const Discord=require("discord.js")

const client= new Discord.Client()

client.on("ready",function(){
    console.log("Hello")
})

client.on("message",function(message){
    if(message.content=="ping"){
        
    message.channel.send("pong")
    }
})




client.login(process.env.DISCORD_TOKEN)


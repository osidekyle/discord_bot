require("dotenv").config()
const ms=require("ms")

const Discord=require("discord.js")

const client= new Discord.Client()

var words=["crud","heck"]


client.on("ready",function(){

   

    console.log("Hello")
})

client.on("message",function(message){
    if(message.content.startsWith("-play")){
        var playArray=message.content.split(" ")
        var query=playArray.slice(1)
        query=query.join(" ")
        console.log(query)

        

    }



    if(message.content.startsWith("-mute")){
        var role=message.member.guild.roles.cache.find(role=>role.name=="muted")
        const target = message.mentions.members.first();
        target.roles.add(role)
        message.channel.send(target.displayName+" has been succesfully muted.")
    }

    if(message.content.startsWith("-unmute")){
        var role=message.member.guild.roles.cache.find(role=>role.name=="muted")
        const target = message.mentions.members.first();
        target.roles.remove(role)
        message.channel.send(target.displayName+" has been succesfully unmuted.")
    }












    let messageArray = message.content.split(" ");
    //['-tempmute','bob','10s']
    let args = messageArray.slice(1);
    //['bob','10s']
    let cmd = messageArray[0];
    //-tempmute

    //if command is equal to -tempmute
    if(cmd === '-tempmute'){
        //if the member has permissions
        if(message.member.hasPermission("MANAGE_MESSAGES")){
            //find the user in the command in one of two ways
            var member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            //if the args[0] does not exist for some reason, reply with a message
            if(!args[0]) return message.reply("Please Provide a Member to Tempmute.")

            //find muted role
            let role = message.guild.roles.cache.find(role => role.name === "muted");
            //Add role
            
            member.roles.add(role)

            //time = typed in time
            let time = args[1];


            //logs a message
            message.channel.send(member.displayName+" has now been temp muted for "+time+".")

            //starts a timer
            setTimeout( function () {

                member.roles.remove(role.id);
                message.channel.send(member.displayName+ " has been unmuted for "+ time+".")
            }, ms(time))
        

        }

    }


    
   



    for(var item of words){
        if(message.content.includes(item)){
           
            var role=message.member.guild.roles.cache.find(role=>role.name=="muted")
            message.member.roles.add(role)
            message.channel.send("You said a bad word and have been muted")
            
        }
    }    

    if(message.content.startsWith("-addword")){
        if(message.member.hasPermission("",{checkAdmin:true,checkOwner:true})){
            words.push(message.content.slice(8).trim())
            console.log(words)
        }
    }


    if(message.content=="ping"){
        
    message.channel.send("pong")
    }
})







client.login(process.env.DISCORD_TOKEN)


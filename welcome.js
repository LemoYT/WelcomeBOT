const config = require("./config");
const Canvas = require("canvas");
const Discord = require("discord.js");

module.exports = function (client) {

    const description = {
        name: "WelcomeImages",
        filename: "welcome.js",
        version: "4.8"
    }
    //log that the module is loaded
    console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`)
    //fires every time when someone joins the server
    client.on("guildMemberAdd", async member => {
      //If not in a guild return
      if(!member.guild) return;
      //create a new Canvas
      const canvas = Canvas.createCanvas(1772, 633);
      //make it "2D"
      const ctx = canvas.getContext('2d');
      //set the Background to the welcome.png
      const background = await Canvas.loadImage(`./welcome.png`);
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#D4AF37';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      //set the first text string 
      var textString3 = `${member.user.username}`;
      //if the text is too big then smaller the text
      if (textString3.length >= 14) {
        ctx.font = 'bold 100px Genta';
        ctx.fillStyle = '#D4AF37';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }
      //else dont do it
      else {
        ctx.font = 'bold 150px Genta';
        ctx.fillStyle = '#D4AF37';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }
      //define the Discriminator Tag
      var textString2 = `#${member.user.discriminator}`;
      ctx.font = 'bold 40px Genta';
      ctx.fillStyle = '#D4AF37';
      ctx.fillText(textString2, 730, canvas.height / 2 + 58);
      //define the Member count
      var textString4 = `Ya somos ${member.guild.memberCount} Miembros`;
      ctx.font = 'bold 60px Genta';
      ctx.fillStyle = '#D4AF37';
      ctx.fillText(textString4, 750, canvas.height / 2 + 125);
      //get the Guild Name
      var textString4 = `Bienvenido a ${member.guild.name}`;
      ctx.font = 'bold 60px Genta';
      ctx.fillStyle = '#D4AF37';
      ctx.fillText(textString4, 700, canvas.height / 2 - 150);
      //create a circular "mask"
      ctx.beginPath();
      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
      ctx.closePath();
      ctx.clip();
      //define the user avatar
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
      //draw the avatar
      ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
      //get it as a discord attachment
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
      //define the welcome embed
      const welcomeembed = new Discord.MessageEmbed()
        .setColor("WHITE")
        .setTimestamp()
        .setFooter(`Bienvenidas en ${member.guild.name}`, member.guild.iconURL({ dynamic: true }))
        .setDescription(`<a:_:1115789175199911956> !Bienvenido, <@${member.id}>!\n<a:_:1119661405075939419> Muchísimas gracias por unirte al servidor.\n<:_:1119673369588158606> Pásate por: <#1107783059069227049> y <#1108158438158114877>. Sí tienes alguna duda, acude conmigo vía mensajes privados.\n<a:_:1116178370477166634> ¡Esperamos te guste esta maravillosa comunidad! 💖`)
        .setImage("attachment://welcome-image.png")
        .attachFiles(attachment);
      //define the welcome channel
      const channel = member.guild.channels.cache.find(ch => ch.id === config.CHANNEL_WELCOME);
      //send the welcome embed to there
      channel.send(welcomeembed);
      //member roles add on welcome every single role
      let roles = config.ROLES_WELCOME;
      for(let i = 0; i < roles.length; i++ )
      member.roles.add(roles[i]);
    })
}

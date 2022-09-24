const Discord = require('discord.js');
const fs = require('fs');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const jq = require( "jquery" )( window );
let info;

function sr20(client) {
        client.on('message', message => {
                msg = message.content;
                if (msg.startsWith('!sr')) {
			let search = msg.slice(4);
			let embed = new Discord.MessageEmbed().setTitle(search);
			let url = 'https://app.roll20.net/compendium/dnd5e/' + search + '.json';
			jq.getJSON(url, function(data) {
				console.log(data.data);
				info = Object.entries(data.data);
				for (i = 0; i < info.length; i++) {
					if (info[i][0][4] == '-') {
						info[i][0] = info[i][0].slice(5);
					}
					embed.addField(info[i][0], info[i][1], true);        
				}
				message.channel.send(embed);
			})
			.fail(function(){	
			   message.channel.send("Info not found, either spelling is incorrect, or it doesn't exist");
			});
		}
        });
}

module.exports = { sr20 };

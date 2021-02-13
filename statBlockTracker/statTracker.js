const yaml = require('js-yaml');
const fs = require('fs');
const Discord = require('discord.js');

function statTracker(client) {
	client.on('message', message => {
		let msg = message.content;
		if (msg.startsWith('!addstat')) {
			let stats = msg.substr(9);
			stats = stats.split(' ');
			for (i = 0; i < stats.length; i++) {
				stats[i] = stats[i].split(':');
			}
			charDict = {};
			charDict[stats[0][1]] = stats;
			fs.appendFile('./statBlockTracker/stats.yml', yaml.dump(charDict), (err) => {message.channel.send('Sorry, couldnt add those stats. There is probably another stat block with that name. Try renaming the stats')});
			charDict = '';
		} else if (msg.startsWith('!searchstat')) {
			let search = msg.substr(12).toLowerCase();
			stats = fs.readFileSync('./statBlockTracker/stats.yml', () => {});
			stats = yaml.load(stats);
			searchstat = stats[search];
			let embed = new Discord.MessageEmbed()
			.setTitle(searchstat[0][1]);
			for (i = 0; i < searchstat.length; i++) {
				embed.addField(searchstat[i][0], searchstat[i][1], true);	
			}
			message.channel.send(embed);
		}
	});
}

module.exports = { statTracker };

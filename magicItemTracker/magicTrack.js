const fs = require('fs');
const yaml = require('js-yaml');
const Discord = require('discord.js');

function magicItemTracker(client) {
	let embed;
	let mesg;
	client.on ('message', message => {
		let msg = message.content;
		if (msg.startsWith('!additem')) {
			let item = msg.substr(9);
			item = item.split(' | ');
			itemDict = {};
			itemDict[item[0]] = item;
			let ymlItem = yaml.dump(itemDict);
			itemDict = ''
			fs.appendFile('./magicItemTracker/items.yml', ymlItem, () => {});
		} else if (msg.startsWith('!searchitem')) {
			let items = fs.readFileSync('./magicItemTracker/items.yml', () => {});
			items = yaml.load(items);
			let search = msg.substr(12).toLowerCase();
			let item = items[search];
			embed = new Discord.MessageEmbed()
			.setTitle(item[0])
			.addFields(
				{ name: 'Rarity', value: item[1] },
				{ name: 'Description', value: item[2] }
			);
			message.channel.send(embed);
		}
	});
}

module.exports = { magicItemTracker };

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
			itemDict[item[0].toLowerCase()] = item;
			let ymlItem = yaml.dump(itemDict);
			itemDict = ''
			fs.appendFile('./magicItemTracker/items.yml', ymlItem, (err) => {if (err) {message.channel.send('Sorry, couldnt add that item. There is probably another item with that name. Try giving the item a different name.')}});
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

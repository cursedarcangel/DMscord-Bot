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
			item = item.split(':');
			for (i = 0; i < item.length; i++) {
				item[i] = item[i].split(' ');
			}
			item[1].unshift(item[0].pop());
			item[2].unshift(item[1].pop());
			item[3].unshift(item[2].pop());
			item.shift();
			desc = ''
			for (i = 1; i < item[2].length; i++) {
				desc += item[2][i];
				desc += ' ';
			}
			desc = desc.substr(0, desc.length - 1);
			let descr = item[2][0];
			item.pop();
			let arr = [descr, desc];
			item.push(arr);
			console.log(item);
			itemDict = {};
			itemDict[item[0][1].toLowerCase()] = item;
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

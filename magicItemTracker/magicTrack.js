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
			.setTitle(item[0][1])
			.addFields(
				{ name: 'Rarity', value: item[1][1] },
				{ name: 'Description', value: item[2][1] }
			);
			message.channel.send(embed);
		} else if (msg.startsWith('!edititem')) {
			let affected = msg.substr(10);
			affected = affected.split(' ');
                        let affName = affected[0];
                        affected.shift();
                        params = affected;
			params = params.join(' ');
                        items = fs.readFileSync('./magicItemTracker/items.yml', () => {});
                        items = yaml.load(items);
                        oldItem = items[affName];
                        newItem = oldItem;
			params = params.split(':');
                        for (i = 0; i < oldItem.length; i++) {
				if (oldItem[i][0].toLowerCase() == params[0].toLowerCase()) {
					newItem[i][1] = params[1];
				}
                        }
                        items[affName] = newItem;
                        fs.writeFile('./magicItemTracker/items.yml', yaml.dump(items), () => {});
		}
	});
}

module.exports = { magicItemTracker };

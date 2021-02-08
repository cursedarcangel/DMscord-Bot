const fs = require('fs');
const yaml = require('js-yaml');

function magicItemTracker(client) {
	client.on ('message', message => {
		let msg = message.content;
		if (msg.startsWith('!additem')) {
			let item = msg.substr(9);
			item = item.split(' | ');
			itemDict = {};
			itemDict[item[0]] = item;
			let ymlItem = yaml.dump(itemDict);
			itemDict = ''
			fs.appendFile('./magicItemTracker/items.yaml', ymlItem, () => {});
		}
	});
}

module.exports = { magicItemTracker };

const fs = require('fs');
const yaml = require('js-yaml');

function magicItemTracker(client) {
	client.on ('message', message => {
		let msg = message.content;
		if (msg.startsWith('!additem')) {
			let item = msg.substr(9);
			item = item.split(' | ');
			let ymlItem = yaml.dump(item);

			fs.writeFile('./magicItemTracker/items.yaml', ymlItem, () => {});
		}
	});
}

module.exports = { magicItemTracker };

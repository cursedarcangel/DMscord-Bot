const yaml = require('js-yaml');
const fs = require('fs');

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
			charDict[stats[0][0]] = stats;
			console.log(yaml.dump(charDict));
			fs.appendFile('./statBlockTracker/stats.yml', yaml.dump(charDict), () => {});
		}
	});
}

module.exports = { statTracker };

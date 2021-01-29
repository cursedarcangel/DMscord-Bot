const Discord = require('discord.js');

function getNums(str) {
	let output = '';
	for (i in str) {
		let converted = Number.parseInt(str[i]);
		if (Number.isNaN(converted)) {
			continue;
		} else {
			output += str[i];
		}
	}
	return output;
}

function initiative(client) {

	let inits = {};
	let initOrder = '';
	let newReq = true;

	client.on('message', message => {
		let msg = message.content
		if (msg.includes('!addinit')) {
			
			let crea = msg.split(' ');                                                   
			crea.shift();
			
			let nam = crea[0].split(':');
			crea.shift();
			let name = nam[1];

			let init, ac, hp = '';

			init = Number.parseInt(getNums(crea[0]));
			ac = Number.parseInt(getNums(crea[1]));
			hp = Number.parseInt(getNums(crea[2]));

			inits[name] = crea;

			if (newReq == true) {
				embed = new Discord.MessageEmbed()
				.setTitle('Name  |  Init  |  AC  |  HP')
				.setDescription(initOrder);
				message.channel.send(embed); 
				newReq = false;
			}
		}
	});
}

module.exports = { initiative };

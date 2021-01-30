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

	let initOrder = '';
	let newReq = true;
	let mesag;

	client.on('message', async message => {
		let msg = message.content
		if (msg.includes('!addinit')) {
			
			let crea = msg.split(' ');                                                   
			crea.shift();
			
			let nam = crea[0].split(':');
			crea.shift();
			let name = nam[1];

			let init, ac, hp = '';

			init = getNums(crea[0]);
			ac = getNums(crea[1]);
			hp = getNums(crea[2]);

			if (newReq == true) {
				initOrder += (name + '  |  ' + init + '  |  ' + ac + '  |  ' + hp);
				embed = new Discord.MessageEmbed()
				.setTitle('Name  |  Init  |  AC  |  HP')
				.setDescription(initOrder);
				mesag = await message.channel.send(embed); 
				newReq = false;
			} else {
				initOrder += ('\n' + name + '  |  ' + init + '  |  ' + ac + '  |  ' + hp);
				embed.setDescription(initOrder);
				mesag.edit(embed);
			}
		}
	});
}

module.exports = { initiative };

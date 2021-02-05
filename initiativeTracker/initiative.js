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
	let mesg;
	let embed;
	let inits = [];

	client.on('message', async message => {
		let msg = message.content
		if (msg.startsWith('!addinit')) {
			
			let crea = msg.split(' ');                                                   
			crea.shift();

			let name = crea[0];
			crea.shift();

			let init, ac, hp = '';

			init = getNums(crea[0]);
			ac = getNums(crea[1]);
			hp = getNums(crea[2]);
			
			let stats = [name, init, ac, hp];

			if (newReq == true) {
				stats.push('  <<<');
				inits.push(stats);
				initOrder += (inits[0] + '  |  ' + inits[1] + '  |  ' + inits[2] + '  |  ' + inits[3]);
				embed = new Discord.MessageEmbed()
				.setTitle('Name  |  Init  |  AC  |  HP')
				.setDescription(initOrder);
				mesg = await message.channel.send(embed); 
				newReq = false;
				message.delete();
			} else {
				for (i = 0; i < inits.length; i++) {
					if (Number.parseInt(init) >= inits[i][1]) {
						inits.splice(i, 0, stats);
						break;
					}
					if (i == inits.length - 1) {
						inits.push(stats);
						break;
					}
				}

				initOrder = '';
				for (i = 0; i < inits.length; i++) {
					if (inits[i][inits[i].length - 1] == '  <<<') {
						initOrder += ('\n' + inits[i][0] + '  |  ' + inits[i][1] + '  |  ' + inits[i][2] + '  |  ' + inits[i][3] + '  <<<');
					} else {
					initOrder += ('\n' + inits[i][0] + '  |  ' + inits[i][1] + '  |  ' + inits[i][2] + '  |  ' + inits[i][3]);
					}
				}
				embed.setDescription(initOrder);
				mesg.edit(embed);
				message.delete();
			}
		} else if (msg.startsWith('!initdone')) {
			newReq = true;
			initOrder = '';
			inits = [];
			message.delete();
			mesg.delete();
		} else if (msg.startsWith('!removehp')) {
			let target = msg.split(' ');
			target.shift();

			let tarName = target[0];
			let amount = Number.parseInt(target[1]);

			for (i = 0; i < inits.length; i++) {
				if (inits[i][0] == tarName) {
					let hp = Number.parseInt(inits[i][3]);
					hp -= amount;
					inits[i][3] = hp;
					break;
				}
				if (i == inits.length - 1) {
					message.channel.send('Please provide a valid name. (Case sensitive)');
				}
			}

			initOrder = '';
			for (i = 0; i < inits.length; i++) {
				if (inits[i][inits[i].length - 1] == '  <<<') {
					initOrder += ('\n' + inits[i][0] + '  |  ' + inits[i][1] + '  |  ' + inits[i][2] + '  |  ' + inits[i][3] + '  <<<');
				} else {
				initOrder += ('\n' + inits[i][0] + '  |  ' + inits[i][1] + '  |  ' + inits[i][2] + '  |  ' + inits[i][3]);
				}
			}
			embed.setDescription(initOrder);
			mesg.edit(embed);
			message.delete();
		} else if (msg.startsWith('!addhp')) {

			let target = msg.split(' ');
			target.shift();

			let tarName = target[0];
			let amount = Number.parseInt(target[1]);

			for (i = 0; i < inits.length; i++) {
				if (inits[i][0] == tarName) {
					let hp = Number.parseInt(inits[i][3]);
					hp += amount;
					inits[i][3] = hp;
					break;
				}
				if (i == inits.length - 1) {
					message.channel.send('Please provide a valid name. (Case sensitive)');
				}
			}

			initOrder = '';
			for (i = 0; i < inits.length; i++) {
				if (inits[i][inits[i].length - 1] == '  <<<') {
					initOrder += ('\n' + inits[i][0] + '  |  ' + inits[i][1] + '  |  ' + inits[i][2] + '  |  ' + inits[i][3] + '  <<<');
				} else {
				initOrder += ('\n' + inits[i][0] + '  |  ' + inits[i][1] + '  |  ' + inits[i][2] + '  |  ' + inits[i][3]);
				}
			}
			embed.setDescription(initOrder);
			mesg.edit(embed);
			message.delete();
		} else if (msg.startsWith('!remove')) {
			let affected = msg.split(' ');
			let affName = affected[1];

			for (i = 0; i < inits.length; i++) {
				if (inits[i][0] == affName) {
					inits.splice(i, 1);
					break;
				}
				if (i == inits.length - 1) {
					message.channel.send('Please provide a valid name. (Case sensitive)');	
					break;
				}	
			}

			initOrder = '';
			for (i = 0; i < inits.length; i++) {
				if (inits[i][inits[i].length - 1] == '  <<<') {
					initOrder += ('\n' + inits[i][0] + '  |  ' + inits[i][1] + '  |  ' + inits[i][2] + '  |  ' + inits[i][3] + '  <<<');
				} else {
				initOrder += ('\n' + inits[i][0] + '  |  ' + inits[i][1] + '  |  ' + inits[i][2] + '  |  ' + inits[i][3]);
				}
			}
			embed.setDescription(initOrder);
			mesg.edit(embed);
			message.delete();
		} else if (msg.startsWith('!next')) {
			for (i = 0; i < inits.length; i++) {
				if (i == inits.length - 1) {
					inits[i].pop();
					inits[0].push('  <<<');
					message.delete();
					break;
				} else if (inits[i][inits[i].length - 1] == '  <<<') {
					inits[i].pop()
					inits[i + 1].push('  <<<');
					message.delete();
					break;
				} 
			}

			initOrder = '';
			for (i = 0; i < inits.length; i++) {
				if (inits[i][inits[i].length - 1] == '  <<<') {
					initOrder += ('\n' + inits[i][0] + '  |  ' + inits[i][1] + '  |  ' + inits[i][2] + '  |  ' + inits[i][3] + '  <<<');
				} else {
				initOrder += ('\n' + inits[i][0] + '  |  ' + inits[i][1] + '  |  ' + inits[i][2] + '  |  ' + inits[i][3]);
				}
			}
			embed.setDescription(initOrder);
			mesg.edit(embed);
		}
	});
}

module.exports = { initiative };

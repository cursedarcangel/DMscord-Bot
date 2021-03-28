const Discord = require('discord.js');
const yaml = require('js-yaml');
const fs = require('fs');

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
function findMod(num) {
        if (num >= 10) {
                num = num - 10;
                num = num / 2;
                let mod = Math.floor(num);
        } else {
                if (num == 9 || num == 8) {
                        let mod = -1;
                } else if (num == 7 || num == 6) {
                        let mod = -2;
                } else if (num == 5 || num == 4) {
                        let mod = -3;
                } else if (num == 3 || num == 2) {
                        let mod = -4;
                } else {
                        let mod = -5;
                }
        }
        return mod;
}

function initiative(client) {

	let initOrder = '';
	let newReq = true;
	let mesg;
	let embed;
	let inits = [];

	client.on('message', async message => {
		let msg = message.content
		if (msg.startsWith('!addinit ')) {
			
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
		} else if (msg.startsWith('!addinitstat')) {
			let ac;
			let initmod;
			let hp;
			let addedCrea = msg.split(' ');
			addedCrea.shift();
			let statBlocks = yaml.load(fs.readFileSync('./statBlockTracker/stats.yml', () => {}));
			let statblock = statBlocks[addedCrea[0]];
			let name = addedCrea[1];
			let init = Math.floor(Math.random() * 20) + 1;
			for (i = 0; i < statblock.length; i++) {
				if (statblock[i][0].toLowerCase().startsWith('init')) {
					initmod = statblock[i][1];
					break;
				}
			}
			init += initmod;
			for (i = 0; i < statblock.length; i++) {
				if (statblock[i][0].toLowerCase() == 'ac') {
					ac = statblock[i][1];		
					break;
				}
			}
			for (i = 0; i < statblock.length; i++) {
				if (statblock[i][0].toLowerCase() == 'hp') {
					hp = statblock[i][1];
					break;
				}
			}
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
		} else if (msg.startsWith('!first')) {
			for (i=0; i < inits.length; i++) {
				if (inits[i][inits[i].length - 1] == '  <<<') {
					inits[i].pop();
					inits[0].push('  <<<');
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
	});
}

module.exports = { initiative };

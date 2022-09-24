const Discord = require('discord.js');
const yaml = require('js-yaml');
const fs = require('fs');

// all the state we need...
// consider making into something per-channel if possible
let embed, mesg
let inits = [];
let init_index = 0;

function dexMod(dex) {
	if (Number.isInteger((dex - 10) / 2)) {
		return(((dex - 10) / 2))
	} else {
		return(Math.floor((dex - 10) / 2))
	}
}

function roll(dex) {
	return(Math.floor(Math.random() * 20) + 1 + dexMod(dex))
}

function render_inits() {
	let result = ''
	for (let i = 0; i < inits.length; i++) {
		result += inits[i].join(' | ');
		if (i == init_index) {
			result += ' <<<';
		}
		result += '\n';
	}
	return result;
}

async function add_initiative(message, name, initiative, ac, hp) {
	if (inits.length == 0) {
		embed = new Discord.MessageEmbed()
			.setTitle('Name  |  Init  |  AC  |  HP')
			.setDescription('');
		mesg = await message.channel.send(embed); 
	}

	// inits should be kept in-order at all times, so we can insert in-order
	// TODO- to properly handle ties, should look at dex bonus... then randomize
	let inserted = false;
	for (let i = 0; i < inits.length; i++) {
		if (initiative >= inits[i][1]) {
			inits.splice(i, 0, [name, initiative, ac, hp]);
			inserted = true;
			if (i < init_index) { init_index++ }
			break;
		}
	}
	if (!inserted) {
		inits.push([name, initiative, ac, hp]);
	}
}

function initiative(client) {

	client.on('message', async message => {
		let msg = message.content
		if (msg.startsWith('!addinit')) {
			
			let crea = msg.split(' ');                                                   
			crea.shift();

			let name = crea[0];
			crea.shift();

			let init, ac, hp = '';

			init = +crea[0];
			ac = +crea[1];
			hp = +crea[2];
			
			await add_initiative(message, name, init, ac, hp);
			embed.setDescription(render_inits());
			mesg.edit(embed);
			message.delete();
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

			embed.setDescription(render_inits())
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

			embed.setDescription(render_inits())
			mesg.edit(embed);
			message.delete();
		} else if (msg.startsWith('!removeinit')) {
			let affected = msg.split(' ');
			let affName = affected[1];

			for (i = 0; i < inits.length; i++) {
				if (inits[i][0] == affName) {
					inits.splice(i, 1);
					if (i < init_index) { init_index-- }
					break;
				}
				if (i == inits.length - 1) {
					message.channel.send('Please provide a valid name. (Case sensitive)');	
					break;
				}	
			}

			embed.setDescription(render_inits())
			mesg.edit(embed);
			message.delete();
		} else if (msg.startsWith('!next')) {
			init_index++;
			if (init_index >= inits.length) { init_index = 0 }
			embed.setDescription(render_inits())
			mesg.edit(embed);
			message.delete();
		} else if (msg.startsWith('!addinitstat')) {
			let ac;
			let initmod;
			let hp;
			let addedCrea = msg.split(' ');
			addedCrea.shift();
			
			let statBlocks = yaml.load(await fs.readFile('./statBlockTracker/stats.yml'));
			let statblock = statBlocks[addedCrea[0]];
			let name = addedCrea[1];
			let init = Math.floor(Math.random() * 20) + 1;
			// TODO: consider making statblock a dictionary instead of list of lists
			for (i = 0; i < statblock.length; i++) {
				if (statblock[i][0].toLowerCase().startsWith('init')) {
					initmod = statblock[i][1];
					init += initmod;
					break;
				}
			}
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
			await add_initiative(message, name, init, ac, hp);
			embed.setDescription(render_inits())
			mesg.edit(embed);
			message.delete();
		} else if (msg.startsWith('!first')) {
			init_index = 0;
			embed.setDescription(render_inits())
			mesg.edit(embed);
			message.delete();
		} else if (msg.startsWith('!addinits')) {
			let crea = msg.split(' ');
			let amount = crea[crea.length - 1];
			crea.pop();
			crea.shift();
			let name = crea[0];
			let const_name = name
			crea.shift();
			for (i = 0; i < amount; i++) {

				name = const_name + String(i + 1);

				let init, ac, hp = '';

				init = roll(+crea[0]);
				ac = +crea[1];
				hp = +crea[2];
				
				await add_initiative(message, name, init, ac, hp);
				embed.setDescription(render_inits());
				mesg.edit(embed);
			}
			message.delete();
		}
	});
}

module.exports = { initiative };

die_regexp = /^(?<die_count>\d+)?d(?<die_size>\d+)(?<mod>[+-]\d+)?(?<advantage>[<>])?$/

function roll(client) {
	client.on('message', message => {
                msg = message.content;
                let name = message.author.username;

                // dice roller
                if (msg.startsWith('!roll')) {
                        msg.split(/\s+/).slice(1).forEach((roll_string) => {
                                process_roll(roll_string, name, (res) => message.channel.send(res));
                        })
                }
        });

}

function process_roll(roll_string, user = 'test_user', msg_callback = console.log) {
        let match;
        if (match = die_regexp.exec(roll_string)) {
                let die_count = +match.groups.die_count || 1;
		let advantage = match.groups.advantage;
                let mod = +match.groups.mod || 0;
                let rolls = [...Array(die_count)].map(() => Math.floor(Math.random() * match.groups.die_size) + 1);
		if (advantage) {
			let selected;
			let sum1 = rolls.reduce((a,b) => a+b, mod);
                	let roll2 = [...Array(die_count)].map(() => Math.floor(Math.random() * match.groups.die_size) + 1);
			let sum2 = roll2.reduce((a,b) => a+b, mod);
			if (advantage == '<') {
				selected = Math.min(sum1, sum2);
			} else {
				selected = Math.max(sum1, sum2);
			}
			if (rolls.length + roll2.length >= 500) {
				msg_callback(`${user}'s roll total: ${selected}`);
			} else {
				msg_callback(`${user}'s rolls: ${rolls} + ${mod} = ${sum1}  |  ${roll2} + ${mod} = ${sum2}  |  -> ${selected}`);
			}
		} else {
			if (rolls.length >= 500) {
				msg_callback(`${user}'s roll total: ${rolls.reduce((a, b) => a+b, mod)}`);
			} else {
				msg_callback(`${user}'s roll: ${rolls} + ${mod} = ${rolls.reduce((a,b) => a+b, mod)}`);
			}
		}
        } else {
                console.log(`ERROR in roll: ${roll_string}`)
                msg_callback(`ERROR: ${user} tried to roll with '${roll_string}, which made no sense`);
        }
}

module.exports = { roll };

function roll(client) {
	client.on('message', message => {
        msg = message.content
        let name = message.author.username

        //dice roller
        if (msg.startsWith('!roll')) {
                let inpt = msg.split('d');
                let roll = inpt[1];
                if (roll.includes('+')) {
                        let die = parseInt(roll.split('+')[0]);
                        let mod = parseInt(roll.split('+')[1]);

                        let dieRoll = Math.floor(Math.random() * die) + 1;
                        dieRoll += mod;
                        message.channel.send(name + 's roll: ' + dieRoll);
                }
                else if (roll.includes('-')) {
                        let die = parseInt(roll.split('-')[0]);
                        let mod = parseInt(roll.split('-')[1]);
                        
                        let dieRoll = Math.floor(Math.random() * die) + 1;
                        dieRoll -= mod;
                        
                        message.channel.send(name + 's roll: ' + dieRoll);
                }
                else {
                        let die = roll;
                        let dieRoll = Math.floor(Math.random() * die) + 1;
                        message.channel.send(name + 's roll: ' + dieRoll);
                }
        }
});

}

module.exports = { roll };

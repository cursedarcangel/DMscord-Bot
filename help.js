function helpMe(client) {
let helpMsg = `The command for rolling dice is !roll d20+2\n\nThe command for adding something to initiative is !addinit name initiative ac hp\n\nYou can add and subtract hp from things in the initiative by using !addhp hp and !removehp hp\n\nTo be done with the current initiatives the command is !initdone\n\nTo move the initiative marker the command is !next\n\nThe command for removeing something from the initiatives is !remove name\n\nThe command for adding an item is !additem name:name rarity:rarity description:desc\n\nThe command for searching for an item is !searchitem name\n\nThe command for adding a stat block is !addstat name, class, race, stats etc\n\nThe command for editing magic items is !edititem parameter:value\n\nThe command for editing a stat block is !editstat parameter:value\n\nThe command for adding a creature to initiative from the stat block tracker is !addinitstat statblock name inittrackername\n\nThe command for searching Roll20 for a stat block or spell is !sr search`;
	client.on('message', message => {
		msg = message.content;
		if (msg == '!help') {
			message.channel.send(helpMsg);
		}
	});
}

module.exports = { helpMe };

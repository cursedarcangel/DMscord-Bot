function initiative(client) {

	inits = {};

	client.on('message', message => {
		let msg = message.content
		if (msg.includes('!addinit')) {
			
			let crea = msg.split(' ');                                                   
			crea.shift();
			console.log(crea);
			
			let nam = crea[0].split(':');
			crea.shift();
			let name = nam[1];

			inits[name] = crea;

			for (let k in inits) {
				let v = inits[k];
				console.log(k + '     ' + v);
			}	

		}
	});
}

module.exports = { initiative };

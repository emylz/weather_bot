'use  strict ';
const  Readline = require('readline');
	// for  including readline  module  in your  application
const  rl = Readline.createInterface ({ 
	// Creates  anInterface  object
	input: process.stdin ,
	output: process.stdout ,
	terminal: false
 });

const  matcher = require('./matcher'); 
 //to use the matcher  module  here
const weather=require('./weather');
const {currentWeather}=require('./parser');
rl.setPrompt('What do you want?>');
rl.prompt();
rl.on('line', reply => {
	matcher(reply , cb => {
		switch(cb.intent) {
			case 'Hello':
				console.log(`${cb.entities.greeting}`);
				rl.prompt();
			break;
			
			case 'Exit':
				console.log('Good bye !');
				process.exit(0);
			break;
			
			case 'Give name':
				console.log(`Nice to meet you ${cb.entities.name}, the name of my owner is Emin`);
				rl.prompt();
			break;
			
			case 'Get help':
				console.log('I have been build to give you the weather of a city. Ask me the city of you choice.  ex: What is the weather like in Paris ?\n exit to quit.');
				rl.prompt();
			break;
			
			case 'Get time':
				var currentdate = new Date(); 
				console.log(currentdate.getHours()+':'+currentdate.getMinutes()+':'+currentdate.getSeconds());
				rl.prompt();
			break;
			
			case 'Get weather':
				weather(cb.entities.city,'current',true, '', cb.entities.day)
                .then(response=>{
                    console.log(response); 
					rl.prompt();
				}); 
				
			break;
			
			case 'Get answer':
				weather(cb.entities.city,'current',false, cb.entities.adj, cb.entities.day)
                .then(response=>{
                    console.log(response); 
					rl.prompt();
				});		
			break;
			
			 default:{
                console.log("Sorry I do not understand, ask for help if you need. (Maybe you forget the space between your city and '?')");
                rl.prompt();
            }
		}
	});
} );
const  patternDict = [{
	pattern: '\\b(?<greeting>Hi|Hello|Hey)\\b',
	intent: 'Hello'
	},{
    pattern:'\\b(bye|exit)\\b',
	intent: 'Exit'
	},{
	pattern:'\\b(help|questions?|problems?)\\b',
	intent: 'Get help'
	},{
	pattern:'\\b(My\\sname\\sis|I\\sam)\\s(?<name>[a-zA-Z]+)\\b',
	intent: 'Give name'
	},{
	pattern:'weather\\s(like\\s)?((in)\\s)?(?<city>[a-zA-Z]+(\\s(?!today|tomorrow)[a-zA-Z]+)?)\\s(\\b(?<day>(today|(the\\sday\\safter\\s)?tomorrow))\\b)?\\s?\\?',
	intent: 'Get weather'
	},{
	pattern:'(Will|Is)\\sit.+(?<adj>(cold|hot|sun(shine|ny)?|rainy|cloudy|mist))\\sin\\s(?<city>[a-zA-Z]+(\\s(?!today|(the\\sday\\safter\\s)?tomorrow)[a-zA-Z]+)?)\\s(\\b(?<day>(today|(the\\sday\\safter\\s)?tomorrow))\\b)?\\s?\\??',
	intent: 'Get answer'
	},{
	pattern:'\\btime\\sis\\sit\\b',
	intent: 'Get time'
}];

module.exports=patternDict;

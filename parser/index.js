'use strict';

const color = require("colors");
let getFeel=(temp)=>{	
	if(temp<5){
		return 'shivering cold'.cyan;
	}else if(temp >=5 && temp<15){
		return 'pretty cold'.blue;
	}else if(temp >=15 && temp<20){
		return 'moderately cold'.yellow;
	}else if(temp>=20 && temp<32){
		return 'quite warm'.red;
	}else if(temp>=32 && temp<40){
		return 'very hot'.red;
	}else {
		return 'super hot'.red;
	}
}
module.exports=getFeel;

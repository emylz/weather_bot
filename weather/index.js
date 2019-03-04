'use strict';

const parser = require(".././parser");
const color = require("colors");
const axios=require("axios");
const apikey= '1b598a9a4c604ea0bef85715191202';

let getResponse=(weather, question, temp, day)=>{
	
	let resp = ' it is ';
	if(day == 'tomorrow' || day == 'the day after tomorrow') resp = ' it will be ';
	
	if(question == 'cold'){
			if(temp < 20) return 'Yes' + resp + parser(temp);
			else return 'No'  + resp + parser(temp);
	}
	if(question == 'warm' || question == 'hot'){
		if(temp >= 20) return 'Yes '  + resp + parser(temp);
			else return 'No ' + resp + parser(temp);
	}	
	if(weather.toLowerCase().includes(question)) return "Yes " + resp + weather.toLowerCase();
	else return "No, " + resp + weather.toLowerCase(); 
}

const getWeather=(location,type='forecast', qu, question, day)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const weatherConditions=await axios.get(
                "http://api.apixu.com/v1/forecast.json",
                {
                    params:{
                        key:apikey,
                        q:location,
                        days:3
                    }
                }
            );
			
			if(qu){
				if(day == 'tomorrow'){
					let temp = Number(weatherConditions.data.forecast.forecastday[1].day.avgtemp_c);
					resolve('The weather in ' + weatherConditions.data.location.name.green + ', ' 
			+ weatherConditions.data.location.country.green 
			+ ' tomorrow  the ' + weatherConditions.data.forecast.forecastday[1].date + ' is ' + parser(temp) +", with " + String(temp).green + " degrees Celsius.");
			}
			if(day == 'the day after tomorrow'){
					let temp = Number(weatherConditions.data.forecast.forecastday[2].day.avgtemp_c);
					resolve('The weather in ' + weatherConditions.data.location.name.green + ', ' 
			+ weatherConditions.data.location.country.green 
			+ ' the ' + weatherConditions.data.forecast.forecastday[2].date + ' is ' + parser(temp) +", with " + String(temp).green + " degrees Celsius.");
			}
				else {
					let temp = Number(weatherConditions.data.current.temp_c);
					resolve('The weather in ' + weatherConditions.data.location.name.green + ', ' 
			+ weatherConditions.data.location.country.green 
			+ ' today is ' + parser(temp) +", with " + String(temp).green + ' degrees Celsius.');
				}
			}
			else{
				if(day == 'tomorrow'){
					let temp = Number(weatherConditions.data.forecast.forecastday[1].day.avgtemp_c);
					resolve(getResponse(weatherConditions.data.current.condition.text, question, temp, day) + ' in ' +weatherConditions.data.location.name.green + ', ' 
				+ weatherConditions.data.location.country.green+' tomorrow the ' + weatherConditions.data.forecast.forecastday[1].date+'.');}
				if(day == 'the day after tomorrow'){
					let temp = Number(weatherConditions.data.forecast.forecastday[2].day.avgtemp_c);
					resolve(getResponse(weatherConditions.data.current.condition.text, question, temp, day) + ' in ' +weatherConditions.data.location.name.green + ', ' 
				+ weatherConditions.data.location.country.green+' the ' + weatherConditions.data.forecast.forecastday[2].date+'.');}
				else{
					let temp = Number(weatherConditions.data.current.temp_c);
					resolve(getResponse(weatherConditions.data.current.condition.text, question, temp, day) + ' in ' +weatherConditions.data.location.name.green + ', ' 
				+ weatherConditions.data.location.country.green+' today.');	
				}			
			}
		}
        catch(error){
            reject(error);
        }
    })
}




module.exports=getWeather;
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname,'./config/dev.env')})
const targetLocation = require('./utils/geocode')
const forecast = require('./utils/forecast')
const yargs = require('yargs')

yargs.command({
    command: 'address',
    describe: 'Location.',
    builder: {

        locationAddress: {
            describe: 'Location.',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        handlerforAddress(argv.locationAddress)
    }
})

const handlerforAddress = (location) =>{targetLocation.geoCode(location,(error, weather)=>{

    if(error)
        return console.log(error)
    
    //The latitude and longitude properties of weather object are used by forecast.forecast function.
    forecast.forecast(weather, (error, {forecast,location} = {}) => {
        if(error)
            return console.log(error)

        console.log(location)
        console.log(forecast)        
        
    })  
    
})
}
yargs.parse()

//Format : node app.js "__location_name__"


// const locationAddress = process.argv[2]
// if(!locationAddress){
//     console.log('Please enter address.')
// }
// else{
//     console.log(locationAddress)
//     handlerforAddress(locationAddress)
// }
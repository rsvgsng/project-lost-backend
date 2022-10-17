const asynchandler = require('express-async-handler');
const public = require('../models/Public');



const gendertypeOptions=()=>{
return ['MALE','FEMALE','OTHERS'];
}


const categories = asynchandler (async (cat)=>{
    try {

        helpWith=[];
        error=false
        const subs = await public.find({id:1}).select('subs')
        cat?.map(async e => {
            if (subs[0].subs.includes(e.toUpperCase())) {
                helpWith.push(e)
            }else{
                error = true;
            }

        })
        if (error) return false;
        return helpWith;


    } catch (error) {
            return false
    }

})



const validCountry = asynchandler(async (country)=>{
    try {
        const countries = await public.find({id:1}).select('countries')
        return  (countries[0].countries.includes(country.toUpperCase()))
    } catch (error) {
            return false
    }
})

module.exports = {validCountry,gendertypeOptions,categories}


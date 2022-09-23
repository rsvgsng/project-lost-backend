const {gendertypeOptions,passwordLength,countriesList} = require('../misc/customOptions')


const validateOptions=(gender,password,country)=>{
    var flag =
    gendertypeOptions().includes(gender.toUpperCase()) &&  
    passwordLength(password)&&
    countriesList().includes(country.toUpperCase())
    return flag;
}


module.exports ={
    validateOptions
}
const {accounttypeOptions,gendertypeOptions,passwordLength,countriesList} = require('../misc/customOptions')


const validateOptions=(accountType,gender,password,country)=>{
    var flag =
    accounttypeOptions().includes(accountType.toUpperCase()) &&
    gendertypeOptions().includes(gender.toUpperCase()) &&  
    passwordLength(password)&&
    countriesList().includes(country.toUpperCase())
    
    return flag;
}


module.exports ={
    validateOptions
}
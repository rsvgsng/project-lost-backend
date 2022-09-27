const accounttypeOptions =()=>{
return ['WORKER','MASTER'];
}

const gendertypeOptions=()=>{
return ['MALE','FEMALE','OTHER'];
}
const passwordLength=(password)=>{
    return(password.length>8)
}
const countriesList=()=>{

    return ['NEPAL','INDIA','UNITED STATES',"AUSTRALIA","CANADA","UNITED KINGDOM","GERMANY","POLAND","PAKISTAN","BHUTAN"];

}
const categories = ()=>{

    return [
    'OTHERS','HISTORY',"ELECTRONICS","ACCOUNTS","PROGRAMMING",
    "ECONOMICS","PHYSICS","MATHS","COMPUTER SCIENCE","ASTRONOMY",
     ];

}
module.exports = {accounttypeOptions,gendertypeOptions,passwordLength,countriesList,categories}


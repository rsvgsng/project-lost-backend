function checkDate(date1String, day){
    var d1 = new Date(date1String);
    var d2 = Date.now();

    daysDiff =  Math.abs(Math.round((d2-d1)/(1000*3600*24)));
    if(daysDiff<day) return false
    return true
}



module.exports = checkDate
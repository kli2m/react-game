import userStatistics from './userStatistics'


export class user {
constructor(name,levelDifficulty,levelWord){
this.name=name;
this.datesGames=[];
this[new Date().toTimeString()]=new userStatistics(levelDifficulty,levelWord)
}

addDateGames(){
    this.datesGames.push({[new Date().toTimeString()]:new userStatistics(levelDifficulty,levelWord)})
}

addWordChecked(){
    console.log( this.datesGames[this.datesGames.length-1])
}

getJson(){
    console.log(JSON.stringify(this))
}

// setDate(){
//     let nowDate=new Date().toTimeString()
//     this[new Date().toTimeString()]=new userStatistics()
// }

}
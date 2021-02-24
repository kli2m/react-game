export class userStatistics {
    constructor(levelDifficulty,levelWord,word) {
        this.levelDifficulty = levelDifficulty;
        this.levelWord = levelWord;
        this.statWords=[];
    }

    addedWord(){
        this.statWords.push(word)
    }

    getStatWords(){
        return this.statWords
    }

}
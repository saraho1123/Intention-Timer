class Activity {
    constructor(category, accomplish, min, sec) {
        this.category = category;
        this.description = accomplish;
        this.minutes = min;
        this.seconds = sec;
        this.completed = false;
        this.id = Date.now();
    }

    startTimer() {
        this.minutes = +this.minutes * 60;
        return +this.minutes + +this.seconds;
    }

    markComplete() {
        this.completed = true;
        //this.saveToStorage();
    }

    saveToStorage(currentCard) {
        pastActivities.push(currentCard);
        var cards = JSON.stringify(pastActivities);
        localStorage.setItem('userActivities', cards);
    }
}

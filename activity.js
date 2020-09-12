class Activity {
    constructor(category, accomplish, min, sec) {
        this.category = category;
        this.description = accomplish;
        this.minutes = min;
        this.seconds = sec;
        this.completed;
        this.id = Date.now();
    }

    startTimer() {
        this.minutes = +this.minutes * 60;
        debugger
        return +this.minutes + +this.seconds;
    }

    markComplete() {

    }

    saveToStorage() {

    }
}
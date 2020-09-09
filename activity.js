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

    }

    markComplete() {

    }

    saveToStorage() {

    }
}
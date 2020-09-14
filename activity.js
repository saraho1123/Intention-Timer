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

    saveToStorage() {
        //for (var i = 0; i < pastActivities.length; i++) {
        var stringifyPastActivities = JSON.stringify(pastActivities[pastActivities.length-1]);
        //}
        localStorage.setItem('userActivities', stringifyPastActivities);
        // JSON.parse(localStorage.getItem('userActivities'))
    }
}

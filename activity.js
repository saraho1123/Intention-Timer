// Properties should include:
// category
// description
// minutes
// seconds
// completed
// id

// Methods should include:
// countdown (or beginTimer or startTimer - whatever naming makes sense to you)
// markComplete
// saveToStorage

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
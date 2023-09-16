const EventEmitter = require('events');

class TrafficLight extends EventEmitter {
    constructor() {
        super();
        this.currentLight = 'Red'; // start with Red light
    }

    changeLight() {
        switch (this.currentLight) {
            case 'Red':
                this.currentLight = 'Yellow';
                this.emit('change', this.currentLight);
                setTimeout(() => this.changeLight(), 2000);
                break;
            case 'Yellow':
                this.currentLight = 'Green';
                this.emit('change', this.currentLight);
                setTimeout(() => this.changeLight(), 5000);
                break;
            case 'Green':
                this.currentLight = 'Red';
                this.emit('change', this.currentLight);
                setTimeout(() => this.changeLight(), 5000);
                break;
        }
    }

    start() {
        console.log(this.currentLight); // Initial print
        this.emit('change', this.currentLight);
        setTimeout(() => this.changeLight(), 5000);
    }
}

const trafficLight = new TrafficLight();

trafficLight.on('change', (color) => {
    console.log('The light just changed to', color);
});

trafficLight.start();

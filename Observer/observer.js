// -------------------------------------------
//  Module Dep
class ObserverList {
  constructor() {
    this.observerList = [];
  }

  add(observer) {
    this.observerList.push(observer);
  }

  all(){
    return this.observerList;
  }
}

class Observable {
  constructor() {
    this.observers = new ObserverList();
  }

  addObserver(observer) {
    this.observers.add(observer);
  }

  notifyObservers(...context) {
    this.observers.all().forEach(observer => {
      observer.update(...context);
    });
  }
}

// -------------------------------------------
class Car extends Observable {
  constructor(mileage = 0, service = 3000) {
    super();
    this.mileage = mileage;
    this.service = service;
    this.addObserver(new Notifier());
  }

  log(miles) {
    this.mileage += miles
    this.notifyObservers(this, miles);
  }
}

class Notifier {
  update(car, miles) {
    console.log(`The car has logged ${miles} miles, totaling ${car.mileage} miles traveled.`);

    if (car.service <= car.mileage) {
      console.log(`The car needs to be taken in for a service!`);
    }
  }
}

let car = new Car(2300, 3000);

[100, 350, 300].forEach(dist => car.log(dist));
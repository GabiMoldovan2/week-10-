function Highway(vignetteCost) {
  this.vehicleList = [];
  this.vignetteCost = vignetteCost;
}

Highway.prototype.enterHighway = function (vehicle) {
  this.vehicleList.push(vehicle);
  if (!(vehicle instanceof Police)) {
    vehicle.driver.payVignette(this.vignetteCost);
    vehicle.increaseSpeed(10);
  }
};

function Vehicle(name, runningSpeed, driver) {
  this.name = name;
  this.runningSpeed = runningSpeed;
  this.driver = driver;
}

Vehicle.prototype.increaseSpeed = function (speed) {
  this.runningSpeed += speed;
};

function Driver(name, walletMoney) {
  this.name = name;
  this.walletMoney = walletMoney;
}

Driver.prototype.payVignette = function (amount) {
  if (this.walletMoney >= amount) {
    this.walletMoney -= amount;
    console.log(this.name + " paid the vignette.");
  } else {
    console.log(this.name + " doesn't have enough money to pay the vignette.");
  }
};

function Bus(name, runningSpeed, driver) {
  Vehicle.call(this, name, runningSpeed, driver);
  this.extra = "extra";
}

Bus.prototype = Object.create(Vehicle.prototype);
Bus.prototype.constructor = Bus;

function Car(name, runningSpeed, driver) {
  Vehicle.call(this, name, runningSpeed, driver);
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

function Truck(name, runningSpeed, driver) {
  Vehicle.call(this, name, runningSpeed, driver);
}

Truck.prototype = Object.create(Vehicle.prototype);
Truck.prototype.constructor = Truck;

function Police(name, runningSpeed, driver) {
  Vehicle.call(this, name, runningSpeed, driver);
}

Police.prototype = Object.create(Vehicle.prototype);
Police.prototype.constructor = Police;

Police.prototype.checkVehicleSpeed = function (vehicle) {
  var speedLimit = Police.speedLimitsByVehicleType[vehicle.constructor.name];
  if (vehicle.runningSpeed > speedLimit) {
    var fine = Police.fineByVehicleType[vehicle.constructor.name];
    console.log(
      "Speed limit exceeded by " +
        vehicle.constructor.name +
        " : Fine " +
        fine +
        " $."
    );
  } else {
    console.log(
      "Speed is within the limit for " + vehicle.constructor.name + "."
    );
  }
};

Object.defineProperty(Police.prototype, "fullName", {
  get: function () {
    return this.name;
  },
  set: function (fullName) {
    this.name = fullName;
  },
});

Police.speedLimitsByVehicleType = {
  Car: 130,
  Bus: 100,
  Truck: 80,
};

Police.fineByVehicleType = {
  Car: 250,
  Bus: 150,
  Truck: 100,
};

var Gabi = new Driver("Gabi", 960);
var Adi = new Driver("Adi", 120);
var Alin = new Driver("Alin", 200);
var Policeman = new Driver("PoliceMan", 660);

var car = new Car("Ferrari", 120, Iulian);
var bus = new Bus("Transport Bus", 90, Mark);
var truck = new Truck("Cargo Truck", 80, Maria);
var police = new Police("Police Car", 90, Sheriff);
police.name;

var highway = new Highway(100);

console.log("", truck);

highway.enterHighway(car);
highway.enterHighway(bus);
highway.enterHighway(police);
highway.enterHighway(truck);
police.checkVehicleSpeed(car);
police.checkVehicleSpeed(bus);
police.checkVehicleSpeed(truck);
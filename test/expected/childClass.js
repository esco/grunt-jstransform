for(var Automobile____Key in Automobile){if(Automobile.hasOwnProperty(Automobile____Key)){Car[Automobile____Key]=Automobile[Automobile____Key];}}var ____SuperProtoOfAutomobile=Automobile===null?null:Automobile.prototype;Car.prototype=Object.create(____SuperProtoOfAutomobile);Car.prototype.constructor=Car;Car.__superConstructor__=Automobile;

  function Car(name, numDoors) {"use strict";
    Automobile.call(this,name);
    ____SuperProtoOfAutomobile.name;
    this.numDoors = numDoors;
  }

  Car.prototype.drive=function() {"use strict";

  };

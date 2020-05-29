# Publisher class

Provides essential pub-sub capabilities for its instances.

## Usage

In the terminal:
```

% npm install @lost-types/publisher

```

Then in the module:
```js

// JavaScript modules
import Publisher from '@lost-types/publisher';

// CommonJS
const Publisher = require('@lost-types/publisher');

// Implement "Hello world" of reactive programming:
class Counter extends Publisher {
  constructor() {
    super();
    this.count = 0;
  }

  increment() {
    this.setState('count', this.count + 1);
  }
}

const myCounter = new Counter();

// If you ever tried rxjs, this will be familiar:
const subscription = myCounter.subscribe({
  count: (value) => {
    console.log(`The count is: ${value}`);
  }
});

myCounter.increment(); // Logs: "The count is: 1"
myCounter.increment(); // Logs: "The count is: 2"

subscription.unsubscribe('count');

myCounter.increment(); // Logs nothing

console.log(myCounter.count); // 3

```

## Motivation

The idea of Publisher class came to me after one of the talks at one of the JS conferences about micro frontends. The whole idea behind this talk was that it's incredibly hard for a large code base to keep up with rapidly evolving frontend libraries and frameworks. "We've spent two years and huge budget to go from jQuery to React and once finished we had to start new transition from class-based components to functional components with hooks...". How can we fight this? The most naive idea that came to my mind - completely strip React or Vue out of logic and use them excusively as view engines - the thing they always had to be in my opinion. "Ok, I'll have an interface written in vanilla JavaScript, that will hold its own state and all the logic, and I'll have some component in the view that will be subscribed to that state", I thought!

```js

// React

function useCalculator() {
  // Singleton Calculator class extends Publisher
  const calculator = new Calculator();
  const [value, __setValue] = useState(calculator.value);

  useEffect(() => {
    const subscription = calculator.subscribe({
      value: (newValue) {
        __setValue(newValue);
      }
    });
  });

  return () => {
    subscription.unsubscribe('value');
  };

  return [value, calculator];
}

// Interactive component
const [value, calculator] = useCalculator();

return <button type="button" onClick={() => calculator.eval('2 + 2 * 20')}>=</button>;

// Display conponent

const [value] = useCalculator();

return <div>{value}</div>;

```

On the surface this might seem like still a lot of coupling inside `useCalculator()` function, but for larger interfaces this function will always stay the same and will act as a "driver" for the interface and at the moment when frontend library will change it's API or you will decide to switch to another library, you will only need change this "driver" function without worrying about anything else.
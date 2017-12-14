# Observable#consoleLogger

[RxJS 5](https://github.com/ReactiveX/rxjs)  operator for printing Observable values to the console.

```ts
import { Observable } from 'rxjs/Observable'
import { debug /* OR consoleLogger */ } from 'rxjs-console-logger'

Observable.of([1, 2, 3, 4]).pipe(debug('printMe')) 
```

<img src="printMe.png" width="500px">

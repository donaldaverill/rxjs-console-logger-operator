import { Observable } from 'rxjs'

export const consoleLogger = (message: string) =>
  <T>(source: Observable<T>) =>
    new Observable<T>(observer =>
      source.subscribe({
        next(next) {
          console.group(message)
          console.log(next)
          console.groupEnd()
          observer.next(next)
        },
        error(err) {
          console.error('ERROR >>> ', message, err)
          observer.error(err)
        },
        complete() {
          console.log(message.concat(' Completed.'))
          observer.complete()
        }
      }))

export const debug = consoleLogger

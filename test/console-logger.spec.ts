import { expect } from 'chai'
import { TestScheduler } from 'rxjs/testing'
import { assert, createSandbox, SinonSandbox, SinonStub } from 'sinon'

import { debug } from '../src/console-logger'

describe('debug', () => {
  let scheduler: TestScheduler
  let sb: SinonSandbox

  let errorStub: SinonStub
  let logStub: SinonStub

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) =>
      void expect(actual).to.deep.equal(expected))
  })

  beforeEach(() => {
    sb = createSandbox()

    errorStub = sb.stub(console, 'error')
    logStub = sb.stub(console, 'log')
  })

  afterEach(() => {
    sb.restore()
  })

  it('message', () => {
    const source = scheduler.createColdObservable('--a---|')
    const expected = '--a---|'

    const message = 'Test Message'

    scheduler.expectObservable(source.pipe(debug(message))).toBe(expected)
    scheduler.flush()
    assert.notCalled(errorStub)
    assert.callCount(logStub, 3)
    assert.calledWith(logStub, message)
    assert.calledWith(logStub, message.concat(' Completed.'))
  })
})

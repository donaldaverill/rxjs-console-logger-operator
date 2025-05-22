import { expect } from 'chai'
import { TestScheduler } from 'rxjs/testing'
import { assert, createSandbox, SinonSandbox, SinonStub } from 'sinon'

import { debug } from '../src/console-logger'

describe('debug', () => {
  let scheduler: TestScheduler
  let sb: SinonSandbox

  let errorStub: SinonStub
  let logStub: SinonStub
  let groupStub: SinonStub
  let groupEndStub: SinonStub

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => void expect(actual).to.deep.equal(expected))
  })

  beforeEach(() => {
    sb = createSandbox()

    errorStub = sb.stub(console, 'error')
    logStub = sb.stub(console, 'log')
    groupStub = sb.stub(console, 'group')
    groupEndStub = sb.stub(console, 'groupEnd')
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
    assert.callCount(logStub, 2)
    assert.calledWith(logStub, message.concat(' Completed.'))
    assert.calledOnce(groupStub)
    assert.calledWith(groupStub, message)
    assert.calledOnce(groupEndStub)
  })
})

import { expect } from 'chai';
import sinon from 'sinon';
import { log } from './action-logging';

describe('Middleware: action-logging', () => {
  it('should log to console', () => {
    const consoleStub = sinon.stub(console, 'log');
    const middleware = log(req => `Test log ${req['username']}`);
    middleware({ username: 'test_user' } as any, null as any, (() => {}) as any);
    expect(consoleStub.calledWithExactly('Test log test_user')).to.be.true;
    consoleStub.restore();
  });
});

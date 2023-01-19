import { expect } from 'chai';
import sinon from 'sinon';
import { verifyToken } from './verify-token';
import jwt, { VerifyOptions } from 'jsonwebtoken';
import httpStatus from 'http-status';

describe('Middleware: verify-token', () => {
  it('should accept token from x-access-token header', () => {
    const verifyStub = sinon.stub(jwt, 'verify').callsFake((t, s, cb?: VerifyOptions | jwt.VerifyCallback) => {
      if (!!cb) (cb as any)(null, { userKey: 'userkey', username: 'username', roles: ['user'] });
    });
    const token = 'abc123';
    const req: any = { headers: { 'x-access-token': token }, query: {} };
    const res: any = null;
    const next = sinon.spy();
    verifyToken(req, res, next);
    expect(verifyStub.calledOnceWith(token, sinon.match.any, sinon.match.any)).to.be.true;
    expect(req.userKey).eq('userkey');
    expect(req.username).eq('username');
    expect(req.roles).eql(['user']);
    expect(next.calledOnce).to.be.true;
    verifyStub.restore();
  });
  it('should accept token from queryString', () => {
    const verifyStub = sinon.stub(jwt, 'verify').callsFake((t, s, cb?: VerifyOptions | jwt.VerifyCallback) => {
      if (!!cb) (cb as any)(null, { userKey: 'userkey', username: 'username', roles: ['user'] });
    });
    const token = 'abc123';
    const req: any = { headers: {}, query: { token } };
    const res: any = null;
    const next = sinon.spy();
    verifyToken(req, res, next);
    expect(verifyStub.calledOnceWith(token, sinon.match.any, sinon.match.any)).to.be.true;
    expect(req.userKey).eq('userkey');
    expect(req.username).eq('username');
    expect(req.roles).eql(['user']);
    expect(next.calledOnce).to.be.true;
    verifyStub.restore();
  });
  it('should return FORBIDDEN (403) when no token provided', () => {
    const verifyStub = sinon.stub(jwt, 'verify');
    const req: any = { headers: {}, query: {} };
    const json = sinon.spy();
    const status = sinon.fake.returns({ json });
    const res: any = { status };
    const next = sinon.spy();
    verifyToken(req, res, next);
    expect(req.userKey).is.undefined;
    expect(req.username).is.undefined;
    expect(req.roles).is.undefined;
    expect(status.calledOnceWithExactly(httpStatus.FORBIDDEN)).to.be.true;
    expect(json.calledOnceWith({ message: 'No token provided' })).to.be.true;
    expect(next.called).to.be.false;
    verifyStub.restore();
  });
  it('should return UNAUTHORIZED (401) when invalid token', () => {
    const verifyStub = sinon.stub(jwt, 'verify').callsFake((t, s, cb?: VerifyOptions | jwt.VerifyCallback) => {
      if (!!cb) (cb as any)('error', null);
    });
    const req: any = { headers: {}, query: { token: 'abc' } };
    const json = sinon.spy();
    const status = sinon.fake.returns({ json });
    const res: any = { status };
    const next = sinon.spy();
    verifyToken(req, res, next);
    expect(req.userKey).is.undefined;
    expect(req.username).is.undefined;
    expect(req.roles).is.undefined;
    expect(status.calledOnceWithExactly(httpStatus.UNAUTHORIZED)).to.be.true;
    expect(json.calledOnceWith({ message: 'Unauthorized' })).to.be.true;
    expect(next.called).to.be.false;
    verifyStub.restore();
  });
});

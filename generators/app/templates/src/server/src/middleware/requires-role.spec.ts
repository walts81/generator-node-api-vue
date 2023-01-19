import { expect } from 'chai';
import httpStatus from 'http-status';
import sinon from 'sinon';
import { requiresAdmin, requiresRole } from './requires-role';
import { UserRole } from '@/data';

describe('Middleware: requires-role', () => {
  it('should return FORBIDDEN (403) when not in role', () => {
    const next = sinon.spy();
    const json = sinon.spy();
    const status = sinon.fake.returns({ json });
    const res: any = { status };
    const req: any = { roles: ['notest'] };
    const middleware = requiresRole('test');
    middleware(req, res, next);
    expect(status.calledOnceWithExactly(httpStatus.FORBIDDEN)).to.be.true;
    expect(json.calledOnceWithExactly({ message: 'Requires test role' })).to.be.true;
    expect(next.called).to.be.false;
  });
  it('should call next when in role', () => {
    const next = sinon.spy();
    const res: any = null;
    const req: any = { roles: ['test'] };
    const middleware = requiresRole('test');
    middleware(req, res, next);
    expect(next.calledOnce).to.be.true;
  });
});

describe('Middleware: requires-admin', () => {
  const admin = UserRole.Admin;
  it('should return FORBIDDEN (403) when not in admin role', () => {
    const next = sinon.spy();
    const json = sinon.spy();
    const status = sinon.fake.returns({ json });
    const res: any = { status };
    const req: any = { roles: ['test', 'user'] };
    requiresAdmin(req, res, next);
    expect(status.calledOnceWithExactly(httpStatus.FORBIDDEN)).to.be.true;
    expect(json.calledOnceWithExactly({ message: `Requires ${admin} role` })).to.be.true;
    expect(next.called).to.be.false;
  });
  it('should call next when in admin role', () => {
    const next = sinon.spy();
    const res: any = null;
    const req: any = { roles: ['test', 'user', UserRole.Admin] };
    requiresAdmin(req, res, next);
    expect(next.called).to.be.true;
  });
});

import { expect } from 'chai';
import sinon from 'sinon';
import { initRoutes } from './init-routes';
import express from 'express';
import * as allRoutes from './routes';

describe('Routing: init routes', () => {
  it('should use /api/v1/ prefix', () => {
    const use = sinon.spy();
    const app: any = { use };
    initRoutes(app);
    expect(use.calledWith('/api/v1/', sinon.match.any)).to.be.true;
  });
  it('should register middleware', () => {
    const app: any = { use: sinon.spy() };
    const use = sinon.spy();
    const router: any = { use };
    const routerStub = sinon.stub(express, 'Router').returns(router);
    const middleware: any = { message: 'this is my middleware ;-)' };
    const routesStub = sinon.stub(allRoutes, 'routes').value([{ path: '/test', middleware: [middleware] }]);
    initRoutes(app);
    expect(use.calledOnceWithExactly(middleware));
    expect(use.calledOnceWith('/test', sinon.match.any));
    routerStub.restore();
    routesStub.restore();
  });
  it('should register GET handler', () => {
    const app: any = { use: sinon.spy() };
    const get = sinon.spy();
    const router: any = { get, use: sinon.spy() };
    const routerStub = sinon.stub(express, 'Router').returns(router);
    const getHandler: any = { handler: 'get' };
    const routesStub = sinon.stub(allRoutes, 'routes').value([{ path: '/test', get: getHandler }]);
    initRoutes(app);
    expect(get.calledWithExactly('/', getHandler)).to.be.true;
    routerStub.restore();
    routesStub.restore();
  });
  it('should register POST handler', () => {
    const app: any = { use: sinon.spy() };
    const post = sinon.spy();
    const router: any = { post, use: sinon.spy() };
    const routerStub = sinon.stub(express, 'Router').returns(router);
    const postHandler: any = { handler: 'post' };
    const routesStub = sinon.stub(allRoutes, 'routes').value([{ path: '/test', post: postHandler }]);
    initRoutes(app);
    expect(post.calledWithExactly('/', postHandler)).to.be.true;
    routerStub.restore();
    routesStub.restore();
  });
  it('should register PUT handler', () => {
    const app: any = { use: sinon.spy() };
    const put = sinon.spy();
    const router: any = { put, use: sinon.spy() };
    const routerStub = sinon.stub(express, 'Router').returns(router);
    const putHandler: any = { handler: 'put' };
    const routesStub = sinon.stub(allRoutes, 'routes').value([{ path: '/test', put: putHandler }]);
    initRoutes(app);
    expect(put.calledWithExactly('/', putHandler)).to.be.true;
    routerStub.restore();
    routesStub.restore();
  });
  it('should register DELETE handler', () => {
    const app: any = { use: sinon.spy() };
    const del = sinon.spy();
    const router: any = { delete: del, use: sinon.spy() };
    const routerStub = sinon.stub(express, 'Router').returns(router);
    const deleteHandler: any = { handler: 'delete' };
    const routesStub = sinon.stub(allRoutes, 'routes').value([{ path: '/test', delete: deleteHandler }]);
    initRoutes(app);
    expect(del.calledWithExactly('/', deleteHandler)).to.be.true;
    routerStub.restore();
    routesStub.restore();
  });
  it('should register OPTIONS handler', () => {
    const app: any = { use: sinon.spy() };
    const options = sinon.spy();
    const router: any = { options, use: sinon.spy() };
    const routerStub = sinon.stub(express, 'Router').returns(router);
    const optionsHandler: any = { handler: 'options' };
    const routesStub = sinon.stub(allRoutes, 'routes').value([{ path: '/test', options: optionsHandler }]);
    initRoutes(app);
    expect(options.calledWithExactly('/', optionsHandler)).to.be.true;
    routerStub.restore();
    routesStub.restore();
  });
});

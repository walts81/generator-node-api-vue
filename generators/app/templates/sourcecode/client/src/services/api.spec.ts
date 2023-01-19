import chai, { expect, should } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as Data from '@/data/constants';
import sinon from 'sinon';
import { get, post } from './api';

chai.use(chaiAsPromised);

describe('Service: api', () => {
  const getStubs = () => {
    type StubsType = { constantsStub: sinon.SinonStub; fetchStub: sinon.SinonStub };
    const stubs: StubsType = {
      constantsStub: sinon.stub(Data, 'Constants').value({ baseUrl: 'https://server', apiPath: '/api/versionnum' }),
      fetchStub: sinon.stub(global, 'fetch'),
    };
    return {
      ...stubs,
      restore: () => Object.keys(stubs).forEach(x => stubs[x].restore()),
      mockFetchReturn: <T>(getData: (s: StubsType) => T) => {
        stubs.fetchStub.returns(new Promise<any>(r => r({ ok: true, json: () => getData(stubs) })));
      },
      mockFetchThrow: (message: string) => {
        stubs.fetchStub.resolves({ ok: false, statusText: message });
      },
    };
  };

  describe('get', () => {
    it('should use baseUrl + path', async () => {
      const stubs = getStubs();
      stubs.mockFetchReturn(x => x.fetchStub.args[0][0]);
      const result = await get('myendpoint');
      expect(result).to.eq('https://server/api/versionnum/myendpoint');
      stubs.restore();
    });
    it('should convert data object to queryString', async () => {
      const stubs = getStubs();
      stubs.mockFetchReturn(x => x.fetchStub.args[0][0]);
      const result = await get('myendpoint', { param1: 'this', param2: 'is', param3: 'a', param4: 'test' });
      expect(result).to.eq('https://server/api/versionnum/myendpoint?param1=this&param2=is&param3=a&param4=test');
      stubs.restore();
    });
    it('should throw error when not ok', async () => {
      const stubs = getStubs();
      const errorMessage = 'This is the error message';
      stubs.mockFetchThrow(errorMessage);
      await expect(get('myendpoint')).to.be.rejectedWith(errorMessage);
      stubs.restore();
    });
  });

  describe('post', () => {
    it('should use baseUrl + path', async () => {
      const stubs = getStubs();
      stubs.mockFetchReturn(x => x.fetchStub.args[0][0]);
      await post('myendpoint');
      const url = 'https://server/api/versionnum/myendpoint';
      expect(stubs.fetchStub.calledWith(url, sinon.match.has('method', 'POST'))).to.be.true;
      stubs.restore();
    });
    it('should post data', async () => {
      const stubs = getStubs();
      stubs.mockFetchReturn(x => x.fetchStub.args[0][0]);
      const data = { key: 'test' };
      await post('myendpoint', data);
      expect(stubs.fetchStub.calledWith(sinon.match.string, sinon.match.has('body', JSON.stringify(data)))).to.be.true;
      stubs.restore();
    });
    it('should throw error when not ok', async () => {
      const stubs = getStubs();
      const errorMessage = 'This is the error message';
      stubs.mockFetchThrow(errorMessage);
      await expect(post('myendpoint')).to.be.rejectedWith(errorMessage);
      stubs.restore();
    });
  });
});

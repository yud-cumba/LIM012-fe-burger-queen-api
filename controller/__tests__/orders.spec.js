/* eslint-disable array-callback-return */
/* eslint-disable no-console */
// Importar sinon
jest.setTimeout(1000000);
const sinon = require('sinon');
// Mockear MySQL con sinon
const mockMysql = sinon.mock(require('mysql'));
// Crear stub para connect
const connectStub = sinon.stub().callsFake(() => {
  // cb();
});
// Crear stub para query
const queryStub = sinon.stub();
// Crear stub para end
// const endStub = sinon.stub();
// Cuando se cree la conexión, reemplazar resultado con stubs
mockMysql.expects('createConnection').returns({
  connect: connectStub,
  query: queryStub,
  // end: endStub,
});

// Invocar nuestra libreria/metodos a probar
const db = require('../../db-data/sql_functions');

const orders = [
  {
    _id: 1,
    userId: 1010101,
    client: 'cliente',
    status: 'pending',
    dateEntry: '15-08-2020',
  }];
const error = new Error('error');

describe('Function getAllData(table)', () => {
  // get all data
  it('should throw error if data is null', () => {
    queryStub.callsFake((query, cb) => {
      cb(error, []);
    });
    return db.getAllData('orders')
      .catch((error) => {
        expect(error.message).toBe('error');
      });
  });

  it('should return list of orders', () => {
    queryStub.callsFake((query, cb) => {
      cb('error', orders);
    });
    return db.getAllData('orders')
      .then((result) => {
        result.map((result) => {
          expect(typeof result._id).toBe('number');
          expect(result._id).toBe(1);
          expect(typeof result.userId).toBe('number');
          expect(result.userId).toBe(1010101);
        });
      });
  });
});
describe('Function getDataByKeyword(table, keyword, value)', () => {
  it('should throw error if data is null', () => {
    queryStub.callsFake((query, value, cb) => {
      const result = orders.filter((order) => order._id === value);
      cb(error, result);
    });
    return db.getDataByKeyword('order', '_id', 2)
      .catch((error) => {
        expect(error.message).toBe('error');
      });
  });

  it('should return data if exits from orders by id', () => {
    queryStub.callsFake((query, value, cb) => {
      const result = orders.filter((order) => order._id === value);
      cb(error, result);
    });
    return db.getDataByKeyword('orders', '_id', 1)
      .then((result) => {
        expect(typeof result[0]._id).toBe('number');
        expect(result[0]._id).toBe(1);
      });
  });
});
describe('Function postData(table, toInsert)', () => {
  it('should return a new list of orders', () => {
    queryStub.callsFake((query, toInsert, cb) => {
      orders.push(toInsert);
      cb(error, orders);
    });
    const item = {
      _id: 2,
      userId: 1010101,
      client: 'cliente nuevo',
      status: 'pending',
      dateEntry: '15-08-2020',
    };
    return db.postData('orders', item)
      .then((result) => {
        expect(result.length).toBe(2);
        expect(result.some((order) => order._id === 2)).toBe(true);
      });
  });
});

describe('Function updateDataByKeyword(table, toUpdate, keyword, value)', () => {
  it('Should update a order', () => {
    queryStub.callsFake((query, [toUpdate, value], cb) => {
      const keyword = orders.filter((order) => order._id === value);
      const { client, status } = toUpdate;
      const result = keyword[0];
      result.client = (client) || keyword[0].client;
      result.status = (status) || keyword[0].status;
      cb(error, result);
    });
    return db.updateDataByKeyword('orders', { client: 'cliente editado' }, '_id', 1)
      .then((result) => {
        expect(typeof result.client).toBe('string');
        expect(result.client).toBe('cliente editado');
      });
  });
});

describe('Function deleteData(table, id, idValue)', () => {
  it('Should delete a order by id', () => {
    queryStub.callsFake((query, idValue, cb) => {
      const result = orders.filter((order) => order._id !== idValue);
      cb(error, result);
    });
    return db.deleteData('orders', '_id', 2)
      .then((result) => {
        const orderDeleted = orders.filter((order) => order._id === 2);
        expect(result).toEqual(expect.not.arrayContaining(orderDeleted));
      });
  });
});

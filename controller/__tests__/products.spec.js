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

const products = [
  {
    _id: 1,
    name: 'gaseosa',
    price: 2.00,
    image: 'url',
    type: 'desayuno',
  }];
const error = new Error('error');

describe('Function getAllData(table)', () => {
  // get all data
  it('should throw error if data is null', () => {
    queryStub.callsFake((query, cb) => {
      cb(error, []);
    });
    return db.getAllData('products')
      .catch((error) => {
        expect(error.message).toBe('error');
      });
  });

  it('should return list of products', () => {
    queryStub.callsFake((query, cb) => {
      cb('error', products);
    });
    return db.getAllData('products')
      .then((result) => {
        result.map((result) => {
          expect(typeof result._id).toBe('number');
          expect(result._id).toBe(1);
          expect(typeof result.name).toBe('string');
          expect(result.name).toBe('gaseosa');
          expect(typeof result.image).toBe('string');
          expect(typeof result.type).toBe('string');
          expect(result.name).toBe('gaseosa');
          expect(result.type).toBe('desayuno');
        });
      });
  });
});
describe('Function getDataByKeyword(table, keyword, value)', () => {
  it('should throw error if data is null', () => {
    queryStub.callsFake((query, value, cb) => {
      const result = products.filter((product) => product._id === value);
      cb(error, result);
    });
    return db.getDataByKeyword('products', '_id', 1)
      .catch((error) => {
        expect(error.message).toBe('error');
      });
  });

  it('should return data if exits from products by productId', () => {
    queryStub.callsFake((query, value, cb) => {
      const result = products.filter((product) => product._id === value);
      cb(error, result);
    });
    return db.getDataByKeyword('producs', '_id', 1)
      .then((result) => {
        expect(typeof result[0]._id).toBe('number');
        expect(result[0]._id).toBe(1);
      });
  });
});
describe('Function postData(table, toInsert)', () => {
  it('should return a new list of products', () => {
    queryStub.callsFake((query, toInsert, cb) => {
      products.push(toInsert);
      cb(error, products);
    });
    const item = {
      _id: 2,
      name: 'cevice',
      price: 15.00,
      image: 'url',
      type: 'almuerzo',
    };
    return db.postData('products', item)
      .then((result) => {
        expect(result.length).toBe(2);
        expect(result.some((product) => product._id === 2)).toBe(true);
      });
  });
});

describe('Function updateDataByKeyword(table, toUpdate, keyword, value)', () => {
  it('Should update a product', () => {
    queryStub.callsFake((query, [toUpdate, value], cb) => {
      const keyword = products.filter((product) => product._id === value);
      const { image, price } = toUpdate;
      const result = keyword[0];
      result.image = (image) || keyword[0].image;
      result.price = (price) || keyword[0].price;
      cb(error, result);
    });

    return db.updateDataByKeyword('products', { image: 'new url', price: 25.50 }, '_id', 2)
      .then((result) => {
        expect(typeof result.image).toBe('string');
        expect(result.image).toBe('new url');
        expect(typeof result.price).toBe('number');
        expect(result.price).toBe(25.50);
      });
  });
  describe('Function deleteData(table, id, idValue)', () => {
    it('Should delete a product by id', () => {
      queryStub.callsFake((query, idValue, cb) => {
        const result = products.filter((product) => product._id !== idValue);
        cb(error, result);
      });
      return db.deleteData('products', '_id', 2)
        .then((result) => {
          const productDeleted = products.filter((product) => product._id === 2);
          expect(result).toEqual(
            expect.not.arrayContaining(productDeleted),
          );
        });
    });
  });
});

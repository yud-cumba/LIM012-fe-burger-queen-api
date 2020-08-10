/* eslint-disable array-callback-return */
/* eslint-disable no-console */
// Importar sinon
jest.setTimeout(1000000);
const sinon = require('sinon');
// Mockear MySQL con sinon
const mockMysql = sinon.mock(require('mysql'));
// Crear stub para connect
const connectStub = sinon.stub().callsFake((cb) => {
  // eslint-disable-next-line no-console
  console.log('connected');
  cb();
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

const userTable = [
  {
    _id: 1010001,
    email: 'test@test.test',
    password: 'password12345',
  }];
const error = new Error('error');

describe('getAllData(user)', () => {
  // get all data
  it('should throw error if data is null', () => {
    // en vez de llamar .query llama al callFake
    queryStub.callsFake((query, cb) => {
      cb(error, []);
    });
    return db.getAllData('users')
      .catch((error) => {
        expect(error.message).toBe('error');
      });
  });

  it('should return data if exits from users', () => {
    // en vez de llamar .query llama al callFake
    queryStub.callsFake((query, cb) => {
      cb('error', userTable);
    });
    return db.getAllData('users')
      .then((result) => {
        result.map((result) => {
          expect(typeof result._id).toBe('number');
          expect(result._id).toBe(1010001);
          expect(typeof result.email).toBe('string');
          expect(result.email).toBe('test@test.test');
          expect(typeof result.password).toBe('string');
          expect(result.password).toBe('password12345');
        });
      });
  });
  // get all data by keyword
});

describe('getDataByKeyword(user,_id, 1010001 )', () => {
  // get all data
  it('should throw error if data is null', () => {
    // en vez de llamar .query llama al callFake
    queryStub.callsFake((query, value, cb) => {
      const result = userTable.filter((user) => user._id === value);
      cb(error, result);
    });
    return db.getDataByKeyword('users', '_id', 1010002)
      .catch((error) => {
        expect(error.message).toBe('error');
      });
  });

  it('should return data if exits from users', () => {
    // en vez de llamar .query llama al callFake
    queryStub.callsFake((query, value, cb) => {
      const result = userTable.filter((user) => user._id === value);
      cb(error, result);
    });
    return db.getDataByKeyword('users', '_id', 1010001)
      .then((result) => {
        expect(typeof result[0]._id).toBe('number');
        expect(result[0]._id).toBe(1010001);
      });
  });
});

describe('postData( users, toInsert)', () => {
  // get all data
  it('should throw error if data is null', () => {
    // en vez de llamar .query llama al callFake
    queryStub.callsFake((query, toInsert, cb) => {
      const result = userTable.push(toInsert);
      cb(error, result);
    });
    return db.postData('users', '_id', 1010002)
      .catch((error) => {
        expect(error.message).toBe(undefined);
      });
  });

  it('should return data if exits from users', () => {
    // en vez de llamar .query llama al callFake
    queryStub.callsFake((query, toInsert, cb) => {
      const result = userTable.push(toInsert);
      cb(error, result);
    });
    const newUser = {
      _id: 1010002,
      email: 'newuser@test.test',
      password: 'password12345',
    }
    return db.postData('users', newUser)
      .then((result) => {
        console.log(result);
      });
  });
});

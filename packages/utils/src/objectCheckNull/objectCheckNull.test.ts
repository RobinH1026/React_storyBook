import objectCheckNull from './objectCheckNull';

describe('objectCheckNull', () => {
  it('should check if object key with null or undefined value(Shallow).', () => {
    const obj = {
      zpp: 'zpp',
      bar: 'bar',
      zap: undefined,
    };
    expect(objectCheckNull(obj)).toBe(true);
    expect(objectCheckNull(obj, { checkEmptyString: true })).toBe(true);
    expect(objectCheckNull(obj, { checkEmptyString: true, checkFalse: true })).toBe(true);
    expect(objectCheckNull(obj, { checkEmptyString: true, checkZero: true })).toBe(true);
    expect(objectCheckNull(obj, { checkEmptyString: true, checkFalse: true, checkZero: true })).toBe(true);
    expect(objectCheckNull(obj, { checkFalse: true })).toBe(true);
    expect(objectCheckNull(obj, { checkFalse: true, checkZero: true })).toBe(true);
    expect(objectCheckNull(obj, { checkZero: true })).toBe(true);

    const obj2 = {
      foo: {},
      zoo: [],
      goo: ['goo', {}],
    };
    expect(objectCheckNull(obj2)).toBe(false);
    expect(objectCheckNull(obj2, { checkEmptyString: true })).toBe(false);
    expect(objectCheckNull(obj2, { checkEmptyString: true, checkFalse: true })).toBe(false);
    expect(objectCheckNull(obj2, { checkEmptyString: true, checkZero: true })).toBe(false);
    expect(objectCheckNull(obj2, { checkEmptyString: true, checkFalse: true, checkZero: true })).toBe(false);
    expect(objectCheckNull(obj2, { checkFalse: true })).toBe(false);
    expect(objectCheckNull(obj2, { checkFalse: true, checkZero: true })).toBe(false);
    expect(objectCheckNull(obj2, { checkZero: true })).toBe(false);
  });

  it('should check if object key with empty string value(Shallow).', () => {
    const obj = {
      zpp: 'zpp',
      bar: 'bar',
      zap: '',
    };
    expect(objectCheckNull(obj, { checkEmptyString: true })).toBe(true);
    expect(objectCheckNull(obj, { checkEmptyString: true, checkFalse: true })).toBe(true);
    expect(objectCheckNull(obj, { checkEmptyString: true, checkFalse: true, checkZero: true })).toBe(true);

    const obj2 = {
      zpp: 'zpp',
      bar: undefined,
      zap: '',
    };
    expect(objectCheckNull(obj2, { checkEmptyString: true })).toBe(true);
    expect(objectCheckNull(obj2, { checkEmptyString: true, checkFalse: true })).toBe(true);
    expect(objectCheckNull(obj2, { checkEmptyString: true, checkFalse: true, checkZero: true })).toBe(true);
  });

  it('should check if object key with false value(Shallow).', () => {
    const obj = {
      zpp: 'zpp',
      bar: 'bar',
      zap: false,
    };
    expect(objectCheckNull(obj, { checkFalse: true })).toBe(true);
    expect(objectCheckNull(obj, { checkFalse: true, checkEmptyString: true })).toBe(true);
    expect(objectCheckNull(obj, { checkFalse: true, checkEmptyString: true, checkZero: true })).toBe(true);

    const obj2 = {
      zpp: 'zpp',
      bar: undefined,
      zap: false,
    };
    expect(objectCheckNull(obj2, { checkFalse: true })).toBe(true);
    expect(objectCheckNull(obj2, { checkFalse: true, checkEmptyString: true })).toBe(true);
    expect(objectCheckNull(obj2, { checkFalse: true, checkEmptyString: true, checkZero: true })).toBe(true);
  });

  it('should check if object key with 0 value(Shallow).', () => {
    const obj = {
      zpp: 'zpp',
      bar: 'bar',
      zap: 0,
    };
    expect(objectCheckNull(obj, { checkZero: true })).toBe(true);
    expect(objectCheckNull(obj, { checkZero: true, checkEmptyString: true })).toBe(true);
    expect(objectCheckNull(obj, { checkZero: true, checkEmptyString: true, checkFalse: true })).toBe(true);

    const obj2 = {
      zpp: 'zpp',
      bar: undefined,
      zap: 0,
    };
    expect(objectCheckNull(obj2, { checkZero: true })).toBe(true);
    expect(objectCheckNull(obj2, { checkZero: true, checkEmptyString: true })).toBe(true);
    expect(objectCheckNull(obj2, { checkZero: true, checkEmptyString: true, checkFalse: true })).toBe(true);
  });
});

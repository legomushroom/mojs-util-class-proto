var ClassProtoModule = window['mojs-util-class-proto'];

var ClassProto = ClassProtoModule.ClassProto;
var extendClass = ClassProtoModule.extendClass;
var createClass = ClassProtoModule.createClass;

describe('`ClassProto` ->', function () {
  it('should work as `class`', function () {
      var classProto = new ClassProto();
  });

  describe('`get` ->', function () {
    it('should get a value from `_props`', function () {
      var classProto = new ClassProto();
      classProto._props = {
        spam: 2
      };

      expect(classProto.get('spam')).toBe(2);
    });

    it('should get a value from `_props` #2', function () {
      var classProto = new ClassProto();
      classProto._props = {
        eggs: 'a'
      };

      expect(classProto.get('eggs')).toBe('a');
    });
  });

  describe('`set` ->', function () {
    it('should set a value on `_props`', function () {
      var classProto = new ClassProto();
      classProto._props = {
        spam: 2
      };

      classProto.set('spam', 3);

      expect(classProto.get('spam')).toBe(3);
    });
  });

  describe('`setBatch` ->', function () {
    it('should `setBatch` a value on `_props`', function () {
      var classProto = new ClassProto();
      classProto._props = {
        foo: 2,
        spam: 2
      };

      classProto.setBatch({
        'spam': 3,
        'eggs': true
      });

      expect(classProto._props).toEqual({
        foo: 2,
        spam: 3,
        eggs: true
      });
    });
  });

  describe('`initialization` ->', function () {
    it('should save `index`', function () {
      var index = 2;
      var classProto = new ClassProto({
        index: index
      });
      expect(classProto.index).toBe(index);
      expect(classProto._o.index).not.toBeDefined();
    });

    it('should save `totalItemsInStagger`', function () {
      var index = 2;
      var classProto = new ClassProto({
        totalItemsInStagger: index
      });
      expect(classProto._totalItemsInStagger).toBe(index);
      expect(classProto._o.totalItemsInStagger).not.toBeDefined();
    });

    it('should call `_declareDefaults`', function () {

      spyOn(ClassProto.__mojsClass, '_declareDefaults');
      var classProto = new ClassProto();
      expect(ClassProto.__mojsClass._declareDefaults).toHaveBeenCalled();
    });

    it('should call `_extendDefaults`', function () {

      spyOn(ClassProto.__mojsClass, '_extendDefaults');
      var classProto = new ClassProto();
      expect(ClassProto.__mojsClass._extendDefaults).toHaveBeenCalled();
    });

    it('should call `_vars`', function () {
      spyOn(ClassProto.__mojsClass, '_vars');
      var classProto = new ClassProto();
      expect(ClassProto.__mojsClass._vars).toHaveBeenCalled();
    });

    it('should save `o`', function () {
      const options = {
        someProp: '2',
        isReversed: true
      };
    
      var classProto = new ClassProto(options);

      expect(classProto._o).toEqual(options);
      expect(classProto._o).not.toBe(options);
    });
  });

  describe('`_extendDefaults`', function () {
    it('should declare defaults', function () {
      var classProto = new ClassProto();

      var defaults = {};

      classProto._declareDefaults = function () {
        this._defaults = defaults;
      };

      expect(classProto._defaults).toEqual(defaults);
    });
  });

  describe('`_extendDefaults`', function () {
    it('should extend `o` by `_defaults`', function () {
      const options = {
        someProp: '2',
        isReversed: true
      };
    
      var classProto = new ClassProto(options);

      classProto._defaults = {
        foo: 2,
        isReversed: false
      };

      classProto._extendDefaults();

      expect(classProto._props).toEqual({
        foo: 2,
        someProp: '2',
        isReversed: true
      });
    });

    it('should not copy keys with value of `undefined`', function () {
      const options = {
        someProp: '2',
        isReversed: true,
        eggs: undefined
      };
    
      var classProto = new ClassProto(options);

      classProto._defaults = {
        foo: 2,
        isReversed: false
      };

      classProto._extendDefaults();

      expect(classProto._props).toEqual({
        foo: 2,
        someProp: '2',
        isReversed: true
      });
    });
  });

  describe('`setIfNotSet`', function () {
    it('should set a key only if it is not yet set in options', function () {
      var options = {
        spam: 2
      };
      var classProto = new ClassProto(options);

      classProto.setIfNotSet('spam', 4);
      classProto.setIfNotSet('eggs', 3);
    
      expect(classProto._props.spam).toBe(2);
      expect(classProto._props.eggs).toBe(3);
    });
  });
});

describe('`extendClass`', function () {
  it('should return the new class', function () {
    var NewClass = extendClass(ClassProto);

    expect(NewClass).not.toBe(ClassProto);
    expect(ClassProto.__mojsClass.isPrototypeOf(NewClass)).toBe(true);
    expect(NewClass.__proto__).toBe(ClassProto.__mojsClass);
  });
});

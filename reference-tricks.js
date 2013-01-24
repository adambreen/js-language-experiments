x = {};
prop = x.test = {};
prop = 123;
prop !== x.test !== 123 //true


y = {};
prop = y.test = {};
prop.test2 = 123;
prop.test2 === y.test.test2 === 123; // true
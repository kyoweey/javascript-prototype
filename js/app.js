/*
** _proto_について
**
**
**
**
**
**
**
*/

// オブジェクトを作ると、裏で _proto_ というプロパティが作られる
var obj = {name: "ichiro"};
console.log(obj);

// _proto_ の正体は、Object.prototype
console.log(Object.prototype === obj.__proto__); //true

// Objectという変数はwindowに定義されている
console.log(window.Object.prototype === obj.__proto__); //true

// ちなみに、objもwindowに定義されている
console.log(window.Object.prototype === window.obj.__proto__); //true

// プロトタイプチェーンの実装してみよう
console.log(obj.name); // "ichiro"
console.log(obj.__proto__.toString); // ネイティブコードらしい

console.log(obj.toString); // これは呼べる
console.log(obj.hogehoge); // これは呼べない undifine


// プロトタイプチェーンの仕組み
// 1. 指定したオブジェクトにプロパティが存在するかを調べる
// 2. なかった場合__proto__が参照する先で存在を調べる
// 3. それでもなかった場合__proto__が参照する → なければ参照している親の__proto__先で存在を調べる
// 4. 最終的にnullになるまで行う。nullならundefinedを返す

// プロトタイプチェーンの流れ
// obj.name （インスタンスに存在するパターン）
// obj.toString （プロトタイプチェーン先に存在するパターン）
// obj.hogehoge （最後まで見つからないパターン）

// objにnameが存在するかを調べる　→ ある
console.log(obj.name);

// objにtoStrintが存在するかを調べる　→ ない
// obj.__proto__ (= Object.prototype)にtoStingが存在するのかを調べる　→ ある
console.log(obj.toString);

// objにhogehogeが存在するかを調べる　→ ない
// obj.__proto__ (= Object.prototype)にhogehogeが存在するのかを調べる　→ ない
console.log(obj.hogehoge);



// プロトタイプチェーンの流れ2
//
//
const arr = [];

// どこにもないパターン
console.log(arr.hoge);

// Objectにあるパターン
Object.prototype.hoge = "Object prototype";
console.log(arr.hoge);

// Arrayにあるので Objectまで探さないパターン
Array.prototype.hoge = "Array prototype";
console.log(arr.hoge);

// arr.__proto_にあるので、Object・Arrayまで探さないパターン
arr.__proto__.hoge = "arr prototype";
console.log(arr.hoge);

// arrインスタンスにあるので、Object・Array・arr.__proto__まで探さないパターン
arr.hoge = "arr instance";
console.log(arr.hoge);



//
// funciton オブジェクトについて
//
// 以下は、どちらもほぼ同じ意味
// const func = function(){console.log("hello");};
// const func = new Function('console.log("hello");');
const func = function(){console.log("hello");};

// どのインスタンスもObject.prototype
console.log((new Object()).__proto__ === Object.prototype); // true
console.log((new Function()).__proto__ === Function.prototype); // true
console.log((new Array()).__proto__ === Array.prototype); // true

// つまり
console.log(func.__proto__.__proto__); //Object.prototypeの中身
console.log(Function.prototype.__proto__ === Object.prototype); //true
console.log(func.toString()); // function (){console.log("hello");}
console.log(func.toString === Function.prototype.toString); // true;


//
// constructorプロパティ について
//
// コンストラクタ関数はnew XXXX()に入るXXXX関数のこと。
// つまりObjectやFunctionなどはコンストラクタ関数として使用できるFunctionオブジェクト。
const obj2 = {};
console.log(Object.prototype.constructor === Object); // true
console.log(obj2.constructor === Object); // true

const func2 = function(){};
console.log(Function.prototype.constructor === Function); // true
console.log(func2.constructor === Function); // true
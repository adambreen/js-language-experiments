//Ref: http://matt.might.net/articles/by-example-continuation-passing-style/
//CPS basic rule of thumb: No procedure is allowed to return to its caller--ever.

//Cf. naive factorial implementation
function fact(n) {
    if (n == 0){
        return 1 ;
    }
    else{
        return n * fact(n-1) ;
    }
}

/* Iteration stack:

fact(5);

n  return
5  5 * fact(4)
4  4 * fact(3)
3  3 * fact(2)
2  2 * fact(1)
1  1 * fact(0)
0  1

1  1 * 1 = 1
2  2 * 1 = 2
3  3 * 2 = 6
4  4 * 6 = 24
5  5 * 24 = 120

 */


//with the continuation passing style (CPS) version:

function output(result){  console.log(result); }

function fact(n, ret) {
    if (n == 0)
        ret(1);    // the output(result) function is passed all the way down the chain, and executed at this point
                   // thus: we do NOT return back up the recursive chain as usual, simple "Continue" at the end
    else {
        fact(n - 1, function (t0) {
            ret(n * t0); // ret === output(result) in each recursive iteration
        });
    }
}

/* iteration results

fact (5, function(f){console.log(f);});

n = 5
 function fact(n, ret) {
     fact(4, function (t0) {
         console.log(5 * t0);
    });
 }

n = 4
 function fact(n, ret) {
     fact(3, function (t0) {
        console.log(5 * (4 * t0));
     });
 }

n = 3
function fact(n, ret) {
    fact(2, function (t0) {
        console.log(5 * (4 * (3 * t0)));
    });
}

n = 2
 function fact(n, ret) {
     fact(1, function (t0) {
        console.log(5 * (4 * (3 * (2 * t0)))));
    });
 }

n = 1
 function fact(n, ret) {
    fact(0, function (t0) {
        console.log(5 * (4 * (3 * (2 * (1 * t0))))));
    });
 }

n = 0
 function fact(n, ret) {
    ret(1);
 }

.... which in this case equals:
 function fact(n, ret) {
    console.log(5 * (4 * (3 * (2 * (1 * 1))))));
}

 */

fact(5, output(result)); // 120

//tail-recursive factorial (regular)
function fact(n) {
    return tail_fact(n, 1) ;
}

function tail_fact(n, a) {
    if (n == 0){
        return a ;
    }
    else{
        return tail_fact(n - 1, n * a);
    }
}

/*
fact(3, output(result)) === tail_fact(3, 1);

n return
3 tail_fact(2, 3 * 1)
2 tail_fact(1, 2 * 3)
1 tail_fact(0, 1 * 6)
0 6
1 6 (back up the stack now...)
2 6
3 6

 */


//CPS version:
function fact(n, ret){
    tail_fact(n, 1, ret);    //PASS the continuation along to the next function that is called
}

function tail_fact(n, a, ret){
    if (n == 0){
        ret(a);
    }
    else {
        tail_fact(n - 1, n * a, ret);
    }
}

/*
tail_fact(3, 1, function(f){console.log(f)});

n = 3, a = 1
 function tail_fact(n, a, ret){
    tail_fact(2, 3 * 1, function(f) {console.log(f);})
 }

n = 2, a = 3
 function tail_fact(n, a, ret){
    tail_fact(1, 2 * 3, function(f) {console.log(f);})
 }

n = 1, a = 6
 function tail_fact(n, a, ret){
    tail_fact(0, 1 * 6, function(f) {console.log(f);})
 }

 n = 0, a = 6
 function tail_fact(n, a, ret){
    console.log(6);
 }

 */







function choose(n, k){
    console.time('t');
    return fact(n) / (fact(k) * fact(n-k));
    console.timeEnd('t');
}

//non-blocking choose using CPS:
function choose(n, k, ret) {
    fact (n,   function (factn) {
        fact (n - k, function (factnk) {
            fact (k,   function (factk) {
                ret  (factn / (factnk * factk));
            });
        });
    });
}


//Exception Handling using CPS///////////////

//crappy exception handling with try/catch:
function fact (n) {
    if (n < 0)
        throw "n < 0" ;
    else if (n == 0)
        return 1 ;
    else
        return n * fact(n-1) ;
}

function total_fact (n) {
    try {
        return fact(n) ;
    } catch (ex) {
        return false ;
    }
}

console.write("total_fact(10): " + total_fact(10)) ;
console.write("total_fact(-1): " + total_fact(-1)) ;  //fail


//Awesome version with CPS:

function fact (n,ret,thro) {
    if (n < 0)
        thro("n < 0")
    else if (n == 0)
        ret(1)
    else
        fact(n-1,
            function (t0) {
                ret(n*t0) ;
            },
            thro)
}


function total_fact (n,ret) {
    fact (n,ret,
        function (ex) {
            ret(false) ;
        }) ;
}

//aliter:

function makeThro(cc){
    function thro (ex) {
        cc(false);
    }

    return thro;
}

function total_fact (n,ret) {
    fact (n,ret, makeThro(ret));
}



//// Call/CC   (Call-with-current-continuation)

function callcc (f, cc) {
    f(function(x, k) { cc(x); }, cc);
}

function test(fn, cc){
    //do stuff...
    fn(); //??

    cc(output);
}

function finish(output){
    console.log(output);
}


callcc(test, finish);










function areaOfDisc(r){
    return 3.14 * r * r;
}


function areaOfRing(outer, inner){
    return areaOfDisc(outer) - areaOfDisc(inner);
}

//(define (iterative-factorial n)
//(fact-iter 1 1 n))
//
//(define (fact-iter product counter max-count)
//(if (> counter max-count)
//product
//    (fact-iter (* counter product)
//(+ counter 1)
//max-count)))


function fact(n){
    return factIter(1, 1, n);
}

function factIter(product, counter, maxCount){
    if(counter > maxCount)
        return product;

    return factIter(counter * product, counter+1, maxCount);

}
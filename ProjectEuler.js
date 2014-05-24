/**
 * Add an Array.equals method to check whether two arrays 
 * contain the same values.
 */
Array.prototype.equals = Array.prototype.equals || function(that) {
  return this.length == that.length
      && this.every(function(n) { return that.indexOf(n) >= 0; });
}

/**
 * Add an Array.max method to return the maximum element.
 */
Array.prototype.max = Array.prototype.max || function(that) {
  return Math.max.apply(this, this);
}

/**
 * Add an Array.cartesianProduct method to return the cartesian 
 * product of two arrays. 
 */
Array.prototype.cartesianProduct = Array.prototype.cartesianProduct || function(that) {
    var result = [];
    this.forEach(function(x) {
        that.forEach(function(y) {
            result.push([x,y]);
        });
    });
    return result;
}

/**
 * Add a String.reverse method to reverse a string.
 */
String.prototype.reverse = String.prototype.reverse || function() {
    var chars = [];
    for (var c in this) { if(this.hasOwnProperty(c)) chars.unshift(this[c]); }
    return chars.join("");
}

/**
 * Hide all the enumrable properties of an object's prototype.
 */
function hideProperties(o) {
    var hidden = {enumerable: false };
    for (i in o) Object.defineProperty(o.constructor.prototype, i, hidden);
}

hideProperties(new Array());
hideProperties(new String());

/**
 * Memoize the given function, that is returns a new function 
 * which has a cache of all the previously computed values of 
 * the input function. 
 */
function memoize(f) {
  var cache = {};
  return function() {
    var key = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      key += "," + arguments[i];
    }
    if (key in cache) return cache[key];
    var val = f.apply(this, arguments);
    cache[key] = val;
    return val;
  }
}

/**
 * Return an array with all the multiples of a given number.
 * 
 * @param n   The number to return the multiples of.
 * @param max The maximum value to return (if a multiple). 
 */
function multiples(n, max) {
    var result = [];
    for(var t=n; t<=max; t+=n) result.push(t);
    return result;
}

/**
 * Return the sum of two numbers
 */
function sum(a, b) { return a + b; }

/**
 * Return the product of two numbers
 */
function multiply(a, b) { return a * b; }

/**
 * Return the n-th Fibonacci number.
 */
function fibonacci(n) {
  if (n < 2) return 1;
  return fibonacci(n-1) + fibonacci(n-2);
}

fibonacci = memoize(fibonacci);

/**
 * Return an array with all the prime factors of a given number.
 */
function primeFactors(n) {
  return divisors(n).filter(isPrime);
}

/**
 * Return an array with all the divisors of a given number.
 */
function divisors(n) {
  var result = [1];
  if (n == 1) return result;
  result.push(n);
  var sqrt_n = Math.floor(Math.sqrt(n));
  for (var i=2; i <= sqrt_n; i++) {
    if (n % i == 0) {
      result.push(i);
      result.push(n/i);
    }
  }
  if (n == sqrt_n * sqrt_n) result.push(sqrt_n);
  return result;
}

/**
 * Return an array of integer values from 0 to n (n excluded).
 */
function range() {
  switch (arguments.length) {
  case 1: from = 0;            to = arguments[0]; step = 1;                    break;
  case 2: from = arguments[0]; to = arguments[1]; step = (from < to) ? 1 : -1; break;
  case 3: from = arguments[0]; to = arguments[1]; step = arguments[2];         break;
  }

  var result = [];
  if (from < to) {
      for (var i = from; i < to; i+=step) result.push(i);
  } else {
      for (var i = from; i >= to; i+=step) result.push(i);
  }
  return result;
}

/**
 * Return an array with all the prime numbers up to max.
 */
function primes(max) {
    var sieve = range(max+1);
    range(2, Math.sqrt(max)+1).forEach(function(k) {
        if (sieve[k] === 0) return;
        range(2*k, max+1, k).forEach(function(k) {
            sieve[k] = 0;
        });
    });
    return sieve.filter(function(n) { return n > 1 });
}

/**
 * Check whether the given number is even or not.
 */
function isEven(n) { return n % 2 == 0; }

/**
 * Check whether the given number is odd or not.
 */
function isOdd(n) { return ! isEven(n); }

/**
 * Check whether the given number is prime or not.
 */
function isPrime(n) {
  if (n == 1) return false;
  if (n == 2) return true;
  if (isEven(n)) return false;
  return divisors(n).equals([1,n]);
}

/**
 * Check whether the given number is palindrome or not.
 */
function isPalindrome(n) {
    return Number(n).toString().reverse() === Number(n).toString();
}

/**
 * Return the greatest common divisor of two numbers.
 */
function greatest_common_divisor(a, b) {
  if (b == 0) return a;
  var r = a % b;
  while (r != 0) {
    a = b;
    b = r;
    r = a % b;
  }
  return b;
}

/**
 * Return the least common multiple of two numbers.
 */
function least_common_multiple(a, b) {
  return (a/greatest_common_divisor(a,b))*b;
}

/**
 * Check whether three integers a,b,c such that a < b < c forms 
 * a Pythagorean triplet.
 */
function isPythagoreanTriplet(a, b, c) {
    if ([a,b,c].some(not(isInteger))) return false;
    return a*a + b*b === c*c;
}

/**
 * Check whether a given number is integer.
 */
function isInteger(n) {
    return n === Math.floor(n);
}

/**
 * Return a new function which negates the result of the input 
 * function. 
 */
function not(f) {
    return function() {
        return !f.apply(this, arguments);
    }
}

PROBLEMS = [
    {
        title: "Multiples of 3 and 5",
        solve: function() {
            return multiples(3,999).concat(multiples(5,999)).reduce(sum) - multiples(15,999).reduce(sum);
        }
    },
    {
        title: "Even Fibonacci numbers",
        solve: function() {
          var fibonacci_numbers = [];
          var i = 1;
          while (fibonacci(i) <= 4000000) {
            fibonacci_numbers.push(fibonacci(i));
            i++;
          }
          return fibonacci_numbers.filter(isEven).reduce(sum);
        }
    },
    {
        title: "Largest prime factor",
        solve: function() {
          return primeFactors(600851475143).max();
        }
    },
    {
        title: "Largest palindrome product",
        solve: function() {
            var max = 0;
            range(999, 100).forEach(function(a) {
                try { // Allow pre-emption of the following forEach()
                    range(a, 100).forEach(function(b) {
                        var t = a * b;
                        if (t < max) {
                            throw true; /* preempt */
                        } else if (isPalindrome(t)){
                            max = Math.max(max, t);
                            throw true; /* preempt */
                        }
                    });
                } catch (e) { 
                    if (e !== true) throw e;
                }
            });
            return max;
        }
    },
    {
        title: "Smallest multiple",
        solve: function() {
          return range(1,21).reduce(least_common_multiple);
        }
    },
    {
        title: "Sum square difference",
        solve: function() {
          var N = 100;
          return Math.pow(range(1, N+1).reduce(sum),2)-
                 range(1, N+1).map(function(n) {
                   return n*n;
                 }).reduce(sum);
        }
    },
    {
        title: "10001st prime",
        solve: function() {
          var result = [2];
          var n = 3;
          while (result.length < 10001) {
            if (isPrime(n)) {
              result.push(n);
            }
            n += 2;
          }
          return result[result.length-1];
        }
    },
    {
        title: "Largest product in a series",
        solve: function() {
          var str = "73167176531330624919225119674426574742355349194934"
                  + "96983520312774506326239578318016984801869478851843"
                  + "85861560789112949495459501737958331952853208805511"
                  + "12540698747158523863050715693290963295227443043557"
                  + "66896648950445244523161731856403098711121722383113"
                  + "62229893423380308135336276614282806444486645238749"
                  + "30358907296290491560440772390713810515859307960866"
                  + "70172427121883998797908792274921901699720888093776"
                  + "65727333001053367881220235421809751254540594752243"
                  + "52584907711670556013604839586446706324415722155397"
                  + "53697817977846174064955149290862569321978468622482"
                  + "83972241375657056057490261407972968652414535100474"
                  + "82166370484403199890008895243450658541227588666881"
                  + "16427171479924442928230863465674813919123162824586"
                  + "17866458359124566529476545682848912883142607690042"
                  + "24219022671055626321111109370544217506941658960408"
                  + "07198403850962455444362981230987879927244284909188"
                  + "84580156166097919133875499200524063689912560717606"
                  + "05886116467109405077541002256983155200055935729725"
                  + "71636269561882670428252483600823257530420752963450";
          var max = 0;
          var window_size = 13;
          str.split("0").forEach(function(s) {
            var numbers = [];
            Array.prototype.forEach.call(s, function(c) { numbers.push(+c); });
            if (numbers.length < window_size) return;
            range(numbers.length - window_size + 1).map(function(n) {
              max = Math.max(max, numbers.slice(n,n + window_size).reduce(multiply));
            });
          });
          return max;
        }
    },
    {
        title: "Special Pythagorean triplet",
        solve: function() {
            try {
                range(1, 250).forEach(function(a) {
                    var b = (500000 - 1000*a) / (1000 - a);
                    var c = Math.sqrt(a*a + b*b);
                    if (isPythagoreanTriplet(a, b, c)) throw a*b*c;
                });
            } catch (e) {
                if (typeof e === "number") return e;
                throw e;
            }
        }
    },
    {
        title: "Summation of primes",
        solve: function() {
            return primes(2000000).reduce(sum);
        }
    }
];

jQuery(document).ready(function() {
    var div_problems = jQuery("#problems");

    PROBLEMS.forEach(function(p) {
      div_problems.append(problem(p));
    });

    function problem(p) {
        var div = jQuery('<div class="problem"><h1>'+p.title+'</h1></div>');
        var button = jQuery('<button>Solve</button>');
        var solution = jQuery('<output class="solution"></output>');
        div.append(button);
        div.append(solution);
        button.click(function() {
            solution.text("Computing...");
            setTimeout(function(){ solution.text(""+p.solve()); }, 50);
        });
        return div;
    }
});

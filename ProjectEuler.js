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
  for (var i=2; i < sqrt_n; i++) {
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
  case 1: from = 0; to = arguments[0]; break;
  case 2: from = arguments[0]; to = arguments[1]; break;
  }

  var result = [];
  if (from < to) {
      for (var i = from; i < to; i++) result.push(i);
  } else {
      for (var i = from; i >= to; i--) result.push(i);
  }
  return result;
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
        var solution = jQuery('<p class="solution"></p>');
        div.append(button);
        div.append(solution);
        button.click(function() { solution.text(""+p.solve()); });
        return div;
    }
});

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
          var str = "7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450";
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
        title: "Sum square difference",
        solve: function() {
          var N = 100;
          return Math.pow(range(1, N+1).reduce(sum),2)-
                 range(1, N+1).map(function(n) {
                   return n*n;
                 }).reduce(sum);
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
        button.click(function() { solution.text(p.solve()); });
        return div;
    }
});

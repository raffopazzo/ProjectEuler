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
 * Return the n-th Fibonacci number.
 */
function fibonacci(n) {
  if (n < 2) return 1;
  return fibonacci(n-1) + fibonacci(n-2);
}

fibonacci = memoize(fibonacci);

/**
 * Return an array of integer values from 0 to n (n excluded).
 */
function range(n) {
  var result = [];
  for (var i = 0; i < n; i++) result.push(i);
  return result;
}

/**
 * Check whether the given number is even or not.
 */
function isEven(n) { return n % 2; }

/**
 * Check whether the given number is odd or not.
 */
function isOdd(n) { return ! isEven(n); }

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
          var i = 0;
          while (fibonacci(i) <= 4000000) {
            fibonacci_numbers.push(fibonacci(i));
            i++;
          }
          return fibonacci_numbers.filter(isEven).reduce(sum);
        }
    }
];

jQuery(document).ready(function() {
    var div_problems = jQuery("#problems");
    for (var i in PROBLEMS) {
        div_problems.append(problem(PROBLEMS[i]));
    }

    function problem(p) {
        var div = jQuery('<div class="problem"><h1>'+p.title+'</h1></div>');
        var button = jQuery('<button>Soluzione</button>');
        div.append(button);
        button.click(function() {
            var solution = jQuery('<p class="solution"></p>');
            solution.text(p.solve());
            div.append(solution);
        });
        return div;
    }
});

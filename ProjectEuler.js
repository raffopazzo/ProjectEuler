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
 * Return the greatest product in the array.
 */
Array.prototype.maxProduct = Array.prototype.maxProduct || function(window_size) {
    if (this.length < window_size) return Number.MIN_VALUE;
    var self = this;
    var max = Number.MIN_VALUE;
    range(this.length - window_size + 1).map(function(n) {
      max = Math.max(max, self.slice(n, n + window_size).reduce(multiply));
    });
    return max;
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
 * Return an array of numbers converting each digit character. 
 */
String.prototype.toArrayOfNumbers = String.prototype.toArrayOfNumbers || function() {
    var result = []
    Array.prototype.forEach.call(this, function(c) { result.push(+c); });
    return result;
}

/**
 * Hide all the enumrable properties of an object's prototype.
 */
function hideProperties(clazz) {
    var hidden = {enumerable: false };
    var o = clazz.call({});
    for (i in o) Object.defineProperty(o.constructor.prototype, i, hidden);
}

/**
 * Constrcutor to build square a matrix.
 */
function Matrix(data) {
    this.data = data;
}

/**
 * Retrieve the list of rows in a matrix
 */
Matrix.prototype.rows = function() {
    return this.data;
}

/**
 * Retrieve the list of rows in a matrix
 */
Matrix.prototype.cols = function() {
    var result = [];
    for (var i in range(this.size())) {
        result[i] = [];
        for (var j in range(this.size())) {
            result[i][j] = this.data[j][i];
        }
    }
    return result;
}

/**
 * Retrieve all the left diagonals.
 */
Matrix.prototype.leftDiagonals = function() {
    var result = [];
    for (var i in range(this.size())) {
        i = Number(i);
        result[i] = [];
        if (i > 0) {
            result[this.size()+i-1] = [];
        }
        for (var j in range(this.size()-i)) {
            j = Number(j);
            result[i][j] = this.data[j][this.size()-1-j-i];
            if (i > 0) {
                result[this.size()+i-1][j] = this.data[i+j][this.size()-1-j];
            }
        }
    }

    return result;
}

/**
 * Retrieve all the right diagonals.
 */
Matrix.prototype.rightDiagonals = function() {
    var result = [];
    for (var i in range(this.size())) {
        i = Number(i);
        result[i] = [];
        if (i > 0) {
            result[this.size()+i-1] = [];
        }
        for (var j in range(this.size()-i)) {
            j = Number(j);
            result[i][j] = this.data[i+j][j];
            if (i > 0) {
                result[this.size()+i-1][j] = this.data[j][i+j];
            }
        }
    }

    return result;

//    return [[M[i+j][j] for j in range(len(M)-i)] for i in range(len(M))] +\
//           [[M[j][i+j] for j in range(len(M)-i)] for i in range(len(M))]
}

/**
 * Retrieve the size of the matrix (e.g. N in a NxN matrix).
 */
Matrix.prototype.size = function() {
    return this.data.length;
}

hideProperties(Array);
hideProperties(String);
hideProperties(Matrix);

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
    if (key in cache) {
      return cache[key];
    }
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
 * Return the length of the Collats sequence starting at the 
 * given number.
 */
function collatz_sequence_length(n) {
  if (n == 1) return 1;

  return 1 + collatz_sequence_length(isEven(n) ? n/2 : 3*n + 1);
}

collatz_sequence_length = memoize(collatz_sequence_length);

/**
 * Return the number of Lattice paths from the top-left to the
 * bottom-right corner of a MxN grid.
 */
function lattice_paths(m, n) {
  if (m == 0 || n == 0) return 1;
  return lattice_paths(m-1,n) + lattice_paths(m,n-1);
}

lattice_paths = memoize(lattice_paths);

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
  for (var i=2; i < Math.sqrt(n); i++) {
    if (n % i == 0) {
      result.push(i);
      result.push(n/i);
    }
  }
  var sqrt_n = Math.floor(Math.sqrt(n));
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
  if (max < 2) return undefined;
  if (max == 2) return [2];
  var sieve = range(Math.ceil(max/2)); /* consider only odd numbers */
    range(1, Math.ceil(Math.sqrt(max)/2)).forEach(function(i) {
        if (sieve[i] === 0) return;
        range(2*i*(i+1), Math.ceil(max/2), 2*i+1).forEach(function(j) {
            sieve[j] = 0;
        });
    });
    return [2].concat(sieve.filter(function(n) { return n > 0 })
                           .map(function(i) { return 2*i + 1; }));
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
          return str.toArrayOfNumbers().maxProduct(13);
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
    },
    {
        title: "Largest product in a grid",
        solve: function() {
          var grid = new Matrix([[ 8,  2, 22, 97, 38, 15,  0, 40,  0, 75,  4,  5,  7, 78, 52, 12, 50, 77, 91,  8],
                                 [49, 49, 99, 40, 17, 81, 18, 57, 60, 87, 17, 40, 98, 43, 69, 48,  4, 56, 62,  0],
                                 [81, 49, 31, 73, 55, 79, 14, 29, 93, 71, 40, 67, 53, 88, 30,  3, 49, 13, 36, 65],
                                 [52, 70, 95, 23,  4, 60, 11, 42, 69, 24, 68, 56,  1, 32, 56, 71, 37,  2, 36, 91],
                                 [22, 31, 16, 71, 51, 67, 63, 89, 41, 92, 36, 54, 22, 40, 40, 28, 66, 33, 13, 80],
                                 [24, 47, 32, 60, 99,  3, 45,  2, 44, 75, 33, 53, 78, 36, 84, 20, 35, 17, 12, 50],
                                 [32, 98, 81, 28, 64, 23, 67, 10, 26, 38, 40, 67, 59, 54, 70, 66, 18, 38, 64, 70],
                                 [67, 26, 20, 68,  2, 62, 12, 20, 95, 63, 94, 39, 63,  8, 40, 91, 66, 49, 94, 21],
                                 [24, 55, 58,  5, 66, 73, 99, 26, 97, 17, 78, 78, 96, 83, 14, 88, 34, 89, 63, 72],
                                 [21, 36, 23,  9, 75,  0, 76, 44, 20, 45, 35, 14,  0, 61, 33, 97, 34, 31, 33, 95],
                                 [78, 17, 53, 28, 22, 75, 31, 67, 15, 94,  3, 80,  4, 62, 16, 14,  9, 53, 56, 92],
                                 [16, 39,  5, 42, 96, 35, 31, 47, 55, 58, 88, 24,  0, 17, 54, 24, 36, 29, 85, 57],
                                 [86, 56,  0, 48, 35, 71, 89,  7,  5, 44, 44, 37, 44, 60, 21, 58, 51, 54, 17, 58],
                                 [19, 80, 81, 68,  5, 94, 47, 69, 28, 73, 92, 13, 86, 52, 17, 77,  4, 89, 55, 40],
                                 [ 4, 52,  8, 83, 97, 35, 99, 16,  7, 97, 57, 32, 16, 26, 26, 79, 33, 27, 98, 66],
                                 [88, 36, 68, 87, 57, 62, 20, 72,  3, 46, 33, 67, 46, 55, 12, 32, 63, 93, 53, 69],
                                 [ 4, 42, 16, 73, 38, 25, 39, 11, 24, 94, 72, 18,  8, 46, 29, 32, 40, 62, 76, 36],
                                 [20, 69, 36, 41, 72, 30, 23, 88, 34, 62, 99, 69, 82, 67, 59, 85, 74,  4, 36, 16],
                                 [20, 73, 35, 29, 78, 31, 90,  1, 74, 31, 49, 71, 48, 86, 81, 16, 23, 57,  5, 54],
                                 [ 1, 70, 54, 71, 83, 51, 54, 69, 16, 92, 33, 48, 61, 43, 52,  1, 89, 19, 67, 48]]);
          return ([grid.rows(),
                   grid.cols(),
                   grid.leftDiagonals(),
                   grid.rightDiagonals()].map(function(list) {
                       return list.map(function(a) {
                           return a.maxProduct(4);
                       });
                   })).map(function(a) { return a.max(); }).max();
        }
    },
    {
        title: "Highly divisible triangular number",
        solve: function() {
          function triangularNumber(n) { return n*(n+1)/2; }
          var th = 500;
          var n = 1;
          while (divisors(triangularNumber(n)).length < th) {
            n++
          }
          return triangularNumber(n);
        }
    },
    {
        title: "Large sum",
        solve: function() {
          var str = ["37107287533902102798797998220837590246510135740250",
                     "46376937677490009712648124896970078050417018260538",
                     "74324986199524741059474233309513058123726617309629",
                     "91942213363574161572522430563301811072406154908250",
                     "23067588207539346171171980310421047513778063246676",
                     "89261670696623633820136378418383684178734361726757",
                     "28112879812849979408065481931592621691275889832738",
                     "44274228917432520321923589422876796487670272189318",
                     "47451445736001306439091167216856844588711603153276",
                     "70386486105843025439939619828917593665686757934951",
                     "62176457141856560629502157223196586755079324193331",
                     "64906352462741904929101432445813822663347944758178",
                     "92575867718337217661963751590579239728245598838407",
                     "58203565325359399008402633568948830189458628227828",
                     "80181199384826282014278194139940567587151170094390",
                     "35398664372827112653829987240784473053190104293586",
                     "86515506006295864861532075273371959191420517255829",
                     "71693888707715466499115593487603532921714970056938",
                     "54370070576826684624621495650076471787294438377604",
                     "53282654108756828443191190634694037855217779295145",
                     "36123272525000296071075082563815656710885258350721",
                     "45876576172410976447339110607218265236877223636045",
                     "17423706905851860660448207621209813287860733969412",
                     "81142660418086830619328460811191061556940512689692",
                     "51934325451728388641918047049293215058642563049483",
                     "62467221648435076201727918039944693004732956340691",
                     "15732444386908125794514089057706229429197107928209",
                     "55037687525678773091862540744969844508330393682126",
                     "18336384825330154686196124348767681297534375946515",
                     "80386287592878490201521685554828717201219257766954",
                     "78182833757993103614740356856449095527097864797581",
                     "16726320100436897842553539920931837441497806860984",
                     "48403098129077791799088218795327364475675590848030",
                     "87086987551392711854517078544161852424320693150332",
                     "59959406895756536782107074926966537676326235447210",
                     "69793950679652694742597709739166693763042633987085",
                     "41052684708299085211399427365734116182760315001271",
                     "65378607361501080857009149939512557028198746004375",
                     "35829035317434717326932123578154982629742552737307",
                     "94953759765105305946966067683156574377167401875275",
                     "88902802571733229619176668713819931811048770190271",
                     "25267680276078003013678680992525463401061632866526",
                     "36270218540497705585629946580636237993140746255962",
                     "24074486908231174977792365466257246923322810917141",
                     "91430288197103288597806669760892938638285025333403",
                     "34413065578016127815921815005561868836468420090470",
                     "23053081172816430487623791969842487255036638784583",
                     "11487696932154902810424020138335124462181441773470",
                     "63783299490636259666498587618221225225512486764533",
                     "67720186971698544312419572409913959008952310058822",
                     "95548255300263520781532296796249481641953868218774",
                     "76085327132285723110424803456124867697064507995236",
                     "37774242535411291684276865538926205024910326572967",
                     "23701913275725675285653248258265463092207058596522",
                     "29798860272258331913126375147341994889534765745501",
                     "18495701454879288984856827726077713721403798879715",
                     "38298203783031473527721580348144513491373226651381",
                     "34829543829199918180278916522431027392251122869539",
                     "40957953066405232632538044100059654939159879593635",
                     "29746152185502371307642255121183693803580388584903",
                     "41698116222072977186158236678424689157993532961922",
                     "62467957194401269043877107275048102390895523597457",
                     "23189706772547915061505504953922979530901129967519",
                     "86188088225875314529584099251203829009407770775672",
                     "11306739708304724483816533873502340845647058077308",
                     "82959174767140363198008187129011875491310547126581",
                     "97623331044818386269515456334926366572897563400500",
                     "42846280183517070527831839425882145521227251250327",
                     "55121603546981200581762165212827652751691296897789",
                     "32238195734329339946437501907836945765883352399886",
                     "75506164965184775180738168837861091527357929701337",
                     "62177842752192623401942399639168044983993173312731",
                     "32924185707147349566916674687634660915035914677504",
                     "99518671430235219628894890102423325116913619626622",
                     "73267460800591547471830798392868535206946944540724",
                     "76841822524674417161514036427982273348055556214818",
                     "97142617910342598647204516893989422179826088076852",
                     "87783646182799346313767754307809363333018982642090",
                     "10848802521674670883215120185883543223812876952786",
                     "71329612474782464538636993009049310363619763878039",
                     "62184073572399794223406235393808339651327408011116",
                     "66627891981488087797941876876144230030984490851411",
                     "60661826293682836764744779239180335110989069790714",
                     "85786944089552990653640447425576083659976645795096",
                     "66024396409905389607120198219976047599490197230297",
                     "64913982680032973156037120041377903785566085089252",
                     "16730939319872750275468906903707539413042652315011",
                     "94809377245048795150954100921645863754710598436791",
                     "78639167021187492431995700641917969777599028300699",
                     "15368713711936614952811305876380278410754449733078",
                     "40789923115535562561142322423255033685442488917353",
                     "44889911501440648020369068063960672322193204149535",
                     "41503128880339536053299340368006977710650566631954",
                     "81234880673210146739058568557934581403627822703280",
                     "82616570773948327592232845941706525094512325230608",
                     "22918802058777319719839450180888072429661980811197",
                     "77158542502016545090413245809786882778948721859617",
                     "72107838435069186155435662884062257473692284509516",
                     "20849603980134001723930671666823555245252804609722",
                     "53503534226472524250874054075591789781264330331690"];
          return str.map(function(s){ return bigInt(s); })
                    .reduce(function(a, b) { return a.add(b); }, bigInt.zero)
                    .toString().slice(0,10);
        }
    },
    {
        title: "Longest Collatz sequence",
        solve: function() {
          var max, longest = 0;
          range(1, 1000000).forEach(function(n) {
            var l = collatz_sequence_length(n);
            if (l > longest) {
              longest = l;
              max = n;
            }
          });
          return max;
        }
    },
    {
        title: "Lattice paths",
        solve: function() {
          return lattice_paths(20, 20);
        }
    },
    {
        title: "Power digit sum",
        solve: function() {
          return bigInt(2).pow(1000).toString().toArrayOfNumbers().reduce(sum);
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
            setTimeout(function() {
                         try{
                           solution.text(""+p.solve());
                         } catch (e) { 
                           solution.text(e);
                         }
                       },
                       50);
        });
        return div;
    }
});


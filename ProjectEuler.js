function multiples(n, max) {
    var result = [];
    for(var t=n; t<=max; t+=n) result.push(t);
    return result;
}

function sum(a, b) { return a + b; }

PROBLEMS = [
    {
        title: "Multiples of 3 and 5",
        solve: function() {
            return multiples(3,999).concat(multiples(5,999)).reduce(sum) - multiples(15,999).reduce(sum);
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

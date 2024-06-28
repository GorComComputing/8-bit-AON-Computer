// Библиотека математических функций

// синус
function Sinus(x) {
    let s = x, d = x;
    for(let n = 3; Abs(d) > 1e-12; n+=2)
        s += d *= -x*x/n/(n-1);
    return s;
}


// модуль числа
function Abs(x) {
    return x >= 0 ? x : -x;
}


// остаток от деления
function Mod(a, b) {
    return a - (Div(a, b))*b;
}


// целочисленное деление
function Div(a, b){
    return ~~(a/b);    //(a - a%b)/b;
}


// 加  
function add(num1, num2) {
    if (typeof num1 != "number" || typeof num2 != "number") {
        return "param error";
    }
    return num1 + num2;
}

// 减
function sub(num1, num2) {
    if (typeof num1 != "number" || typeof num2 != "number") {
        return "param error";
    }
    return num1 - num2;
}

// 乘
function mul(num1, num2) {
    if (typeof num1 != "number" || typeof num2 != "number") {
        return "param error";
    }
    return num1 * num2;
}

// 除
function div(num1, num2) {
    if (typeof num1 != "number" || typeof num2 != "number") {
        return "param error";
    }
    return num1 / num2;
}

var symbol = []; // 存储符号的数组 -- 用于计算
var number = []; // 存储数字的数组 -- 用于计算
var calresults = ""; // 存储按键字符串 -- 用于显示
var number_str = ""; // 存储按下的数字

function clear() {
    symbol = [];
    number = [];
    calresults = "";
    number_str = "";
}

function calculater() {
    if (event.srcElement.innerText == "+" ||
        event.srcElement.innerText == "-" ||
        event.srcElement.innerText == "*" ||
        event.srcElement.innerText == "/") {
        if (number_str != "") {
            number.push(number_str);
            calresults += number_str;
            number_str = "";
        }

        // 连续按下符号，只存储最后一个
        if (symbol.length < number.length) {
            symbol.push(event.srcElement.innerText);
            calresults += event.srcElement.innerText;
        } else if (symbol.length == number.length) {
            symbol.pop();
            var len = calresults.length;
            calresults = calresults.substring(0, len - 1);
            symbol.push(event.srcElement.innerText);
            calresults += event.srcElement.innerText;
        }
    } else if (event.srcElement.innerText == "CE") {
        display.innerText = "";
        clear();
        return;
    } else if (event.srcElement.innerText == "C") {
        display.innerText = "0";
        clear();
        return;
    } else if (event.srcElement.innerText == "←") {
        var len = number_str.length;
        if (len == 1 && calresults != "") {
            number_str = "";
        } else if (len == 1 && calresults == "") {
            number_str = "";
            display.innerText = "0";
            return;
        } else if (len == 0 && calresults == "") {
            display.innerText = "0";
            return;
        } else {
            number_str = number_str.substring(0, len - 1);
        }
    } else if (event.srcElement.innerText == "±") {
        if (number_str.charAt(0) == "-") {
            var len = number_str.length;
            number_str = number_str.substr(1);
        } else {
            number_str = "-" + number_str;
        }
        display.innerText = number_str;
    } else if (event.srcElement.innerText == ".") {
        //alert("press .");
        if (number_str.length != 0 && number_str.indexOf(".") == -1) {
            number_str += ".";
        }
    } else if (event.srcElement.innerText == "=") {
        return;
    } else {
        number_str += event.srcElement.innerText;
    }
    display.innerText = calresults + number_str;
}

// 先算乘除，再算加减
// 比如计算式子 3 + 12 * 4 - 7 / 5
// 那么 symbol = ["+", "*", "-", "/"] 4个符号
//      number = [3, 12, 4, 7, 5]
// 第一步，从number中取出12和4，在symbol中取出"*", 计算 12 * 4 = 48, 
//        然后把48放回原来number, 这时number = [3, 48, 7, 5], symbol = ["+", "-", "/"]
// 第二步，从number中取出7和5，在symbol中取出"/", 计算 7 / 5 = 1.4, 
//        然后把1.4放回原来number, 这时number = [3, 48, 1.4], symbol = ["+", "-"]
// 第三步，从number中取出3和48，在symbol中取出"+", 计算 3 + 48 = 51, 
//        然后把51放回原来number, 这时number = [51, 1.4], symbol = ["-"]
// 第四步，从number中取出51和1.4，在symbol中取出"-", 计算 51 - 1.4 = 49.6, 
//        然后把49.6放回原来number, 这时number = [49.6], symbol = []
// 第五步，退出循环，number[0]的值，就是结果
function result() {
    for (var i = 0; i < symbol.length; i++) {
        if (symbol[i] == "*" || symbol[i] == "/") {
            var ret = 0;
            if (symbol[i] == "*") {
                ret = mul(Number(number[i]), Number(number[i + 1]));
            } else if (symbol[i] == "/") {
                ret = div(Number(number[i]), Number(number[i + 1]));
            }
            // 把结果放到number[i]中，将number[i + 1]从number中删除, 将symbol[i]从symbol中删除
            number[i] = ret;
            number.splice(i + 1, 1);
            symbol.splice(i, 1);
            i--;
        }
    }
    for (var i = 0; i < symbol.length; i++) {
        if (symbol[i] == "+" || symbol[i] == "-") {
            var ret = 0;
            if (symbol[i] == "+") {
                ret = add(Number(number[i]), Number(number[i + 1]));
            } else if (symbol[i] == "-") {
                ret = sub(Number(number[i]), Number(number[i + 1]));
            }
            // 把结果放到number[i]中，将number[i + 1]从number中删除, 将symbol[i]从symbol中删除
            number[i] = ret;
            number.splice(i + 1, 1);
            symbol.splice(i, 1);
            i--;
        }
    }
    // 显示结果
    calresults += " " + number[0];
    display.innerText = calresults;
}

function resultscalcaulte() {
    if (event.srcElement.innerText == "=") {
        if (number_str != "") {
            number.push(number_str);
            calresults += number_str;
            number_str = "";
        }

        if (calresults != "" && symbol.length != 0) {
            calresults += (" " + event.srcElement.innerText);
            display.innerText = calresults;
            // 计算结果
            result();
            clear();
        }
    }
}
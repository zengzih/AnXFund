function numberFormatter (number) {
    var result;

    if (number === null || number === '' || isNaN(number)) {
        result = '-';
    } else {
        result = number;
    };

    return result;
}

function currencyFormatter (number, places, symbol, thousand, decimal) {
	if (number === null || number === '' || isNaN(number)) {
        return '-';
    }

    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "￥";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
}

if (typeof window !== 'undefined' && window.Vue) {
  Vue.filter('numberFormat', numberFormatter);
  Vue.filter('currencyFormat', currencyFormatter);
}

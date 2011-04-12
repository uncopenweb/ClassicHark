dojo.provide('unc.Text');

dojo.require('unc.random');

unc.Text.conjunct = function(ary, conj) {
    if (!conj) {
        conj = 'and';
    }
    var n = ary.length;
    if (n <= 1) {
        return ary.join('');
    } else {
        var last = ary[n-1];
        var rest = ary.slice(0, n-1);
        return rest.join(', ') + ' ' + conj + ' ' + last;
    }
};

unc.Text.format = function(subs, pre, post) {
    var res = {};
    var markup = unc.Text.markup;
    if (dojo.isArray(subs)) {
        var res = dojo.map(subs, function(s) { return pre + markup(s) + post; });
    } else {
        for (key in subs) {
            if (key.indexOf('_') === 0) {
                continue;
            }
            var val = subs[key];
            if (dojo.isArray(val)) {
                val = dojo.map(val, function(v) { return pre + markup(v) + post; });
                val = unc.Text.conjunct(val);
            } else {
                val = pre + markup(val) + post;
            }
            res[key] = val;
        }
    }
    return res;
};

unc.Text.replace = function(template, subs) {
    if (dojo.isArray(template)) {
        template = unc.random.choice(template);
    }
    template = unc.Text.markup(template);
    if (subs) {
        var f = unc.Text.format;
        template = dojo.replace(template, f(subs, '<b>', '</b>'), /\[([^\]]+)\]/g);
        template = dojo.replace(template, f(subs, '<i>', '</i>'), /\(([^)]+)\)/g);
        template = dojo.replace(template, f(subs, '', ''));
    }
    return template;
};

unc.Text.markup = function(text) {
    if (typeof(text) != 'string') {
        return text;
    }
    text = text.replace('&', '&amp;');
    text = text.replace('-->', '&rarr;');
    text = text.replace('<--', '&larr;');
    text = text.replace('<', '&lt;');
    text = text.replace('>', '&gt;');
    text = text.replace(/(\/\*\_|\/\_\*|\_\/\*|\_\*\/|\*\_\/|\*\/\_)([-a-zA-Z0-9 ]+)(\/\*\_|\/\_\*|\_\/\*|\_\*\/|\*\_\/|\*\/\_)/g, '<b><i><u>$2</u></i></b>');
    text = text.replace(/(\/\*|\*\/)([-a-zA-Z0-9 ]+)(\/\*|\*\/)/g, '<b><i>$2</i></b>');
    text = text.replace(/(\_\*|\*\_)([-a-zA-Z0-9 ]+)(\_\*|\*\_)/g, '<b><u>$2</u></b>');
    text = text.replace(/(\_\/|\/\_)([-a-zA-Z0-9 ]+)(\_\/|\/\_)/g, '<i><u>$2</u></i>');
    text = text.replace(/_([-a-zA-Z0-9 ]+)_/g, '<u>$1</u>');
    text = text.replace(/\/([-a-zA-Z0-9 ]+)\//g, '<i>$1</i>');
    text = text.replace(/\*([-a-zA-Z0-9 ]+)\*/g, '<b>$1</b>');
    return text;
};

unc.Text.unmarkup = function(text) {
    text = text.replace(/(\/\*\_|\/\_\*|\_\/\*|\_\*\/|\*\_\/|\*\/\_)(\w+)(\/\*\_|\/\_\*|\_\/\*|\_\*\/|\*\_\/|\*\/\_)/g, '$2');
    text = text.replace(/(\/\*|\*\/)(\w+)(\/\*|\*\/)/g, '$2');
    text = text.replace(/(\_\*|\*\_)(\w+)(\_\*|\*\_)/g, '$2');
    text = text.replace(/(\_\/|\/\_)(\w+)(\_\/|\/\_)/g, '$2');
    text = text.replace(/_(\w+)_/g, '$1');
    text = text.replace(/\/(\w+)\//g, '$1');
    text = text.replace(/\*(\w+)\*/g, '$1');
    return text;
};

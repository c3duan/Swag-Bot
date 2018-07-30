'use strict';

// Tester
function isNumeric(value) {

    // Returning
    return /^\d+$/.test(value);
}

// Parser
function parsePath(path) {

    let steps   = [],
        memento = path,
        first   = path.substr(0, path.indexOf('[')),
        error   = !first.length;

    if (!error) {
        path = path.substr(path.indexOf('['), path.length);
        steps.push({key: first, last: !path.length, type:'object'});
    }

    let key = path.substr(1, path.indexOf(']') - 1);

    while (path.length && !error) {

        if (path[0] === '[' && path[1] === ']') {
            path  = path.substr(2, path.length);
            error = path.length !== 0;
            steps.push({append: true, type: 'array'});
        }

        else if (isNumeric(key = path.substr(1, path.indexOf(']') - 1))) {
            key  = parseInt(key, 10);
            path = path.substr(path.indexOf(']')+1, path.length);
            steps.push({key: key, type: 'array'});
        }

        else if ((key = path.substr(1, path.indexOf(']') - 1)) && !key.includes('[')) {
            path = path.substr(path.indexOf(']')+1, path.length);
            steps.push({key: key, type: 'object'});
        }

        else {
            error = true;
        }
    }

    if (!error) {

        for (let i = 0; i < steps.length; i++) {
            let step = steps[i], next = steps[i + 1];
            if (next) { step.nextType = next.type; } else { step.last = true; }
        }
    }

    else {
        steps = [{key: memento, last: true, type: 'object'}];
    }

    return steps;
}

// Setter
function setValue(context, step, currentValue, entryValue, isFile) {

    if (isFile) {
        entryValue = {name: 'filename', type: 'filetype', body: 'filebody'};
    }

    if (step.last) {

        if (typeof currentValue === 'undefined') {

            if (step.append) {
                context.push(entryValue);
            }

            else {
                context[step.key] = entryValue;
            }
        }

        else if (currentValue.constructor === Array) {
            context[step.key].push(entryValue);
        }

        else if (currentValue.constructor === Object && !isFile) {
            return setValue(currentValue, {key: '', last: true, type: 'object'}, currentValue[''], entryValue, isFile);
        }

        else {
            context[step.key] = [currentValue, entryValue];
        }

        return context;
    }

    if (typeof currentValue === 'undefined') {

        if (step.nextType === 'array') {
            context[step.key] = [];
        }

        else {
            context[step.key] = {};
        }

        return context[step.key];
    }

    else if (currentValue.constructor === Object) {
        return context[step.key];
    }

    else if (currentValue.constructor === Array) {

        if (step.nextType === 'array') {
            return currentValue;
        }

        else {
            let object = {};
            currentValue.forEach((item, i) => typeof item !== 'undefined' ? object[i] = item : context[step.key] = object);
            return object;
        }
    }

    else {
        let object = {'': currentValue};
        context[step.key] = object;
        return object;
    }
}

// Collector
function collectParent(el, tagName) {

    tagName = tagName.toLowerCase();

    while (el && el.parentNode) {

        el = el.parentNode;

        if (el.tagName && el.tagName.toLowerCase() === tagName) { return el; }
    }

    return null;
}

// Collector
function collectEntries(form, disabled) {

    return []

        // input elements
        .concat(Array.from(form.querySelectorAll(`input${disabled ? `` : `:not([disabled])`}:not([type=submit])`)).map(el => {

            let entry = {name: el.name, value: el.value};

            switch (el.type) {

                case 'checkbox':
                    entry.value = el.checked;
                    break;

                case 'date':
                case 'datetime-local':
                    let date = !isNaN(el.valueAsNumber) ? new Date() : null;
                    if (date) { date.setTime(el.valueAsNumber + date.getTimezoneOffset() * 60000); }
                    entry.value = date && date.toISOString();
                    break;

                case 'number':
                    entry.value = !isNaN(el.valueAsNumber) ? el.valueAsNumber : null;
                    break;

                case 'radio':
                    if (!el.checked) { return null; }
                    entry.value = el.value;
                    break;
            }

            return entry;
        }))

        // select elements
        .concat(Array.from(form.querySelectorAll(`select${disabled ? `` : `:not([disabled])`}:not([multiple])`)).map(el => {

            return {name: el.name, value: el.value};
        }))

        // select multiple elements
        .concat(Array.from(form.querySelectorAll(`select${disabled ? `` : `:not([disabled])`}[multiple] option[selected]`)).map(el => {

            return {name: collectParent(el, 'select').name, value: el.value};
        }))

        // textarea elements
        .concat(Array.from(form.querySelectorAll(`textarea${disabled ? `` : `:not([disabled])`}`)).map(el => {

            return {name: el.name, value: el.value};
        }))

        // filtering
        .filter(entry => entry);
}

// Encoder
function JSONEncode(form, disabled) {

    let entries = collectEntries(form, disabled),
        result  = {};

    entries.forEach(entry => {

        let isFile  = entry.value && entry.value.body !== undefined,
            steps   = parsePath(entry.name),
            context = result;

        for (let i = 0; i < steps.length; i++) {
            let step = steps[i], currentValue = context[step.key];
            context = setValue(context, step, currentValue, entry.value, isFile);
        }
    });

    return result;
}

// Exporting
module.exports = JSONEncode;

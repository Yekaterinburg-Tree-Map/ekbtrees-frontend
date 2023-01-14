


export const treeStatusOptions = [
    { id: 1, title: 'Живое' },
    { id: 2, title: 'Не живое' }
];

export const treePlantingTypeOptions = [
    { id: 1, title: 'Культурная посадка' },
    { id: 2, title: 'Самосев' }
];

export function isNumber(x: any): x is number {
    return typeof x === "number";
}

export function isString(x: any): x is string {
    return typeof x === "string";
}

export function validateIsNotNegativeNumber(value: string | number | undefined) {
    if (value === undefined || value === "") {
        return null;
    }
    return (parseFloat(value as string) <= 0) ? "Значение должно быть положительным" : null;
}

export function validateGreaterThan(value: string | number | undefined, greaterThan: number) {
    if (value === undefined || value === "") {
        return null;
    }
    if (greaterThan === 0 && parseInt(value + "", 10) <= 0) {
        return "Значение должно быть положительным";
    }
    return (parseInt(value + "", 10) < greaterThan) ? `Значение должно быть больше ${greaterThan}` : null;
}

export function validateLessThan(value: string | number | undefined, lessThan: number) {
    if (value === undefined || value === "") {
        return null;
    }
    return (parseInt(value + "", 10) >= lessThan) ? `Значение не может превосходить ${lessThan}` : null;
}

export function validateIsSet(value: string | number | undefined) {
    if (value === undefined || value === "") {
        return "Значение должно быть задано";
    }
    return null;
}

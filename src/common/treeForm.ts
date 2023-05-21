export const treeStatusOptions = [
    { id: 1, title: 'Живое' },
    { id: 2, title: 'Не живое' },
    { id: 3, title: 'Пень' }
];

export const treePlantingTypeOptions = [
    { id: 1, title: 'Культурная посадка' },
    { id: 2, title: 'Самосев' }
];

export const pruningOptions = [
    {id: 1, title: 'На столб'},
    {id: 2, title: 'На пень'},
    {id: 3, title: 'Поллардинг'},
    {id: 4, title: 'Омолаживающая'},
    {id: 5, title: 'Формовочная (шар)'},
    {id: 6, title: 'Нет обрезки'}
]

export const rootConditionOptions = [
    {id: 1, title: 'Неизвестно'},
    {id: 2, title: 'Газон или почва'},
    {id: 3, title: 'Приствольная решетка'},
    {id: 4, title: 'Твердое покрытие ближе 1 метра'}
]

export const trunkStateOptions = [
    {id: 1, title: 'Мертвые стволы'},
    {id: 2, title: 'Искревленные стволы'},
    {id: 3, title: 'Отклонение больше 45 градусов'}
]

export const branchStateOptions = [
    {id: 1, title: 'Мертвые ветки'},
    {id: 2, title: 'Сломанные ветки'},
    {id: 3, title: 'Спиленные ветки'},
    {id: 4, title: 'Опасно нависающие ветки'}
]

export const corticalStateOptions = [
    {id: 1, title: 'Дупла'},
    {id: 2, title: 'Наросты'},
    {id: 3, title: 'Трещины'},
    {id: 4, title: 'Механические повреждения'}
]

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

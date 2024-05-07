import {faker} from "@faker-js/faker";
import {DataTypeMap} from "../types/data-type-map.ts";

export function generator(data: Record<string, string>[]): Record<string, string> {
    const copy = {}
    data.forEach(item => {
        Object.assign(copy, {[`${item.name}`]: DataTypeMap.get(item.type)?.generator()})
    })
    return copy
}

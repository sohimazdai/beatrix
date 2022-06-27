interface MapCreatorInputItemRequired {
    id?: string;
}

export default function createMap<T extends MapCreatorInputItemRequired>(
    array: Array<T>,
): { [id: string]: T } {
    const associativeArray = {};

    array.forEach((item) => {
        associativeArray[item.id] = item;
    });

    return associativeArray;
}
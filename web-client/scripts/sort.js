import diff from "difflib";

export function getSortedArrayRatio(array){
    const result = [...array]
    result.sort((a, b) => a.ratio - b.ratio)
    result.reverse()
    return result
}
export function getFilteredArray(array, params, text, percent){
    let collection = []

    for(const obj of array){
        for(const param of params){
            const sequence = new diff.SequenceMatcher(
                null,
                obj[param].toLowerCase(),
                text)

            const ratio = sequence.ratio()
            if(ratio > percent){
                obj.ratio = ratio;
                collection.push(obj)
                break;
            }
        }
    }
    collection = getSortedArrayRatio(collection);
    return collection;
}
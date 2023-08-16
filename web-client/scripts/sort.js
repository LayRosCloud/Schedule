
export function getSortedArrayRatio(array){
    const result = [...array]
    result.sort((a, b) => a.ratio - b.ratio)
    result.reverse()
    return result
}
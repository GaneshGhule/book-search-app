
/**
 * Search given pattern in text 
 * 
 * Note: This algorithm expect lowercase string
 * 
 * @param {String} text 
 * @param {Number} pattern 
 */
export function KMPSearch(text, pattern) {
    const patternLength = pattern.length;
    const textLength = text.length;

    if(!patternLength || !textLength){
        return 0;
    }
    const lps = createLPS(pattern);
    let patternIndex = 0;
    let index = 0;
    let maxMatchCount = 0;

    while (index < text.length) {
        if (text.charAt(index) === pattern.charAt(patternIndex)) {
            index++;
            patternIndex++;
        }
        if (patternIndex === patternLength) {
            return 100;
        } else if (index < textLength && text.charAt(index) !== pattern.charAt(patternIndex)) {
            maxMatchCount = Math.max(maxMatchCount, patternIndex);
            if (patternIndex !== 0) {
                patternIndex = lps[patternIndex - 1];
            } else {
                index++;
            }
        }
    }
    if (maxMatchCount) {
        return Math.round((maxMatchCount / patternLength) * 100);
    }
    return 0;
}

/**
 * Create longest prefix suffix table.
 * @param {String} pattern 
 */
function createLPS(pattern) {
    const lps = [0];
    let index = 1;
    let len = 0;

    const patternLength = pattern.length;

    while (index < patternLength) {
        if (pattern.charAt(index) === pattern.charAt(len)) {
            len++;
            lps[index] = len;
            index++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[index] = len;
                index++;
            }
        }
    }
    return lps;
}


export default KMPSearch;

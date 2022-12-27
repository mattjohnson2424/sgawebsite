export function fuzzyUserSearch(user, searchTerm, tolerance) {
    const value = user.firstName.toLowerCase() + user.lastName.toLowerCase();
    const distance = levenshteinDistance(value, searchTerm.toLowerCase());
    console.log(user.firstName, distance)
    return distance <= tolerance;
}
  
function levenshteinDistance(a, b) {
    // Initialize the distance matrix with the lengths of the strings
    const distance = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
    for (let i = 0; i <= a.length; i += 1) {
        distance[0][i] = i;
    }
    for (let j = 0; j <= b.length; j += 1) {
        distance[j][0] = j;
    }

    // Calculate the distances between the characters in the strings
    for (let j = 1; j <= b.length; j += 1) {
        for (let i = 1; i <= a.length; i += 1) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        distance[j][i] = Math.min(
            distance[j][i - 1] + 1,
            distance[j - 1][i] + 1,
            distance[j - 1][i - 1] + cost,
        );
        }
    }
  
    // Return the distance between the strings
    return distance[b.length][a.length];
}

export function fuzzyUserSort(a, b, searchTerm, tolerance) {

    // Calculate the distances between the search term and the values for the key
    const aDistance = levenshteinDistance(a.firstName.toLowerCase() + a.lastName.toLowerCase(), searchTerm);
    const bDistance = levenshteinDistance(b.firstName.toLowerCase() + b.lastName.toLowerCase(), searchTerm);

    // If the distances are within the tolerance, consider the values equal
    if (Math.abs(aDistance - bDistance) <= tolerance) {
        return 0;
    } else if (aDistance < bDistance) {
    // If the distances are greater than the tolerance, sort in ascending order
        return -1;
    } else {
        return 1;
    }
    
}
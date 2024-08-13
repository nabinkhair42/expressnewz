export const convertSentence(sentence: string): string {

    return sentence
        .toLowerCase()          // Convert the entire sentence to lowercase
        .replace(/\s+/g, '-')   // Replace one or more spaces with a hyphen
        .replace(/[^\w\-]+/g, '') // Remove any non-alphanumeric characters (except hyphens)
        .replace(/--+/g, '-')   // Replace multiple hyphens with a single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading or trailing hyphens
}
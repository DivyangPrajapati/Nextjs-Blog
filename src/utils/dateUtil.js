export function dateFormat(dateString) {
    const date = new Date(dateString);
    let options = {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    };
    return date.toLocaleDateString("en-IN", options);
}
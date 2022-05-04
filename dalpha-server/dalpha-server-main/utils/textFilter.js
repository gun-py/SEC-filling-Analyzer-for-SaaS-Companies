module.exports = function (text) {
    text = text
        .replace(/[^ -~\n]+/g, "")
        .replace(/\n[\n]+/g, "\n\n")
    return text
}
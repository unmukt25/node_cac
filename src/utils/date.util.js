const formatDate = (value) => {

    if (!value || value.trim() === "") {
        return null;
    }

    const separator = value.includes("/") ? "/" : "-";

    const [day, month, year] = value.split(separator);

    if (!day || !month || !year) {
        return value;
    }

    return `${year}-${month}-${day}`;
};

module.exports = {
    formatDate
};
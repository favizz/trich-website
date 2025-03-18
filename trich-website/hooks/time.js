export const parseDateString = (dateString) => {
    if (dateString) {
        const [dayOfWeek, monthDay, year] = dateString.split(", ");
        return new Date(`${monthDay}, ${year}`);
    }
    return;
};

export const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
};

export const parseTimeString = (timeString) => {
    if (timeString) {
        const [hours, minutes] = timeString.split(":").map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }
    return;
};

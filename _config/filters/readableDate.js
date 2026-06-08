import { DateTime } from "luxon";

const readableDate = (dateObj, format, zone) => {
	let date;
	if (dateObj instanceof Date) {
		date = DateTime.fromJSDate(dateObj, { zone: zone || "utc" });
	}
	if (typeof dateObj === "string") {
		date = DateTime.fromISO(dateObj, { zone: zone || "utc" });
	}
	if (!date) {
		return "";
	}
	// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
	return date.toFormat(format || "dd LLLL yyyy");
};

export default readableDate;

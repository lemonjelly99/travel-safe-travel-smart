import { DateTime } from "luxon";

const htmlDateString = (dateObj) => {
	let date;
	if (dateObj instanceof Date) {
		date = DateTime.fromJSDate(dateObj, { zone: "utc" });
	}
	if (typeof dateObj === "string") {
		date = DateTime.fromISO(dateObj, { zone: "utc" });
	}
	if (!date) {
		return "";
	}
	// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
	return date.toFormat("yyyy-LL-dd");
};

export default htmlDateString;

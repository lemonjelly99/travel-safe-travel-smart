import util from "util";

const debugData = (obj) => {
	console.log(obj);
	return util.inspect(obj);
};

export default debugData;

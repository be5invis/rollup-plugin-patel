import { rollup } from "rollup";
import commonjs from "rollup-plugin-commonjs";
import patel from "..";

export default {
	entry: "main.ptl",
	format: "cjs",
	exports: "named",
	plugins: [
		patel(),
		commonjs({
			extensions: [".js", ".ptl"]
		})
	]
}

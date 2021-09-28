import { NotImplementedError } from "../extensions/index.js";

/**
 * Given matrix where you have to find cats by ears "^^"
 *
 * @param {Array<Array>} matrix
 * @return {Number} count of cats found
 *
 * @example
 * countCats([
 *  [0, 1, '^^'],
 *  [0, '^^', 2],
 *  ['^^', 1, 2]
 * ]) => 3`
 *
 */
export default function countCats(arr) {
	let arrFlat = arr.flat();
	let cats = [];
	for (let i = 0; i < arrFlat.length; i++) {
		if (arrFlat[i] === "^^") {
			cats.push(arrFlat[i]);
		}
	}
	return cats.length;
}

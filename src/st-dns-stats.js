import { NotImplementedError } from '../extensions/index.js';

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
export default function getDNSStats(domains) {
  const revDomains = domains.map(domain => {
    return '.'+domain.split('.').reverse().join('.')
  })

  let allCombinations = {};

  revDomains.forEach(domain => {
    const allSubdomain = domain.match(/\.[^\.]+/g);

    allCombinations = updateZones(allCombinations, allSubdomain[0]);
    allSubdomain.reduce((prev,cur) => {
      updateZones(allCombinations, prev+cur);
      return prev+cur;
    })
  })

  return allCombinations;
}

function updateZones(allCombinations, zone) {
  if (allCombinations[zone]) {
    allCombinations[zone] = allCombinations[zone] + 1
  } else {
    allCombinations[zone] = 1;
  }

  return allCombinations;
}

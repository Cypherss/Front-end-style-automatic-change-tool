const drivers = require('../util/drivers');
const searchUsedCSS = require('../component/searchUsedCSS');
const seg = require('../component/segmentation');

module.exports = async function (data) {
  const driver = await drivers.getChromeDriver();
  try {
    const { name, userId, baseUrl, pac, st } = data;
    await driver.get(baseUrl);
    await searchUsedCSS(driver);
    console.log('seg begin');
    let node = await seg(driver, {
      pac,
      returnType: 'null',
      showBox: false,
    });
    console.log('seg finish');
    return node;
  } catch (e) {
    throw e;
  } finally {
    // close替代quit，quit存在一个问题，当一个driver被close时，其他所有driver的连接都会被关闭（但那些driver本身不会quit）
    driver.close();
  }
};

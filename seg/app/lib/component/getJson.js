import seg from './segmentation'

module.exports = async function(
    driver, 
    options = { threshold1: 0.45, threshold2: 0.3, pac: 5 }
) {
   let node = await seg(driver, {
       pac: options.pac,
       returnType: 'null',
       showBox: false
   }); 
}
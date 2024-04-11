//NOT IMPORTANT - test to see if it works in postman --as of now (4/9) yes
const { createBiWeeklyPayPeriod } = require('./payPeriod.js');

async function testCreateBiWeeklyPayPeriod() {
    try {
        console.log('creating new pay period...'); //to show loading for timeout 
        const newPayPeriod = await createBiWeeklyPayPeriod(); 
        console.log('created:');
        console.log(newPayPeriod);
    } catch (error) {
        console.error('error creating pay period:', error);
    }
}

testCreateBiWeeklyPayPeriod();
  
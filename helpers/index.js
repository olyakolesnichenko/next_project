import nookies from 'nookies';

import newsData from '../sources/news.json';
import discountsData from '../sources/discounts.json';
import carsData from '../sources/cars.json';

//import usersData from '../sources/users.json';

const getCookieUserId = (context) => {
    const cookies = nookies.get(context);
    return 'userID' in cookies ? cookies.userID : null;
};

const setCookieUserId = (context, userId) => {
    nookies.set(context, 'userID', `${userId}` , {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
    })
};

const getUserVisits = async (context)=> {
    let userId = getCookieUserId(context);
    let visitCounts = 1;
    //let usersData = await readFile('users');
    // if (userId){
    //     if (usersData.length > 0)
    //         usersData.map((value, key) => {
    //             if (value.userId == userId){
    //                 value.visitCounts = ++value.visitCounts;
    //                 visitCounts = value.visitCounts;
    //             }
    //         });
    // } else{
        userId = Date.now();
        setCookieUserId(context, userId);

        //const newUser = {userId: `${userId}`, visitCounts: visitCounts };
       // usersData.push(newUser);
    //}

    //await writeFile('users',usersData);

    return {visitCounts, userId: `${userId}`};
};

const getUserType = (visitCounts) => {
    return visitCounts < 3 ? "guest" : (visitCounts > 5 ? "familyMember" : "friend");
};

const getNewsData = () => {

    return newsData;
};

const getDiscountsData = () => {

    return discountsData;
};

const getCarsData = async () => {

    return carsData;
};

const getDashboardData = async () => {

    let dashboardData = {};

    dashboardData.news = await getNewsData();
    dashboardData.discounts =  await getDiscountsData();
    dashboardData.cars = await getCarsData();

    return dashboardData;

};

export {
    getUserType,
    getDashboardData,
    getUserVisits,
    getNewsData,
    getDiscountsData,
    getCarsData
};
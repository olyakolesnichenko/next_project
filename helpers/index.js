import nookies from 'nookies';
import fs from 'fs/promises';

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
    let usersData = await readFile('users');
    if (userId){
        if (usersData.length > 0)
            usersData.map((value, key) => {
                if (value.userId == userId){
                    value.visitCounts = ++value.visitCounts;
                    visitCounts = value.visitCounts;
                }
            });
    } else{
        userId = Date.now();
        setCookieUserId(context, userId);

        const newUser = {userId: `${userId}`, visitCounts: visitCounts };
        usersData.push(newUser);
    }

    await writeFile('users',usersData);

    return {visitCounts, userId: `${userId}`};
};

const getUserType = (visitCounts) => {
    return visitCounts < 3 ? "guest" : (visitCounts > 5 ? "familyMember" : "friend");
};


const readFile = async (filename)=> {

    try {
        const source = await fs.readFile(`./sources/${filename}.json`, 'utf-8');

        return source ? JSON.parse(source) : [];

    } catch (error) {
        console.error(error.message)
    }

};

const writeFile = async (filename, newData) => {
    try {
        await fs.writeFile(`./sources/${filename}.json`, JSON.stringify(newData, null, 4))
    } catch (error) {
        console.error(error.message)
    }
};

const getNewsData = async () => {

    return await readFile('news');
};

const getDiscountsData = async () => {

    return await readFile('discounts');
};

const getCarsData = async () => {

    return await readFile('cars');
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
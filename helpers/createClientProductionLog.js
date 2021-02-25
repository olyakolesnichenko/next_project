export const createClientProductionLog = async (type, logData) => {
    const response = await fetch(`/api/logs/${type}`, {
        method: 'POST',

        body: JSON.stringify({logData})
    });

    if (response.status !== 200 && response.status !== 201 ){
        console.log('something went wrong');
    }
}
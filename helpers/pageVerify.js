export const pageVerify = (page, userType) => {
    if (userType === "friend") {
      return page.includes('/cars');
    }
    if (userType === "guest"){
        return (page.includes('/discounts') || page.includes('/cars'));
    }
    return false
}
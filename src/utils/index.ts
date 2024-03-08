export const timeConverter = (time: any) => {
    const timestamp = time;
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let createdTime = `${day}-${month}-${year}`;
    return createdTime;
};
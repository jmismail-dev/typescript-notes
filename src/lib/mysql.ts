
// Get Current Time Stamp
export const getTimeStamp = ():string => new Date().toISOString().slice(0, 19).replace("T", " ")
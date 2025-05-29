/* eslint-disable @typescript-eslint/no-explicit-any */
export function setUser(vo: any){
    return {
        type:'USER_UPDATE',
        vo
    }
}
export function setPermission(vo: any){
    return {
        type:'PERMISSION_UPDATE',
        vo
    }
}
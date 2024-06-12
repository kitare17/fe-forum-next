export function FormatCurrency(number:number) {
    // Kiểm tra xem số có là một số hợp lệ không


    // Định dạng số thành chuỗi và ngược lại
    var strNumber = number.toString().replace(/\D/g, '');

    // Chia số thành các phần ngàn, triệu, tỷ
    var parts = strNumber.split('.');
    var main = parts[0];
    var decimal = parts.length > 1 ? '.' + parts[1] : '';

    // Định dạng phần nguyên
    main = main.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

    return main + decimal + ' VND';
}


export function createDayToString(createdAt:string) {

    return `Đăng ngày ${new Date(createdAt).getDate()}/${new Date(createdAt).getMonth() + 1}/${new Date(createdAt).getFullYear()}`;
}
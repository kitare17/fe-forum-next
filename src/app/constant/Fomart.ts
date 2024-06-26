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

export function createDayToStringTask(createdAt:string) {

    var hour=new Date(createdAt).getHours();
    var minute=new Date(createdAt).getMinutes();
    var second=new Date(createdAt).getSeconds();
    var date=new Date(createdAt).getDate();
    var month=new Date(createdAt).getMonth();
    var year=new Date(createdAt).getFullYear();

    return `${hour}:${minute}:${second} ${date}/${month + 1}/${year}`;
}


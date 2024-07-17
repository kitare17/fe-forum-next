export function FormatCurrency(number: number) {
    // Chuyển số thành chuỗi và loại bỏ các ký tự không phải số
    var strNumber = number.toString().replace(/\D/g, '');

    // Kiểm tra nếu số sau khi chuyển có giá trị là rỗng thì trả về 0 VND
    if (!strNumber) return '0 VND';

    // Chia số thành phần nguyên và phần thập phân (nếu có)
    var parts = strNumber.split('.');
    var main = parts[0];
    var decimal = parts.length > 1 ? '.' + parts[1] : '';

    // Định dạng phần nguyên
    main = main.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

    return main + decimal + ' VND';
}
export const formatNumber = (value: number | string): string => {
    const num = Number(value);
    if (isNaN(num)) return '0';

    return new Intl.NumberFormat('vi-VN').format(num);
};
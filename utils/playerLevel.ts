export function getPlanetName(gender: number): string {
    switch (gender) {
        case 0:
            return "Saiyan";
        case 1:
            return "Namek";
        case 2:
            return "Trái Đất";
        default:
            return "Không xác định";
    }
}

export function getCurrLevel(power: number): number {
    if (power < 3_000) return 0;
    if (power < 15_000) return 1;
    if (power < 40_000) return 2;
    if (power < 90_000) return 3;
    if (power < 170_000) return 4;
    if (power < 340_000) return 5;
    if (power < 700_000) return 6;
    if (power < 1_500_000) return 7;
    if (power < 15_000_000) return 8;
    if (power < 150_000_000) return 9;
    if (power < 1_500_000_000) return 10;
    if (power < 5_000_000_000) return 11;
    if (power < 10_000_000_000) return 12;
    if (power < 40_000_000_000) return 13;
    if (power < 50_010_000_000) return 14;
    if (power < 60_010_000_000) return 15;
    if (power < 70_010_000_000) return 16;
    if (power < 80_010_000_000) return 17;
    if (power < 100_010_000_000) return 18;
    if (power < 11_100_010_000_000) return 19;

    return 20;
}

export function getCaptions(gender: number): string[] {
    const planet = getPlanetName(gender);

    return [
        "Tân thủ",
        "Tập sự sơ cấp",
        "Tập sự trung cấp",
        "Tập sự cao cấp",
        "Tân binh",
        "Chiến binh",
        "Chiến binh cao cấp",
        "Vệ binh",
        "Vệ binh hoàng gia",
        `Siêu ${gender === 0 ? "nhân" : planet} cấp 1`,
        `Siêu ${gender === 0 ? "nhân" : planet} cấp 2`,
        `Siêu ${gender === 0 ? "nhân" : planet} cấp 3`,
        `Siêu ${gender === 0 ? "nhân" : planet} cấp 4`,
        `Thần ${planet} cấp 1`,
        `Thần ${planet} cấp 2`,
        `Thần ${planet} cấp 3`,
        "Giới Vương Thần cấp 1",
        "Giới Vương Thần cấp 2",
        "Giới Vương Thần cấp 3",
        "Thần hủy diệt cấp 1",
        "Thần hủy diệt cấp 2",
        "Ngọc Rồng xanh",
    ];
}

export function getCurrStrLevel(
    power: number,
    gender: number
): string {
    return getCaptions(gender)[getCurrLevel(power)];
}
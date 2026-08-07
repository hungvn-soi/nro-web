//Thêm cột mới cho bản events


{/*
* Lưu Ý: nếu đã có bảng events thì thêm các cột imagem badge, description
*/}
ALTER TABLE events
    ADD COLUMN IF NOT EXISTS description TEXT NULL,
    ADD COLUMN IF NOT EXISTS image VARCHAR(255) NULL,
    ADD COLUMN IF NOT EXISTS badge ENUM('NONE', 'NEW', 'HOT') NOT NULL DEFAULT 'NONE';



{/*
* Lưu Ý: Nếu chưa có bản hãy tạo mới bảng events
*/}
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    state TINYINT NOT NULL DEFAULT 0,

    description TEXT NULL,

    image VARCHAR(255) NULL,

    badge ENUM('NONE', 'NEW', 'HOT')
        NOT NULL
        DEFAULT 'NONE',

    start_date DATE NULL,

    end_date DATE NULL
);
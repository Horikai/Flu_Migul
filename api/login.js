import fs from "fs";
import path from "path";

export default function handler(req, res) {
  console.log("✅ API /api/login received request");
  // phần code của bạn giữ nguyên...
}


export default function handler(req, res) {
  try {
    // 👉 Đường dẫn tuyệt đối tới users.json
    const filePath = path.join(process.cwd(), "api", "users.json");
    const users = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const { user, pass } = req.method === "POST" ? req.body : req.query;
    if (!user || !pass) {
      return res.status(400).json({
        status: "error",
        message: "Thiếu thông tin đăng nhập!"
      });
    }

    const found = users.find(u => u.username === user && u.password === pass);

    if (found) {
      return res.json({
        status: "success",
        user: found.username,
        created: found.created,
        expired: found.expired,
        duration: found.duration || "7 Days",
        message: "Đăng nhập thành công!"
      });
    }

    return res.status(401).json({
      status: "error",
      message: "Sai tài khoản hoặc mật khẩu!"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Lỗi server hoặc không tìm thấy users.json!"
    });
  }
}

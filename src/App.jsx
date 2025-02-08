import { useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import axios from "axios";  // Import axios
import "./App.css";

const schema = {
  title: "Thông tin người dùng",
  type: "object",
  properties: {
    name: { type: "string", title: "Tên", minLength: 1 },
    age: { type: "number", title: "Tuổi", minimum: 18 },
    email: { type: "string", title: "Email", format: "email" },
    gender: {
      type: "string",
      title: "Giới tính",
      enum: ["Nam", "Nữ", "Khác"],
      enumNames: ["Nam", "Nữ", "Khác"]
    },
    relatives: {
      type: "array",
      title: "Người thân",
      items: {
        type: "object",
        properties: {
          relativeName: { type: "string", title: "Tên" },
          relativePhone: {
            type: "string",
            title: "Số điện thoại",
            pattern: "^[0-9]{10}$"
          }
        }
      }
    }
  },
  required: ["name", "age", "email", "gender"]
};

// Xử lý khi submit form và gửi dữ liệu lên API
const handleSubmit = async ({ formData }) => {
  console.log("Dữ liệu form:", formData);

  try {
    const response = await axios.post(
      "http://localhost:5000/submit", // Đổi URL API nếu cần
      formData
    );
    console.log("Dữ liệu đã được lưu vào MongoDB:", response.data);
    alert("Dữ liệu đã được gửi thành công!");
  } catch (error) {
    console.error("Có lỗi xảy ra khi lưu dữ liệu:", error);
    alert("Gửi dữ liệu thất bại!");
  }
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <Form
        schema={schema}
        onSubmit={handleSubmit}
        validator={validator}
        formData={{ relatives: Array(count).fill({}) }}
      >
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

export default App;

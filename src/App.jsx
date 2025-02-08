import { useState } from 'react';
import Form from '@rjsf/core';
import './App.css';

// Cấu hình schema cho form
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
      enumNames: ["Nam", "Nữ", "Khác"]  // Tên hiển thị của các lựa chọn
    },
    relatives: {  // Thêm thông tin người thân
      type: "array",
      title: "Người thân",
      items: {
        type: "object",
        properties: {
          relativeName: { type: "string", title: "Tên " },
          relativePhone: { type: "string", title: "Số điện thoại ", pattern: "^[0-9]{10}$" } // Kiểu dữ liệu số điện thoại
        }
      }
    }
  },
  required: ["name", "age", "email", "gender"]  // Đảm bảo các trường bắt buộc
};

// Hàm xử lý khi submit form
const handleSubmit = ({ formData }) => {
  console.log("Dữ liệu form:", formData);
};

function App() {
  const [count, setCount] = useState(0);

  // Hàm thêm người thân
  const handleAddRelative = () => {
    setCount(count + 1);
  };

  // Định nghĩa validator mặc định
  const validator = {
    validate: (formData, schema) => {
      const errors = [];
      // Kiểm tra trường "name"
      if (!formData.name || formData.name.trim() === "") {
        errors.push({
          property: 'name',
          message: 'Tên là bắt buộc'
        });
      }
      // Kiểm tra trường "age"
      if (!formData.age || formData.age < 18) {
        errors.push({
          property: 'age',
          message: 'Tuổi phải từ 18 trở lên'
        });
      }
      // Kiểm tra trường "email"
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.push({
          property: 'email',
          message: 'Email không hợp lệ'
        });
      }
      return errors;
    }
  };

  return (
    <>
      <div className="card">
        {/* Form không có dữ liệu mặc định */}
        <Form
          schema={schema}
          onSubmit={handleSubmit}
          validator={validator}
          formData={{ relatives: Array(count).fill({}) }} // Mảng người thân sẽ được render dựa trên số lượng `count`
        >
          <button type="submit">Submit</button>
        </Form>
      </div>
    </>
  );
}

export default App;

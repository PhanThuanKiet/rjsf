import { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import './App.css';

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
          relativePhone: { type: "string", title: "Số điện thoại", pattern: "^[0-9]{10}$" }
        }
      }
    }
  },
  required: ["name", "age", "email", "gender"]
};

const handleSubmit = ({ formData }) => {
  console.log("Dữ liệu form:", formData);
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="card">
        <Form
          schema={schema}
          onSubmit={handleSubmit}
          validator={validator}  // Sử dụng validator mới
          formData={{ relatives: Array(count).fill({}) }}
        >
          <button type="submit">Submit</button>
        </Form>
      </div>
    </>
  );
}

export default App;
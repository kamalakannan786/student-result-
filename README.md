# Student-Result

## 🚀 Features:
✅ Fetch student result by **Roll Number**  
✅ Update student marks  
✅ **MongoDB** database integration  
✅ **Homebrew**-based setup for macOS  
✅ **Nodemon** for auto-restart in development  


## 🛠️ Installation & Setup  

### 1️⃣ **Run the Initialization Script**  
This installs **all dependencies**, sets up **MongoDB**, and seeds **sample student data**.  
Run it **only once** or when you reset your system.  

- navigate to backend:
```sh
cd backend/
chmod +x *
```

```sh
./initial.sh
```

### 2️⃣ **Start the Backend Server**  
Run this **every time** you want to start the backend server:  

```sh
./run.sh
```

---

## 📜 API Endpoints

### 🔹 **Fetch Student by Roll Number**
- GET /api/student/:roll
- Testing: curl -X GET http://localhost:8080/api/student/22EC01
- **Response:**
  ```json
  {
    "rollNo": 101,
    "name": "John Doe",
    "marks": 85
  }
  ```

### 🔹 **Update Student Marks**
- PUT /api/student/:roll
- Testing: curl -X PUT http://localhost:8080/api/student/20231001 \
-H "Content-Type: application/json" \
-d '{
  "marks": [
    { "subject": "Math", "marks": 97 },
    { "subject": "Science", "marks": 90 },
    { "subject": "English", "marks": 95 }
  ]
}'

- **Example Request Body:**
  ```json
  {
    "marks": 95
  }
  ```

---
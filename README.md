# Citizenship.UI

This project is a web application for querying and managing citizenship information.

## 🚀 Features

- Citizen Query
- Address Query
- SMS Sending
- User Management
- JWT Based Authentication

## 🛠️ Technologies Used

- **Frontend Framework**: React 18
- **Type Safety**: TypeScript
- **State Management**: Recoil
- **UI Library**: Chakra UI
- **Table Component**: AG Grid
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Development Environment**: Vite
- **Routing**: React Router
- **Notifications**: React Toastify

## 📦 Installation

1. Clone the project:
```bash
git clone https://github.com/username/citizenship.ui.git
cd citizenship.ui
```

2. Install required packages:
```bash
npm install --legacy-peer-deps
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Edit `.env` file and set the required variables:
```env
VITE_API_BASE_URL=https://api.example.com
VITE_SMS_API_URL=https://sms-api.example.com
VITE_API_PORT=443
VITE_DEV_PORT=9876
```

5. Start the application:
```bash
npm run dev
```

## 🚀 Deployment

To build the project:
```bash
npm run build
```

The compiled files will be created in the `dist` folder.

## 📁 Project Structure

```
src/
├── controllers/     # API requests
├── models/         # Type definitions
├── recoil/         # State management
├── utils/          # Helper functions
└── views/          # UI components
    ├── pages/      # Page components
    └── components/ # General components
```

## 🔒 Security

- JWT tokens are stored in localStorage
- HTTPS is used for API requests
- Sensitive information is kept in .env file
- Rate limiting is applied

## 🤝 Contributing

1. Fork this repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push your branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the [MIT](LICENSE) License.

## 📧 Contact

Project Owner - [@username](https://github.com/username)

Project Link: [https://github.com/username/citizenship.ui](https://github.com/username/citizenship.ui) 
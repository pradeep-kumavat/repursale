# Repursale

## Overview
Repursale is a web-based application designed to streamline the creation, storage, and export of purchase and sale invoices. The platform enables users to efficiently manage their transactions while maintaining a structured record of all financial dealings.

## Features
- **Invoice Management**: Create, edit, and delete purchase and sale invoices.
- **Data Storage**: Securely store invoices for future reference.
- **Export Functionality**: Export invoices in various formats (PDF, CSV, etc.).
- **User Authentication**: Secure login and user-based invoice management.
- **Dashboard**: View summary insights of transactions.
- **Search & Filter**: Quickly find invoices based on specific criteria.

## Tech Stack
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Nextjs
- **Database**: MongoDB
- **Authentication**: Clerk/Auth.js
- **Styling**: Tailwind CSS

## Installation & Setup
### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud instance)
- Environment variables for database and authentication

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/pradeep-kumavat/repursale
   cd repursale
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the required configurations:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_pass
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser to see the app in action.

## Usage
1. **Sign Up / Log In** to access your personalized dashboard.
2. **Create a new invoice** for purchases or sales.
3. **View, search, and filter invoices** to track your transactions efficiently.
4. **Export invoices** as CSV files for record-keeping.

## Contributing
Contributions are welcome! If you'd like to improve Reapursale, feel free to fork the repo and submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any queries, feel free to reach out via:
- GitHub: [pradeep-kumavat](https://github.com/pradeep-kumavat)
- Email: pradeepkumavat108@gmail.com


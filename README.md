# Social Puppy – Community Event Planner

## Project Overview

Social Puppy is a Community Event Planner developed for IFQ636 Software Lifecycle Management at Queensland University of Technology (QUT).

The application allows puppy school members to create, manage and participate in puppy-friendly socialisation events. Registered users can create, edit and delete their own events, while administrators have additional moderation capabilities.

---

## Public URL

http://54.206.45.11

---

## Access Instructions

The application supports self-registration.

Markers may create their own account by selecting **Register** on the application homepage.

No pre-configured account is required.

---

## Local Installation

### Clone Repository

```bash
git clone https://github.com/vynka-qut/IFQ636-A1-CommunityEventPlanner.git
cd IFQ636-A1-CommunityEventPlanner
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

### Environment Variables

Create a `.env` file in the backend directory and configure:

```env
MONGO_URI=<your MongoDB connection string>
JWT_SECRET=<your secret key>
```

---

## Project Links

### GitHub Repository

https://github.com/vynka-qut/IFQ636-A1-CommunityEventPlanner

### Jira Project

https://qut-ifq636.atlassian.net/jira/software/projects/CEP/summary

### Figma Prototype

https://chief-brook-27303225.figma.site

---

## Author

**Vynka Lee Smith**  
Student ID: n12809411

IFQ636 Software Lifecycle Management

Queensland University of Technology
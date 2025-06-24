# kiddokip Mobile App

![App Logo]  /Users/daniel/Desktop/projects/kiddokip/assets/logo.svg
*A digital solution for streamlined child registration and crèche management in South Africa*

## Overview

kiddokip replaces outdated Excel-based systems with a secure mobile platform for:

- ✅ **Centralized child registration**  
- 🔄 **Real-time data sync across districts**  
- 🚨 **Duplicate detection & data validation**  
- 📊 **Automated government reporting**

## Key Features

| Feature | Description |
|---------|-------------|
| 👶 **Child Profiles** | Digital records with photos, birthdates, ID numbers, and medical notes |
| ↔️ **Transfer Tool** | Seamless child transfers between crèches with audit trails |
| 📱 **Offline Mode** | Work without internet - data syncs when connection resumes |
| 🔍 **Quick Search** | Find children by name, ID
| 📈 **Dashboard** | Real-time stats on enrollments, demographics, and transfers |

## 🛠️ Technical Stack

- **Frontend**: React Native (iOS & Android)  
- **Backend**: Firebase/Firestore (Realtime DB + Authentication)  + nodeJS
- **Security**: AES-256 encryption for sensitive data  
- **Integrations**: National ID verification API (not to be included as yet.)

## 📲 Screenshots

| Home Screen | Registration | Child Profile |
|-------------|--------------|---------------|
| ![Home](https://via.placeholder.com/150x300?text=Dashboard+Stats) | ![Register](https://via.placeholder.com/150x300?text=Registration+Form) | ![Profile](https://via.placeholder.com/150x300?text=Child+Details) |

## 🚀 Getting Started

### For Crèche Staff

1. Download from [Google Play]() or [App Store]()  
2. Login with district-provided credentials  
3. Tap `+ Register` to add new children  

### For Developers

```bash
# Development setup
https://github.com/washington786/kiddokip
cd kiddokip
npm install
expo start

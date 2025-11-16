# Lost & Found Pets Website

A modern, responsive web application designed to help reunite lost pets with their families. Users can report missing pets, found pets, and browse listings from the community.

## 🌟 Features

### Homepage
- **Modern Hero Banner**: Eye-catching banner with call-to-action buttons
- **Lost Pets Section**: Display all reported lost pets with detailed information
- **Found Pets Section**: Show found pets to help identify owners
- **Testimonials**: Community success stories
- **About Us Section**: Platform mission and information
- **Contact Section**: Multiple ways to get in touch
- **Responsive Navigation**: Works seamlessly on desktop and mobile

### Add Lost Pet Form
- Pet details: Name, Type, Breed, Color, Size, Gender
- Optional Tag/Microchip ID field
- Date lost and location
- Contact number validation (10 digits)
- Pet description with character limit
- Image upload with preview
- Conditional fields: Show breed options based on pet type
- Dynamic color and size customization

### Add Found Pet Form
- Pet Type, Breed, Color, Size
- Date found and location
- Finder's contact information
- Pet description
- Image upload with preview
- Similar dynamic conditional fields as Lost Pet form

### Data Management
- **localStorage Storage**: All pet data saved locally in browser
- **Persistent Data**: Pet listings remain even after page refresh
- **No Backend Required**: Pure client-side solution

## 📁 Project Structure

```
lost and found/
├── index.html              # Homepage
├── add-lost-pet.html       # Lost pet form page
├── add-found-pet.html      # Found pet form page
├── styles.css              # Main stylesheet (responsive CSS)
├── script.js               # Core JavaScript & localStorage management
├── lost-pet-form.js        # Lost pet form logic
├── found-pet-form.js       # Found pet form logic
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or backend required

### Installation

1. **Download/Clone the Project**
   - Extract all files to a folder on your computer

2. **Open in Browser**
   - Double-click `index.html` to open the homepage
   - Or right-click and select "Open with" your preferred browser

3. **Navigate the Site**
   - Use the navigation menu to explore different sections
   - Click "Report Lost Pet" to add a missing pet
   - Click "Report Found Pet" to report a found pet
   - View all listings on the homepage

## 📝 How to Use

### Report a Lost Pet

1. Click "Report Lost Pet" button or navigate to "Add Lost Pet"
2. Fill in the form fields:
   - **Pet Name**: Your pet's name
   - **Pet Type**: Select Dog, Cat, Bird, Rabbit, Hamster, or Other
   - **Breed**: Automatically populated based on pet type (shows for dogs and cats)
   - **Color**: Select from predefined colors or choose "Other" to enter custom
   - **Size**: Choose from Small, Medium, Large, or specify custom size
   - **Gender**: Male, Female, or Unknown
   - **Tag/Microchip ID**: Optional identifier
   - **Date Lost**: Date when pet went missing
   - **Location**: Where the pet was last seen
   - **Contact Number**: Must be exactly 10 digits
   - **Description**: Notable features or characteristics
   - **Upload Image**: Photo of your pet

3. Click "Submit Report" to save
4. You'll be redirected to the homepage where your pet appears in the Lost Pets section

### Report a Found Pet

1. Click "Report Found Pet" button or navigate to "Add Found Pet"
2. Fill in similar form fields (without pet name)
3. Provide detailed description to help identify the owner
4. Click "Submit Report"
5. Pet appears in the Found Pets section

### View Listings

- All lost and found pets display on the homepage
- Each card shows:
  - Pet photo
  - Name/Type
  - Breed and Color
  - Date lost/found
  - Location
  - Truncated description
  - Contact phone number
  - Easy access to contact

## 🎨 Design Features

### Responsive Design
- **Desktop**: Full grid layout with 3 columns
- **Tablet**: 2-column layout
- **Mobile**: Single column layout with optimized spacing
- **Hamburger Menu**: Mobile-friendly navigation

### Visual Design
- **Color Scheme**: Modern gradient colors (Primary: #FF6B6B, Secondary: #4ECDC4)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Animations**: Smooth transitions and hover effects
- **Icons**: Font Awesome icons for visual enhancement

### Accessibility
- Semantic HTML structure
- Form labels and placeholders
- Keyboard navigation support
- Clear error messages
- Mobile-friendly touch targets

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Grid, Flexbox, animations, media queries
- **JavaScript (ES6)**: Modern JavaScript with class methods
- **localStorage API**: Client-side data persistence
- **Font Awesome**: Icon library

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### File Size
- Minimal dependencies - no frameworks required
- Fast loading times
- Lightweight asset management

## 💾 Data Storage

### localStorage Structure

**Lost Pets:**
```javascript
localStorage.lostPets = [
  {
    id: timestamp,
    petName: string,
    petType: string,
    breed: string,
    color: string,
    size: string,
    gender: string,
    tagId: string,
    dateLost: date,
    location: string,
    contact: string,
    description: string,
    image: base64-string
  }
]
```

**Found Pets:**
```javascript
localStorage.foundPets = [
  {
    id: timestamp,
    petType: string,
    breed: string,
    color: string,
    size: string,
    dateFound: date,
    location: string,
    contact: string,
    description: string,
    image: base64-string
  }
]
```

### Clearing Data

To clear all pet listings and start fresh, open browser DevTools:
1. Press `F12` or Right-click → Inspect
2. Go to Console tab
3. Type: `localStorage.clear()`
4. Press Enter
5. Refresh the page

## ✅ Form Validation

### Implemented Validations

- **Required Fields**: All marked fields must be filled
- **Phone Number**: Exactly 10 digits, numeric only
- **Pet Type Dependent Breed**: Breed options change based on selected pet type
- **Color Customization**: "Other" option reveals text input for custom colors
- **Size Customization**: "Other" option reveals text input for custom sizes
- **Image Upload**: Required, must be valid image format
- **Date Fields**: Must select valid date
- **Real-time Feedback**: Error messages appear instantly

## 🎯 Features Implementation Checklist

- ✅ Modern, clean, attractive homepage design
- ✅ Responsive for desktop and mobile
- ✅ Hero section with CTA buttons
- ✅ Lost Pets section with cards
- ✅ Found Pets section with cards
- ✅ Testimonials section
- ✅ About Us section
- ✅ Contact section
- ✅ Footer with links and social icons
- ✅ Add Lost Pet form with conditional fields
- ✅ Add Found Pet form with conditional fields
- ✅ Pet Type dropdown with dynamic breed options
- ✅ Color selection with custom color option
- ✅ Size selection with custom size option
- ✅ Contact number validation (10 digits)
- ✅ Image upload with preview
- ✅ localStorage data persistence
- ✅ Form validation and error messages
- ✅ Responsive grid layouts
- ✅ Smooth animations and transitions
- ✅ Font Awesome icons integration

## 📱 Sample Data (Optional)

To add sample pet listings for demonstration:

1. Open `script.js`
2. Find the commented line at the end: `// addSampleData();`
3. Uncomment it: `addSampleData();`
4. Refresh the page

This adds sample lost and found pets for testing.

## 🐛 Troubleshooting

### Images not displaying after page refresh
- **Solution**: Images are stored as base64 in localStorage. For large images, consider reducing image size before upload.

### Form doesn't submit
- **Solution**: Check that all required fields are filled and phone number is exactly 10 digits

### Data appears to be lost
- **Solution**: Check if browser privacy mode is enabled. localStorage may be cleared on session end in private/incognito mode.

### Mobile menu not closing
- **Solution**: This is fixed - menu closes automatically when clicking a link

## 🚀 Future Enhancement Ideas

1. **Backend Integration**: Connect to a real database
2. **User Accounts**: Create user profiles and pet history
3. **Search & Filter**: Advanced search by location, breed, color
4. **Notifications**: Alert system when matching pets are found
5. **Email Integration**: Send pet information via email
6. **Map Integration**: Show pet locations on map
7. **Social Sharing**: Share listings on social media
8. **Admin Panel**: Moderation and management tools
9. **Mobile App**: iOS and Android applications
10. **AI Integration**: Image recognition to match lost/found pets

## 📄 License

This project is open source and available for educational and personal use.

## 🤝 Contributing

Feel free to fork, modify, and improve this project. Share your enhancements with the community!

## 📞 Support

For questions or issues, please refer to the HTML files and code comments for detailed implementation information.

---

**Happy Pet Finding! 🐾**

*Help reunite lost pets with their families*

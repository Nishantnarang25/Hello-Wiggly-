# Virtual Pet React App 🐶

A cute interactive virtual dog pet built with React that responds to different moods!  
The pet changes expressions, animations, and background colors based on mood inputs like happy, sad, angry, surprised, and more.

---

## Features

- Dynamic mood-based animations and expressions  
- Tail wagging, ear movements, eye blinking, mouth shapes  
- Background color changes based on mood  
- Fun extras like hearts, tears, sweat drops, and paw waves  
- Accessible with ARIA roles and live region updates  
- Easy to customize mood settings and styles

---

## Demo

![Virtual Pet Demo](https://user-images.githubusercontent.com/yourusername/demo.gif)  
*Replace with your demo GIF or screenshot*

---

## Installation

1. Clone the repo:  
   ```bash
   git clone https://Github.com/Nishantnarang25/Hello-Wiggly-

   Install dependencies:

2. npm install
Run the app locally:

3. npm run dev

## Usage

Pass a `mood` prop to the `<Pet />` component to change the pet’s mood dynamically:

```jsx
<Pet mood="happy" />
<Pet mood="sad" />
<Pet mood="neutral" />

```
Mood Configurations
The pet supports the following moods:
1. happy
2. sad
3. angry
4. surprised
5. neutral
6. fearful
7. disguisted

Each mood has unique animations and styling.

Customization

```
Update mood configurations in moodConfigs.js to change colors, animations, or messages

Modify SVG and CSS styles for a personalized pet appearance

Add new moods and animations easily

Technologies Used
React

SVG for vector graphics

CSS animations and keyframes

# Project Title

Share 'n' Care Depot

## Overview

What is your app? Brief description in a couple of sentences.
Introducing "Share 'n' Care Depot," an app designed for neighbors to donate or borrow various items for free. Whether it's a camping tent for a week or furniture for permanent use, users can select from a diverse range of offerings based on availability.
There is a physical space and an online catalogue of things that people can borrow locally / have forever.

### Problem

Why is your app needed? Background information around any pain points or other reasons.
This platform facilitates quick access to rarely used items, as well as useful furnitures, kitchen appliances, allowing users to easily connect with us while reducing unnecessary waste.I want to make reusable furniture disposal accessible and pleasant.
Environmental Consciousness: Many people want to contribute to sustainability efforts but struggle to find convenient ways to dispose of reusable furniture responsibly. the app provides a solution by offering a seamless process for donating furniture, thereby reducing waste and promoting environmental conservation.
Time Constraints: Busy schedules can make it difficult for individuals to find the time to transport furniture to donation centers or arrange for pickup. the app streamlines the process by offering door-to-door pickup services, making it easy for users to donate without disrupting their routines.
Accessibility: Not everyone has the means or ability to transport bulky furniture to donation centers. the app makes furniture disposal accessible to a wider audience by offering pickup services, ensuring that anyone can contribute to sustainability efforts regardless of their circumstances.
Motivation: Some people may want to donate furniture but lack the motivation to take action. By offering a convenient and hassle-free solution, the app incentivizes users to participate in sustainable practices, making the process more appealing and motivating

### User Profile

Who will use your app? How will they use it? Any special considerations that your app must take into account.
"Share 'n' Care Depot" fosters a community spirit of sharing and caring while providing a convenient platform for resource utilization and conservation. Neighbors with limited budget or students, newcomers/ tenant who recently moved from another city to a certain neighborhood, or who r unable to take their belongings with them during their next move to another province/ country.

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

Key features include:

Featured items showcased on the main page for easy browsing.
Can search items/ Category filters/ sort items enabling users to find specific items quickly.

Registered users can borrow up to three items simultaneously to ensure fair access for all.The length of borrowing time is flexible, and if you still need the item after the due date, just let us know. Renewals are always accommodated as long as no one else has requested or reserved the item.
Return the borrowed item.
That’s it! When you’re done with the item or when the due date arrives, simply drop it off for the next borrower to use. Items can be returned directly to our location, everyday evning 5 to 7pm.

Admin privileges include:

Uploading images of donated items for the user to view the item.
Posting available items for others to view.
Removing items from the platform.
Marking items as borrowed or taken.
Communication via the chat-app, email, or text to coordinate item pickup/drop off to Arrange pickup/drop off with the donor

## Implementation

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

REACT, Node.js + Express, JS, MySQL,

### APIs

List any external sources of data that will be used in your app.
Own API

### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

### Browse the inventory

Reusable Camping Items:

Tent
Sleeping bag
Sleeping pad or air mattress
Camp stove or portable grill
Cooking utensils and pots/pans
Lantern or flashlight
First aid kit
Multi-tool or pocket knife
Water bottles
Portable camping chairs or seating
Portable camping table
Backpack or camping gear storage
Reusable Skiing Items:

Skis or snowboard
Ski or snowboard boots
Ski poles (if skiing)
Ski helmet
Ski goggles
Ski or snowboard jacket and pants
Base layers (thermal underwear)
Mid layers (fleece or insulated jacket)
Gloves or mittens
Neck gaiter or balaclava
Ski socks
Backpack or ski gear bag
Reusable Skating Items:

Ice skates or roller skates/inline skates
Helmet (especially for beginners or children)
Knee and elbow pads
Wrist guards
Skating socks
Sweater or jacket for warmth
Water bottle or hydration pack
Skate bag or backpack for carrying gear
Reusable BBQ Oven Items:

BBQ grill or oven
BBQ tools (spatula, tongs, BBQ brush)
Grilling baskets or trays
Cleaning supplies (grill brush, cleaner)

### Borrow an item from the location

### Volunteer

Volunteers are what continue to make the Depot a success! Join our team and help us build a more resilient community.

### Donate Funds with stripe

### Users and admin profile

### Add new item with images and item details

### Schedule appointment to pickup ?

### Donate things, arrange pickup for heavy items, if any or drop off at convenient time

items at the top of wishlist
Folding plastic table (4ft, 6ft, lightweight)
Folding chairs (Not upholstered)
Plates, bowls and cups for events (durable and lightweight is preferred)
Outdoor Games
Sandwich board chalk board
Party lights (solar, or plug-in)
Beach umbrella
Garden tools (Shovels, rake, etc.)
Hand held garden tiller
Manual lawn aerator
Pole tree trimmer
Electric leaf blower
Electric Hedge trimmer
Stackable mixing bowls
Electric Hot pot
Tent (quick set-up)
Camping Lanterns (battery operated, or rechargeable)
Crafting tools (decorative punches, stamps, fabric scissors)

### FAQs

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.


### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out.

inventory
id
item_name:
description:
  category:
  status:
  Unavailable
  temporarily
  available
  quantity:1
locationID
borrowerID

admin will only see edit/del

users
id
username
paswd
item_borrowed: 1
item_pickedup: 1
admin
for admin, isAdmin true, for user isAdmin false

admin has access to everything
id 
adminname
paswd

location if location is same and not changing no need to have it in db, it will be just in the frontend

id
name
contact info
address
inventoryId


borrower table
id
taken at
return at
timeframe
inventory id
user_id

status : borrowed, will be available at a later date i.e. april 29th
show due date

category table
id
name

permanent item
id
taken_at
inventory_id
### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.
'/users', /admin
POST /login

POST /signup

GET /profile
/order

'/inventories/:inventoryId'
.getOneInventory
.deleteInventory;

.route('/inventories')
.get(inventoryLocationList)
.postInventoryItem;

.put updateInventoryItem;
/upload("image")
/pickup
"/:id/likes

### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.
OAuth, JWT

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

** adding inventory with images and location, user and admin profile, donate funds using stripe/things sending request form, edit/delete items, arranging pickup /drop of time, chat with us/schedule using calendar to borrow?

*** storing images,  

## Nice-to-haves

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.

deploying app with cloud storage?,
user should be able to like and make comments on the items?
Would like to volunteer with us? volunteers page
FAQs, Guidelines for donation: Option for users/donors to donate funds for facility maintenance using their cards.
Like/favorite functionality for users to save items for future reference by creating a profile.
Direct messaging capability for expressing interest in items.

https://libraryofthingsyxe.com/

https://karrotmarket.com/?in=toronto-11052

https://brainstation.io/hiring-brainstation-graduates

https://www.pexels.com/

https://www.freepik.com/

https://dribbble.com/

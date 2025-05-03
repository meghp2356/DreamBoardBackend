# features(have to be implement)

- listing multiples pic(random alogrithm that give base on users prefrece)
- expore page (divide post based on category)
- realted post exprorations
- tags
- saves with category
- public + private 


#later(maybe never)

- rate liminting , security , morgan


# Post Service

This project implements a basic post management system with features to create, fetch, and delete posts. It includes functionality to upload images to Cloudinary, validate user input, and ensure that users can only delete their own posts. This service uses MongoDB for data storage and integrates various middleware for authentication and file handling.

## Features

- **Create Post**: Allows authenticated users to create posts with image upload and associated tags.
- **Get Post**: Fetches post details by ID, including user information.
- **Delete Post**: Authenticated users can delete their own posts.

## Technologies Used

- **Cloudinary**: Image storage and management
- **JWT Authentication**: Middleware to verify user identity
- **Multer**: Middleware for handling file uploads

## File Structure

- **controllers/post.controller.js**: Handles the logic for creating, fetching, and deleting posts.
- **services/post.service.js**: Contains business logic for post creation, fetching, and deletion.
- **models/post.model.js**: MongoDB schema for posts.
- **middleware/verifyUser.middleware.js**: Middleware for verifying user authentication using JWT.
- **middleware/multer.middleware.js**: Middleware for handling image uploads via Multer.
- **utils/cloudniary.js**: Utility function to upload images to Cloudinary.

## API Endpoints

### `POST /create`
- **Description**: Allows authenticated users to create a post with an image and tags.
- **Request Body**:
  - `tags` (optional): Tags associated with the post.
  - `image` (required): The image file to be uploaded.
- **Response**: `200 OK` with the created post data or an error message.

### `GET /:postId`
- **Description**: Fetches a post by its ID, including user details.
- **Response**: `200 OK` with post data or an error message if post not found.

### `DELETE /:postId`
- **Description**: Allows authenticated users to delete their own posts.
- **Response**: `200 OK` with a success message or an error message if post is not found or the user doesn't own the post.

## Setup

1. Clone the repository:
   ```bash
   git clone <repository_url>

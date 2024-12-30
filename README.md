# Uses Parcel to build application

> npx parcel index.html

# For production build

> npx parcel build index.html
> // remove the """main: index.js""" from package.json

# Advantages of using Parcel

- Different Dev Build and Production Build
- Caching
  - creates parcel-cache directory in the projects root and stores cache there
- HMR (HOT MODULE REPLACEMENT)
  - Tracks changes in files and updates accordingly
  - Uses File Watching ALgorithm written in C++
- Tree Shaking
  - Removes unwanted code
- Code Splitting
  - Code are loaded on demand or parallel loading
- Differential Bundling
  - Supports older browsers as well
- Image Optimization
- File Minification
- File Bundling
- File Compression

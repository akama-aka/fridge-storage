# Fridge Storage

`Fridge Storage` is a website and an API, developed in JavaScript, designed to help keep track of what's in your freezer or fridge. The seed for this project was sown by the need to keep a tab on the items stored in various cooling devices in our household.

Please note that I might not actively maintain this project in the future as it didn't gain substantial use in my family.

## Usage

### Starting the API Server
1. Download the source code.
2. Unpack the source code.
3. Specify the hostname and port of the API server and the path to SQLite database in the .env file.
4. Navigate to the api folder and run `npm ci`.
5. Start the server by typing `node server.js` into the terminal.

### Accessing the Website
1. Install a web server of your choice (e.g., NGINX, Apache).
2. Move the files from the `web` folder into the root directory of your web server.
3. Start the web server and access the website.

>Detailed usage instructions are in the pipeline.

## Third Party Packages

This project uses third-party packages in addition to the original code. These are listed in the following table:

| Package           | Link                                        | License      | Purpose                                            | Version  |
|-------------------|---------------------------------------------|--------------|----------------------------------------------------|----------|
| dotenv            | https://npmjs.org/package/dotenv            | BSD-2-Clause | Securing environment variables                     | 16.04.05 |
| fastify           | https://npmjs.org/package/fastify           | MIT          | API framework                                      | 04.27.00 |
| sqlite            | https://npmjs.org/package/sqlite            | MIT          | SQLite database implementation                     | 05.01.01 |
| sqlite3           | https://npmjs.org/package/sqlite3           | BSD-3-Clause | -_-                                                | 05.01.07 |
| @fastify/compress | https://npmjs.org/package/@fastify/compress | MIT          | May be removed in the future                       | 07.00.03 |
| Bootstrap         | https://npmjs.org/package/bootstrap         | MIT          | Frontend design for the website                    | 5        |

## Hardware and Microcontroller Support

| Hardware              | Supported  |
|-----------------------|------------|
| Raspberry Pi Pico     | :x:        |           
| Raspberry Pi 3        | ❔          |
| Raspberry Pi 4        | ✅          |
| Raspberry Pi 5        | ✅          |
| Minimum Disk Space    | 700 MB     |
| Third Party Apps      | nodejs,npm |

## Security and Feature Updates

### Feature Updates

Feature updates and minor bug fixes are always released on the 15th day of the month. Feature updates are planned until 28th May 2025.

### Security Updates

Security updates are released as quickly as possible depending on the urgency. Security updates are planned until 1st January 2026, but they may get delayed.

### Licensing

By downloading, using, editing, and forking the project, you automatically accept the licensing terms detailed in the LICENSE file and those of the packages used by this project.
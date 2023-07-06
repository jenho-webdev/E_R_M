# ERM
A simple CLI Employee Relationship Management (ERM) System allows users to manage employees' information and relations in a company.  

- [Explore the docs]( https://github.com/jenho-webdev/ERM)

- [Report Bug](https://github.com/jenho-webdev/ERM/issues/)

- [Request Feature](https://github.com/jenho-webdev/ERM/issues)

## Table of Contents

- [ERM](#erm)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Roadmap](#roadmap)
  - [Demo](#demo)
  - [Contributing](#contributing)
  - [License](#license)
  - [Credits](#credits)
  - [Contact](#contact)

## Installation

1. Clone the repository: `git clone git@github.com:jenho-webdev/ERM.git`
2. Navigate to the project directory.
3. Install the dependencies: `npm install`

## Configuration

The project requires certain environment variables to be set for proper configuration. These variables include sensitive information such as API keys and database credentials. To set up the environment variables, follow these steps:

1. Create a file named `.env` in the root directory of the project.
2. Use the `.env.example` file as a template and add the necessary environment variables with their corresponding values to the `.env` file.
3. Make sure to replace the placeholder values in the `.env.example` file with the actual values.

Here is an example of the `.env.example` file:

```plaintext
DB_HOST=
DB_USER=
DB_PASSWORD=
```
Note: The .env file should never be committed to version control, as it contains sensitive information. Ensure that the .env file is added to the .gitignore file to exclude it from being tracked.

## Usage

1. Start the server: `npm run start`
2. Open your web browser and go to `http://localhost:3001`
3. Use the ERM application to write and save notes.

## Roadmap

Current version: V2.0

Functions available in the current version:

```list
VIEW ALL DEPARTMENTS
VIEW ALL ROLES
VIEW ALL EMPLOYEES
ADD A DEPARTMENT
ADD A ROLE
ADD AN EMPLOYEE
UPDATE AN EMPLOYEE'S ROLE
UPDATE AN EMPLOYEE'S MANAGER
DELETE AN EMPLOYEE
DELETE A ROLE
EXIT
```

Functions planned for the next version V3.0:

```list
VIEW EMPLOYEES BY DEPARTMENT
VIEW EMPLOYEES BY ROLE
```

## Demo

The following video demo the application being used from the command line:
[![demo video on v2](./assets/video-thumbnail.png)](https://youtu.be/ryJ6cZsPmUU)

## Contributing

Contributions are welcome! If you have suggestions, bug reports, or feature requests, please open an issue or a pull request.

## License

This project is licensed under the [![MIT](https://img.shields.io/badge/License-MIT-lightgrey.svg)](https://github.com/jenho-webdev/ERM/blob/main/LICENSE)

> For details of the application's licensing details, please visit the License page in the repo [here](https://github.com/jenho-webdev/ERM/blob/main/LICENSE)
>
>
In the above example, the "Configuration" section explains how to set up the environment variables using the `.env` file and references the `.env.example` file as a template. It also emphasizes the importance of not committing the `.env` file to version control and includes a note to add it to the `.gitignore` file.

Feel free to modify and adapt this example to fit your specific project requirements.



## Credits

Simple ERM was created by me as part of a coding challenge for the UCI Full Stack Bootcamp course assignment related to topics on OOP, node js., Express.js, Heroku deployment, and more.

The development of this program was supported by the course materials and resources provided by the boot camp.

The shield and badges used in this markdown document were sourced from Shields.io.

## Contact

For any inquiries or questions, welcome to contact me @
[![LinkedIn][linkedin-shield]](https://www.linkedin.com/in/jen-h-202a1723/)[![Github][Github-shield]](https://github.com/jenho-webdev/Personal-Portfolio)[![Slack][slack-shield]](https://jenworkspace-as73396.slack.com/archives/C052QLTJQHG)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[Github-shield]:https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[slack-shield]:https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white

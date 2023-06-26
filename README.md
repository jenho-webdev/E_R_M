# ERM
A simple CLI Employee Relationship Managment(ERM) System allows users to  

- [Explore the docs]( https://github.com/jenho-webdev/ERM)

- [Deployed Application](https://jenho-webdev.github.io/ERM/)

- [Report Bug](https://github.com/jenho-webdev/ERM/issues/)

- [Request Feature](https://github.com/jenho-webdev/ERM/issues)

## Table of Contents

- [ERM](#erm)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Screenshots](#screenshots)
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


## Screenshots

![Notes Page](./assets/image/screenshot.png)

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or a pull request.

## License

This project is licensed under the [![MIT](https://img.shields.io/badge/License-MIT-lightgrey.svg)](https://github.com/jenho-webdev/ERM/blob/main/LICENSE)

> For details of the application's licensing details, please visit the License page in the repo [here](https://github.com/jenho-webdev/ERM/blob/main/LICENSE)
>
>
In the above example, the "Configuration" section explains how to set up the environment variables using the `.env` file and references the `.env.example` file as a template. It also emphasizes the importance of not committing the `.env` file to version control and includes a note to add it to the `.gitignore` file.

Feel free to modify and adapt this example to fit your specific project requirements.



## Credits

Simple ERM was created by me as part a coding challenge for the UCI Full Stack bootcamp course assignment related to topics on OOP, node js., Express.js, Heroku deployment, and more.

The development of this program was supported by the course materials and resources provided by the bootcamp.

Shield and badges used in this markdown document were sourced from Shields.io.

## Contact

For any inquiries or questions, welcome to contact me @
[![LinkedIn][linkedin-shield]][https://www.linkedin.com/in/jen-h-202a1723/](![Github)[Github-shield]][https://github.com/jenho-webdev/Personal-Portfolio](![Slack)[slack-shield]](https://jenworkspace-as73396.slack.com/archives/C052QLTJQHG)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[Github-shield]:https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[slack-shield]:https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white

# Multilingual Text Translation Pipeline

## Overview

The Multilingual Text Translation Pipeline project offers a streamlined mechanism for translating text inputs using the Google Translate API. This solution employs Node.js streams and includes throttling functionalities to manage the flow of data and the Translate API for language translations.

## Installation

To install the necessary dependencies, run the following command:

```shell
npm install
```

## Usage

To initiate the translation pipeline, execute the command:

```shell
npm start
```

## Configuration

The project allows configuration of certain parameters:

- **Delay Between Chunks:** Adjust the delay between data chunks for throttling by modifying the `delayBetweenChunks` variable in the `main()` function within `index.ts`.

## Error Handling

The project handles errors gracefully, logging encountered issues. Please refer to the error messages for troubleshooting guidance.

## Contributing

Contributions to this project are welcomed. To contribute, follow the guidelines for pull requests and issue reporting available in the repository.

## License

This project is licensed under the MIT License.

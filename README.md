# Yassir Test Automation Project

## Part 1: Oxford Dictionary + Speechmatics

### Proposed Test Cases

1. **Search the dictionary for the word 'Animal' and assert on the first result score**
   - Objective: Ensure the dictionary search returns accurate results for the word 'Animal'.

2. **Retrieve entry from the dictionary for 'Animal' and store pronunciation MP3**
   - Objective: Fetch the pronunciation audio file for 'Animal' from the dictionary and save it locally.

3. **Send the MP3 file to be transcribed using the Speechmatics API and assert the voice matches the text 'Animal'**
   - Objective: Verify that the Speechmatics transcription matches the expected word 'Animal'.

### Explanation of the Provided Solution

To automate these test cases and run them efficiently, an automation framework with a test runner is required. For this project, Playwright's APIContext was chosen due to its robust capabilities for handling API interactions.

Regarding scalability, API requests were structured using a Page Object Model (POM) style for reusability and maintainability.

The tests are executed within a Docker container on GitHub Actions upon each push to the master branch, ensuring continuous integration and testing.

## Part 2: Plaid API Automation

Since Parabank was not stable for automating scenarios (due to frequent changes by hackers affecting IDs and vital data), I opted to automate scenarios using Plaid's APIs.

## Part 3: Integration of API Test Automation for Web and Mobile

### 1. Actions for Utilizing API Test Automation for Both Web and Mobile

To effectively utilize existing API test automation for both web and mobile, I would take the following actions:

- **Gather Requirements**: Understand the product or service to be covered and perform a systems analysis to determine if specific features influence the choice of tech stack or frameworks.
  
- **Framework Selection**: If web and mobile testing are interdependent (e.g., creating a bot through a web interface and interacting with it via mobile), use an automation framework that supports child processes. This approach allows starting a mobile automation service mid-test while concluding the test scenario within the parent (web automation framework).

### 2. Theoretical Example of Contract Testing for an E-commerce Application

Contract testing ensures that different services or components in a system communicate correctly. Tools such as Pact (a consumer-driven contract testing tool), JUnit/TestNG for Java, or Jest, Mocha, Playwright, etc., for JavaScript/TypeScript-based applications can be used.

**Scenario: E-commerce Application**

In an e-commerce application, we might have microservices such as:

- **Product Service**: Manages product details, pricing, and availability.
- **Order Service**: Handles customer orders, including adding products to the cart, checking out, and processing payments.

**Contract Components**:

- **Consumer**: The service initiating the interaction, such as the Order Service requesting product information.
- **Provider**: The service responding to the interaction, such as the Product Service supplying product details.

- ***Example***
The Order Service (consumer) might define a contract that specifies it will call the Product Service's (provider) /products/{id} endpoint and expects a JSON response with product details.

The Product Service will then verify this contract by running tests to ensure that its /products/{id} endpoint can handle the requests as expected and return the correct responses.

Each interaction defines a specific request-response pair, ensuring both services fulfill their roles as expected. Thus contract testing is vital for ensuring that services in a microservices architecture can communicate reliably and correctly, helping to maintain system integrity and reduce integration issues.

________________________________________________________________

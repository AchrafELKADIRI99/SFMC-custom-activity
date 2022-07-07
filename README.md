# EJS Custom Activity

## Installation

First, install all dependencies by running the `npm i` command

Then, create the `.env` file in the root folder and add the env vars to it (copy vars from `.env-example` file)

Finally, run in development mode using `npm run dev` command

## Env Vars

### Required

- JWT - Must be filled if a system generated JWT is used. Use the key defined inside the installed package. !**NOTE**! It's not recommended to use system generated JWT as it cannot be rotated. Switch from system JWT to custom JWT on the go will break the already configured instances of the custom activity. Use the custom JWT instead.
- JWT_CUSTOMER_KEY - Must be filled if a [custom key](https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/encode-custom-activities-using-jwt-customer-key.html) is used. Use an external key defined in Key Management.
- JWT_PSWD - Must be filled if a custom key is used.
- STACK - The number of the SFMC stack (e.g. 1, 10, 50, etc.).
- SFMC_SUBDOMAIN - Subdomain of any Base URI (Authentication, REST, SOAP) defined in the Web App API Integration component.
- CLIENT_ID - Client Id defined in the Web App API Integration component.
- CLIENT_SECRET - Client Secret defined in the Web App API Integration component.
- STS_CLIENT_ID - Client Id defined in the Server-to-Server API Integration component.
- STS_CLIENT_SECRET - Client Secret defined in the Server-to-Server API Integration component.
- ACCOUNT_ID - Business Unit Id.
- OFFER_TYPES_DE - External key of the data extension that contains offer types.
- PRODUCT_TYPES_DE - External key of the data extension that contains product types.
- SEND_LOG_DE - External key of the logging data extension.

### Optional

- DESCRIPTION - Title of your custom activity. Default is "EJS Custom Activity".
- CONCURRENT_REQUESTS - How many rest activities to run in parallel. Must be from 1 to 10. Default is 1, which means no concurrent requests.
- RETRY_COUNT - How many times to retry each rest activity in the journey after the rest activity times out. Must be from 0 to 5. Default is 5.
- RETRY_DELAY - How long, in milliseconds, to wait before each rest activity in the journey is retried. Must be from 0 milliseconds to 10,000 milliseconds. Default is 10,000 milliseconds.
- TIMEOUT - How long, in milliseconds, before each rest activity in the journey times out. Must be from 1,000 milliseconds to 100,000 milliseconds. Default is 100,000 milliseconds.
- IP_CHECK_DISABLED - Set to TRUE if you want to disable the IP check for application endpoints. Defaults to FALSE.
# SFMC-custom-activity

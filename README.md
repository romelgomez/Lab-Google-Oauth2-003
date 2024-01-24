# Implementing OAuth 2.0 Server Flow: Maximising Security with Minimal Client-Side Exposure

In this guide, we dig into the configuration of a client and server using OAuth 2.0. The goal is to reduce the exposure of sensitive information on the client side.

The objective is to establish a robust and secure structure, ensuring the high trust in handling sensitive customer data. Aim to provide a clear understanding of OAuth 2.0 mechanisms, emphasising the importance of safeguarding client-side interactions.

## Tech Stack

- NextJS as client
- NestJS as server
- Prisma as Database ORM
- Postgresql as Database

## OAuth Flow

### Client Flow

Part 1: Enhanced Initial Interaction

1. Initiate Authentication via NestJS:

   - Instead of directly redirecting to Google from the Next.js client, the user initiates the OAuth process through a NestJS endpoint.
   - This server endpoint then redirects the user to Google's OAuth server.

2. **Server-Handled Redirection:**

   - The redirection to Google's OAuth server is handled entirely by the NestJS server.
   - This approach keeps the `client_id` and redirection logic on the server, reducing the exposure on the client side.

#### **Part 2: Interaction with Google OAuth Server**

3. **Google Authenticates the User:**

   - The user is authenticated by Google as before.
   - The user consents to the requested permissions.

4. **Google Sends Authorization Code to NestJS:**

   - Google redirects back to a NestJS server endpoint with the authorization code.

#### **Part 3: Backend Processes Authorization Code**

5. **Server Handles Authorization Code:**

   - NestJS backend receives the authorization code.
   - The backend then securely communicates with Google's token endpoint to exchange the code for tokens.

6. **Secure Token Handling:**

   - Access and refresh tokens are received and stored securely on the server.
   - The server manages these tokens, reducing the risk of exposure on the client side.

#### **Part 4: Secured Session and API Management**

7. **Session Creation with Enhanced Security:**

   - The NestJS backend creates a user session.
   - The session might include a server-generated session token sent back to the client.

8. **Securing API Endpoints:**

   - API endpoints require a valid session token, verified by the NestJS backend.

#### **Part 5: Client-Side Handling with Minimal Sensitive Data**

9. **Client Stores Minimal Data:**

   - The Next.js client stores only the session token.
   - Sensitive data like access and refresh tokens are not stored on the client.

10. **Authenticated Requests:**
    - The Next.js client sends the session token with each request.
    - The NestJS server validates this token and proxies the requests to Google's APIs as needed.

## **Final Part: Enhanced Security**

11. **Security-First Approach:**

    - All sensitive token operations are handled by the server.
    - Communication between the client and server, and between the server and Google, is secured (preferably via HTTPS).

12. **Token Renewal:**

    - The NestJS server manages token renewal, using the refresh token to get new access tokens from Google.

13. **Logout and Session Termination:**

    - The user can log out through a server endpoint.
    - The server invalidates the session and optionally informs Google to revoke the token.

#### **Enhanced Security Measures**

1. **Using the `state` Parameter:**

   - When initiating the OAuth process, the NestJS server generates a unique `state` parameter.
   - This parameter is sent to Google's OAuth server and is returned unchanged with the authorization code.
   - Upon receiving the authorization code, the server validates the `state` parameter to mitigate CSRF attacks.

2. **PKCE (Proof Key for Code Exchange):**
   - PKCE adds an additional layer of security, especially for public clients.
   - The server generates a code verifier and a code challenge, where the code challenge is sent along with the authorization request.
   - When exchanging the authorization code for tokens, the code verifier is also sent. Google's server uses this to validate the request, ensuring it comes from the same client that initiated the authorization request.

#### **Updated Flow with Enhanced Security Measures**

Following the previously outlined steps, these security measures are integrated at specific points:

- During **Part 1**, when the user initiates the authentication via NestJS and the server redirects to Google, include the `state` parameter and the code challenge (for PKCE) in this request.
- In **Part 2**, when Google redirects back to NestJS with the authorization code, the response includes the unchanged `state` parameter, which the server validates.
- In **Part 3**, while the server exchanges the authorization code for tokens, it sends the code verifier (for PKCE) along with the request to Google.

#### **Other Security Improvements**

3. **Token Encryption:**

   - Store encrypted access and refresh tokens in the server.
   - Use strong encryption standards to protect token data at rest.

4. **Regular Token Rotation:**

   - Periodically rotate refresh tokens.
   - This practice limits the lifespan of any token, reducing the impact of potential token leakage.

5. **Strict Scopes Management:**

   - Define strict scopes for the OAuth process, requesting only the permissions that are absolutely necessary.
   - This limits the access level of the tokens, adhering to the principle of least privilege.

6. **Monitoring and Logging:**

   - Implement monitoring and logging of authentication flows and token usage.
   - Anomalies or unusual patterns can be flagged for potential security breaches.

7. **Secure Frontend-Backend Communication:**

   - Use secure, authenticated channels for communication between the Next.js frontend and NestJS backend.
   - Consider using mutual TLS (mTLS) for added security.

8. **Rate Limiting and Abuse Prevention:**
   - Implement rate limiting on your authentication endpoints to prevent abuse and potential attacks like DDoS.

## npm/yarn dependecies

```
yarn add @nestjs/passport passport passport-google-oauth20 express-session class-transformer class-validator
```

```
yarn add @types/express-session @types/passport -D
```

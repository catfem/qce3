
declare namespace google {
    namespace accounts {
        namespace oauth2 {
            function initTokenClient(config: TokenClientConfig): TokenClient;
            
            interface TokenClient {
                requestAccessToken(overrideConfig?: object): void;
            }

            interface TokenClientConfig {
                client_id: string;
                scope: string;
                callback: (tokenResponse: TokenResponse) => void;
            }

            interface TokenResponse {
                access_token: string;
                error?: any;
            }
        }
    }
}
